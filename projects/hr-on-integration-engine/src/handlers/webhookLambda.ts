import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import * as crypto from 'crypto';
import { WebhookEventSchema } from '../domain/models.js';
import { verifyHmacSignature } from '../infrastructure/hmac.js';
import { executeQuery } from '../infrastructure/db.js';
import { isErr } from '../domain/result.js';

const sqsClient = new SQSClient({ region: process.env.AWS_REGION || 'eu-west-1' });
const SQS_QUEUE_URL = process.env.HRON_EVENTS_QUEUE_URL || 'https://sqs.eu-west-1.amazonaws.com/123456789/hron-events-queue';
const WEBHOOK_SECRET = process.env.HRON_WEBHOOK_SECRET || 'dev_secret_hron_odense_2026';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const signature = event.headers['x-hron-signature'] || event.headers['X-HRON-Signature'];
    const rawBody = event.body || '';

    // 1. Cryptographic Security Check (HMAC-SHA256)
    const verificationResult = verifyHmacSignature(rawBody, signature, WEBHOOK_SECRET);
    if (isErr(verificationResult)) {
        return {
            statusCode: 401,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Unauthorized: ' + verificationResult.error }),
        };
    }

    // 2. Schema Validation with Zod
    let parsedJson: unknown;
    try {
        parsedJson = JSON.parse(rawBody);
    } catch {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Malformed JSON payload' }),
        };
    }

    const parseResult = WebhookEventSchema.safeParse(parsedJson);
    if (!parseResult.success) {
        return {
            statusCode: 422,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Schema validation failed', details: parseResult.error.format() }),
        };
    }

    const webhookEvent = parseResult.data;
    const idempotencyKey = event.headers['idempotency-key'] || webhookEvent.eventId;

    // 3. Idempotency Check in PostgreSQL
    const existing = await executeQuery<{ idempotency_key: string }>(
        'SELECT idempotency_key FROM hron_webhook_idempotency WHERE idempotency_key = $1',
        [idempotencyKey]
    );

    if (existing.length > 0) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                status: 'DUPLICATE_IGNORED', 
                message: 'Event was already processed idempotently',
                idempotencyKey 
            }),
        };
    }

    // 4. Record Idempotency Key (expires in 24 hours)
    const payloadHash = crypto.createHash('sha256').update(rawBody).digest('hex');
    await executeQuery(
        `INSERT INTO hron_webhook_idempotency (idempotency_key, event_type, payload_hash, expires_at)
         VALUES ($1, $2, $3, NOW() + INTERVAL '24 hours')`,
        [idempotencyKey, webhookEvent.eventType, payloadHash]
    );

    // 5. Asynchronous Queue Dispatch (AWS SQS)
    await sqsClient.send(new SendMessageCommand({
        QueueUrl: SQS_QUEUE_URL,
        MessageBody: JSON.stringify(webhookEvent),
        MessageAttributes: {
            EventType: {
                DataType: 'String',
                StringValue: webhookEvent.eventType,
            },
            CompanyId: {
                DataType: 'Number',
                StringValue: webhookEvent.companyId.toString(),
            }
        }
    }));

    return {
        statusCode: 202,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'ACCEPTED_FOR_PROCESSING',
            eventId: webhookEvent.eventId,
            eventType: webhookEvent.eventType,
            enqueuedAt: new Date().toISOString()
        }),
    };
}
