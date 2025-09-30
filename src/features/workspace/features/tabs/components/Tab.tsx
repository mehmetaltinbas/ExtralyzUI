import type React from 'react';
import { ClaretButton } from '../../../../../shared/components/buttons/ClaretButton';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { tabsActions, type TabsStateElement } from '../store/tabsSlice';
import { useEffect } from 'react';

export function Tab({
    tab,
    onDragOver,
    onDrop,
}: {
    tab: TabsStateElement;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}) {
    const dispatch = useAppDispatch();
    const tabs = useAppSelector((state) => state.tabs);

    function onDragStart(event: React.DragEvent<HTMLDivElement>) {
        const datasetElement = event.currentTarget.dataset.tabElement;
        const element = datasetElement ? JSON.parse(datasetElement) : undefined;
        if (element) {
            event.dataTransfer.setData('text/plain', JSON.stringify(element));
        }
    }

    function displayTab() {
        dispatch(tabsActions.setActiveTabIndex(tab.index!));
    }

    function deleteTab(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        dispatch(tabsActions.subtract(tab.index!));
    }

    return (
        <div
            draggable="true"
            onDragStart={(event) => onDragStart(event)}
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event)}
            data-tab-element={JSON.stringify(tab)}
            onClick={displayTab}
            className={`max-w-[200px] h-full ${tab.index === tabs.activeTabIndex ? 'bg-white' : ''} cursor-pointer p-2
            flex-shrink-0 flex justify-center items-center gap-[10px]
            hover:bg-white`}
        >
            <div className="max-w-[150px] flex justify-center items-center">
                <p className="truncate" title={tab.tabTitle}>
                    {tab.tabTitle}
                </p>
            </div>
            <div className="w-[24px] flex justify-center items-center">
                <ClaretButton
                    onClick={(event) => deleteTab(event)}
                    className="border-transparent !border-[1px] bg-transparent !text-black hover:border-[#a62637] !hover:text-white"
                >
                    x
                </ClaretButton>
            </div>
        </div>
    );
}
