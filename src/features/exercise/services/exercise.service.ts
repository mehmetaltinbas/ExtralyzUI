import { axiosInstance } from 'src/shared/api/axiosInstance'; 
import type { ResponseBase } from '../../../shared/types/response-base';
import type { ReadAllExercisesResponse } from '../types/response/read-all-exercises.response';

const baseUrl = `/exercise`;

async function readAll(): Promise<ReadAllExercisesResponse> {
    const response = (await axiosInstance.get(`${baseUrl}/read-all`)).data;
    return response;
}

async function readById() {}

async function readAllByExerciseSetId(
    exerciseSetId: string
): Promise<ReadAllExercisesResponse> {
    const response = (
        await axiosInstance.get(`${baseUrl}/read-all-by-exercise-set-id/${exerciseSetId}`,)
    ).data;
    return response;
}

async function deleteById(id: string): Promise<ResponseBase> {
    const response = (
        await axiosInstance.delete(`${baseUrl}/delete-by-id/${id}`)
    ).data;
    return response;
}

export const exerciseService = {
    readAll,
    readById,
    readAllByExerciseSetId,
    deleteById,
};
