'use client';

import TaskLayout from '@/layouts/TaskLayout'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from "@/store";

const AppLayout = ({ children }: PropsWithChildren) => {
    return (
        <TaskLayout>
            <Provider store={store}>
                {children}
            </Provider>
        </TaskLayout>
    )
}

export default AppLayout