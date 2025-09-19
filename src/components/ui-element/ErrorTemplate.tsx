import { RiErrorWarningLine } from '@remixicon/react'
import React from 'react'

const ErrorTemplate = ({ message }: {
    message: string,
}) => {
    return (
        <div
            className='bg-red-600/20 text-red-600 rounded-[6px] flex items-center gap-3 py-[10px] px-[20px]'
        >
            <RiErrorWarningLine
                size={20}
            />
            <p className='text-sm'>{message}</p>
        </div>
    )
}

export default ErrorTemplate