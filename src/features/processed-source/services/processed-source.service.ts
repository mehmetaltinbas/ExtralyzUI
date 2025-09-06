import axios from "axios";
import type { ResponseBase } from "../../../shared/types/response-base";
import type { ReadAllProcessedSourcesResponse } from "../types/processed-source-responses";

const baseUrl = `${import.meta.env.VITE_API_URL}/processed-source`;

async function create(formData: FormData): Promise<ResponseBase> {
    const response = (await axios.post(`${baseUrl}/create`, formData, { withCredentials: true })).data;
    return response;
}

async function readAll(): Promise<ReadAllProcessedSourcesResponse> {
    const response = (await axios.get(`${baseUrl}/read-all`, { withCredentials: true })).data;
    return response;
}

async function deleteById(id: string): Promise<ResponseBase> {
    const response = (await axios.delete(`${baseUrl}/delete-by-id/${id}`, { withCredentials: true })).data;
    return response;
}

export const processedSourceService = {
    create,
    readAll,
    deleteById,
};
