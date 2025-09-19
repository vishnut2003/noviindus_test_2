import axios from "axios";
import { Session } from "next-auth";

export async function getClientSession() {
    return new Promise<Session>(async (resolve) => {
    const { data: session } = await axios.get<Session>("/api/auth/session");
    console.log(session);
    resolve(session)
})
}