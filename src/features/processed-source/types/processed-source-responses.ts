import type { ResponseBase } from '../../../shared/types/response-base';
import type { ProcessedSource } from './ProcessedSource';

export interface ReadAllProcessedSourcesResponse extends ResponseBase {
    processedSources: ProcessedSource[];
}
