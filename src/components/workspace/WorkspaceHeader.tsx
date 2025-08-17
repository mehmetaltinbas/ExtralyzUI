import type React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { tabsActions } from '../../store/features/tabs/tabsSlice';
import { useEffect } from 'react';

export function WorkspaceHeader() {
    const tabs = useAppSelector(state => state.tabs);
    const dispatch = useAppDispatch();

    function displayPane(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const index = Number(event.currentTarget.dataset.tabIndex);
        dispatch(tabsActions.setActiveTabIndex(index));
    }

    return (
        <div
            className="w-full h-[5%] p-2 bg-black flex justify-start items-center gap-8
            border-1 border-white text-white"
        >
            {tabs.tabs.map((tab, index) => (
                <button data-tab-index={index} onClick={(event) => displayPane(event)} className={`${(index === tabs.activeTabIndex) ? 'border border-blue-500 px-2' : ''}`}>{tab}</button>
            ))}
        </div>
    );
}
