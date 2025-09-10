import type React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { tabsActions } from '../../store/tabsSlice';
import { useEffect, useState } from 'react';
import { Tab } from './Tab';

export function WorkspaceTabsBar() {
    const dispatch = useAppDispatch();
    const tabs = useAppSelector(state => state.tabs);
    const sidebar = useAppSelector(state => state.sidebar);
    const widths = useAppSelector(state => state.widths);

    function onDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const index = event.currentTarget.dataset.tabIndex;
        // const position = event.currentTarget.getBoundingClientRect();
        // console.log(position);
    }

    function onDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const index = Number(event.currentTarget.dataset.tabIndex);
        const section = event.dataTransfer.getData('text/plain');

        const rect = event.currentTarget.getBoundingClientRect();
        const middleX = rect.left + rect.width / 2;

        if (event.clientX < middleX) {
            dispatch(tabsActions.addByIndex({ element: { section }, index }));
        } else if (event.clientX > middleX) {
            dispatch(tabsActions.addByIndex({ element: { section }, index: index + 1 }));
        }
    }

    return (
        <div
            onDragOver={event => onDragOver(event)}
            onDrop={event => onDrop(event)}
            className={`w-[${widths.mainColumnWidth}px] h-[40px] bg-gray-300 
            flex flex-shrink-0 justify-start items-center
            border-1 border-white overflow-x-auto`}
        >
            {tabs.elements.map((tab, index) => (
                <Tab 
                    tab={tab}
                    index={index}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                />
            ))}
        </div>
    );
}
