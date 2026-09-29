import { executeGraphQL } from './handlers/graphqlHandler.js';
import { calculateDepartmentPayGap } from './services/payTransparencyService.js';
import { isOk } from './domain/result.js';

async function bootstrap() {
    console.log('================================================================');
    console.log('  HR-ON Serverless Cloud & API Integration Engine');
    console.log('  Author: Abd Alrhman Darra (Odense, Denmark)');
    console.log('================================================================');

    // 1. Demonstrate EU Pay Transparency Calculation
    console.log('\n[Demo 1] Running EU Directive 2023/970 Pay Transparency Audit:');
    const auditResult = calculateDepartmentPayGap(73, 'Engineering', [
        { employeeId: 'emp-101', department: 'Engineering', gender: 'MALE', baseSalaryDkk: 58000 },
        { employeeId: 'emp-102', department: 'Engineering', gender: 'MALE', baseSalaryDkk: 62000 },
        { employeeId: 'emp-103', department: 'Engineering', gender: 'FEMALE', baseSalaryDkk: 59000 },
        { employeeId: 'emp-104', department: 'Engineering', gender: 'FEMALE', baseSalaryDkk: 60500 },
    ]);

    if (isOk(auditResult)) {
        console.log('✓ Audit Output:', JSON.stringify(auditResult.value, null, 2));
    }

    // 2. Demonstrate GraphQL Query Execution
    console.log('\n[Demo 2] Running GraphQL Query for Pay Transparency:');
    const gqlResponse = await executeGraphQL(`
        query GetPayTransparency {
            payTransparencyReport(companyId: 73, department: "Engineering") {
                department
                medianMaleSalaryDkk
                medianFemaleSalaryDkk
                unadjustedPayGapPercent
                thresholdExceeded
                recommendation
            }
        }
    `);
    console.log('✓ GraphQL Result:', JSON.stringify(gqlResponse, null, 2));

    console.log('\n[Status] Ready for AWS Lambda & SQS Deployment.');
}

if (process.env.NODE_ENV !== 'test') {
    bootstrap().catch(console.error);
}
