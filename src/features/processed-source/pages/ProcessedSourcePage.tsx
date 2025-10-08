import { useEffect, useState } from 'react';
import type { ProcessedSource } from '../types/processed-source.interface';
import { convertHTMLFromJSON } from 'src/shared/utilities/convert-html-from-json.utility';
import type { DocumentNode } from 'src/features/source/types/document-node.interface';

export function ProcessedSourcePage({
    processedSource,
    className,
}: {
    processedSource: ProcessedSource;
    className?: string;
}) {
    const [renderedHTML, setRenderedHTML] = useState<string>();

    useEffect(() => {
        if (processedSource?.processedText) {
            setRenderedHTML(convertHTMLFromJSON(JSON.parse(processedSource?.processedText) as DocumentNode));
        }
    }, [processedSource]);

    return (
        <div className={`${className ?? ''} w-full h-full flex justify-center items-center`}>
            <div className="w-[680px] h-full flex flex-col justify-start items-center gap-4">
                <p className='text-2xl'>{processedSource?.title ? processedSource?.title : processedSource?._id}</p>
                <div dangerouslySetInnerHTML={{ __html: renderedHTML ? renderedHTML : '' }}></div>
            </div>
        </div>
    );
}
