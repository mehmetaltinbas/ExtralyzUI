import type React from "react";

/**
    * Renders a modal inside the closest non-static container element with a dimmed overlay and centered content.
    * @param isPopUpActive - Whether the pop-up modal is visible.
    * @param components - Array of React nodes to render inside the modal.
*/
export function BodyModal({ isPopUpActive, components }: {
    isPopUpActive: boolean;
    components: React.ReactNode[];
}) {
    return (
        <>
            <div // overlay
                className={`${!isPopUpActive && 'hidden'} absolute z-10 w-full h-full backdrop-blur-xs`}
            >
            </div>

            <div // pop up
                className={`${!isPopUpActive && 'hidden'} absolute z-20 w-full h-full`}
            >
                <div className='w-full h-[75%] flex justify-center items-center'>
                    {components}
                </div>
            </div>
        </>
    );
}
