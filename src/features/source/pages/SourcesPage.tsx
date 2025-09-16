import React, { useEffect, useState } from 'react';
import { sourceService } from '../services/source.service';
import type { Source } from '../types/source.iterface';
import { NavyBlueButton } from '../../../shared/components/buttons/NavyBlueButton';
import { SourceCard } from '../components/SourceCard';
import { CreateExerciseSetForm } from '../../exercise-set/components/CreateExerciseSetForm';
import type { CreateExerciseSetDto } from '../../exercise-set/types/dto/create-exercise-set.dto';

export function SourcesPage({ className }: { className?: string }) {
    const [sources, setSources] = useState<Source[]>([]);
    const [file, setFile] = useState<File>();
    const [isCreateExerciseSetFormHidden, setIsCreateExerciseSetFormHidden] =
        useState<boolean>(true);
    const [createExerciseSetSourceId, setCreateExerciseSetSourceId] = useState<string>('');
    const [createExerciseSetDto, setCreateExerciseSetDto] = useState<CreateExerciseSetDto>({
        count: 5,
        type: '',
        difficulty: '',
    });

    function toggleCreateExerciseSetForm(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        const createExerciseSetForm = document.getElementById('create-exercise-set-form');
        if (createExerciseSetForm !== null) {
            if (isCreateExerciseSetFormHidden) {
                setCreateExerciseSetDto({
                    count: 5,
                    type: '',
                    difficulty: '',
                });
            }

            if (event.currentTarget.dataset.sourceId) {
                setCreateExerciseSetSourceId(event.currentTarget.dataset.sourceId);
            }

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
                    <NavyBlueButton onClick={uploadSource}>Upload</NavyBlueButton>
                </div>
            </div>
            {sources.length === 0 ? (
                <p>Loading...</p>
            ) : (
                sources.map((source) => (
                    <SourceCard
                        source={source}
                        fetchSources={fetchSources}
                        toggleCreateExerciseSetForm={toggleCreateExerciseSetForm}
                    />
                ))
            )}
            <CreateExerciseSetForm
                isHidden={isCreateExerciseSetFormHidden}
                sourceId={createExerciseSetSourceId}
                createExerciseSetDto={createExerciseSetDto}
                setCreateExerciseSetDto={setCreateExerciseSetDto}
            />
        </div>
    );
}
