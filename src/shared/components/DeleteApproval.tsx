import type React from "react";
import { BlackButton } from "src/shared/components/buttons/BlackButton";
import { ClaretButton } from "src/shared/components/buttons/ClaretButton";

export function DeleteApproval(
    { 
        isHidden, 
        setIsHidden,
        setIsPopUpActive,
        setIsLoadingPageHidden,
        toggle, 
        onDelete 
    }: {
        isHidden: boolean;
        setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
        setIsPopUpActive: React.Dispatch<React.SetStateAction<boolean>>;
        setIsLoadingPageHidden: React.Dispatch<React.SetStateAction<boolean>>;
        toggle: () => void;
        onDelete: () => Promise<string>;
    }
) {

    async function handleOnclick() {
        setIsHidden(true);
        setIsLoadingPageHidden(false);
        const message = await onDelete();
        setIsLoadingPageHidden(true);
        alert(message);
        setIsPopUpActive(false);
    }

    return (
        <div
            className={`${isHidden ? 'hidden' : ''} border px-2 py-4 bg-white rounded-[10px]
            flex flex-col justify-center items-center gap-2`}
        >
            <p>Are you sure?</p>
            <div className="flex justify-center items-center gap-2">
                <BlackButton 
                    onClick={event => {
                        toggle();
                    }}
                >
                    Cancel
                </BlackButton>
                <ClaretButton 
                    onClick={async (event) => { 
                        await handleOnclick();
                }}
                >
                    Delete
                </ClaretButton>
            </div>
        </div>
    );
}
