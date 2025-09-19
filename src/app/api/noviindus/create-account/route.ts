import { handleCatchBlock } from "@/functions/common";
import { createProfile, CreateProfileRequestInterface } from "@/functions/server/novindus_api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();

        const userData: CreateProfileRequestInterface = {
            email: formData.get("email")?.toString() || "",
            mobile: formData.get("mobile")?.toString() || "",
            name: formData.get("name")?.toString() || "",
            qualification: formData.get("qualification")?.toString() || "",
            profile_image: formData.get("profile_image") as File,
        }

        const user = await createProfile(userData);
        return NextResponse.json(user)

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}