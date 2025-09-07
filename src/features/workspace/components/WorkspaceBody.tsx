import { useEffect, type JSX } from 'react';
import { Pane } from './Pane';
import { SplitView } from './SplitView';
import { ExercisesPage } from '../../exercise-set/pages/ExercisesPage';
import { Sources } from '../../source/pages/Sources';
import { ProcessedSources } from '../../processed-source/pages/ProcessedSources';
import { useAppSelector } from '../../../store/hooks';
import { Sections } from '../../../shared/enums/sections.enum';

export function WorkspaceBody() {
    const tabs = useAppSelector((state) => state.tabs);
    const componentsMap: Map<string, () => JSX.Element> = new Map([
        [Sections.SOURCES, Sources],
        [Sections.PROCESSED_SOURCES, ProcessedSources],
        [Sections.EXERCISES, ExercisesPage],
    ]);
    const ActiveComponent =
        componentsMap.get(tabs.tabs[tabs.activeTabIndex]) || (() => <div>No Component</div>);

    return (
        <div className="w-full flex-1 flex justify-center items-center">
            <div className="w-[90%] h-[90%] border overflow-auto">
                <ActiveComponent />
            </div>
        </div>
    );
}
