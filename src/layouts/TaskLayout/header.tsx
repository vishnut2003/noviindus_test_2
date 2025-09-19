import LogoutButton from '@/components/auth/logout'
import Image from 'next/image'
import React from 'react'

const TaskHeader = () => {
  return (
    <header
        className='w-full py-[15px] px-[20px] bg-white'
    >
        <div
            className='w-full mx-auto flex items-center'
        >
            <div
                className='flex justify-center w-full'
            >
                <Image
                    alt='Logo'
                    src={"/images/nexlearn-logo.png"}
                    width={192}
                    height={60}
                    className='max-w-[150px] w-full'
                />
            </div>
            <LogoutButton
                className='bg-theme-secondary py-[14px] px-[27px] rounded-[6px] text-white text-sm'
            >
                Logout
            </LogoutButton>
        </div>
    </header>
  )
}

export default TaskHeader