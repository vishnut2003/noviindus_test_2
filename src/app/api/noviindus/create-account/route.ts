import { handleCatchBlock } from "@/functions/common";
import { createProfile, CreateProfileRequestInterface } from "@/functions/server/novindus_api";
import { cookies } from "next/headers";
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

        const access_token = await createProfile(userData);

        const cookiesData = await cookies();
        cookiesData.set({
            name: "access_token",
            value: access_token,
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}