import { exerciseSetService } from "../../../exercise-set/services/exercise-set.service";
import { exerciseService } from "../../../exercise/services/exercise.service";
import type { PropsBuilderStrategy } from "./props-builder-strategy.interface";

export const ExerciseSetPropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (tab) => {
        const exerciseSetResponse = await exerciseSetService.readById(tab.id!);
        const exercisesResponse = await exerciseService.readAllByExerciseSetId(tab.id!);
        return {
            exerciseSet: exerciseSetResponse.exerciseSet,
            exercises: exercisesResponse.exercises!,
        };
    }
};
