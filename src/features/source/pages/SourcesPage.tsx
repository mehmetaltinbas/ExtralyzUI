import React, { useEffect, useState } from 'react';
import { sourceService } from '../services/source.service';
import type { Source } from '../types/source.iterface';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';
import { SourceCard } from '../components/SourceCard';
import { LoadingPage } from 'src/shared/pages/LoadingPage';
import { SourceActionMenu } from 'src/features/source/components/SourceActionMenu';
import { CreateExerciseSetForm } from 'src/features/exercise-set/components/CreateExerciseSetForm';
import type { CreateExerciseSetDto } from 'src/features/exercise-set/types/dto/create-exercise-set.dto';
import { ProcessSourceForm } from 'src/features/processed-source/components/ProcessSourceForm';

export function SourcesPage({ className }: { className?: string }) {
    const [sources, setSources] = useState<Source[]>([]);
    const [file, setFile] = useState<File>();
    const [actionMenuSourceId, setActionMenuSourceId] = useState<string>('');
    const [isSourceActionMenuHidden, setIsSourceActionMenuHidden] = useState<boolean>(true);
    const [isCreateExerciseSetFormHidden, setIsCreateExerciseSetFormHidden] =
        useState<boolean>(true);
    const [isProcessSourceFormHidden, setIsProcessSourceFormHidden] =
        useState<boolean>(true);

    function toggleSourceActionMenu(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, source: Source) {
        event.stopPropagation();
        const sourceActionMenu = document.getElementById('sourceActionMenu');
        if (sourceActionMenu) {
            const positionOfButton = event.currentTarget.getBoundingClientRect();
            sourceActionMenu.style.top = `${positionOfButton.bottom}px`;
            sourceActionMenu.style.left = `${positionOfButton.right}px`;
            setActionMenuSourceId(source._id);
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

    return (
        <div
            className={`w-full h-auto p-5
            grid grid-cols-3 gap-8 ${className ?? ''}`}
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

            <SourceActionMenu 
                isHidden={isSourceActionMenuHidden} 
                setIsHidden={setIsSourceActionMenuHidden} 
                sourceId={actionMenuSourceId} 
                fetchSources={fetchSources}
                toggleCreateExerciseSetForm={toggleCreateExerciseSetForm}
                toggleProcessSourceForm={toggleProcessSourceForm}
            />

            <CreateExerciseSetForm 
                isHidden={isCreateExerciseSetFormHidden} 
                sourceId={actionMenuSourceId}
            />

            <ProcessSourceForm 
                isHidden={isProcessSourceFormHidden}
                setIsHidden={setIsProcessSourceFormHidden}
                sourceId={actionMenuSourceId}
            />

        </div>
    );
}
