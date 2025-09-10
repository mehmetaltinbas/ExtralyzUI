import type { ProcessedSource } from "../types/processed-source.interface";

export function ProcessedSourcePage({ processedSource }: {
    processedSource: ProcessedSource;
}) {
    return (
        <div>
            <p>{processedSource?.title}</p>
            <p>{processedSource?.processedText}</p>
        </div>
    );
}
