
import { getReports, createReport, validateReport } from '../../lib/api-mock';
import { MOCK_REPORTS } from '../../mocks/reports';

describe('API Mock', () => {
    it('getReports returns initial 5 elements', async () => {
        const reports = await getReports();
        expect(reports).toHaveLength(5);
        expect(reports).toEqual(MOCK_REPORTS);
    });

    it('createReport returns a new report with generated ID and status OPEN', async () => {
        const newReportData = {
            title: 'New Title',
            description: 'New Description',
        };

        const createdReport = await createReport(newReportData);

        expect(createdReport).toHaveProperty('id');
        expect(createdReport.id).toBeDefined();
        expect(typeof createdReport.id).toBe('string');
        expect(createdReport.status).toBe('OPEN');
        expect(createdReport.votes).toBe(0);
        expect(createdReport.title).toBe(newReportData.title);
        expect(createdReport.description).toBe(newReportData.description);
    });

    it('validateReport returns true for existing ID', async () => {
        const existingId = MOCK_REPORTS[0].id;
        const isValid = await validateReport(existingId);
        expect(isValid).toBe(true);
    });

    it('validateReport returns false for non-existing ID', async () => {
        const nonExistingId = 'non-existing-id';
        const isValid = await validateReport(nonExistingId);
        expect(isValid).toBe(false);
    });
});
