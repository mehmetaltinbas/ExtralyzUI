import { exerciseSetService } from "../../../exercise-set/services/exercise-set.service";
import { exerciseService } from "../../../exercise/services/exercise.service";
import type { PropsBuilderStrategy } from "./props-builder-strategy.interface";

export const ExerciseSetPropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (exerciseSetId, setProps) => {
        const exerciseSetResponse = await exerciseSetService.readById(exerciseSetId);
        const exercisesResponse = await exerciseService.readAllByExerciseSetId(exerciseSetId);
        setProps({
            exerciseSet: exerciseSetResponse.exerciseSet,
            exercises: exercisesResponse.exercises!,
        });
    }
};
