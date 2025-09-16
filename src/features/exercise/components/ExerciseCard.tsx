import type React from 'react';
import { ExerciseType } from '../enums/exercise-types.enum';
import type { Exercise } from '../types/exercise.interface';
import { MCQExerciseCard } from './strategy-components/exercise-card-type/MCQExerciseCard';
import { TrueFalseExerciseCard } from './strategy-components/exercise-card-type/TrueFalseExerciseCard';
import { OpenEndedExerciseCard } from './strategy-components/exercise-card-type/OpenEndedExerciseCard';
import { ShortExerciseCard } from './strategy-components/exercise-card-type/ShortExerciseCard';

export function ExerciseCard({
    exercise,
    isAnswersHidden,
}: {
    exercise: Exercise;
    isAnswersHidden: boolean;
}) {
    const componentsMap: Map<
        ExerciseType,
        React.ComponentType<{ exercise: Exercise; isAnswersHidden: boolean }>
    > = new Map([
        [ExerciseType.MCQ, MCQExerciseCard],
        [ExerciseType.TRUE_FALSE, TrueFalseExerciseCard],
        [ExerciseType.OPEN_ENDED, OpenEndedExerciseCard],
        [ExerciseType.SHORT, ShortExerciseCard],
    ]);
    const Component = componentsMap.get(exercise.type as ExerciseType);

    return (
        <div className={`w-[250px] h-[250px] border rounded-[10px] p-2 overflow-y-auto`}>
            {Component && <Component exercise={exercise} isAnswersHidden={isAnswersHidden} />}
        </div>
    );
}
