'use client';

import React, { useEffect, useState } from 'react'
import SidebarQuestionsList from './QuestionsList'
import QuestionTemplate from './QuestionTemplate';

const QuestionsPage = () => {

  return (
    <div
      className='flex flex-col md:flex-row items-start w-full'
    >
      <QuestionTemplate/>
      <SidebarQuestionsList />
    </div>
  )
}

export default QuestionsPage