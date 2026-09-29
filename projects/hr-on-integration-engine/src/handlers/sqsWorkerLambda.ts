import type { SQSEvent, SQSBatchResponse, SQSBatchItemFailure } from 'aws-lambda';
import { executeQuery } from '../infrastructure/db.js';
import { CandidateSchema, WebhookEvent } from '../domain/models.js';

export async function handler(event: SQSEvent): Promise<SQSBatchResponse> {
    const batchItemFailures: SQSBatchItemFailure[] = [];

    for (const record of event.Records) {
        try {
            const webhookEvent = JSON.parse(record.body) as WebhookEvent;

            switch (webhookEvent.eventType) {
                case 'candidate.created': {
                    const parsedCandidate = CandidateSchema.parse(webhookEvent.payload);

                    await executeQuery(
                        `INSERT INTO hron_candidates 
                         (job_id, first_name, last_name, email, phone, linkedin_url, portfolio_url, resume_storage_key, hiring_stage)
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                        [
                            parsedCandidate.jobId,
                            parsedCandidate.firstName,
                            parsedCandidate.lastName,
                            parsedCandidate.email,
                            parsedCandidate.phone || null,
                            parsedCandidate.linkedinUrl || null,
                            parsedCandidate.portfolioUrl || null,
                            parsedCandidate.resumeStorageKey,
                            parsedCandidate.hiringStage
                        ]
                    );
                    break;
                }

                case 'candidate.stage_changed': {
                    const candidateId = webhookEvent.payload['candidateId'] as string;
                    const newStage = webhookEvent.payload['newStage'] as string;

                    await executeQuery(
                        `UPDATE hron_candidates 
                         SET hiring_stage = $1, updated_at = NOW() 
                         WHERE id = $2`,
                        [newStage, candidateId]
                    );
                    break;
                }

                default:
                    console.log(`[SQS Worker] Unhandled or informative event: ${webhookEvent.eventType}`);
            }
        } catch (error) {
            console.error(`[SQS Worker Error] Failed processing message ${record.messageId}:`, error);
            // SQS Partial Batch Failure: Only failed message will be retried / sent to DLQ
            batchItemFailures.push({ itemIdentifier: record.messageId });
        }
    }

    return { batchItemFailures };
}
