import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { Sections } from '../../enums/sections.enum';
import { sidebarActions } from '../../store/sidebarSlice';
import { SidebarNavSection } from './SidebarNavSection';
import type { Source } from '../../../source/types/source.iterface';
import type { ProcessedSource } from '../../../processed-source/types/processed-source.interface';
import type { ExerciseSet } from '../../../exercise-set/types/exercise-set.interface';
import { sourceService } from '../../../source/services/source.service';
import { processedSourceService } from '../../../processed-source/services/processed-source.service';
import { exerciseSetService } from '../../../exercise-set/services/exercise-set.service';

export function Sidebar() {
    const dispatch = useAppDispatch();
    const sidebar = useAppSelector((state) => state.sidebar);
    const [sources, setSources] = useState<Source[]>([]);
    const [processedSources, setProcessedSources] = useState<ProcessedSource[]>([]);
    const [exerciseSets, setExerciseSets] = useState<ExerciseSet[]>([]);

    useEffect(() => {
        async function fetchItems() {
            setSources((await sourceService.readAllByUserId()).sources!);
            setProcessedSources((await processedSourceService.readAllByUserId()).processedSources!);
            setExerciseSets((await exerciseSetService.readAllByUserId()).exerciseSets!);
        }
        fetchItems();
    }, []);

    function toggleSidebar() {
        if (sidebar.isOpen) {
            dispatch(sidebarActions.close());
        } else if (!sidebar.isOpen) {
            dispatch(sidebarActions.open());
        }
    }

    return (
        <div className={`w-[${sidebar.width}px] h-full sticky p-4 bg-gray-300
            flex-shrink-0 flex flex-col justify-start items-center gap-4`}
        >
            <div className="w-full flex justify-end">
                {sidebar.isOpen ? (
                    <button className="cursor-pointer" onClick={toggleSidebar}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-6 h-6 bi bi-arrow-bar-left"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"
                            />
                        </svg>
                    </button>
                ) : (
                    <button className="cursor-pointer" onClick={toggleSidebar}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="w-6 h-6 bi bi-arrow-bar-left"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"
                            />
                        </svg>
                    </button>
                )}
            </div>
            {sidebar.isOpen && (
                <>
                    <SidebarNavSection section={Sections.SOURCES} items={sources}/>
                    <SidebarNavSection section={Sections.PROCESSED_SOURCES} items={processedSources}/>
                    <SidebarNavSection section={Sections.EXERCISE_SETS} items={exerciseSets}/>
                </>
            )}
        </div>
    );
}
