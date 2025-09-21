import type { ProcessedSource } from '../types/processed-source.interface';

export function ProcessedSourcePage({
    processedSource,
    className,
}: {
    processedSource: ProcessedSource;
    className?: string;
}) {
    return (
        <div
            className={`${className ?? ''} w-full h-full 
            flex flex-col justify-center items-center gap-4 p-10`}
        >
            <p>{processedSource?.title ? processedSource?.title : processedSource?._id}</p>
            <p>{processedSource?.processedText}</p>
        </div>
    );
}
