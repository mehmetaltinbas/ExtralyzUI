import type { ResponseBase } from "../../../../shared/types/response-base";
import type { Source } from "../source.iterface";

export interface ReadSingleSourceResponse extends ResponseBase {
    source?: Source;
}