import React, { useEffect, useState } from 'react';
import { sourceService } from '../source.service';
import type { SourceDocument } from '../types/SourceDocument';
import { NavyBlueButton } from '../../../shared/components/buttons/NavyBlueButton';
import { SourceCard } from '../SourceCard';

export function Sources() {
    const [sources, setSources] = useState<SourceDocument[]>([]);
    const [file, setFile] = useState<File>();

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
        <div className='w-full h-full flex flex-col justify-start items-center'>
            <div className='w-[95%] h-auto border grid grid-cols-3 gap-8'>
                <div className='h-[100px] col-span-3 border flex justify-center items-center'>
                    <div className='w-[400px] h-[80px] border'>
                        <input 
                            onChange={event => handleOnChange(event)}
                            type='file'
                            className='border rounded-full p-1 w-[200px] text-xs'
                        />
                        <NavyBlueButton handleOnClick={uploadSource}>Upload</NavyBlueButton>
                    </div>
                </div>
                {sources.length === 0 ? <p>Loading...</p> :  sources.map(source => (
                    <SourceCard source={source} fetchSources={fetchSources}/>
                ))}
            </div>
        </div>
    );
}
