import type { ExerciseSet } from '../types/exercise-set.interface';
import { ExerciseCard } from '../../exercise/components/ExerciseCard';
import type { Exercise } from '../../exercise/types/exercise.interface';
import React, { useEffect, useState } from 'react';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';
import { ExerciseSetMode } from 'src/features/exercise-set/enums/ExerciseSetMode.enum';
import { Section } from 'src/features/workspace/enums/sections.enum';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { openTab } from 'src/features/workspace/features/tabs/utilities/openTab.utility';
import { ClaretButton } from 'src/shared/components/buttons/ClaretButton';
import { exerciseSetService } from 'src/features/exercise-set/services/exercise-set.service';
import { tabsActions } from 'src/features/workspace/features/tabs/store/tabsSlice';
import { BodyModal } from 'src/shared/components/BodyModal';
import { DeleteApproval } from 'src/shared/components/DeleteApproval';
import { ExerciseActionMenu } from 'src/features/exercise/components/ExerciseActionMenu';
import { exerciseService } from 'src/features/exercise/services/exercise.service';

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
    const tabs = useAppSelector(state => state.tabs);
    const [isAnswersHidden, setIsAnswersHidden] = useState<boolean>(true);
    const [actionMenuExerciseId, setActionMenuExerciseId] = useState<string>('');
    const [isExerciseActionMenuHidden, setIsExerciseActionMenuHidden] = useState<boolean>(true);
    const [isPopUpActive, setIsPopUpActive] = useState<boolean>(false);
    const [isExerciseSetDeleteApprovalHidden, setIsExerciseSetDeleteApprovalHidden] = useState<boolean>(true);
    const [isExerciseDeleteApprovalHidden, setIsExerciseDeleteApprovalHidden] = useState<boolean>(true);

    function toggleExerciseActionMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, exerciseId: string) {
        event.stopPropagation();
        const exerciseActionMenu = document.getElementById('exercise-action-menu');
        const container = document.getElementById('exercise-set-page-container');
        if (exerciseActionMenu && container) {
            const containerRect = container?.getBoundingClientRect();
            const positionOfButton = event.currentTarget.getBoundingClientRect();
            exerciseActionMenu.style.top = `${positionOfButton.bottom - containerRect?.top}px`;
            exerciseActionMenu.style.left = `${positionOfButton.right - containerRect?.left}px`;
            setActionMenuExerciseId(exerciseId);
            setIsExerciseActionMenuHidden((prev) => !prev);
        }
    }

    function toggleAnswerVisibility() {
        setIsAnswersHidden((prev) => !prev);
    }

    function toggleExerciseSetDeleteApproval() {
        setIsPopUpActive(prev => !prev);
        setIsExerciseSetDeleteApprovalHidden(prev => !prev);
    }
    
    function toggleExerciseDeleteApproval() {
        setIsPopUpActive(prev => !prev);
        setIsExerciseDeleteApprovalHidden(prev => !prev);
    }

    async function deleteExerciseSet() {
        const response = await exerciseSetService.deleteById(exerciseSet!._id!);
        alert(response.message);
        dispatch(tabsActions.subtract(tabs.activeTabIndex));
    }

    async function deleteExercise() {
        const response = await exerciseService.deleteById(actionMenuExerciseId);
        alert(response.message);
    }

    return exerciseSet && exercises ? (
        <div id='exercise-set-page-container'
            className={`relative w-full h-full ${className ?? ''}`}
        >

            <ExerciseActionMenu
                isHidden={isExerciseActionMenuHidden}
                setIsHidden={setIsExerciseActionMenuHidden}
                exerciseId={actionMenuExerciseId}
                toggleDeleteApproval={toggleExerciseDeleteApproval}
            />

            <div // main
                className="absolute w-full h-full
                flex flex-col justify-start items-start gap-4
                p-4"
            >
                <div
                    className="w-full h-auto
                    flex flex-col justif-center items-start gap-2"
                >
                    <p>Type: {exerciseSet.type}</p>
                    <p>Count: {exerciseSet.count}</p>
                    <p>Difficulty: {exerciseSet.difficulty}</p>
                    <BlackButton onClick={toggleAnswerVisibility}>
                        {isAnswersHidden ? 'Show Answers' : 'Hide Answers'}
                    </BlackButton>
                    <BlackButton
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
                    </BlackButton>
                    <ClaretButton
                        onClick={toggleExerciseSetDeleteApproval}
                    >
                        Delete Exercise Set
                    </ClaretButton>
                </div>
                <div
                    className="w-full h-full
                    grid grid-cols-3 gap-4"
                >
                    {exercises.map((exercise) => (
                        <ExerciseCard 
                            exercise={exercise} 
                            isAnswersHidden={isAnswersHidden} 
                            toggleExerciseActionMenu={toggleExerciseActionMenu}
                        />
                    ))}
                </div>
            </div>

            <BodyModal 
                isPopUpActive={isPopUpActive}
                components={[
                    <DeleteApproval
                        isHidden={isExerciseSetDeleteApprovalHidden}
                        toggle={toggleExerciseSetDeleteApproval}
                        onDelete={deleteExerciseSet}
                    />,
                    <DeleteApproval
                        isHidden={isExerciseDeleteApprovalHidden}
                        toggle={toggleExerciseDeleteApproval}
                        onDelete={deleteExercise}
                    />
                ]}
            />

        </div>
    ) : <div className={`${className ?? ''}`}>undefined</div>;
}
