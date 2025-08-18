import axios from "axios";
import type { ReadAllSourcesResponse } from "./types/source-responses";

const baseUrl = `${import.meta.env.VITE_API_URL}/source`;

async function readAll(): Promise<ReadAllSourcesResponse> {
    const readAllResponse = (await axios.get(`${baseUrl}/read-all`, { withCredentials: true })).data;
    return readAllResponse;
}

export const sourceService = {
    readAll,
};
