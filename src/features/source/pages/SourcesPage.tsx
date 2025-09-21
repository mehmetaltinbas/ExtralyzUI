import React, { useEffect, useState } from 'react';
import { sourceService } from '../services/source.service';
import type { Source } from '../types/source.iterface';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';
import { SourceCard } from '../components/SourceCard';
import { LoadingPage } from 'src/shared/pages/LoadingPage';
import { SourceActionMenu } from 'src/features/source/components/SourceActionMenu';
import { CreateExerciseSetForm } from 'src/features/exercise-set/components/CreateExerciseSetForm';
import { ProcessSourceForm } from 'src/features/processed-source/components/ProcessSourceForm';
import { ClaretButton } from 'src/shared/components/buttons/ClaretButton';
import { useAppSelector } from 'src/store/hooks';

export function SourcesPage({ className }: { className?: string }) {
    const sidebar = useAppSelector(state => state.sidebar);
    const [sources, setSources] = useState<Source[]>([]);
    const [file, setFile] = useState<File>();
    const [isPopUpActive, setIsPopUpActive] = useState<boolean>(false);
    const [actionMenuSourceId, setActionMenuSourceId] = useState<string>('');
    const [isSourceActionMenuHidden, setIsSourceActionMenuHidden] = useState<boolean>(true);
    const [isCreateExerciseSetFormHidden, setIsCreateExerciseSetFormHidden] =
        useState<boolean>(true);
    const [isProcessSourceFormHidden, setIsProcessSourceFormHidden] =
        useState<boolean>(true);
    const [isDeleteApproavelHidden, setIsDeleteApprovalHidden] = useState<boolean>(true);

    function toggleSourceActionMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, sourceId: string) {
        event.stopPropagation();
        const sourceActionMenu = document.getElementById('source-action-menu');
        const container = document.getElementById('sources-page-container');
        if (sourceActionMenu && container) {
            const containerRect = container?.getBoundingClientRect();
            const positionOfButton = event.currentTarget.getBoundingClientRect();
            sourceActionMenu.style.top = `${positionOfButton.bottom - containerRect?.top}px`;
            sourceActionMenu.style.left = `${positionOfButton.right - containerRect?.left}px`;
            setActionMenuSourceId(sourceId);
            setIsSourceActionMenuHidden((prev) => !prev);
        }
    }

    function toggleProcessSourceForm(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const processSourceForm = document.getElementById('process-source-form');
        if (processSourceForm !== null) {
            const position = event.currentTarget.getBoundingClientRect();
            processSourceForm.style.top = `${position.bottom}px`;
            processSourceForm.style.left = `${position.right}px`;
            setIsProcessSourceFormHidden((prev) => !prev);
            setIsPopUpActive(prev => !prev);
        }
    }

    function toggleCreateExerciseSetForm(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        const createExerciseSetForm = document.getElementById('create-exercise-set-form');
        if (createExerciseSetForm !== null) {
            const position = event.currentTarget.getBoundingClientRect();
            createExerciseSetForm.style.top = `${position.bottom}px`;
            createExerciseSetForm.style.left = `${position.right}px`;
            setIsCreateExerciseSetFormHidden((prev) => !prev);
            setIsPopUpActive(prev => !prev);
        }
    }

    function toggleDeleteApproval(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        const createExerciseSetForm = document.getElementById('delete-approval');
        if (createExerciseSetForm !== null) {
            const position = event.currentTarget.getBoundingClientRect();
            createExerciseSetForm.style.top = `${position.bottom}px`;
            createExerciseSetForm.style.left = `${position.right}px`;
            setIsDeleteApprovalHidden((prev) => !prev);
            setIsPopUpActive(prev => !prev);
        }
    }

    async function fetchSources() {
        const response = await sourceService.readAll();
        if (response.isSuccess && response.sources) {
            setSources(response.sources);
        } else {
            alert(response.message);
        }
    }

    useEffect(() => {
        fetchSources();
    }, []);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    }

    async function uploadSource(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
            const response = await sourceService.create(formData);
            alert(response.message);
        }
        fetchSources();
    }

    async function deleteSource(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const response = await sourceService.deleteById(actionMenuSourceId);
        alert(response.message);
        fetchSources();
    }

    return (
        <div id='sources-page-container'
            className={`relative ${className ?? ''} w-full h-full`}
        >

            <SourceActionMenu
                isHidden={isSourceActionMenuHidden}
                setIsHidden={setIsSourceActionMenuHidden}
                sourceId={actionMenuSourceId}
                fetchSources={fetchSources}
                toggleCreateExerciseSetForm={toggleCreateExerciseSetForm}
                toggleProcessSourceForm={toggleProcessSourceForm}
                toggleDeleteApproval={toggleDeleteApproval}
            />

            <div // main
                className={`absolute w-full h-auto p-5
                grid grid-cols-3 gap-8`}
            >
                <div
                    className="h-[100px] col-span-3
                    flex justify-center items-center"
                >
                    <div
                        className="w-[400px] h-[80px]
                        flex justify-center items-center gap-2"
                    >
                        <input
                            onChange={(event) => handleOnChange(event)}
                            type="file"
                            className="w-[200px] border rounded-full p-1 cursor-pointer
                            text-xs
                            hover:bg-gray-100"
                        />
                        <BlackButton onClick={uploadSource}>Upload</BlackButton>
                    </div>
                </div>
                {sources.length === 0 ? (
                        <LoadingPage />
                ) : (
                    sources.map((source) => (
                        <SourceCard
                            source={source}
                            fetchSources={fetchSources}
                            toggleSourceActionMenu={toggleSourceActionMenu}
                        />
                    ))
                )}
            </div>

            <div // overlay
                className={`${!isPopUpActive && 'hidden'} absolute z-10 w-full h-full backdrop-blur-xs`}
            >
            </div>

            <div // pop-up
                className={`${!isPopUpActive && 'hidden'} absolute z-20 w-full h-full`}
            >
                <div className='w-full h-full flex justify-center items-center'>
                    <ProcessSourceForm 
                        isHidden={isProcessSourceFormHidden}
                        toggleProcessSourceForm={toggleProcessSourceForm}
                        sourceId={actionMenuSourceId}
                    />
                    <CreateExerciseSetForm 
                        isHidden={isCreateExerciseSetFormHidden} 
                        sourceId={actionMenuSourceId}
                        toggleCreateExerciseSetForm={toggleCreateExerciseSetForm}
                    />
                    <div
                        id="delete-approval"
                        className={`${isDeleteApproavelHidden ? 'hidden' : ''} border px-2 py-4 bg-white rounded-[10px]
                        flex flex-col justify-center items-center gap-2`}
                    >
                        <p>Are you sure?</p>
                        <div className="flex justify-center items-center gap-2">
                            <BlackButton onClick={event => {
                                toggleDeleteApproval(event);
                            }}>Cancel</BlackButton>
                            <ClaretButton onClick={event => { 
                                toggleDeleteApproval(event);
                                deleteSource(event);
                            }}>Delete</ClaretButton>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
