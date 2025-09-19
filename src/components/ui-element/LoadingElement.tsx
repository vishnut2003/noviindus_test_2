import { RiLoader4Line } from '@remixicon/react'
import React from 'react'

const LoadingElement = () => {
  return (
    <div
        className='w-full min-h-[300px] flex flex-col justify-center items-center gap-[25px]'
    >
        <RiLoader4Line
            size={25}
            className='text-theme-secondary animate-spin'
        />
        <p>Loading...</p>
    </div>
  )
}

export default LoadingElement