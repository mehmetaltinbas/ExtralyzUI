import { useState, type HTMLAttributes, type HtmlHTMLAttributes } from 'react';
import type { Source } from '../types/source.iterface';
import { ClaretButton } from '../../../shared/components/buttons/ClaretButton';
import type React from 'react';
import { sourceService } from '../services/source.service';
import { NavyBlueButton } from '../../../shared/components/buttons/NavyBlueButton';
import { exerciseService } from '../../exercise/services/exercise.service';
import { useAppDispatch } from '../../../store/hooks';
import { tabsActions, type TabsStateElement } from '../../workspace/store/tabsSlice';
import { Sections } from '../../workspace/enums/sections.enum';

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

    function openTab(event: React.MouseEvent<HTMLDivElement>) {
        const section = Sections.SOURCE;
        const datasetElement = event.currentTarget.dataset.element;
        if (datasetElement) {
            const element = JSON.parse(datasetElement) as TabsStateElement;
            dispatch(tabsActions.addByIndex({ element: { section, id: element.id, title: element.title } }));
        } else if (!datasetElement) {
            dispatch(tabsActions.addByIndex({ element: { section } }));
        }
    }

    return (
        <div 
            onClick={openTab}
            data-element={JSON.stringify({ id: source._id, title: source.title })}
            className="w-[250px] h-[200px] border cursor-pointer rounded-[10px]
            flex flex-col justify-center items-center
            hover:bg-gray-100"
        >
            <div className="w-full h-[50px] flex justify-center items-center gap-1">
                <p>{source.title}</p>
                <ClaretButton onClick={event => { event.stopPropagation(); deleteSource(event); }}>Delete</ClaretButton>
            </div>
            <div className="flex-1 border overflow-auto">
                <p>{source.rawText}</p>
            </div>
            <div className="w-full h-[50px] flex justify-center items-center">
                <NavyBlueButton
                    data-source-id={source._id}
                    onClick={event => { event.stopPropagation(); toggleCreateExerciseSetForm(event); }}
                    className="text-xs"
                >
                    Generate Exercises
                </NavyBlueButton>
            </div>
        </div>
    );
}
