import { useEffect } from 'react';
import type { Source } from '../types/source.iterface';

export function SourcePage({ source, className }: { source: Source; className?: string }) {
    return (
        <div className={`${className ?? ''} w-full h-full`}>
            <p>{source?.title}</p>
            <p>{source?.type}</p>
            <p>{source?.rawText}</p>
        </div>
    );
}
