import { useState, type HTMLAttributes, type HtmlHTMLAttributes } from 'react';
import type React from 'react';
import { openTab } from 'src/features/workspace/features/tabs/utilities/openTab.utility';
import { Section } from 'src/features/workspace/enums/sections.enum';
import { sourceService } from 'src/features/source/services/source.service';
import { useAppDispatch } from 'src/store/hooks';
import type { Source } from 'src/features/source/types/source.iterface';
import { BlackButton } from 'src/shared/components/buttons/BlackButton';
import { ClaretButton } from 'src/shared/components/buttons/ClaretButton';
import { SourceActionMenu } from 'src/features/source/components/SourceActionMenu';
import { ActionMenuButton } from 'src/shared/components/buttons/ActionMenuButton';

export function SourceCard({
    source,
    fetchSources,
    toggleSourceActionMenu,
}: {
    source: Source;
    fetchSources: () => void;
    toggleSourceActionMenu: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>, sourceId: string
    ) => void;
}) {
    const dispatch = useAppDispatch();

    return (
        <div
            onClick={(event) => openTab(dispatch, { section: Section.SOURCE, id: source._id, title: source.title })}
            className="w-[300px] h-[250px] border cursor-pointer rounded-[10px]
            flex flex-col justify-center items-center
            hover:bg-gray-100"
        >
            <div className="w-full h-[60px]
                flex justify-center items-center
                border-b"
            >
                <div className='w-[250px] h-full px-2
                    flex flex-col justify-center items-center'
                >
                    <p className='max-w-[200px] font-serif font-semibold truncate' title={source.title ? source.title : source._id}>
                        {source.title ? source.title : source._id}
                    </p>
                    <p className='text-xs'>{source.type}</p>
                </div>
                <div className='w-[50px] h-full
                    flex justify-center items-center'
                >
                    <ActionMenuButton onClick={event => toggleSourceActionMenu(event, source._id)}/>
                </div>
            </div>
            <div className="w-full h-full p-2 flex-1 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: source?.rawText}}></div>
            </div>
        </div>
    );
}
