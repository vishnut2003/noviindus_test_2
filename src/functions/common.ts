import { AxiosError } from "axios";

export function handleCatchBlock (err: any): string { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (err instanceof AxiosError) {
        if (err.response?.data && typeof err.response.data === "string") {
            return err.response.data;
        } else {
            return err.message;
        }
    } else if (err instanceof Error) {
        return err.message;
    } else if (typeof err === "string") {
        return err;
    } else {
        return "Something went wrong!";
    }
}