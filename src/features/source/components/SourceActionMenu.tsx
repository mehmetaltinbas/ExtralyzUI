import type React from 'react';
import { BlackButton } from 'src/shared/components/buttons/BlackButton';
import { ClaretButton } from 'src/shared/components/buttons/ClaretButton';

export function SourceActionMenu({
    isHidden,
    setIsHidden,
    sourceId,
    fetchSources,
    toggleCreateExerciseSetForm,
    toggleProcessSourceForm,
    toggleDeleteApproval,
}: {
    isHidden: boolean;
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
    sourceId?: string;
    fetchSources: () => void;
    toggleCreateExerciseSetForm: () => void;
    toggleProcessSourceForm: () => void;
    toggleDeleteApproval: () => void;
}) {
    return (
        <div
            id="source-action-menu"
            className={`absolute border p-2 bg-white rounded-[10px] shadow-md z-10
            flex flex-col justify-center items-center gap-2
            ${isHidden && 'hidden'}`}
        >
            {sourceId && (
                <>
                    <BlackButton
                        onClick={(event) => {
                            event.stopPropagation();
                            toggleProcessSourceForm();
                            setIsHidden((prev) => !prev);
                        }}
                    >
                        Process
                    </BlackButton>
                    <BlackButton
                        onClick={(event) => {
                            event.stopPropagation();
                            toggleCreateExerciseSetForm();
                            setIsHidden((prev) => !prev);
                        }}
                        className="text-xs"
                    >
                        Generate Exercises
                    </BlackButton>
                    <ClaretButton
                        onClick={(event) => {
                            event.stopPropagation();
                            toggleDeleteApproval();
                            setIsHidden((prev) => !prev);
                        }}
                    >
                        Delete
                    </ClaretButton>
                </>
            )}
        </div>
    );
}
