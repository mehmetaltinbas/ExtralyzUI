import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { tabsActions } from '../store/tabsSlice';
import { Sections } from '../../../shared/enums/sections.enum';

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const tabs = useAppSelector((state) => state.tabs);
    const dispatch = useAppDispatch();

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    function openTab(event: React.MouseEvent<HTMLButtonElement>) {
        const section = event.currentTarget.dataset.section;
        if (typeof section === 'string') {
            dispatch(tabsActions.addByIndex({ element: section }));
        }
    }

    function onDragStart(event: React.DragEvent<HTMLButtonElement>) {
        const section = event.currentTarget.dataset.section;
        if (section !== undefined) {
            event.dataTransfer.setData('text/plain', section);
        }
    }

    return (
        <div
            className={`h-[100%] ${isSidebarOpen ? 'w-[300px]' : 'w-[50px]'} sticky bg-gray-300 p-4
            flex flex-col justify-start items-center`}
        >
            <div className="w-full flex justify-end">
                {isSidebarOpen ? (
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
            {isSidebarOpen && (
                <>
                    <button
                        draggable="true"
                        onDragStart={(event) => onDragStart(event)}
                        data-section={Sections.SOURCES}
                        onClick={(event) => openTab(event)}
                        className="cursor-pointer"
                    >
                        Sources
                    </button>
                    <button
                        draggable="true"
                        onDragStart={(event) => onDragStart(event)}
                        data-section={Sections.PROCESSED_SOURCES}
                        onClick={(event) => openTab(event)}
                        className="cursor-pointer"
                    >
                        Processed Sources
                    </button>
                    <button
                        draggable="true"
                        onDragStart={(event) => onDragStart(event)}
                        data-section={Sections.EXERCISES}
                        onClick={(event) => openTab(event)}
                        className="cursor-pointer"
                    >
                        Exercises
                    </button>
                </>
            )}
        </div>
    );
}
