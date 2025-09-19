import type React from "react";
import { useState } from "react";
import type { CreateExerciseSetDto } from "src/features/exercise-set/types/dto/create-exercise-set.dto";
import { sourceService } from "src/features/source/services/source.service";
import type { Source } from "src/features/source/types/source.iterface";
import { BlackButton } from "src/shared/components/buttons/BlackButton";
import { ClaretButton } from "src/shared/components/buttons/ClaretButton";

export function SourceActionMenu({ isHidden, setIsHidden, sourceId, fetchSources, toggleCreateExerciseSetForm, toggleProcessSourceForm }: {
    isHidden: boolean;
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
    sourceId?: string;
    fetchSources: () => void;
    toggleCreateExerciseSetForm: (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void;
    toggleProcessSourceForm: (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void;
}) {

    async function deleteSource(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const response = await sourceService.deleteById(sourceId!);
        alert(response.message);
        fetchSources();
    }

    return (
        <div id="sourceActionMenu"
            className={`absolute border p-2 bg-white rounded-[10px] shadow-md
            flex flex-col justify-center items-center gap-2
            ${isHidden && 'hidden'}`}
        >
            {sourceId && (
                <>
                <BlackButton
                    onClick={event => {
                        event.stopPropagation();
                        toggleProcessSourceForm(event);
                        setIsHidden(prev => !prev);
                    }}
                >
                    Process
                </BlackButton>
                <BlackButton
                    onClick={(event) => {
                        event.stopPropagation();
                        toggleCreateExerciseSetForm(event);
                        setIsHidden(prev => !prev);
                    }}
                    className="text-xs"
                >
                    Generate Exercises
                </BlackButton>
                <ClaretButton
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteSource(event);
                        setIsHidden(prev => !prev);
                    }}
                >
                    Delete
                </ClaretButton>
                </>
            )}
        </div>
    );
}
