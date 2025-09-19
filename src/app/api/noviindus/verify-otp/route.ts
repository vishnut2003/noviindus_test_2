import { handleCatchBlock } from "@/functions/common";
import { verifyOtp } from "@/functions/server/novindus_api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const body = await request.json() as {
            mobile: string,
            otp: string,
        };

        await verifyOtp(body);
        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}