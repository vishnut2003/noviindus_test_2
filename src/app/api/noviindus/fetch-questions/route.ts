import { handleCatchBlock } from "@/functions/common";
import { fetchQuestions } from "@/functions/server/novindus_api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const cookiesHeader = await cookies();
        const token = cookiesHeader.get("access_token")?.value;

        if (!token) {
            throw new Error("Unauthorized access");
        }

        const data = await fetchQuestions({ access_token: token })

        return NextResponse.json(data);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}