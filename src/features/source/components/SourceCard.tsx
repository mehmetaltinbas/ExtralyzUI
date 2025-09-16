import { useState, type HTMLAttributes, type HtmlHTMLAttributes } from 'react';
import type React from 'react';
import { openTab } from 'src/features/workspace/features/tabs/utilities/openTab.utility';
import { Section } from 'src/features/workspace/enums/sections.enum';
import { sourceService } from 'src/features/source/services/source.service';
import { useAppDispatch } from 'src/store/hooks';
import type { Source } from 'src/features/source/types/source.iterface';
import { NavyBlueButton } from 'src/shared/components/buttons/NavyBlueButton';
import { ClaretButton } from 'src/shared/components/buttons/ClaretButton';

export function SourceCard({
    source,
    fetchSources,
    toggleCreateExerciseSetForm,
}: {
    source: Source;
    fetchSources: () => void;
    toggleCreateExerciseSetForm: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}) {
    const dispatch = useAppDispatch();

    async function deleteSource(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const response = await sourceService.deleteById(source._id);
        alert(response.message);
        fetchSources();
    }

    return (
        <div
            onClick={(event) => openTab(dispatch, { section: Section.SOURCE, id: source._id, title: source.title })}
            className="w-[250px] h-[200px] border cursor-pointer rounded-[10px]
            flex flex-col justify-center items-center
            hover:bg-gray-100"
        >
            <div className="w-full h-[50px] flex justify-center items-center gap-1">
                <p>{source.title}</p>
                <ClaretButton
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteSource(event);
                    }}
                >
                    Delete
                </ClaretButton>
            </div>
            <div className="flex-1 border overflow-auto">
                <p>{source.rawText}</p>
            </div>
            <div className="w-full h-[50px] flex justify-center items-center">
                <NavyBlueButton
                    data-source-id={source._id}
                    onClick={(event) => {
                        event.stopPropagation();
                        toggleCreateExerciseSetForm(event);
                    }}
                    className="text-xs"
                >
                    Generate Exercises
                </NavyBlueButton>
            </div>
        </div>
    );
}
