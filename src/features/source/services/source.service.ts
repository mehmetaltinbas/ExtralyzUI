import axios from 'axios';
import type { ReadAllSourcesResponse } from '../types/response/read-all-sources.response';
import type { ResponseBase } from '../../../shared/types/response-base';
import type { ReadSingleSourceResponse } from '../types/response/read-single-source.response';

const baseUrl = `${import.meta.env.VITE_API_URL}/source`;

async function create(formData: FormData): Promise<ResponseBase> {
    const response = (
        await axios.post(`${baseUrl}/create`, formData, { withCredentials: true })
    ).data;
    return response;
}

async function readAll(): Promise<ReadAllSourcesResponse> {
    const response = (await axios.get(`${baseUrl}/read-all`, { withCredentials: true })).data;
    return response;
}

async function readById(id: string): Promise<ReadSingleSourceResponse> {
    const response = (await axios.get(`${baseUrl}/read-by-id/${id}`, { withCredentials: true })).data;
    return response;
}

async function readAllByUserId(): Promise<ReadAllSourcesResponse> {
    const response = (await axios.get(`${baseUrl}/read-all-by-user-id`, { withCredentials: true })).data;
    return response;
}

async function deleteById(id: string): Promise<ResponseBase> {
    const response = (
        await axios.delete(`${baseUrl}/delete-by-id/${id}`, { withCredentials: true })
    ).data;
    return response;
}

export const sourceService = {
    create,
    readAll,
    readById,
    readAllByUserId,
    deleteById,
};
