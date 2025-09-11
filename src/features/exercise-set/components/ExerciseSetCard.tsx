import type React from 'react';
import type { ExerciseSet } from '../types/exercise-set.interface';
import { tabsActions, type TabsStateElement } from '../../workspace/store/tabsSlice';
import { useAppDispatch } from '../../../store/hooks';
import { Sections } from '../../workspace/enums/sections.enum';

export function ExerciseSetCard({
    exerciseSet,
    fetchExerciseSets,
}: {
    exerciseSet: ExerciseSet;
    fetchExerciseSets: () => void;
}) {
    const dispatch = useAppDispatch();


    function openTab(event: React.MouseEvent<HTMLDivElement>) {
        const section = Sections.EXERCISE_SET;
        const datasetElement = event.currentTarget.dataset.element;
        let element;
        if (datasetElement) {
            element = JSON.parse(datasetElement) as TabsStateElement;
        }
        if (element) {
            dispatch(tabsActions.addByIndex({ element: { section, id: element.id, title: element.title } }));
        } else if (!element) {
            dispatch(tabsActions.addByIndex({ element: { section } }));
        }
    }

    return (
        <div
            onClick={event => openTab(event)}
            data-element={JSON.stringify({ id: exerciseSet._id, title: exerciseSet.title })}
            className="w-[200px] cursor-pointer
            flex-shrink-0 flex flex-col justify-start items-center gap-1
            border p-1
            hover:bg-gray-100"
        >
            <p>{exerciseSet.type}</p>
            <p>{exerciseSet.count}</p>
            <p>{exerciseSet.difficulty}</p>
        </div>
    );
}
