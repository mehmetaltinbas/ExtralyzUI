import React, { useEffect, useState } from "react";
import type { ProcessedSource } from "../types/ProcessedSource";
import { processedSourceService } from "../services/processed-source.service";
import { NavyBlueButton } from "../../../shared/components/buttons/NavyBlueButton";
import { ProcessedSourceCard } from "../components/ProcessedSourceCard";

export function ProcessedSources() {
    const [processedSources, setProcessedSources] = useState<ProcessedSource[]>([]);

    async function fetchProcessedSources() {
        const response = await processedSourceService.readAll();
        if (response.isSuccess && response.processedSources) {
            setProcessedSources(response.processedSources);
        } else {
            alert(response.message);
        }
    }

    useEffect(() => {
        fetchProcessedSources();
    }, []);


    return (
        <div className='w-full h-full flex flex-col justify-start items-center'>
            <div className='w-[95%] h-auto border grid grid-cols-3 gap-8'>
                {processedSources.length === 0 ? <p>Loading...</p> :  processedSources.map(processedSources => (
                    <ProcessedSourceCard processedSource={processedSources} fetchProcessedSources={fetchProcessedSources}/>
                ))}
            </div>
        </div>
    );
}
