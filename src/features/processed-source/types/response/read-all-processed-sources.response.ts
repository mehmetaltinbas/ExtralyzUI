import type { ResponseBase } from '../../../../shared/types/response-base';
import type { ProcessedSource } from '../processed-source.interface';

export interface ReadAllProcessedSourcesResponse extends ResponseBase {
    processedSources: ProcessedSource[];
}
