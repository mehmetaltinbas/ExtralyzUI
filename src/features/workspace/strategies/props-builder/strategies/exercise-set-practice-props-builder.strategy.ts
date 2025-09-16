import { exerciseSetService } from 'src/features/exercise-set/services/exercise-set.service';
import type { PropsBuilderStrategy } from '../props-builder-strategy.interface';
import { exerciseService } from 'src/features/exercise/services/exercise.service';

export const ExerciseSetPracticePropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (tab) => {
        const exerciseSetResponse = await exerciseSetService.readById(tab.id!);
        const exercisesResponse = await exerciseService.readAllByExerciseSetId(tab.id!);
        return {
            exerciseSet: exerciseSetResponse.exerciseSet,
            exercises: exercisesResponse.exercises!,
        };;
    },
};
