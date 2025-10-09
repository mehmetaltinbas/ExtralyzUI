import { useEffect, useState } from 'react';
import type { Source } from '../types/source.interface';
import type { DocumentNode } from 'src/features/source/types/document-node.interface';
import { DocumentRenderer } from 'src/shared/components/DocumentRenderer';

export function SourcePage({ source, className }: { source: Source; className?: string }) {

    return ( source ? (
        <div className={`${className ?? ''} w-full h-full gap-2 overflow-y-auto p-2`}>
            <div className='w-full h-auto flex flex-col justify-start items-center gap-4'>
                <p>{source.title}</p>
                <p>{source.type}</p>
                <DocumentRenderer documentNode={JSON.parse(source.rawText) as DocumentNode}/>
            </div>
        </div>
        ) : <></>
    );
}
