import React, { useEffect, useState } from 'react';
import { sourceService } from '../services/source.service';
import type { Source } from '../types/source.iterface';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';
import { SourceCard } from '../components/SourceCard';
import { LoadingPage } from 'src/shared/pages/LoadingPage';
import { SourceActionMenu } from 'src/features/source/components/SourceActionMenu';
import { CreateExerciseSetForm } from 'src/features/exercise-set/components/CreateExerciseSetForm';
import { ProcessSourceForm } from 'src/features/processed-source/components/ProcessSourceForm';
import { useAppSelector } from 'src/store/hooks';
import { BodyOverlay } from 'src/shared/components/BodyOverlay';
import { DeleteApproval } from 'src/shared/components/DeleteApproval';
import { BodyPopUp } from 'src/shared/components/BodyPopUp';
import { SourceCreateForm } from 'src/features/source/components/SourceCreateForm';

export function SourcesPage({ className }: { className?: string }) {
    const sidebar = useAppSelector(state => state.sidebar);
    const [sources, setSources] = useState<Source[]>([]);
    const [isPopUpActive, setIsPopUpActive] = useState<boolean>(false);
    const [isSourceCreateFormHidden, setIsSourceCreateFormHidden] = useState<boolean>(true);
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

    function toggleCreateSourceForm() {
        setIsSourceCreateFormHidden(prev => !prev);
        setIsPopUpActive(prev => !prev);
    }

    function toggleProcessSourceForm() {
        setIsProcessSourceFormHidden((prev) => !prev);
        setIsPopUpActive(prev => !prev);
    }

    function toggleCreateExerciseSetForm() {
        setIsCreateExerciseSetFormHidden((prev) => !prev);
        setIsPopUpActive(prev => !prev);
    }

    function toggleDeleteApproval() {
        setIsDeleteApprovalHidden((prev) => !prev);
        setIsPopUpActive(prev => !prev);
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

    async function deleteSource() {
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
                className={`absolute w-full h-auto p-4
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}
            >
                <div
                    className="relative w-full h-auto p-4 col-span-1 sm:col-span-2 lg:col-span-3
                    flex flex justify-center items-center gap-2"
                >
                    <p className='text-2xl font-bold'>Sources</p>
                    <BlackButton 
                        onClick={toggleCreateSourceForm}
                        className='absolute right-4'
                    >new Source</BlackButton>
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

            <BodyOverlay isPopUpActive={isPopUpActive} />
            <BodyPopUp
                isPopUpActive={isPopUpActive}
                components={[
                    <SourceCreateForm 
                        isHidden={isSourceCreateFormHidden}
                        toggle={toggleCreateSourceForm}
                        fetchSources={fetchSources}
                    />,
                    <ProcessSourceForm 
                        isHidden={isProcessSourceFormHidden}
                        toggleProcessSourceForm={toggleProcessSourceForm}
                        sourceId={actionMenuSourceId}
                    />,
                    <CreateExerciseSetForm 
                        isHidden={isCreateExerciseSetFormHidden} 
                        sourceId={actionMenuSourceId}
                        toggleCreateExerciseSetForm={toggleCreateExerciseSetForm}
                    />,
                    <DeleteApproval
                        isHidden={isDeleteApproavelHidden}
                        toggle={toggleDeleteApproval}
                        onDelete={deleteSource}
                    />
                ]}
            ></BodyPopUp>

        </div>
    );
}
