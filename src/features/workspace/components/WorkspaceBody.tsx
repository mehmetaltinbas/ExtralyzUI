import React, { useEffect, useRef, useState, type JSX } from 'react';
import { selectPropsBuilderStrategy } from '../strategies/props-builder/select-props-builder-strategy';
import { ExerciseSetPracticePage } from 'src/features/exercise-set/pages/ExerciseSetPracticePage';
import { SourcePage } from 'src/features/source/pages/SourcePage';
import { ProcessedSourcePage } from 'src/features/processed-source/pages/ProcessedSourcePage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { SourcesPage } from 'src/features/source/pages/SourcesPage';
import { ProcessedSourcesPage } from 'src/features/processed-source/pages/ProcessedSourcesPage';
import { ExerciseSetsPage } from 'src/features/exercise-set/pages/ExerciseSetsPage';
import { ExerciseSetPage } from 'src/features/exercise-set/pages/ExerciseSetPage';
import { Section } from 'src/features/workspace/enums/sections.enum';
import { layoutDimensionsActions } from 'src/features/workspace/store/layoutDimensionsSlice';
import type { TabsStateElement } from 'src/features/workspace/features/tabs/store/tabsSlice';

export function WorkspaceBody() {
    const dispatch = useAppDispatch();
    const tabs = useAppSelector((state) => state.tabs);
    const layoutDimensions = useAppSelector((state) => state.layoutDimensions);
    const [builtPropsMap, setBuiltPropsMap] = useState<Record<string, object | undefined>>({});
    const containerDiv = useRef<HTMLDivElement | null>(null);
    const componentsMap: Map<string, React.ComponentType<any>> = new Map([
        [Section.SOURCES, SourcesPage],
        [Section.SOURCE, SourcePage],
        [Section.PROCESSED_SOURCES, ProcessedSourcesPage],
        [Section.PROCESSED_SOURCE, ProcessedSourcePage],
        [Section.EXERCISE_SETS, ExerciseSetsPage],
        [Section.EXERCISE_SET, ExerciseSetPage],
        [Section.EXERCISE_SET_PRACTICE, ExerciseSetPracticePage],
    ] as [string, React.ComponentType<any>][]);

    useEffect(() => {
        if (!containerDiv.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const newHeight = entry.contentRect.height;
                dispatch(
                    layoutDimensionsActions.updateDimension({
                        layout: 'mainColumn',
                        dimension: 'height',
                        value: newHeight,
                    })
                );
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
            setBuiltPropsMap((prev) => ({
                ...prev,
                [String(tab.tabTitle)]: builtProps,
            }));
        });
    }, [tabs.elements]);

    return (
        <div
            ref={containerDiv}
            className={`w-[${layoutDimensions.mainColumn.width}px] h-full flex-1 flex justify-center items-center`}
        >
            <div
                className={`w-[90%] h-[${layoutDimensions.mainColumn.height ? `${layoutDimensions.mainColumn.height * 0.9}px` : '90%'}] overflow-y-auto`}
            >
                {tabs.elements?.map((element, index) => {
                    const Component = componentsMap.get(element.section);
                    let builtProps;
                    let isActiveComponent: boolean;
                    if (index === tabs.activeTabIndex) isActiveComponent = true;
                    else isActiveComponent = false;
                    if (element.tabTitle) {
                        builtProps = builtPropsMap[element.tabTitle];
                    }
                    builtProps = {
                        ...builtProps,
                        className: `${isActiveComponent ? 'block' : 'hidden'}`,
                    };
                    return Component ? <Component key={index} {...builtProps} /> : null;
                })}
            </div>
        </div>
    );
}
