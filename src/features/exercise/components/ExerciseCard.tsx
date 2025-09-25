import type React from 'react';
import { ExerciseType } from '../enums/exercise-types.enum';
import type { Exercise } from '../types/exercise.interface';
import { MCQExerciseCard } from './strategy-components/exercise-card/MCQExerciseCard';
import { TrueFalseExerciseCard } from './strategy-components/exercise-card/TrueFalseExerciseCard';
import { OpenEndedExerciseCard } from './strategy-components/exercise-card/OpenEndedExerciseCard';
import { ShortExerciseCard } from './strategy-components/exercise-card/ShortExerciseCard';
import { ActionMenuButton } from 'src/shared/components/buttons/ActionMenuButton';

export function ExerciseCard({
    exercise,
    isAnswersHidden,
    toggleExerciseActionMenu
}: {
    exercise: Exercise;
    isAnswersHidden: boolean;
    toggleExerciseActionMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, exerciseId: string) => void;
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
        <div
            className={`relative w-[250px] h-[250px] border rounded-[10px] px-4 py-2 overflow-y-auto`}
        >
            <div className='absolute top-1 right-1'>
                <ActionMenuButton onClick={event => toggleExerciseActionMenu(event, exercise._id)} />
            </div>
            {Component && <Component exercise={exercise} isAnswersHidden={isAnswersHidden} />}
        </div>
    );
}
