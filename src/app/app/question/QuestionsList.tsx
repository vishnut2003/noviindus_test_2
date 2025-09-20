'use client';

import { RootState } from "@/store";
import { RiTimeFill } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SidebarQuestionsList = () => {

    const router = useRouter();

    const [timeDiff, setTimeDiff] = useState<number | null>(null);
    const questions = useSelector((state: RootState) => state.questions.questionsReducer.data);

    useEffect(() => {
        const _endTime = localStorage.getItem("exam_end_time");
        if (!_endTime) {
            router.push("/app");
            return;
        }

        const endTimeNumber = parseInt(_endTime);

        function updateTimer() {
            const now = Date.now();
            const diff = (timeDiff || endTimeNumber) - now;
            setTimeDiff(diff > 0 ? diff : 0);
        }

        updateTimer();

        const intervel = setInterval(updateTimer, 1000);

        return () => clearInterval(intervel);

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className='min-w-full md:min-w-[500px] h-full p-[20px] space-y-[25px] flex flex-col items-center justify-between'
        >
            <div
                className="space-y-[25px] w-full"
            >
                <div
                    className="flex w-full items-center justify-between text-[15px] gap-[30px] font-medium"
                >
                    <p>Question No. Sheet:</p>
                    <div
                        className="flex items-center gap-[5px]"
                    >
                        <p>Remaining Time:</p>
                        <div
                            className="flex items-center gap-[3px] py-[5px] px-[10px] bg-theme-primary rounded-[7px] text-white min-w-[100px]"
                        >
                            <RiTimeFill
                                size={20}
                            />
                            {
                                timeDiff &&
                                <p
                                    className="w-full text-center"
                                >{Math.floor(timeDiff / 1000 / 60).toString().padStart(2, "0")}:{Math.floor((timeDiff / 1000) % 60).toString().padStart(2, "0")}</p>
                            }
                        </div>
                    </div>
                </div>

                <div
                    className="grid grid-cols-8 gap-[5px]"
                >
                    {
                        questions &&
                        questions.map((question, index) => (
                            <button
                                key={index}
                                className={`min-h-[55px] rounded-[6px] font-medium text-[20px] cursor-pointer ${question.status === "attended" ? "bg-green-600 text-white" : question.status === "not_attended" ? "bg-red-600 text-white" : question.status === "for_review" ? "bg-violet-600 text-white" : question.status === "ans_for_review" ? "border-[8px] border-violet-800 bg-green-600 text-white" : "border border-gray-300 bg-white" }`}
                                onClick={() => {
                                    router.push(`/app/question?number=${question.number}`);
                                }}
                            >
                                {question.number}
                            </button>
                        ))
                    }
                </div>
            </div>

            <div
                className="flex items-center gap-[15px] w-full"
            >
                {
                    [
                        {
                            color: "green",
                            label: "Attended",
                        },
                        {
                            color: "red",
                            label: "Not Attended",
                        },
                        {
                            color: "voilet",
                            label: "Marked For Review",
                        },
                        {
                            color: "green",
                            border: "#800080",
                            label: "Answered and Marked For Review",
                        }
                    ]
                        .map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-[5px] w-full max-w-max"
                            >
                                <div
                                    className={`min-w-[20px] h-[20px] rounded-[6px] ${item.color === "green" ? "bg-green-600" : item.color === "red" ? "bg-red-600" : item.color == "voilet" ? "bg-violet-800" : ""} ${item.border ? `border-[4px] border-violet-800` : "border-gray-300"}`}
                                />
                                <p
                                    className="text-[13px] line-clamp-1"
                                >{item.label}</p>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default SidebarQuestionsList