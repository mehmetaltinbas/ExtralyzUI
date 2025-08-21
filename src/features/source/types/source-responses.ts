import type { ResponseBase } from "../../../shared/types/response-base";
import type { SourceDocument } from "./SourceDocument";

export interface ReadAllSourcesResponse extends ResponseBase {
    sources?: SourceDocument[];
}