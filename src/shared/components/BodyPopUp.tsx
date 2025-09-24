import type React from "react";

export function BodyPopUp({ isPopUpActive, components }: {
    isPopUpActive: boolean;
    components: React.ReactNode[];
}) {
    return (
        <div
            className={`${!isPopUpActive && 'hidden'} absolute z-20 w-full h-full`}
        >
            <div className='w-full h-[75%] flex justify-center items-center'>
                {components}
            </div>
        </div>
    );
}
