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
            className={`w-full h-auto flex flex-col justify-center items-center gap-4 p-4 ${className ?? ''}`}
        >
            <p>{processedSource?.title ? processedSource?.title : processedSource?._id}</p>
            <p>{processedSource?.processedText}</p>
        </div>
    );
}
