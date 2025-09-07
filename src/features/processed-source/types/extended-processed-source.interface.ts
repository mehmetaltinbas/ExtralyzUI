import type { ExerciseSet } from "../../exercise-set/types/exercise-set.interface";
import type { ProcessedSource } from "./ProcessedSource";

export interface ExtendedProcessedSource extends ProcessedSource {
    exerciseSets?: ExerciseSet[];
}
