import axios from 'axios';
import type { ResponseBase } from '../../../shared/types/response-base';
import type { ReadAllExercisesResponse } from '../types/response/read-all-exercises.response';

const baseUrl = `${import.meta.env.VITE_API_URL}/exercise`;

async function readAll(): Promise<ReadAllExercisesResponse> {
    const response = (await axios.get(`${baseUrl}/read-all`, { withCredentials: true })).data;
    return response;
}

async function readById() {}

async function readAllBySourceId() {}

async function deleteById(id: string): Promise<ResponseBase> {
    const response = (
        await axios.delete(`${baseUrl}/delete-by-id/${id}`, { withCredentials: true })
    ).data;
    return response;
}

export const exerciseService = {
    readAll,
    deleteById,
};
