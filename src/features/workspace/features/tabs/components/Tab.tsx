import type React from 'react';
import { ClaretButton } from '../../../../../shared/components/buttons/ClaretButton';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { tabsActions, type TabsStateElement } from '../store/tabsSlice';

export function Tab({
    tab,
    index,
    onDragOver,
    onDrop,
}: {
    tab: TabsStateElement;
    index: number;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}) {
    const dispatch = useAppDispatch();
    const tabs = useAppSelector((state) => state.tabs);

    function onDragStart(event: React.DragEvent<HTMLDivElement>) {
        const datasetElement = event.currentTarget.dataset.element;
        const element = datasetElement ? JSON.parse(datasetElement) : undefined;
        if (element) {
            event.dataTransfer.setData('text/plain', JSON.stringify(element));
        }
    }

    function displayTab(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const index = Number(event.currentTarget.dataset.tabIndex);
        dispatch(tabsActions.setActiveTabIndex(index));
    }

    function deleteTab(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const index = Number(event.currentTarget.dataset.tabIndex);
        dispatch(tabsActions.subtract(index));
    }

    return (
        <div
            draggable="true"
            onDragStart={(event) => onDragStart(event)}
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event)}
            data-section={tab.section}
            data-element={JSON.stringify(tab)}
            data-tab-index={index}
            onClick={(event) => displayTab(event)}
            className={`max-w-[200px] h-full ${index === tabs.activeTabIndex ? 'bg-white' : ''} cursor-pointer p-2
            flex-shrink-0 flex justify-center items-center gap-[10px]
            hover:bg-gray-100`}
        >
            <div className="max-w-[150px] flex justify-center items-center">
                <p className="truncate" title={tab.tabTitle}>{tab.tabTitle}</p>
            </div>
            <div className="w-[24px] flex justify-center items-center">
                <ClaretButton data-tab-index={index} onClick={deleteTab}>
                    x
                </ClaretButton>
            </div>
        </div>
    );
}
