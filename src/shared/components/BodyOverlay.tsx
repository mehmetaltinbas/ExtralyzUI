export function BodyOverlay({ isPopUpActive }: {
    isPopUpActive: boolean;
}) {
    return (
            <div
                className={`${!isPopUpActive && 'hidden'} absolute z-10 w-full h-full backdrop-blur-xs`}
            >
            </div>
    );
}
