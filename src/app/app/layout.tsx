'use client';

import TaskLayout from '@/layouts/TaskLayout'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from "@/store";
import { PersistGate } from 'redux-persist/integration/react';

const AppLayout = ({ children }: PropsWithChildren) => {
    return (
        <TaskLayout>
            <Provider store={store}>
                <PersistGate
                    persistor={persistor}
                    loading={null}
                >
                    {children}
                </PersistGate>
            </Provider>
        </TaskLayout>
    )
}

export default AppLayout