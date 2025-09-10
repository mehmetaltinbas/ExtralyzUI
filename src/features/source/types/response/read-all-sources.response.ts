import type { ResponseBase } from '../../../../shared/types/response-base';
import type { Source } from '../source.iterface';

export interface ReadAllSourcesResponse extends ResponseBase {
    sources?: Source[];
}
