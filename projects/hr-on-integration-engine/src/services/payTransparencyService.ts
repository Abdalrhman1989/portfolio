import { PayTransparencyAuditResult } from '../domain/models.js';
import { Result, ok, err } from '../domain/result.js';

export interface SalaryRecord {
    employeeId: string;
    department: string;
    gender: 'MALE' | 'FEMALE' | 'NON_BINARY' | 'UNDISCLOSED';
    baseSalaryDkk: number;
}

/**
 * Calculates Gender Pay Gap in compliance with EU Directive 2023/970
 * Trigger rule: If the gap is >= 5% in any category and not justified by objective factors,
 * employers must conduct a joint pay assessment.
 */
export function calculateDepartmentPayGap(
    companyId: number,
    department: string,
    salaries: SalaryRecord[]
): Result<PayTransparencyAuditResult, string> {
    if (!salaries || salaries.length === 0) {
        return err(`No salary data available for department: ${department}`);
    }

    const maleSalaries = salaries
        .filter(s => s.gender === 'MALE')
        .map(s => s.baseSalaryDkk)
        .sort((a, b) => a - b);

    const femaleSalaries = salaries
        .filter(s => s.gender === 'FEMALE')
        .map(s => s.baseSalaryDkk)
        .sort((a, b) => a - b);

    if (maleSalaries.length === 0 || femaleSalaries.length === 0) {
        return err('Insufficient representation: requires at least one male and female employee to calculate statistical gap');
    }

    const median = (arr: number[]): number => {
        const mid = Math.floor(arr.length / 2);
        const midVal = arr[mid];
        if (midVal === undefined) return 0;
        if (arr.length % 2 !== 0) {
            return midVal;
        }
        const prevVal = arr[mid - 1];
        if (prevVal === undefined) return midVal;
        return (prevVal + midVal) / 2;
    };

    const medianMale = median(maleSalaries);
    const medianFemale = median(femaleSalaries);

    // Unadjusted pay gap formula: ((Median Male - Median Female) / Median Male) * 100
    const rawGap = ((medianMale - medianFemale) / medianMale) * 100;
    const roundedGap = Math.round(rawGap * 100) / 100;
    const thresholdExceeded = Math.abs(roundedGap) >= 5.0;

    const recommendation = thresholdExceeded
        ? `ALERT: Gap of ${roundedGap}% exceeds the 5% EU Directive 2023/970 threshold. Joint Pay Assessment required.`
        : `COMPLIANT: Gap of ${roundedGap}% is within the permissible 5% variance margin.`;

    return ok({
        companyId,
        department,
        totalEmployees: salaries.length,
        medianMaleSalaryDkk: medianMale,
        medianFemaleSalaryDkk: medianFemale,
        unadjustedPayGapPercent: roundedGap,
        thresholdExceeded,
        recommendation,
        auditedAt: new Date().toISOString(),
    });
}
