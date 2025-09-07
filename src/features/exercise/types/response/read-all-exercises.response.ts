import type { ResponseBase } from "../../../../shared/types/response-base";
import type { Exercise } from "../exercise.interface";

export interface ReadAllExercisesResponse extends ResponseBase {
    exercises?: Exercise[];
}
