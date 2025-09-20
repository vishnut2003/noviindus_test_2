'use client';

import LoadingElement from '@/components/ui-element/LoadingElement';
import { RootState } from '@/store';
import { changeStatus, selectOption, SingleQuestionState } from '@/store/slices/questions';
import { RiQuoteText } from '@remixicon/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReviewExam from './ReviewExam';
import QuestionDescriptionPopup from './QuestionDescription';

const QuestionTemplate = () => {

    const [currentQuestion, setCurrentQuestion] = useState<SingleQuestionState | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>();

    const [showDescription, setShowDescription] = useState<boolean>(false);

    const questions = useSelector((state: RootState) => state.questions.questionsReducer.data);
    const dispatch = useDispatch();

    const searchParams = useSearchParams()
    const router = useRouter();

    const [showOverview, setShowOverview] = useState<boolean>(false);

    useEffect(() => {
        const questionNumber = searchParams.get("number");
        const intQuestionNumber = parseInt(questionNumber || "0");

        const _currentQuestion = questions.find((item) => item.number === intQuestionNumber);

        if (_currentQuestion) {
            setCurrentQuestion(_currentQuestion);
            setSelectedOption(_currentQuestion.selectedOption);
            return;
        }

    }, [searchParams, questions])

    if (!currentQuestion) {
        return (
            <LoadingElement />
        )
    }

    return (
        <div
            className='w-full space-y-[20px]'
        >
            <div
                className='w-full flex justify-end'
            >
                <p
                    className='text-right bg-white border border-gray-300 py-[5px] px-[15px] rounded-[6px]'
                >{currentQuestion.number}/100</p>
            </div>

            <div
                className='bg-white border-gray-300 p-[15px] space-y-[15px]'
            >
                <button
                    className='cursor-pointer text-[17px] py-[15px] px-[30px] bg-theme-secondary rounded-[8px] flex items-center text-white gap-[10px]'
                    onClick={() => {
                        setShowDescription(true);
                    }}
                >
                    <RiQuoteText
                        size={20}
                    />
                    <p>Read Comprehensive Paragraph</p>
                </button>

                <div
                    className='flex items-center gap-[10px] text-[18px] font-medium'
                >
                    <p>{currentQuestion.number}.</p>
                    <p
                        className='w-full'
                    >{currentQuestion.question}</p>
                </div>
            </div>

            <div
                className='w-full space-y-[20px]'
            >
                <p
                    className='text-sm'
                >Choose the answer:</p>

                {
                    currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className='flex items-center justify-between gap-[30px] w-full cursor-pointer bg-white border border-gray-300 rounded-[8px] py-[15px] px-[20px]'
                            onClick={() => {
                                dispatch(selectOption({ optionId: option.id, questionId: currentQuestion.question_id }))
                                setSelectedOption(option.id);
                            }}
                        >
                            <div
                                className='font-medium flex items-center gap-[15px]'
                            >
                                <p>{index + 1}.</p>
                                <p>{option.option}</p>
                            </div>

                            <div
                                className='h-[20px] min-w-[20px] p-[3px] pl-[4px] border-2 border-theme-primary rounded-full'
                            >
                                <div
                                    className={`h-full w-full ${option.id === selectedOption ? "bg-theme-primary" : ""} rounded-full`}
                                />
                            </div>

                        </button>
                    ))
                }
            </div>

            <div
                className='flex flex-col md:flex-row items-center gap-[10px] md:gap-[30px] text-sm'
            >
                {
                    [
                        {
                            label: "Mark for review",
                            bgColor: "bg-violet-800",
                            onclick: () => {
                                if (selectedOption) {
                                    dispatch(changeStatus({
                                        questionId: currentQuestion.question_id,
                                        status: "ans_for_review",
                                    }));
                                } else {
                                    dispatch(changeStatus({
                                        questionId: currentQuestion.question_id,
                                        status: "for_review",
                                    }))
                                }

                                if (currentQuestion.number === questions.length) {
                                    setShowOverview(true);
                                } else {
                                    router.push(`/app/question?number=${currentQuestion.number + 1}`);
                                }
                            },
                            color: "text-white"
                        },
                        {
                            label: "Pervious",
                            bgColor: "bg-gray-300",
                            onclick: () => {
                                if (selectedOption) {
                                    dispatch(changeStatus({
                                        questionId: currentQuestion.question_id,
                                        status: "attended",
                                    }));
                                } else {
                                    dispatch(changeStatus({
                                        questionId: currentQuestion.question_id,
                                        status: "not_attended"
                                    }));
                                }

                                if (currentQuestion.number !== 1) {
                                    router.push(`/app/question?number=${currentQuestion.number - 1}`);
                                }
                            }
                        },
                        {
                            label: "Next",
                            bgColor: "bg-theme-primary",
                            onclick: () => {
                                if (selectedOption) {
                                    dispatch(changeStatus({
                                        questionId: currentQuestion.question_id,
                                        status: "attended",
                                    }));
                                } else {
                                    dispatch(changeStatus({
                                        questionId: currentQuestion.question_id,
                                        status: "not_attended"
                                    }));
                                }

                                if (currentQuestion.number === questions.length) {
                                    setShowOverview(true)
                                } else {
                                    router.push(`/app/question?number=${currentQuestion.number + 1}`);
                                }
                            },
                            color: "text-white"
                        },
                    ]
                        .map((item, index) => (
                            <button
                                className={`primary-btn ${item.bgColor} ${item.color}`}
                                key={index}
                                onClick={item.onclick}
                            >
                                {item.label}
                            </button>
                        ))
                }
            </div>

            {
                showOverview &&
                <ReviewExam
                    closePopup={() => {
                        setShowOverview(false)
                    }}
                />
            }

            {
                showDescription &&
                <QuestionDescriptionPopup
                    content={currentQuestion.comprehension}
                    closePopup={() => {
                        setShowDescription(false);
                    }}
                />
            }
        </div>
    )
}

export default QuestionTemplate