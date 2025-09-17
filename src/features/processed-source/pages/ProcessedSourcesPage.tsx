import React, { useEffect, useState } from 'react';
import type { ProcessedSource } from '../types/processed-source.interface';
import { processedSourceService } from '../services/processed-source.service';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';
import { ProcessedSourceCard } from '../components/ProcessedSourceCard';

export function ProcessedSourcesPage({ className }: { className?: string }) {
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
        <div
            className={`w-full h-full flex flex-col justify-start items-center ${className ?? ''}`}
        >
            <div
                className="w-full h-auto p-4
                grid grid-cols-3 gap-8"
            >
                {processedSources.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    processedSources.map((processedSources) => (
                        <ProcessedSourceCard
                            processedSource={processedSources}
                            fetchProcessedSources={fetchProcessedSources}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
