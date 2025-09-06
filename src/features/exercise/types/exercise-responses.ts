import type { ResponseBase } from "../../../shared/types/response-base";
import type { Exercise } from "./Exercise";

export interface ReadAllExercisesResponse extends ResponseBase {
    exercises?: Exercise[];
}