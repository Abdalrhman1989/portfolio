import { describe, it, expect } from 'vitest';
import * as crypto from 'crypto';
import { verifyHmacSignature } from '../src/infrastructure/hmac.js';
import { isOk, isErr } from '../src/domain/result.js';

describe('Webhook HMAC Security Layer', () => {
    const secret = 'hron_secret_key_12345';
    const payload = JSON.stringify({ event: 'candidate.created', id: '123' });

    it('successfully validates a legitimate HMAC signature', () => {
        const validSignature = crypto
            .createHmac('sha256', secret)
            .update(payload, 'utf8')
            .digest('hex');

        const result = verifyHmacSignature(payload, validSignature, secret);
        expect(isOk(result)).toBe(true);
    });

    it('rejects tampered payload with mismatched signature', () => {
        const validSignature = crypto
            .createHmac('sha256', secret)
            .update(payload, 'utf8')
            .digest('hex');

        const tamperedPayload = JSON.stringify({ event: 'candidate.created', id: '999' });
        const result = verifyHmacSignature(tamperedPayload, validSignature, secret);
        expect(isErr(result)).toBe(true);
    });

    it('rejects missing signature header', () => {
        const result = verifyHmacSignature(payload, undefined, secret);
        expect(isErr(result)).toBe(true);
    });
});
