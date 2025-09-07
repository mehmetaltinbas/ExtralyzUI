import type { Source } from "./Source";
import type { ExerciseSet } from "../../exercise-set/types/exercise-set.interface";
import type { ExtendedProcessedSource } from "../../processed-source/types/extended-processed-source.interface";

export interface ExtendedSource extends Source {
    processedSources?: ExtendedProcessedSource[];
    exerciseSets?: ExerciseSet[];
}
