import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { WorkspaceBody } from '../components/workspace/WorkspaceBody';
import { WorkspaceHeader } from '../components/workspace/WorkspaceHeader';

export function WorkspacePage() {
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
