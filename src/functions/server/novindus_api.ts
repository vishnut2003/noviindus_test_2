"use server"

import axios from "axios";
import { handleCatchBlock } from "../common";

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
    access_token: string,
    refresh_token: string,
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

export async function createProfile(data: CreateProfileRequestInterface) {
    return new Promise<string>(async (resolve, reject) => {
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

            return resolve(response.access_token);

        } catch (err) {
            return reject(err);
        }
    })
}

export interface QuestionsResponseInterface {
    success: boolean,
    questions_count: number,
    total_marks: number,
    total_time: number,
    time_for_each_question: number,
    mark_per_each_answer: number,
    instruction: string,
    questions: SingleQuestionInterface[]
}

export interface SingleQuestionInterface {
    question_id: number,
    number: number,
    question: string,
    comprehension: string,
    image: string | null,
    options: {
        id: number,
        image: string | null,
        is_correct: boolean,
        option: string,
    }[],
}

export async function fetchQuestions({ access_token }: {
    access_token: string,
}) {
    return new Promise<QuestionsResponseInterface>(async (resolve, reject) => {
        try {

            const { data } = await axios.get<QuestionsResponseInterface>(
                `${NOVIINDUS_BASE_URL}/question/list`,
                {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                    }
                }
            );

            if (!data.success) {
                throw new Error("Something went wrong");
            }

            return resolve(data)

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}

export interface SubmitExamRequestData {
    answers: {
        question_id: number,
        selected_option_id: number | null,
    }[]
}

export interface SubmitExamResponse {
    success: boolean,
    exam_history_id: string,
    score: number,
    correct: number,
    wrong: number,
    not_attended: number,
    submitted_at: number,
}

export async function submitExam ({
    access_token,
    data,
}: {
    data: SubmitExamRequestData,
    access_token: string,
}) {
    return new Promise<SubmitExamResponse>(async (resolve, reject) => {
        try {
            console.log(data.answers)
            const formData = new FormData();
            formData.append("answers", JSON.stringify(data.answers));

            const {
                data: response,
            } = await axios.post<SubmitExamResponse>(
                `${NOVIINDUS_BASE_URL}/answers/submit`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                    }
                }
            )

            return resolve(response);

        } catch (err) {
            return reject(err);
        }
    })
}