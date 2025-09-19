import { handleCatchBlock } from "@/functions/common";
import { sendOtp } from "@/functions/server/novindus_api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const {
            mobile,
        } = await request.json() as {
            mobile: string,
        };

        await sendOtp({ mobile });
        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}