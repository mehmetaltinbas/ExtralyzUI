import type { ResponseBase } from '../../../../shared/types/response-base';
import type { Source } from '../source.interface';

export interface ReadSingleSourceResponse extends ResponseBase {
    source?: Source;
}
