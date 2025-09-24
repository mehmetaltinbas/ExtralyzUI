import { useEffect } from 'react';
import type { Source } from '../types/source.iterface';
import ReactMarkdown from 'react-markdown';

export function SourcePage({ source, className }: { source: Source; className?: string }) {
    useEffect(() => {
        console.log(source?.rawText);
    }, []);
    return (
        <div className={`${className ?? ''} w-full h-full`}>
            <div className='flex flex-col justify-center items-center gap-4'>
                <p>{source?.title}</p>
                <p>{source?.type}</p>
                <p dangerouslySetInnerHTML={{ __html: source?.rawText}}></p>
            </div>
        </div>
    );
}
