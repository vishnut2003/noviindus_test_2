import { handleCatchBlock } from "@/functions/common";
import { submitExam, SubmitExamRequestData } from "@/functions/server/novindus_api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {

        const cookiesHeader = await cookies();
        const token = cookiesHeader.get("access_token")?.value;

        if (!token) {
            throw new Error("Unauthorized access");
        }

        const body = await request.json() as SubmitExamRequestData;
        console.log(body);

        const response = await submitExam({
            access_token: token,
            data: body,
        })

        return NextResponse.json(response);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}