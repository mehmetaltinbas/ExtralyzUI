import { useEffect, useState } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { WorkspaceBody } from '../components/WorkspaceBody';
import { WorkspaceTabsBar } from '../features/tabs/components/WorkspaceTabsBar';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { layoutDimensionsActions } from '../store/layout-dimensions.slice';

export function WorkspacePage() {
    const dispatch = useAppDispatch();
    const sidebar = useAppSelector((state) => state.sidebar);

    useEffect(() => {
        function handleResize() {
            dispatch(layoutDimensionsActions.updateWidthsBySidebarWidth(sidebar.width));
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [sidebar.width]);

    return (
        <div
            className="w-full h-full
            flex"
        >
            <Sidebar />
            <div className="w-full h-full flex flex-col">
                <WorkspaceTabsBar />
                <WorkspaceBody />
            </div>
        </div>
    );
}
