import { useEffect, useState } from 'react';
import { sourceService } from '../../services/source/source.service';
import type { SourceDocument } from '../../services/source/types/SourceDocument';

export function Sources() {
    const [sources, setSources] = useState<SourceDocument[]>([]);

    useEffect(() => {
        sourceService.readAll().then(response => {
            if (response.isSuccess && response.sources) {
                setSources(response.sources);
            } else {
                alert(response.message);
            }
        }).catch(error => {

        });          
    }, []);

    return (
        <div>
            
        </div>
    );
}
