import axios from "axios";
import type { SignInDto } from "./types/auth-dtos";
import type { ResponseBase } from "../shared/types/response-base";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

async function signIn(signInDto: SignInDto): Promise<ResponseBase> {
    const signInResponse: ResponseBase = (await axios.post(`${baseUrl}/sign-in`, signInDto, { withCredentials: true })).data;
    return signInResponse;
}

async function authorize() {
    const authorizeResponse: ResponseBase = (await axios.get(`${baseUrl}/authorize`, { withCredentials: true })).data;
    return authorizeResponse;
}

export const authService = {
    signIn,
    authorize
};
