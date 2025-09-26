import { BlackButton } from "src/shared/components/buttons/BlackButton";
import { ClaretButton } from "src/shared/components/buttons/ClaretButton";

export function DeleteApproval({ isHidden, toggle, onDelete }: {
    isHidden: boolean;
    toggle: () => void;
    onDelete: () => Promise<void>;
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
                        toggle();
                    }}
                >
                    Cancel
                </BlackButton>
                <ClaretButton 
                    onClick={async (event) => { 
                        await onDelete();
                        toggle();
                }}
                >
                    Delete
                </ClaretButton>
            </div>
        </div>
    );
}
