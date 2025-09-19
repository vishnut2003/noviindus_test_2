import React, { PropsWithChildren } from 'react'
import TaskHeader from './header'

const TaskLayout = ({ children }: PropsWithChildren) => {
    return (
        <div
            className='min-h-screen w-full bg-[#F4FCFF]'
        >
            <TaskHeader />
            <div
                className='w-full py-[30px] px-[20px]'
            >{children}</div>
        </div>
    )
}

export default TaskLayout