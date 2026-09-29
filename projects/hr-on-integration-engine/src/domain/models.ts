import { z } from 'zod';

export const CandidateSchema = z.object({
    jobId: z.string().uuid(),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
    linkedinUrl: z.string().url().optional(),
    portfolioUrl: z.string().url().optional(),
    resumeStorageKey: z.string().min(5),
    hiringStage: z.enum([
        'RECEIVED', 
        'SCREENING', 
        'TECH_ASSESSMENT', 
        'INTERVIEW', 
        'OFFER', 
        'HIRED', 
        'REJECTED'
    ]).default('RECEIVED'),
});

export type Candidate = z.infer<typeof CandidateSchema>;

export const WebhookEventSchema = z.object({
    eventId: z.string().uuid(),
    eventType: z.enum([
        'candidate.created',
        'candidate.stage_changed',
        'job.published',
        'pay_transparency.audit_requested'
    ]),
    timestamp: z.string().datetime(),
    companyId: z.number().int().positive(),
    payload: z.record(z.unknown()),
});

export type WebhookEvent = z.infer<typeof WebhookEventSchema>;

export interface PayTransparencyAuditResult {
    companyId: number;
    department: string;
    totalEmployees: number;
    medianMaleSalaryDkk: number;
    medianFemaleSalaryDkk: number;
    unadjustedPayGapPercent: number;
    thresholdExceeded: boolean; // EU Directive threshold >= 5% triggers joint assessment
    recommendation: string;
    auditedAt: string;
}
