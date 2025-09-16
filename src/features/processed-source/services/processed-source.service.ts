import axios from 'axios';
import type { ResponseBase } from '../../../shared/types/response-base';
import type { ReadAllProcessedSourcesResponse } from '../types/response/read-all-processed-sources.response';
import type { ReadSingleProcessedSourceResponse } from '../types/response/read-single-processed-source.response';

const baseUrl = `${import.meta.env.VITE_API_URL}/processed-source`;

async function create(formData: FormData): Promise<ResponseBase> {
    const response = (
        await axios.post(`${baseUrl}/create`, formData, { withCredentials: true })
    ).data;
    return response;
}

async function readAll(): Promise<ReadAllProcessedSourcesResponse> {
    const response = (await axios.get(`${baseUrl}/read-all`, { withCredentials: true })).data;
    return response;
}

async function readById(id: string): Promise<ReadSingleProcessedSourceResponse> {
    const response = (
        await axios.get(`${baseUrl}/read-by-id/${id}`, { withCredentials: true })
    ).data;
    return response;
}

async function readAllByUserId(): Promise<ReadAllProcessedSourcesResponse> {
    const response = (
        await axios.get(`${baseUrl}/read-all-by-user-id`, { withCredentials: true })
    ).data;
    return response;
}

async function deleteById(id: string): Promise<ResponseBase> {
    const response = (
        await axios.delete(`${baseUrl}/delete-by-id/${id}`, { withCredentials: true })
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
