import type { Exercise } from "src/features/exercise/types/exercise.interface";

export interface EvaluateAnswersDto {
    exercises: {
        id: string;
        answer?: string;
    }[];
}
