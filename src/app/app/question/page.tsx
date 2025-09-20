'use client';

import React, { useEffect, useState } from 'react'
import SidebarQuestionsList from './QuestionsList'
import QuestionTemplate from './QuestionTemplate';

const QuestionsPage = () => {

  return (
    <div
      className='flex items-start w-full'
    >
      <QuestionTemplate/>
      <SidebarQuestionsList />
    </div>
  )
}

export default QuestionsPage