import { useEffect, useState } from 'react';
import type { ProcessedSource } from '../types/processed-source.interface';
import type { DocumentNode } from 'src/features/source/types/document-node.interface';
import { DocumentRenderer } from 'src/shared/components/DocumentRenderer';

export function ProcessedSourcePage({
    processedSource,
    className,
}: {
    processedSource: ProcessedSource;
    className?: string;
}) {

    return (
        <div className={`${className ?? ''} w-full h-full flex justify-center items-center`}>
            <DocumentRenderer documentNode={JSON.parse(processedSource.processedText) as DocumentNode} />
        </div>
    );
}
