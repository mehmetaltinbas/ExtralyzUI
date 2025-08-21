import type { HTMLAttributes, HtmlHTMLAttributes } from "react";
import type { SourceDocument } from "../services/source/types/SourceDocument";
import { ClaretButton } from "./buttons/ClaretButton";
import type React from "react";
import { sourceService } from "../services/source/source.service";

export function SourceCard({ source, fetchSources }: {
        source: SourceDocument;
        fetchSources: () => void
    }) {

    async function deleteSource(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const response = await sourceService.deleteById(source._id);
        alert(response.message);
        fetchSources();
    }

    return (
        <div className='h-full flex justify-center items-center'>
            <div className='w-[250px] h-[150px] border flex flex-col'>
                <div className='w-full h-[50px] flex justify-center items-center gap-1'>
                    <p>{source.title}</p>
                    <ClaretButton handleOnClick={deleteSource}>
                        Delete
                    </ClaretButton>
                </div>
                <div className='flex-1 border overflow-auto'>
                    <p>{source.rawText}</p>
                </div>
            </div>
        </div>
    );
}
