import type { ExerciseSet } from '../types/exercise-set.interface';
import { ExerciseCard } from '../../exercise/components/ExerciseCard';
import type { Exercise } from '../../exercise/types/exercise.interface';
import { useEffect, useState } from 'react';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';
import { ExerciseSetMode } from 'src/features/exercise-set/enums/ExerciseSetMode.enum';
import { Section } from 'src/features/workspace/enums/sections.enum';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { openTab } from 'src/features/workspace/features/tabs/utilities/openTab.utility';
import { ClaretButton } from 'src/shared/components/buttons/ClaretButton';
import { exerciseSetService } from 'src/features/exercise-set/services/exercise-set.service';
import { tabsActions } from 'src/features/workspace/features/tabs/store/tabsSlice';
import { BodyOverlay } from 'src/shared/components/BodyOverlay';
import { BodyPopUp } from 'src/shared/components/BodyPopUp';
import { DeleteApproval } from 'src/shared/components/DeleteApproval';

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
    const [isPopUpActive, setIsPopUpActive] = useState<boolean>(false);
    const [isDeleteApprovalHidden, setIsDeleteApprovalHidden] = useState<boolean>(true);

    function toggleAnswerVisibility() {
        setIsAnswersHidden((prev) => !prev);
    }

    function toggleDeleteApproval() {
        console.log("hit");
        console.log(isPopUpActive);
        setIsPopUpActive(prev => !prev);
        setIsDeleteApprovalHidden(prev => !prev);
    }

    async function deleteExerciseSet() {
        const response = await exerciseSetService.deleteById(exerciseSet!._id!);
        alert(response.message);
        dispatch(tabsActions.subtract(tabs.activeTabIndex));
    }

    return exerciseSet && exercises ? (
        <div className={`relative w-full h-full ${className ?? ''}`}>

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
                        onClick={toggleDeleteApproval}
                    >
                        Delete Exercise Set
                    </ClaretButton>
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

            <BodyOverlay isPopUpActive={isPopUpActive} />
            <BodyPopUp 
                isPopUpActive={isPopUpActive}
                components={[
                    <DeleteApproval
                        isHidden={isDeleteApprovalHidden}
                        toggle={toggleDeleteApproval}
                        onDelete={deleteExerciseSet}
                    />
                ]}
            />

        </div>
    ) : <div className={`${className ?? ''}`}>undefined</div>;
}
