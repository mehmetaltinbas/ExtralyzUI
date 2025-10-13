import { useEffect, useState } from 'react';
import type { ProcessedSource } from '../types/processed-source.interface';
import type { DocumentNode } from 'src/features/source/types/document-node.interface';
import { DocumentRenderer } from 'src/shared/components/document-render/DocumentRenderer';

export function ProcessedSourcePage({
    processedSource,
    className,
}: {
    processedSource: ProcessedSource;
    className?: string;
}) {
    return processedSource ? (
        <div className={`${className ?? ''} w-full h-full overflow-y-auto p-2`}>
            <DocumentRenderer
                documentNode={JSON.parse(processedSource.processedText) as DocumentNode}
            />
        </div>
    ) : (
        <></>
    );
}
