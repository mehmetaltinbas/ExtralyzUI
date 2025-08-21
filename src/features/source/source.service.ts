import axios from "axios";
import type { ReadAllSourcesResponse } from "./types/source-responses";
import type { ResponseBase } from "../../shared/types/response-base";

const baseUrl = `${import.meta.env.VITE_API_URL}/source`;

async function create(formData: FormData): Promise<ResponseBase> {
    const response = (await axios.post(`${baseUrl}/create`, formData, { withCredentials: true })).data;
    return response;
}

async function readAll(): Promise<ReadAllSourcesResponse> {
    const response = (await axios.get(`${baseUrl}/read-all`, { withCredentials: true })).data;
    return response;
}

async function deleteById(id: string): Promise<ResponseBase> {
    const response = (await axios.delete(`${baseUrl}/delete-by-id/${id}`, { withCredentials: true })).data;
    return response;
}

export const sourceService = {
    create,
    readAll,
    deleteById,
};
