import apiClient from './apiClient';

export interface Worker {
    id: string;
    name: string;
    rating: number;
    price: number;
    category: string;
    skills: string[];
    completedJobs: number;
    reviews: any[];
}

const getWorkersNearby = async (): Promise<Worker[]> => {
    const response = await apiClient.get('/workers/nearby');
    return response.data;
};

const getWorkerById = async (id: string): Promise<Worker> => {
    const response = await apiClient.get(`/workers/${id}`);
    return response.data;
};

export const workerService = {
    getWorkersNearby,
    getWorkerById,
};
