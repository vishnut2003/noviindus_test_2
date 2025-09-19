import TaskLayout from '@/layouts/TaskLayout'
import React from 'react'

const InstructionsPage = () => {
  return (
    <TaskLayout>
      <div
        className='max-w-[700px] w-full mx-auto space-y-[25px]'
      >
        <h1
          className='text-[26px] font-medium text-theme-primary text-center'
        >Ancient Indian History MCQ</h1>
        <div
          className='flex items-center bg-theme-primary rounded-[7px] text-white py-[25px]'
        >
          {
            [
              {
                label: "Total MCQ’s:",
                value: "100",
              },
              {
                label: "Total marks:",
                value: "100",
              },
              {
                label: "Total time:",
                value: "90:00",
              },
            ]
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-full text-center space-y-[10px] px-[25px] ${index !== 0 ? "border-l border-white" : ""}`}
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
      </div>
    </TaskLayout>
  )
}

export default InstructionsPage