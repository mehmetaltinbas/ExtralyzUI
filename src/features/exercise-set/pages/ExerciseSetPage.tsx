import type { ExerciseSet } from '../types/exercise-set.interface';
import { ExerciseCard } from '../../exercise/components/ExerciseCard';
import type { Exercise } from '../../exercise/types/exercise.interface';
import { useEffect, useState } from 'react';
import { NavyBlueButton } from '../../../shared/components/buttons/NavyBlueButton';
import { ExerciseSetMode } from 'src/features/exercise-set/enums/ExerciseSetMode.enum';
import { Section } from 'src/features/workspace/enums/sections.enum';
import { useAppDispatch } from 'src/store/hooks';
import { openTab } from 'src/features/workspace/features/tabs/utilities/openTab.utility';

export function ExerciseSetPage({
    exerciseSet,
    exercises,
    className,
}: {
    exerciseSet?: ExerciseSet;
    exercises?: Exercise[];
    className?: string;
}) {
    const dispatch = useAppDispatch();
    const [isAnswersHidden, setIsAnswersHidden] = useState<boolean>(true);

    function toggleAnswerVisibility() {
        setIsAnswersHidden((prev) => !prev);
    }

    return exerciseSet && exercises ? (
        <div
            className={`w-full h-full
            flex flex-col justify-start items-start gap-4
            p-4
            ${className ?? ''}
        `}
        >
            <div
                className="w-full h-auto
                flex flex-col justif-center items-start gap-2"
            >
                <p>Type: {exerciseSet.type}</p>
                <p>Count: {exerciseSet.count}</p>
                <p>Difficulty: {exerciseSet.difficulty}</p>
                <NavyBlueButton onClick={toggleAnswerVisibility}>
                    {isAnswersHidden ? 'Show Answers' : 'Hide Answers'}
                </NavyBlueButton>
                <NavyBlueButton
                    onClick={(event) => {
                        event.stopPropagation();
                        openTab(dispatch, {
                            section: Section.EXERCISE_SET_PRACTICE,
                            id: exerciseSet._id,
                            title: exerciseSet.title,
                            mode: ExerciseSetMode.PRACTICE
                        });
                    }
                    }
                >
                    Start Practice
                </NavyBlueButton>
            </div>
            <div
                className="w-full h-full
                grid grid-cols-3 gap-4"
            >
                {exercises.map((exercise) => (
                    <ExerciseCard exercise={exercise} isAnswersHidden={isAnswersHidden} />
                ))}
            </div>
        </div>
    ) : <div className={`${className ?? ''}`}>undefined</div>;
}
