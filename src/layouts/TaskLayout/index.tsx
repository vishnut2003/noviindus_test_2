import React, { PropsWithChildren } from 'react'
import TaskHeader from './header'

const TaskLayout = ({ children }: PropsWithChildren) => {
    return (
        <div
            className='h-full w-full bg-[#F4FCFF] flex flex-col min-h-screen'
        >
            <TaskHeader />
            <div
                className='w-full py-[30px] px-[20px] h-full flex-1 flex items-stretch'
            >{children}</div>
        </div>
    )
}

export default TaskLayout