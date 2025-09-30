import { useEffect } from 'react';
import type { Source } from '../types/source.interface';
import ReactMarkdown from 'react-markdown';

export function SourcePage({ source, className }: { source: Source; className?: string }) {
    return (
        <div className={`${className ?? ''} w-full h-full`}>
            <div className="flex flex-col justify-center items-center gap-4">
                <p>{source?.title}</p>
                <p>{source?.type}</p>
                <div dangerouslySetInnerHTML={{ __html: source?.rawText }}></div>
            </div>
        </div>
    );
}
