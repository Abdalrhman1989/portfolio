import { describe, it, expect } from 'vitest';
import { calculateDepartmentPayGap, SalaryRecord } from '../src/services/payTransparencyService.js';
import { isOk, isErr } from '../src/domain/result.js';

describe('EU Pay Transparency Directive Calculation Engine', () => {
    it('correctly calculates compliant pay gap under 5%', () => {
        const salaries: SalaryRecord[] = [
            { employeeId: '1', department: 'Engineering', gender: 'MALE', baseSalaryDkk: 60000 },
            { employeeId: '2', department: 'Engineering', gender: 'MALE', baseSalaryDkk: 62000 },
            { employeeId: '3', department: 'Engineering', gender: 'FEMALE', baseSalaryDkk: 59500 },
            { employeeId: '4', department: 'Engineering', gender: 'FEMALE', baseSalaryDkk: 61000 },
        ];

        const result = calculateDepartmentPayGap(73, 'Engineering', salaries);
        expect(isOk(result)).toBe(true);
        if (isOk(result)) {
            expect(result.value.thresholdExceeded).toBe(false);
            expect(result.value.unadjustedPayGapPercent).toBeLessThan(5.0);
            expect(result.value.recommendation).toContain('COMPLIANT');
        }
    });

    it('triggers Joint Pay Assessment alert when gender pay gap exceeds 5%', () => {
        const salaries: SalaryRecord[] = [
            { employeeId: '1', department: 'Sales', gender: 'MALE', baseSalaryDkk: 75000 },
            { employeeId: '2', department: 'Sales', gender: 'FEMALE', baseSalaryDkk: 60000 },
        ];

        const result = calculateDepartmentPayGap(73, 'Sales', salaries);
        expect(isOk(result)).toBe(true);
        if (isOk(result)) {
            expect(result.value.thresholdExceeded).toBe(true);
            expect(result.value.unadjustedPayGapPercent).toBe(20.0);
            expect(result.value.recommendation).toContain('ALERT');
        }
    });

    it('returns domain error when representation is insufficient', () => {
        const salaries: SalaryRecord[] = [
            { employeeId: '1', department: 'Support', gender: 'MALE', baseSalaryDkk: 45000 },
        ];

        const result = calculateDepartmentPayGap(73, 'Support', salaries);
        expect(isErr(result)).toBe(true);
    });
});
