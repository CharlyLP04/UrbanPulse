import { Report, MOCK_REPORTS } from '../mocks/reports';

const SIMULATED_DELAY = 500;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getReports = async (): Promise<Report[]> => {
    await delay(SIMULATED_DELAY);
    return [...MOCK_REPORTS];
};

export const createReport = async (
    data: Omit<Report, 'id' | 'votes' | 'status'>
): Promise<Report> => {
    await delay(SIMULATED_DELAY);

    const newReport: Report = {
        ...data,
        id: crypto.randomUUID(),
        status: 'OPEN',
        votes: 0,
    };

    return newReport;
};

export const validateReport = async (id: string): Promise<boolean> => {
    await delay(SIMULATED_DELAY);
    return MOCK_REPORTS.some((report) => report.id === id);
};
