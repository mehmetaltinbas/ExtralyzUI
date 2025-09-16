import type { ResponseBase } from '../../../../shared/types/response-base';
import type { ExerciseSet } from '../exercise-set.interface';

export interface ReadSingleExerciseSetResponse extends ResponseBase {
    exerciseSet?: ExerciseSet;
}
