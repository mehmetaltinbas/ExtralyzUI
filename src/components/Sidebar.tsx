import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { tabsActions } from '../store/features/tabs/tabsSlice';
import { Sections } from './sections/sections.enum';

export function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const tabs = useAppSelector((state) => state.tabs);
    const dispatch = useAppDispatch();

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    function displayPane(event: React.MouseEvent<HTMLButtonElement>) {
        const pane = event.currentTarget.dataset.pane;
        if (typeof pane === 'string') {
            dispatch(tabsActions.add(pane));
        }
    }

    return (
        <div
            className={`h-[100%] ${isSidebarOpen ? 'w-[300px]' : 'w-[50px]'} sticky bg-black p-4 text-white
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
                        data-pane={Sections.SOURCES}
                        onClick={(event) => displayPane(event)}
                        className=""
                    >
                        Sources
                    </button>
                    <button
                        data-pane={Sections.PROCESSED_SOURCES}
                        onClick={(event) => displayPane(event)}
                        className=""
                    >
                        Processed Sources
                    </button>
                    <button
                        data-pane={Sections.EXERCISES}
                        onClick={(event) => displayPane(event)}
                        className=""
                    >
                        Exercises
                    </button>
                </>
            )}
        </div>
    );
}
