'use client';

import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";

const SingleQuestionLayout = ({ children }: PropsWithChildren) => {

    const router = useRouter();
    const questions = useSelector((state: RootState) => state.questions.questionsReducer.data);

    useEffect(() => {
        const endTime = localStorage.getItem("exam_end_time");
        if (!endTime) {
            router.push("/app");
            return;
        }

        const endTimeNumber = parseInt(endTime);
        const diff = endTimeNumber - Date.now();

        console.log("questions")
        console.log(questions)

        if (diff <= 0 || !questions || questions.length === 0) {
            localStorage.removeItem("exam_end_time");
            router.push("/app");
        }
    }, [questions, router])

    return (
        <>
            {children}
        </>
    )
}

export default SingleQuestionLayout