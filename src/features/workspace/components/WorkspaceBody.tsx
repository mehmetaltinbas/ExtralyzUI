import React, { useEffect, useRef, useState, type JSX } from 'react';
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
import { layoutDimensionsActions } from '../store/layoutDimensionsSlice';
import type { TabsStateElement } from '../store/tabsSlice';

export function WorkspaceBody() {
    const dispatch = useAppDispatch();
    const tabs = useAppSelector(state => state.tabs);
    const layoutDimensions = useAppSelector(state => state.layoutDimensions);
    const [props, setProps] = useState<object | undefined>(undefined);
    const [builtPropsMap, setBuiltPropsMap] = useState<Record<string, object | undefined>>({});
    const containerDiv = useRef<HTMLDivElement | null>(null);
    const componentsMap: Map<string, React.ComponentType<any>> = new Map([
        [Sections.SOURCES, SourcesPage],
        [Sections.SOURCE, SourcePage],
        [Sections.PROCESSED_SOURCES, ProcessedSourcesPage],
        [Sections.PROCESSED_SOURCE, ProcessedSourcePage],
        [Sections.EXERCISE_SETS, ExerciseSetsPage],
        [Sections.EXERCISE_SET, ExerciseSetPage]
    ] as [string, React.ComponentType<any>][]);

    useEffect(() => {
        if (!containerDiv.current) return;

        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const newHeight = entry.contentRect.height;
                dispatch(layoutDimensionsActions.updateDimension({ layout: 'mainColumn', dimension: 'height', value: newHeight}));
            }
        });

        observer.observe(containerDiv.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        async function buildProps(tab: TabsStateElement) {
            const strategy = selectPropsBuilderStrategy(tab.section);
            let builtProps;
            if (strategy) {
                builtProps = await strategy.build(tab);
            }
            return builtProps;
        }
        tabs.elements.forEach(async (tab, index) => {
            const builtProps = await buildProps(tab);
            setBuiltPropsMap(prev => ({
                ...prev,
                [String(tab.tabTitle)]: builtProps
            }));
        });
    }, [tabs.elements]);

    return (
        <div
            ref={containerDiv}
            className={`w-[${layoutDimensions.mainColumn.width}px] h-full flex-1 flex justify-center items-center`}>
            <div className={`w-[90%] h-[${layoutDimensions.mainColumn.height ?  `${layoutDimensions.mainColumn.height * 0.9}px` : '90%'}] overflow-y-auto`}>
                {tabs.elements?.map((element, index) => {
                    const Component = componentsMap.get(element.section);
                    let builtProps;
                    let isActiveComponent: boolean;
                    if (index === tabs.activeTabIndex) isActiveComponent = true;
                    else isActiveComponent = false;
                    if (element.tabTitle) {
                        builtProps = builtPropsMap[element.tabTitle];
                    }
                    builtProps = { ...builtProps, className: `${isActiveComponent ? 'block' : 'hidden'}`};
                    return Component ? <Component key={index} {...builtProps} /> : null;
                })}
            </div>
        </div>
    );
}
