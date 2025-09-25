import type React from "react";
import { BlackButton } from "src/shared/components/buttons/BlackButton";
import { ClaretButton } from "src/shared/components/buttons/ClaretButton";

export function DeleteApproval({ isHidden, toggle, onDelete }: {
    isHidden: boolean;
    toggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
    return (
        <div
            className={`${isHidden ? 'hidden' : ''} border px-2 py-4 bg-white rounded-[10px]
            flex flex-col justify-center items-center gap-2`}
        >
            <p>Are you sure?</p>
            <div className="flex justify-center items-center gap-2">
                <BlackButton 
                    onClick={event => {
                        toggle(event);
                    }}
                >
                    Cancel
                </BlackButton>
                <ClaretButton 
                    onClick={event => { 
                        toggle(event);
                        onDelete(event);
                }}
                >
                    Delete
                </ClaretButton>
            </div>
        </div>
    );
}
