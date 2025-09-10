import { useEffect } from "react";
import type { Source } from "../types/source.iterface";

export function SourcePage({ source }: {
    source: Source
}) {

    return (
        <div>
            <p>{source?.title}</p>
            <p>{source?.type}</p>
            <p>{source?.rawText}</p>
        </div>
    );
}
