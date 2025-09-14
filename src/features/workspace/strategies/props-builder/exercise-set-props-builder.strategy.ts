import { exerciseSetService } from "../../../exercise-set/services/exercise-set.service";
import { exerciseService } from "../../../exercise/services/exercise.service";
import type { PropsBuilderStrategy } from "./props-builder-strategy.interface";

export const ExerciseSetPropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (id) => {
        const exerciseSetResponse = await exerciseSetService.readById(id);
        const exercisesResponse = await exerciseService.readAllByExerciseSetId(id);
        return {
            exerciseSet: exerciseSetResponse.exerciseSet,
            exercises: exercisesResponse.exercises!,
        };
    }
};
