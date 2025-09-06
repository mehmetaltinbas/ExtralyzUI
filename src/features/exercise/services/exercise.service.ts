import axios from "axios";
import type { ResponseBase } from "../../../shared/types/response-base";
import type { ReadAllExercisesResponse } from "../types/exercise-responses";
import type { CreateMultipleExerciseDto } from "../types/exercise-dtos";

const baseUrl = `${import.meta.env.VITE_API_URL}/exercise`;

async function createMultiple(sourceId: string, createMultipleExerciseDto: CreateMultipleExerciseDto): Promise<ResponseBase> {
    const response = (await axios.post(`${baseUrl}/create-multiple/${sourceId}`, createMultipleExerciseDto, { withCredentials: true })).data;
    return response;
}

async function readAll(): Promise<ReadAllExercisesResponse> {
    const response = (await axios.get(`${baseUrl}/read-all`, { withCredentials: true })).data;
    return response;
}

async function readById() {

}

async function readAllBySourceId() {

}

async function deleteById(id: string): Promise<ResponseBase> {
    const response = (await axios.delete(`${baseUrl}/delete-by-id/${id}`, { withCredentials: true })).data;
    return response;
}

export const exerciseService = {
    createMultiple,
    readAll,
    deleteById
};
