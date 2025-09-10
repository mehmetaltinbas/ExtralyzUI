import { useState, type HTMLAttributes, type HtmlHTMLAttributes } from 'react';
import type { Source } from '../types/source.iterface';
import { ClaretButton } from '../../../shared/components/buttons/ClaretButton';
import type React from 'react';
import { sourceService } from '../services/source.service';
import { NavyBlueButton } from '../../../shared/components/buttons/NavyBlueButton';
import { exerciseService } from '../../exercise/services/exercise.service';

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
    async function deleteSource(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const response = await sourceService.deleteById(source._id);
        alert(response.message);
        fetchSources();
    }

    return (
        <div className="h-full flex justify-center items-center">
            <div className="w-[250px] h-[200px] border flex flex-col">
                <div className="w-full h-[50px] flex justify-center items-center gap-1">
                    <p>{source.title}</p>
                    <ClaretButton onClick={deleteSource}>Delete</ClaretButton>
                </div>
                <div className="flex-1 border overflow-auto">
                    <p>{source.rawText}</p>
                </div>
                <div className="w-full h-[50px] flex justify-center items-center">
                    <NavyBlueButton
                        data-source-id={source._id}
                        onClick={toggleCreateExerciseSetForm}
                        className="text-xs"
                    >
                        Generate Exercises
                    </NavyBlueButton>
                </div>
            </div>
        </div>
    );
}
