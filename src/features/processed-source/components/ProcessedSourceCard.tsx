import type { ProcessedSource } from '../types/ProcessedSource';
import { ClaretButton } from '../../../shared/components/buttons/ClaretButton';
import { processedSourceService } from '../services/processed-source.service';
import type React from 'react';

export function ProcessedSourceCard({
    processedSource,
    fetchProcessedSources,
}: {
    processedSource: ProcessedSource;
    fetchProcessedSources: () => void;
}) {
    async function deleteProcessedSource(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        const response = await processedSourceService.deleteById(processedSource._id);
        alert(response.message);
        fetchProcessedSources();
    }

    return (
        <div className="h-full flex justify-center items-center">
            <div className="w-[250px] h-[150px] border flex flex-col">
                <div className="w-full h-[50px] flex justify-center items-center gap-1">
                    <p>{processedSource.title}</p>
                    <ClaretButton onClick={deleteProcessedSource}>Delete</ClaretButton>
                </div>
                <div className="flex-1 border overflow-auto">
                    <p>{processedSource.processedText}</p>
                </div>
            </div>
        </div>
    );
}
