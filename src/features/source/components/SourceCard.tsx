import { useEffect, useState, type HTMLAttributes, type HtmlHTMLAttributes } from 'react';
import type React from 'react';
import { openTab } from 'src/features/workspace/features/tabs/utilities/openTab.utility';
import { Section } from 'src/features/workspace/enums/sections.enum';
import { useAppDispatch } from 'src/store/hooks';
import type { Source } from 'src/features/source/types/source.interface';
import { ActionMenuButton } from 'src/shared/components/buttons/ActionMenuButton';
import type { DocumentNode } from 'src/features/source/types/document-node.interface';

export function SourceCard({
    source,
    toggleSourceActionMenu,
}: {
    source: Source;
    toggleSourceActionMenu: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        sourceId: string
    ) => void;
}) {
    const dispatch = useAppDispatch();

    return (
        <div
            onClick={(event) =>
                openTab(dispatch, {
                    section: Section.SOURCE,
                    id: source._id,
                    title: source.title,
                })
            }
            className="w-[300px] h-[250px] border cursor-pointer rounded-[10px]
            flex flex-col justify-center items-center
            hover:bg-gray-100"
        >
            <div
                className="w-full h-[60px]
                flex justify-center items-center
                border-b"
            >
                <div
                    className="w-[250px] h-full px-2
                    flex flex-col justify-center items-center"
                >
                    <p
                        className="max-w-[200px] font-serif font-semibold truncate"
                        title={source.title ? source.title : source._id}
                    >
                        {source.title ? source.title : source._id}
                    </p>
                    <p className="text-xs">{source.type}</p>
                </div>
                <div
                    className="w-[50px] h-full
                    flex justify-center items-center"
                >
                    <ActionMenuButton
                        onClick={(event) => toggleSourceActionMenu(event, source._id)}
                    />
                </div>
            </div>
            <div className="w-full h-full p-2 flex-1 overflow-y-auto">
                <div className="text-gray-500">{source.rawText}</div>
            </div>
        </div>
    );
}
