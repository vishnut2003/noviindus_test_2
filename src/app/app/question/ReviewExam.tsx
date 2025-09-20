'use client';

import ErrorTemplate from "@/components/ui-element/ErrorTemplate";
import { handleCatchBlock } from "@/functions/common";
import { SubmitExamRequestData, SubmitExamResponse } from "@/functions/server/novindus_api";
import { RootState } from "@/store";
import { RiCheckLine, RiCloseLargeLine, RiCloseLine, RiQuestionMark, RiTimeFill } from "@remixicon/react";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetData } from "@/store/slices/questions"
import { signOut } from "next-auth/react";

const ReviewExam = ({ closePopup }: {
    closePopup: () => void,
}) => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [finalResponse, setFinalResponse] = useState<SubmitExamResponse>();

    const dispatch = useDispatch();

    const questions = useSelector((state: RootState) => state.questions.questionsReducer.data);
    const [stats, setStats] = useState<{
        remaining: number,
        totalQuestions: number,
        questionsAnswered: number,
        answersForReview: number,
        notAttended: number,
    }>({
        answersForReview: 0,
        questionsAnswered: 0,
        remaining: 0,
        totalQuestions: 0,
        notAttended: 0,
    });

    useEffect(() => {
        setStats(prev => ({
            ...prev,
            totalQuestions: questions.length,
        }))
        
        const answered = questions.filter((question) => question.status === "attended" || question.status === "ans_for_review");
        const forReview = questions.filter((question) => question.status === "for_review" || question.status === "ans_for_review");

        setStats(prev => ({
            ...prev, 
            questionsAnswered: answered.length,
            answersForReview: forReview.length,
        }))

        const _endTime = localStorage.getItem("exam_end_time");
        if (!_endTime) {
            return;
        }

        const endTimeNumber = parseInt(_endTime);

        function updateTimer() {
            const now = Date.now();
            const diff = (stats["remaining"] > 0 ? stats["remaining"] : endTimeNumber) - now;
            setStats(prev => ({
                ...prev,
                remaining: diff > 0 ? diff : 0
            }));
        }

        updateTimer();

        const intervel = setInterval(updateTimer, 1000);

        return () => clearInterval(intervel);

    }, [questions, stats])

    async function handleTestSubmit() {

        setInProgress(true);

        try {
            const data: SubmitExamRequestData["answers"] = [];
            for (const question of questions) {
                data.push({
                    question_id: question.question_id,
                    selected_option_id: question.selectedOption,
                })
            }

            const { data: response } = await axios.post<SubmitExamResponse>("/api/noviindus/submit-exam", {
                answers: data,
            })

            console.log(response);

            setFinalResponse(response);
            setSuccess(true)

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }

        setInProgress(false);
    }

    if (success) {
        return (
            <motion.div
                className='fixed top-0 left-0 w-full h-full z-20 bg-white flex items-center justify-center p-[30px]'
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
            >
                <motion.div
                    className="max-w-[500px] w-full p-[30px] bg-white space-y-[25px] rounded-[10px]"
                    initial={{
                        scale: 0.9,
                    }}
                    animate={{
                        scale: 1,
                    }}
                >
                    <div
                        className="space-y-[0px] py-[30px] text-white text-center px-[20px] rounded-[10px] bg-gradient-to-br from-theme-primary to-theme-secondary"
                    >
                        <p
                            className="text-[20] text-[20px]"
                        >Marks Obtained:</p>
                        <p
                            className="text-[70px] font-semibold"
                        >{finalResponse?.score}/{questions.length}</p>
                    </div>

                    <div
                        className="space-y-[20px]"
                    >
                        {
                            [
                                {
                                    icon: RiQuestionMark,
                                    label: "Total Questions:",
                                    value: stats.totalQuestions,
                                    color: "bg-yellow-500"
                                },
                                {
                                    icon: RiCheckLine,
                                    label: "Correct Answers:",
                                    value: finalResponse?.correct,
                                    color: "bg-green-600"
                                },
                                {
                                    icon: RiCloseLine,
                                    label: "Incorrect Answers:",
                                    value: finalResponse?.wrong,
                                    color: "bg-red-600"
                                },
                                {
                                    icon: RiQuestionMark,
                                    label: "Not Attended Questions:",
                                    value: finalResponse?.not_attended,
                                    color: "bg-gray-700",
                                }
                            ]
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center w-full gap-[25px]"
                                    >
                                        <div
                                            className="flex items-center gap-[15px]"
                                        >
                                            <div
                                                className={`min-w-[50px] h-[50px] flex items-center justify-center text-white rounded-[8px] ${item.color}`}
                                            >
                                                <item.icon
                                                    size={20}
                                                />
                                            </div>
                                            <p
                                                className="text-[17px] font-semibold"
                                            >{item.label}</p>
                                        </div>
                                        <p
                                            className="text-[17px] font-semibold"
                                        >{item.value}</p>
                                    </div>
                                ))
                        }
                    </div>

                    <button
                        className="primary-btn bg-theme-primary text-white !py-[18px] !text-[18px]"
                        disabled={inProgress}
                        onClick={async () => {
                            dispatch(resetData());
                            await signOut();
                        }}
                    >
                        Done
                    </button>
                </motion.div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className='fixed top-0 left-0 w-full h-full z-20 bg-black/50 flex items-center justify-center p-[30px]'
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
        >
            <motion.div
                className="max-w-[500px] w-full p-[30px] bg-white space-y-[25px] rounded-[10px]"
                initial={{
                    scale: 0.9,
                }}
                animate={{
                    scale: 1,
                }}
            >
                <div
                    className="flex items-center w-full justify-between"
                >
                    <p
                        className="text-[18px] font-semibold"
                    >Are you sure you want to submit the test?</p>
                    <button
                        className="cursor-pointer"
                        onClick={closePopup}
                    >
                        <RiCloseLargeLine
                            size={20}
                        />
                    </button>
                </div>

                <div
                    className="space-y-[20px]"
                >
                    {
                        [
                            {
                                icon: RiTimeFill,
                                label: "Remaining Time:",
                                value: `${Math.floor(stats["remaining"] / 1000 / 60).toString().padStart(2, "0")}:${Math.floor((stats["remaining"] / 1000) % 60).toString().padStart(2, "0")}`,
                                color: "bg-theme-primary"
                            },
                            {
                                icon: RiQuestionMark,
                                label: "Total Questions:",
                                value: stats.totalQuestions.toString().padStart(3, "0"),
                                color: "bg-yellow-500"
                            },
                            {
                                icon: RiQuestionMark,
                                label: "Questions Answered:",
                                value: stats.questionsAnswered.toString().padStart(3, "0"),
                                color: "bg-green-600"
                            },
                            {
                                icon: RiQuestionMark,
                                label: "Marked for review:",
                                value: stats.answersForReview.toString().padStart(3, "0"),
                                color: "bg-violet-600"
                            },
                        ]
                            .map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center w-full gap-[25px]"
                                >
                                    <div
                                        className="flex items-center gap-[15px]"
                                    >
                                        <div
                                            className={`min-w-[50px] h-[50px] flex items-center justify-center text-white rounded-[8px] ${item.color}`}
                                        >
                                            <item.icon
                                                size={20}
                                            />
                                        </div>
                                        <p
                                            className="text-[17px] font-semibold"
                                        >{item.label}</p>
                                    </div>
                                    <p
                                        className="text-[17px] font-semibold"
                                    >{item.value}</p>
                                </div>
                            ))
                    }
                </div>

                <button
                    className="primary-btn bg-theme-primary text-white !py-[18px] !text-[18px]"
                    disabled={inProgress}
                    onClick={handleTestSubmit}
                >
                    {inProgress ? "Loading..." : "Submit Test"}
                </button>

                {
                    error &&
                    <ErrorTemplate
                        message={error}
                    />
                }
            </motion.div>
        </motion.div>
    )
}

export default ReviewExam