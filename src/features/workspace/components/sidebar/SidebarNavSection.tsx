import type React from "react";
import type { Sections } from "../../enums/sections.enum";
import { useAppDispatch } from "../../../../store/hooks";
import { tabsActions, type TabsStateElement } from "../../store/tabsSlice";
import type { Source } from "../../../source/types/source.iterface";
import type { ProcessedSource } from "../../../processed-source/types/processed-source.interface";
import type { ExerciseSet } from "../../../exercise-set/types/exercise-set.interface";
import { useEffect } from "react";

export function SidebarNavSection({ section, items }: {
    section: Sections;
    items: Source[] | ProcessedSource[] | ExerciseSet[]
}) {
    const dispatch = useAppDispatch();

    function onDragStart(event: React.DragEvent<HTMLButtonElement>) {
        const datasetElement = event.currentTarget.dataset.element;
        const element = datasetElement ? JSON.parse(datasetElement) : undefined;
        if (element) {
            event.dataTransfer.setData('text/plain', JSON.stringify(element));
        }
    }

    function openTab(event: React.MouseEvent<HTMLButtonElement>) {
        const section = event.currentTarget.dataset.section;
        if (section && section.length > 0) {
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
    }

    return (
        <div className="w-full h-auto
            flex flex-col justify-start items-start gap-1"
        >
            <div className="w-full h-auto
                flex justify-start items-center gap-2"
            >
                <button>⌄</button>
                <button
                    draggable="true"
                    onDragStart={event => onDragStart(event)}
                    data-section={section}
                    onClick={event => openTab(event)}
                    className="cursor-pointer"
                >
                    {section}
                </button>
            </div>
            <div className="w-full h-auto pl-8
                flex flex-col justify-start items-start gap-[2px]"
            >
                {items?.map(item => (
                    <button
                        key={item._id}
                        draggable="true"
                        onDragStart={event => onDragStart(event)}
                        data-section={section.slice(0, -1)}
                        data-element={JSON.stringify({ id: item._id, title: item.title })}
                        onClick={event => openTab(event)}
                        className="cursor-pointer"
                    >
                        {item.title === '' || item.title === undefined ? item._id : item.title}
                    </button>
                ))}
            </div>
        </div>
    );
}
