import type { ProcessedSource } from '../types/processed-source.interface';
import { ClaretButton } from '../../../shared/components/buttons/ClaretButton';
import { processedSourceService } from '../services/processed-source.service';
import type React from 'react';
import { Sections } from '../../workspace/enums/sections.enum';
import { tabsActions, type TabsStateElement } from '../../workspace/store/tabsSlice';
import { useAppDispatch } from '../../../store/hooks';

export function ProcessedSourceCard({
    processedSource,
    fetchProcessedSources,
}: {
    processedSource: ProcessedSource;
    fetchProcessedSources: () => void;
}) {
    const dispatch = useAppDispatch();

    async function deleteProcessedSource(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        const response = await processedSourceService.deleteById(processedSource._id);
        alert(response.message);
        fetchProcessedSources();
    }

    function openTab(event: React.MouseEvent<HTMLDivElement>) {
        const section = Sections.PROCESSED_SOURCE;
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
            data-element={JSON.stringify({ id: processedSource._id, title: processedSource.title})}
            className="w-[250px] h-[150px] border cursor-pointer rounded-[10px]
            flex flex-col justify-center items-center
            hover:bg-gray-100"
        >
            <div className="w-full h-[40px] p-2 
                flex justify-center items-center gap-1"
            >
                <p className='px-2 truncate'>{processedSource.title ? processedSource.title : processedSource._id}</p>
                <ClaretButton onClick={event => { event.stopPropagation(); deleteProcessedSource(event); }}>Delete</ClaretButton>
            </div>
            <span className='w-full border-t'></span>
            <div className="flex-1 overflow-y-scroll">
                <p>{processedSource.processedText}</p>
            </div>
        </div>
    );
}
