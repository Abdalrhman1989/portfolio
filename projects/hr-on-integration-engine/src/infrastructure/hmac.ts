import * as crypto from 'crypto';
import { Result, ok, err } from '../domain/result.js';

export function verifyHmacSignature(
    rawBody: string,
    signatureHeader: string | undefined,
    secretKey: string
): Result<boolean, string> {
    if (!signatureHeader) {
        return err('Missing X-HRON-Signature header');
    }

    try {
        const computedSignature = crypto
            .createHmac('sha256', secretKey)
            .update(rawBody, 'utf8')
            .digest('hex');

        // Timing-safe comparison to prevent timing attacks
        const signatureBuffer = Buffer.from(signatureHeader, 'hex');
        const computedBuffer = Buffer.from(computedSignature, 'hex');

        if (signatureBuffer.length !== computedBuffer.length) {
            return err('Invalid signature format or length');
        }

        const isValid = crypto.timingSafeEqual(signatureBuffer, computedBuffer);
        return isValid ? ok(true) : err('Signature mismatch');
    } catch {
        return err('Cryptographic verification failure');
    }
}
