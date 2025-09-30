import type { ResponseBase } from '../../../../shared/types/response-base';
import type { ExtendedSource } from '../../../source/types/extended-source.interface';

export interface ReadAllExerciseSetsGroupedBySources extends ResponseBase {
    sources?: ExtendedSource[];
}
