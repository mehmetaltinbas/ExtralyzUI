import { axiosInstance } from 'src/shared/api/axiosInstance'; 
import type { ResponseBase } from '../../../shared/types/response-base';
import type { ReadAllProcessedSourcesResponse } from '../types/response/read-all-processed-sources.response';
import type { ReadSingleProcessedSourceResponse } from '../types/response/read-single-processed-source.response';
import type { CreateProcessedSourceDto } from 'src/features/processed-source/types/dto/CreateProcessedSourceDto';

const baseUrl = `/processed-source`;

async function createBySourceId(sourceId: string, createProcessedSourceDto: CreateProcessedSourceDto): Promise<ResponseBase> {
    const response = (
        await axiosInstance.post(`${baseUrl}/create-by-source-id/${sourceId}`, createProcessedSourceDto)
    ).data;
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
    createBySourceId,
    readById,
    readAllByUserId,
    deleteById,
};
