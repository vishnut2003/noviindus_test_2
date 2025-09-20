'use client';

import ErrorTemplate from '@/components/ui-element/ErrorTemplate';
import LoadingElement from '@/components/ui-element/LoadingElement';
import { handleCatchBlock } from '@/functions/common';
import { QuestionsResponseInterface } from '@/functions/server/novindus_api';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { saveQuestions } from "@/store/slices/questions";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const InstructionsPage = () => {

  const [error, setError] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const [stats, setStats] = useState<{
    questionsCount: number,
    totalMarks: number,
    totalTime: number,
  }>();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setInProgress(true)

    const endTime = localStorage.getItem("exam_end_time");

    if (endTime) {
      router.push("/app/question?number=1");
      return;
    }

    axios.get<QuestionsResponseInterface>("/api/noviindus/fetch-questions")
      .then(({ data }) => {
        setStats({
          totalTime: data.total_time,
          questionsCount: data.questions_count,
          totalMarks: data.total_marks,
        })

        dispatch(saveQuestions(data.questions))

      })
      .catch((err) => {
        const message = handleCatchBlock(err);
        setError(message);
      })
      .finally(() => setInProgress(false))
  }, [])

  function startExam () {
    const endTime = Date.now() + 10 * 60 * 1000;
    localStorage.setItem("exam_end_time", endTime.toString());
    router.push("/app/question?number=1");
  }

  if (inProgress) {
    return <LoadingElement />
  }

  if (error) {
    return (
      <ErrorTemplate
        message={error}
      />
    )
  }

  return (
    <div
      className='max-w-[700px] w-full mx-auto space-y-[25px]'
    >
      <h1
        className='text-[26px] font-medium text-theme-primary text-center'
      >Ancient Indian History MCQ</h1>
      <div
        className='flex flex-col md:flex-row items-center bg-theme-primary rounded-[7px] text-white py-[25px]'
      >
        {
          [
            {
              label: "Total MCQ’s:",
              value: stats?.questionsCount,
            },
            {
              label: "Total marks:",
              value: stats?.totalMarks,
            },
            {
              label: "Total time:",
              value: stats?.totalTime,
            },
          ]
            .map((item, index) => (
              <div
                key={index}
                className={`w-full text-center space-y-[10px] px-[25px] py-[10px] ${index !== 0 ? "border-t md:border-l md:!border-t-0 border-white" : ""}`}
              >
                <p
                  className='text-[15px] font-medium'
                >{item.label}</p>
                <p
                  className='text-[42px] font-medium'
                >{item.value}</p>
              </div>
            ))
        }
      </div>

      <div
        className='text-[#5C5C5C] space-y-[15px]'
      >
        <p
          className='font-bold'
        >Instructions:</p>

        <ol
          className='space-y-[6px] text-[16px] list-decimal pl-[25px]'
        >
          {
            [
              "You have 100 minutes to complete the test.",
              "Test consists of 100 multiple-choice q’s.",
              "You are allowed 2 retest attempts if you do not pass on the first try.",
              "Each incorrect answer will incur a negative mark of -1/4.",
              "Ensure you are in a quiet environment and have a stable internet connection.",
              "Keep an eye on the timer, and try to answer all questions within the given time.",
              "Do not use any external resources such as dictionaries, websites, or assistance.",
              "Complete the test honestly to accurately assess your proficiency level.",
              "Check answers before submitting.",
              "Your test results will be displayed immediately after submission, indicating whether you have passed or need to retake the test."
            ]
              .map((point, index) => (
                <li key={index}>{point}</li>
              ))
          }
        </ol>
      </div>

      <div
        className='flex justify-center'
      >
        <button
          className='primary-btn bg-theme-primary max-w-[250px] mx-auto text-white'
          onClick={() => {
            startExam();
          }}
        >
          Start Test
        </button>
      </div>
    </div>
  )
}

export default InstructionsPage