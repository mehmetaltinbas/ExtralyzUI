import type React from 'react';
import { ExerciseTypes } from '../enums/exercise-types.enum';
import type { Exercise } from '../types/exercise.interface';
import { MCQExerciseCard } from './strategy-components/exercise-type/MCQExerciseCard';
import { TrueFalseExerciseCard } from './strategy-components/exercise-type/TrueFalseExerciseCard';
import { OpenEndedExerciseCard } from './strategy-components/exercise-type/OpenEndedExerciseCard';
import { ShortExerciseCard } from './strategy-components/exercise-type/ShortExerciseCard';

export function ExerciseCard({
    exercise,
    isAnswersHidden,
}: {
    exercise: Exercise;
    isAnswersHidden: boolean;
}) {
    const componentsMap: Map<ExerciseTypes, React.ComponentType<{ exercise: Exercise, isAnswersHidden: boolean }>> = new Map([
        [ExerciseTypes.MCQ, MCQExerciseCard],
        [ExerciseTypes.TRUE_FALSE, TrueFalseExerciseCard],
        [ExerciseTypes.OPEN_ENDED, OpenEndedExerciseCard],
        [ExerciseTypes.SHORT, ShortExerciseCard]
    ]);
    const Component = componentsMap.get(exercise.type as ExerciseTypes);

    return (
        <div className={`w-[250px] h-[250px] border rounded-[10px] p-2 overflow-y-auto`}>
            {Component && <Component exercise={exercise} isAnswersHidden={isAnswersHidden}/>}
        </div>
    );
}
