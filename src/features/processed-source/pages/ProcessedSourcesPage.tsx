import React, { useEffect, useState } from 'react';
import type { ProcessedSource } from '../types/processed-source.interface';
import { processedSourceService } from '../services/processed-source.service';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';
import { ProcessedSourceCard } from '../components/ProcessedSourceCard';
import { LoadingPage } from 'src/shared/pages/LoadingPage';
import { ProcessedSourceActionMenu } from 'src/features/processed-source/components/ProcessedSourceActionMenu';
import { CreateExerciseSetForm } from 'src/features/exercise-set/components/CreateExerciseSetForm';
import { ClaretButton } from 'src/shared/components/buttons/ClaretButton';

export function ProcessedSourcesPage({ className }: { className?: string }) {
    const [processedSources, setProcessedSources] = useState<ProcessedSource[]>([]);
    const [actionMenuSourceId, setActionMenuSourceId] = useState<string>('');
    const [isPopUpActive, setIsPopUpActive] = useState<boolean>(false);
    const [isSourceActionMenuHidden, setIsSourceActionMenuHidden] = useState<boolean>(true);
    const [isCreateExerciseSetFormHidden, setIsCreateExerciseSetFormHidden] =
        useState<boolean>(true);
    const [isDeleteApproavelHidden, setIsDeleteApprovalHidden] = useState<boolean>(true);

    async function fetchProcessedSources() {
        const response = await processedSourceService.readAll();
        if (response.isSuccess && response.processedSources) {
            setProcessedSources(response.processedSources);
        } else {
            alert(response.message);
        }
    }

    useEffect(() => {
        fetchProcessedSources();
    }, []);

    function toggleProcessedSourceActionMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, sourceId: string) {
        event.stopPropagation();
        const sourceActionMenu = document.getElementById('processed-source-action-menu');
        const container = document.getElementById('processed-sources-page-container');
        if (sourceActionMenu && container) {
            const containerRect = container?.getBoundingClientRect();
            const positionOfButton = event.currentTarget.getBoundingClientRect();
            sourceActionMenu.style.top = `${positionOfButton.bottom - containerRect?.top}px`;
            sourceActionMenu.style.left = `${positionOfButton.right - containerRect?.left}px`;
            setActionMenuSourceId(sourceId);
            setIsSourceActionMenuHidden((prev) => !prev);
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

    async function deleteProcessedSource(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        const response = await processedSourceService.deleteById(actionMenuSourceId);
        alert(response.message);
        fetchProcessedSources();
    }

    return (
        <div id='processed-sources-page-container'
            className={`w-full h-full flex flex-col justify-start items-center ${className ?? ''}`}
        >
            <ProcessedSourceActionMenu
                isHidden={isSourceActionMenuHidden}
                setIsHidden={setIsSourceActionMenuHidden}
                processedSourceId={actionMenuSourceId}
                fetchProcessedSources={fetchProcessedSources}
                toggleCreateExerciseSetForm={toggleCreateExerciseSetForm}
                toggleDeleteApproval={toggleDeleteApproval}
            />

            <div // main
                className="w-full h-auto p-4
                grid grid-cols-3 gap-8"
            >
                <div
                    className="w-full h-auto col-span-3
                    flex flex-col justify-center items-center p-4"
                >
                    <p className='text-2xl font-bold'>Processed Sources</p>
                </div>
                {processedSources.length === 0 ? (
                    <LoadingPage />
                ) : (
                    processedSources.map((processedSources) => (
                        <ProcessedSourceCard
                            processedSource={processedSources}
                            fetchProcessedSources={fetchProcessedSources}
                            toggleSourceActionMenu={toggleProcessedSourceActionMenu}
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
                <div className='w-full h-[75%] flex justify-center items-center'>
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
                                deleteProcessedSource(event);
                            }}>Delete</ClaretButton>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
