import type { ProcessedSource } from "../types/processed-source.interface";

export function ProcessedSourcePage({ processedSource }: {
    processedSource: ProcessedSource;
}) {
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-4 p-4">
            <p>{processedSource?.title ? processedSource?.title : processedSource?._id}</p>
            <p>{processedSource?.processedText}</p>
        </div>
    );
}
