-- ============================================================================
-- HR-ON CLOUD PLATFORM SCHEMA MIGRATION 001
-- Target Database: PostgreSQL 15+ / Aurora Serverless v2
-- Architecture: Multi-tenant HR Recruitment, Onboarding & EU Pay Transparency
-- Author: Abd Alrhman Darra (Senior Software Engineer Candidate)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. Job Openings Table (HR-ON Recruit)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hron_job_openings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id INT NOT NULL,
    external_job_id VARCHAR(64) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL DEFAULT 'Odense C, Denmark',
    is_remote BOOLEAN NOT NULL DEFAULT FALSE,
    salary_range_min_dkk NUMERIC(12, 2),
    salary_range_max_dkk NUMERIC(12, 2),
    status VARCHAR(32) NOT NULL DEFAULT 'PUBLISHED' CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'CLOSED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hron_jobs_company_status 
    ON hron_job_openings (company_id, status);

CREATE INDEX IF NOT EXISTS idx_hron_jobs_department 
    ON hron_job_openings (department);

-- ----------------------------------------------------------------------------
-- 2. Candidates & Applicants (HR-ON Recruit)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hron_candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES hron_job_openings(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    linkedin_url VARCHAR(500),
    portfolio_url VARCHAR(500),
    resume_storage_key VARCHAR(500),
    hiring_stage VARCHAR(32) NOT NULL DEFAULT 'RECEIVED' 
        CHECK (hiring_stage IN ('RECEIVED', 'SCREENING', 'TECH_ASSESSMENT', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED')),
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hron_candidates_job_stage 
    ON hron_candidates (job_id, hiring_stage);

CREATE INDEX IF NOT EXISTS idx_hron_candidates_email 
    ON hron_candidates (email);

-- ----------------------------------------------------------------------------
-- 3. Webhook Idempotency Log (Serverless At-Least-Once Delivery Prevention)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hron_webhook_idempotency (
    idempotency_key VARCHAR(128) PRIMARY KEY,
    event_type VARCHAR(64) NOT NULL,
    payload_hash CHAR(64) NOT NULL,
    http_status_returned INT NOT NULL DEFAULT 200,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_hron_idempotency_expires 
    ON hron_webhook_idempotency (expires_at);

-- ----------------------------------------------------------------------------
-- 4. EU Pay Transparency & Salary Audit (HR-ON Core HR & Compliance)
-- In compliance with EU Directive 2023/970 (Løngennemsigtighed)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hron_pay_transparency_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id INT NOT NULL,
    department VARCHAR(100) NOT NULL,
    job_category VARCHAR(100) NOT NULL,
    total_employees INT NOT NULL CHECK (total_employees >= 0),
    median_male_salary_dkk NUMERIC(12, 2) NOT NULL,
    median_female_salary_dkk NUMERIC(12, 2) NOT NULL,
    unadjusted_pay_gap_percent NUMERIC(5, 2) GENERATED ALWAYS AS (
        CASE 
            WHEN median_male_salary_dkk > 0 
            THEN ROUND(((median_male_salary_dkk - median_female_salary_dkk) / median_male_salary_dkk) * 100, 2)
            ELSE 0.00
        END
    ) STORED,
    compliance_threshold_exceeded BOOLEAN GENERATED ALWAYS AS (
        CASE 
            WHEN ABS(((median_male_salary_dkk - median_female_salary_dkk) / NULLIF(median_male_salary_dkk, 0)) * 100) >= 5.00 
            THEN TRUE 
            ELSE FALSE 
        END
    ) STORED,
    audited_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hron_pay_transparency_comp_dept 
    ON hron_pay_transparency_metrics (company_id, department, audited_at DESC);

-- ----------------------------------------------------------------------------
-- 5. Analytical Materialized View for High-Velocity Recruiter Reporting
-- ----------------------------------------------------------------------------
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_hron_job_pipeline_summary AS
SELECT 
    j.id AS job_id,
    j.title,
    j.department,
    j.status,
    COUNT(c.id) AS total_applicants,
    COUNT(c.id) FILTER (WHERE c.hiring_stage = 'RECEIVED') AS stage_received,
    COUNT(c.id) FILTER (WHERE c.hiring_stage = 'SCREENING') AS stage_screening,
    COUNT(c.id) FILTER (WHERE c.hiring_stage = 'INTERVIEW') AS stage_interview,
    COUNT(c.id) FILTER (WHERE c.hiring_stage = 'OFFER') AS stage_offer,
    COUNT(c.id) FILTER (WHERE c.hiring_stage = 'HIRED') AS stage_hired,
    MAX(c.applied_at) AS latest_application_at
FROM hron_job_openings j
LEFT JOIN hron_candidates c ON j.id = c.job_id
GROUP BY j.id, j.title, j.department, j.status;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_hron_job_pipeline_id 
    ON mv_hron_job_pipeline_summary (job_id);
