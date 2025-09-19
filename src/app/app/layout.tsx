import TaskLayout from '@/layouts/TaskLayout'
import React, { PropsWithChildren } from 'react'

const AppLayout = ({ children }: PropsWithChildren) => {
    return (
        <TaskLayout>
            {children}
        </TaskLayout>
    )
}

export default AppLayout