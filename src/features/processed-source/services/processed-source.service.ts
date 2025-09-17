import { axiosInstance } from 'src/shared/api/axiosInstance'; 
import type { ResponseBase } from '../../../shared/types/response-base';
import type { ReadAllProcessedSourcesResponse } from '../types/response/read-all-processed-sources.response';
import type { ReadSingleProcessedSourceResponse } from '../types/response/read-single-processed-source.response';

const baseUrl = `/processed-source`;

async function create(formData: FormData): Promise<ResponseBase> {
    const response = (
        await axiosInstance.post(`${baseUrl}/create`, formData)
    ).data;
    return response;
}

async function readAll(): Promise<ReadAllProcessedSourcesResponse> {
    const response = (await axiosInstance.get(`${baseUrl}/read-all`)).data;
    return response;
}

async function readById(id: string): Promise<ReadSingleProcessedSourceResponse> {
    const response = (
        await axiosInstance.get(`${baseUrl}/read-by-id/${id}`)
    ).data;
    return response;
}

async function readAllByUserId(): Promise<ReadAllProcessedSourcesResponse> {
    const response = (
        await axiosInstance.get(`${baseUrl}/read-all-by-user-id`)
    ).data;
    return response;
}

async function deleteById(id: string): Promise<ResponseBase> {
    const response = (
        await axiosInstance.delete(`${baseUrl}/delete-by-id/${id}`)
    ).data;
    return response;
}

export const processedSourceService = {
    create,
    readAll,
    readById,
    readAllByUserId,
    deleteById,
};
