import type { ResponseBase } from '../../../shared/types/response-base';
import type { Source } from './Source';

export interface ReadAllSourcesResponse extends ResponseBase {
    sources?: Source[];
}
