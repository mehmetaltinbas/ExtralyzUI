import axios from 'axios';
import type { ResponseBase } from '../../../shared/types/response-base';
import type { CreateExerciseSetDto } from '../types/dto/create-exercise-set.dto';
import type { ReadAllExerciseSetsResponse } from '../types/response/read-all-exercise-sets.response';
import type { ReadAllExerciseSetsGroupedBySources } from '../types/response/read-all-exerise-sets-grouped-by-sources.response';
import type { ReadSingleExerciseSetResponse } from '../types/response/read-single-exercise-set.response';
import type { EvaluateAnswersDto } from 'src/features/exercise-set/types/dto/evaluate-answers.dto';
import type { EvaluateAnswersResponse } from 'src/features/exercise-set/types/response/evaluate-answers.response';

const baseUrl = `${import.meta.env.VITE_API_URL}/exercise-set`;

async function create(
    sourceId: string,
    createExerciseSetDto: CreateExerciseSetDto
): Promise<ResponseBase> {
    const response = (
        await axios.post(`${baseUrl}/create/${sourceId}`, createExerciseSetDto, {
            withCredentials: true,
        })
    ).data;
    return response;
}

async function readById(id: string): Promise<ReadSingleExerciseSetResponse> {
    const response = (
        await axios.get(`${baseUrl}/read-by-id/${id}`, { withCredentials: true })
    ).data;
    return response;
}

async function readAllByUserId(): Promise<ReadAllExerciseSetsResponse> {
    const response = (
        await axios.get(`${baseUrl}/read-all-by-user-id`, { withCredentials: true })
    ).data;
    return response;
}

async function readAllByUserIdGroupedBySources(): Promise<ReadAllExerciseSetsGroupedBySources> {
    const response = (
        await axios.get(`${baseUrl}/read-all-by-user-id-grouped-by-sources`, {
            withCredentials: true,
        })
    ).data;
    return response;
}

async function evaluateAnswers(evaluateAnswersDto: EvaluateAnswersDto): Promise<EvaluateAnswersResponse> {
    const response = (
        await axios.post(`${baseUrl}/evaluate-answers`, evaluateAnswersDto, {
            withCredentials: true,
        })
    ).data;
    return response;
}

export const exerciseSetService = {
    create,
    readById,
    readAllByUserId,
    readAllByUserIdGroupedBySources,
    evaluateAnswers
};
