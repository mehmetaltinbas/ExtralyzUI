import React, { useEffect, useState } from 'react';
import { sourceService } from '../services/source.service';
import type { Source } from '../types/source.iterface';
import { NavyBlueButton } from '../../../shared/components/buttons/NavyBlueButton';
import { SourceCard } from '../components/SourceCard';
import { CreateExerciseSetForm } from '../../exercise-set/components/CreateExerciseSetForm';
import type { CreateExerciseSetDto } from '../../exercise-set/types/dto/create-exercise-set.dto';

export function SourcesPage() {
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
            if (event.currentTarget.dataset.sourceId)
                setCreateExerciseSetSourceId(event.currentTarget.dataset.sourceId);
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
        <>
            <div className="w-full h-full flex flex-col justify-start items-center">
                <div className="w-[95%] h-auto border grid grid-cols-3 gap-8">
                    <div className="h-[100px] col-span-3 border flex justify-center items-center">
                        <div className="w-[400px] h-[80px] border">
                            <input
                                onChange={(event) => handleOnChange(event)}
                                type="file"
                                className="border rounded-full p-1 w-[200px] text-xs"
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
                </div>
            </div>

            <CreateExerciseSetForm
                isHidden={isCreateExerciseSetFormHidden}
                sourceId={createExerciseSetSourceId}
                createExerciseSetDto={createExerciseSetDto}
                setCreateExerciseSetDto={setCreateExerciseSetDto}
            />
        </>
    );
}
