import { useEffect, useState } from 'react';
import type { Source } from '../types/source.interface';
import { convertHTMLFromJSON } from 'src/shared/utilities/convert-html-from-json.utility';
import type { DocumentNode } from 'src/features/source/types/document-node.interface';

export function SourcePage({ source, className }: { source: Source; className?: string }) {
    const [renderedHTML, setRenderedHTML] = useState<string>();

    useEffect(() => {
        if (source?.rawText) {
            const documentNode = JSON.parse(source.rawText) as DocumentNode;
            const html = convertHTMLFromJSON(documentNode);
            setRenderedHTML(html);
        }
    }, [source]);

    return (
        <div className={`${className ?? ''} w-full h-full`}>
            <div className="flex flex-col justify-center items-center gap-4">
                <p>{source?.title}</p>
                <p>{source?.type}</p>
                <div dangerouslySetInnerHTML={{ __html: renderedHTML ? renderedHTML : ''  }}></div>
            </div>
        </div>
    );
}
