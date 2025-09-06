import type React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { tabsActions } from '../store/tabsSlice';
import { useEffect } from 'react';
import { ClaretButton } from '../../../shared/components/buttons/ClaretButton';

export function WorkspaceHeader() {
    const tabs = useAppSelector((state) => state.tabs);
    const dispatch = useAppDispatch();

    function displayTab(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const index = Number(event.currentTarget.dataset.tabIndex);
        dispatch(tabsActions.setActiveTabIndex(index));
    }

    function deleteTab(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const index = Number(event.currentTarget.dataset.tabIndex);
        dispatch(tabsActions.subtract(index));
    }

    function onDragStart(event: React.DragEvent<HTMLDivElement>) {
        const section = event.currentTarget.dataset.section;
        if (section !== undefined) {
            event.dataTransfer.setData('text/plain', section);
        }
    }

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
            dispatch(tabsActions.addByIndex({ element: section, index }));
        } else if (event.clientX > middleX) {
            dispatch(tabsActions.addByIndex({ element: section, index: index + 1 }));
        }
    }

    return (
        <div
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event)}
            className="w-full h-[40px] bg-gray-300 flex justify-start items-center
            border-1 border-white"
        >
            {tabs.tabs.map((tab, index) => (
                <div
                    draggable="true"
                    onDragStart={(event) => onDragStart(event)}
                    onDragOver={(event) => onDragOver(event)}
                    onDrop={(event) => onDrop(event)}
                    data-section={tab}
                    data-tab-index={index}
                    onClick={(event) => displayTab(event)}
                    className={`w-[200px] h-full ${index === tabs.activeTabIndex ? 'bg-white' : ''} cursor-pointer flex justify-center items-center gap-2 hover:bg-gray-100`}
                >
                    <p>{tab}</p>
                    <ClaretButton
                        data-tab-index={index}
                        onClick={deleteTab}
                    >
                        x
                    </ClaretButton>
                </div>
            ))}
        </div>
    );
}
