import type { ResponseBase } from "../../shared/types/response-base";

export interface SignInResponse extends ResponseBase {
    jwt?: string;
    userId?: string;
}
