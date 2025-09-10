import type { ExerciseSet } from '../../exercise-set/types/exercise-set.interface';
import type { ProcessedSource } from './processed-source.interface';

export interface ExtendedProcessedSource extends ProcessedSource {
    exerciseSets?: ExerciseSet[];
}
