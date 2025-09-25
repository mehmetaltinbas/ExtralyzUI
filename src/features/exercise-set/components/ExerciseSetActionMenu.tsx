import type React from "react";
import { useState } from "react";
import { ExerciseSetMode } from "src/features/exercise-set/enums/ExerciseSetMode.enum";
import type { CreateExerciseSetDto } from "src/features/exercise-set/types/dto/create-exercise-set.dto";
import type { ExerciseSet } from "src/features/exercise-set/types/exercise-set.interface";
import { sourceService } from "src/features/source/services/source.service";
import type { Source } from "src/features/source/types/source.iterface";
import { Section } from "src/features/workspace/enums/sections.enum";
import { openTab } from "src/features/workspace/features/tabs/utilities/openTab.utility";
import { BlackButton } from "src/shared/components/buttons/BlackButton";
import { ClaretButton } from "src/shared/components/buttons/ClaretButton";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

export function ExerciseSetActionMenu({ isHidden, setIsHidden, exerciseSet, fetchExerciseSets, toggleDeleteApproval }: {
    isHidden: boolean;
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
    exerciseSet?: ExerciseSet;
    fetchExerciseSets: () => void;
    toggleDeleteApproval: (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void;
}) {
    const dispatch = useAppDispatch();

    return (
        <div id="exercise-set-action-menu"
            className={`absolute border p-2 bg-white rounded-[10px] shadow-md z-10
            flex flex-col justify-center items-center gap-2
            ${isHidden && 'hidden'}`}
        >
            {exerciseSet && (
                <>
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
                        onClick={(event) => {
                            event.stopPropagation();
                            toggleDeleteApproval(event);
                            setIsHidden(prev => !prev);
                            fetchExerciseSets();
                        }}
                    >
                        Delete
                    </ClaretButton>
                </>
            )}
        </div>
    );
}
