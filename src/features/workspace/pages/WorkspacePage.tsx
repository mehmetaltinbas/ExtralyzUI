import { useEffect, useState } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { WorkspaceBody } from '../components/WorkspaceBody';
import { WorkspaceHeader } from '../components/WorkspaceHeader';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { widthsActions } from '../store/widthsSlice';

export function WorkspacePage() {
    const dispatch = useAppDispatch();
    const sidebar = useAppSelector(state => state.sidebar);

    useEffect(() => {
        function handleResize() {
            dispatch(widthsActions.update(sidebar.width));
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
                <WorkspaceHeader />
                <WorkspaceBody />
            </div>
        </div>
    );
}
