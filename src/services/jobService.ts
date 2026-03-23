import apiClient from './apiClient';

export interface CreateJobDto {
    workerId: string;
    service: string;
    scheduledAt: string;
    address: string;
}

export interface Job {
    id: string;
    workerId: string;
    workerName: string;
    date: string;
    time: string;
    status: 'ongoing' | 'completed' | 'cancelled';
    service: string;
    address: string;
}

const createJob = async (data: CreateJobDto): Promise<Job> => {
    const response = await apiClient.post('/jobs', data);
    return response.data;
};

const getMyJobs = async (): Promise<Job[]> => {
    const response = await apiClient.get('/jobs/my');
    return response.data;
};

export const jobService = {
    createJob,
    getMyJobs,
};
