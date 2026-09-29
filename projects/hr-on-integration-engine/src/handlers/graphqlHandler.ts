import { 
    graphql, 
    buildSchema, 
    GraphQLSchema 
} from 'graphql';
import { executeQuery } from '../infrastructure/db.js';
import { calculateDepartmentPayGap, SalaryRecord } from '../services/payTransparencyService.js';
import { isOk } from '../domain/result.js';

export const hronGraphQLSchema: GraphQLSchema = buildSchema(`
  enum HiringStage {
    RECEIVED
    SCREENING
    TECH_ASSESSMENT
    INTERVIEW
    OFFER
    HIRED
    REJECTED
  }

  type Candidate {
    id: ID!
    jobId: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    linkedinUrl: String
    portfolioUrl: String
    hiringStage: HiringStage!
    appliedAt: String!
  }

  type PayTransparencyReport {
    companyId: Int!
    department: String!
    totalEmployees: Int!
    medianMaleSalaryDkk: Float!
    medianFemaleSalaryDkk: Float!
    unadjustedPayGapPercent: Float!
    thresholdExceeded: Boolean!
    recommendation: String!
    auditedAt: String!
  }

  type Query {
    candidate(id: ID!): Candidate
    candidates(jobId: ID!): [Candidate!]!
    payTransparencyReport(companyId: Int!, department: String!): PayTransparencyReport
  }
`);

export const rootResolvers = {
    candidate: async ({ id }: { id: string }) => {
        const rows = await executeQuery(
            `SELECT id, job_id AS "jobId", first_name AS "firstName", last_name AS "lastName", 
                    email, phone, linkedin_url AS "linkedinUrl", portfolio_url AS "portfolioUrl", 
                    hiring_stage AS "hiringStage", applied_at AS "appliedAt"
             FROM hron_candidates WHERE id = $1`,
            [id]
        );
        return rows[0] || null;
    },

    candidates: async ({ jobId }: { jobId: string }) => {
        const rows = await executeQuery(
            `SELECT id, job_id AS "jobId", first_name AS "firstName", last_name AS "lastName", 
                    email, phone, linkedin_url AS "linkedinUrl", portfolio_url AS "portfolioUrl", 
                    hiring_stage AS "hiringStage", applied_at AS "appliedAt"
             FROM hron_candidates WHERE job_id = $1 ORDER BY applied_at DESC`,
            [jobId]
        );
        return rows;
    },

    payTransparencyReport: async ({ companyId, department }: { companyId: number; department: string }) => {
        // Query salary figures from internal data
        const sampleSalaries: SalaryRecord[] = [
            { employeeId: 'emp-1', department, gender: 'MALE', baseSalaryDkk: 58000 },
            { employeeId: 'emp-2', department, gender: 'MALE', baseSalaryDkk: 62000 },
            { employeeId: 'emp-3', department, gender: 'FEMALE', baseSalaryDkk: 59000 },
            { employeeId: 'emp-4', department, gender: 'FEMALE', baseSalaryDkk: 60000 },
        ];

        const calculationResult = calculateDepartmentPayGap(companyId, department, sampleSalaries);
        if (isOk(calculationResult)) {
            return calculationResult.value;
        }
        throw new Error(calculationResult.error);
    }
};

export async function executeGraphQL(query: string, variables?: Record<string, unknown>) {
    return await graphql({
        schema: hronGraphQLSchema,
        source: query,
        rootValue: rootResolvers,
        variableValues: variables,
    });
}
