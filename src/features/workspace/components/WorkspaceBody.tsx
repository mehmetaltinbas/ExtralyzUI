import { useEffect, useState, type JSX } from 'react';
import { Pane } from './Pane';
import { SplitView } from './SplitView';
import { ExercisesPage } from '../../exercise-set/pages/ExercisesPage';
import { Sources } from '../../source/pages/Sources';
import { ProcessedSources } from '../../processed-source/pages/ProcessedSources';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Sections } from '../../../shared/enums/sections.enum';

export function WorkspaceBody() {
    const dispatch = useAppDispatch();
    const tabs = useAppSelector((state) => state.tabs);
    const sidebar = useAppSelector(state => state.sidebar);
    const componentsMap: Map<string, () => JSX.Element> = new Map([
        [Sections.SOURCES, Sources],
        [Sections.PROCESSED_SOURCES, ProcessedSources],
        [Sections.EXERCISES, ExercisesPage],
    ]);
    const ActiveComponent =
        componentsMap.get(tabs.tabs[tabs.activeTabIndex]) || (() => <div>No Component</div>);
    const [componentWidth, setComponentWidth] = useState<number>();

    useEffect(() => {
        function handleResize() {
            setComponentWidth(window.innerWidth - sidebar.width);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [sidebar.width]);

    return (
        <div className={`w-[${componentWidth}px] flex-1 flex justify-center items-center`}>
            <div className="w-[90%] h-[90%] border overflow-auto">
                <ActiveComponent />
            </div>
        </div>
    );
}
