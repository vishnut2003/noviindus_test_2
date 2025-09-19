'use client';

import React, { PropsWithChildren } from 'react'
import { signOut } from "next-auth/react"

const LogoutButton = ({
    children,
    className,
}: PropsWithChildren<{
    className?: string,
}>) => {
    return (
        <button
            className={`${className} cursor-pointer`}
            onClick={async () => {
                await signOut()
            }}
        >
            {children}
        </button>
    )
}

export default LogoutButton