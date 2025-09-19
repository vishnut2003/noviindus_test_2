"use server"

import axios from "axios";

const NOVIINDUS_BASE_URL = "https://nexlearn.noviindusdemosites.in";

export async function sendOtp({ mobile }: {
    mobile: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const formData = new FormData();
            formData.append("mobile", mobile)

            const {
                data,
            } = await axios.post<{
                success: boolean,
                message: string,
            }>(`${NOVIINDUS_BASE_URL}/auth/send-otp`, formData);

            if (!data.success) {
                throw new Error(`Sending OTP failed: ${data.message || "Something went wrong"}`);
            }

            return resolve();

        } catch (err) {
            return reject(err);
        }
    })
}

interface VerifyOtpResponseInterface {
    success: boolean,
    login: boolean,
    message: string,
}

export async function verifyOtp({
    mobile,
    otp,
}: {
    mobile: string,
    otp: string,
}) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            const formData = new FormData();
            formData.append("mobile", mobile);
            formData.append("otp", otp);

            const {
                data,
            } = await axios.post<VerifyOtpResponseInterface>(
                `${NOVIINDUS_BASE_URL}/auth/verify-otp`,
                formData,
            )

            if (!data.success) {
                throw new Error(`Verify OTP failed: ${data.message || "Something went wrong"}`);
            }

            return resolve();

        } catch (err) {
            return reject(err)
        }
    })
}

interface CreateProfileReponseInterface {
    success: boolean,
    message: string,
    user: UsersDetailsInterface,
}

interface UsersDetailsInterface {
    name: string,
}

export interface CreateProfileRequestInterface {
    mobile: string,
    name: string,
    email: string,
    qualification: string,
    profile_image: File,
}

export async function createProfile (data: CreateProfileRequestInterface) {
    return new Promise<UsersDetailsInterface>(async (resolve, reject) => {
        try {

            const formData = new FormData();

            for (const [key, value] of Object.entries(data)) {
                formData.append(key, value);
            }
            
            const {
                data: response,
            } = await axios.post<CreateProfileReponseInterface>(`${NOVIINDUS_BASE_URL}/auth/create-profile`, formData);
            
            if (!response.success) {
                throw new Error(`Create Profile Failed: ${response.message || "Something went wrong"}`);
            }

            return resolve(response.user);

        } catch (err) {
            return reject(err);
        }
    })
}