import { useEffect } from "react";

export function BodyOverlay({ isPopUpActive }: {
    isPopUpActive: boolean;
}) {
    useEffect(() => {
        console.log(isPopUpActive);
    }, [isPopUpActive]);

    return (
        <div
            className={`${!isPopUpActive && 'hidden'} absolute z-10 w-full h-full backdrop-blur-xs`}
        >
        </div>
    );
}
