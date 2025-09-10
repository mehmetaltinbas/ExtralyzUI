import React, { useEffect, useState, type JSX } from 'react';
import { Pane } from './Pane';
import { SplitView } from './SplitView';
import { ExerciseSetsPage } from '../../exercise-set/pages/ExerciseSetsPage';
import { SourcesPage } from '../../source/pages/SourcesPage';
import { ProcessedSourcesPage } from '../../processed-source/pages/ProcessedSourcesPage';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Sections } from '../enums/sections.enum';
import { ExerciseSetPage } from '../../exercise-set/pages/ExerciseSetPage';
import { selectPropsBuilderStrategy } from '../strategies/props-builder/select-props-builder-strategy';
import { SourcePage } from '../../source/pages/SourcePage';
import { ProcessedSourcePage } from '../../processed-source/pages/ProcessedSourcePage';
import { NoComponent } from './NoComponent';

export function WorkspaceBody() {
    const tabs = useAppSelector(state => state.tabs);
    const widths = useAppSelector(state => state.widths);
    const [props, setProps] = useState<object | undefined>(undefined);
    const componentsMap: Map<string, React.ComponentType<any>> = new Map([
        [Sections.SOURCES, SourcesPage],
        [Sections.SOURCE, SourcePage],
        [Sections.PROCESSED_SOURCES, ProcessedSourcesPage],
        [Sections.PROCESSED_SOURCE, ProcessedSourcePage],
        [Sections.EXERCISE_SETS, ExerciseSetsPage],
        [Sections.EXERCISE_SET, ExerciseSetPage]
    ] as [string, React.ComponentType<any>][]);
    const ActiveComponent = componentsMap.get(tabs.elements[tabs.activeTabIndex]?.section) || (() => <div>No Component</div>);

    useEffect(() => {
        async function buildProps() {
            const section = tabs.elements[tabs.activeTabIndex]?.section;
            let strategy;
            if (section) {
                strategy = selectPropsBuilderStrategy(tabs.elements[tabs.activeTabIndex].section);
            }
            if (strategy) {
                await strategy.build(tabs.elements[tabs.activeTabIndex].id!, setProps);
            }
        }
        buildProps();

    }, [tabs.activeTabIndex]);

    return (
        <div className={`w-[${widths.mainColumnWidth}px] h-full flex-1 flex justify-center items-center`}>
            <div className="w-[90%] h-[90%] border overflow-auto">
                {props ? <ActiveComponent {...props} /> : <p>No Component</p>}
            </div>
        </div>
    );
}
