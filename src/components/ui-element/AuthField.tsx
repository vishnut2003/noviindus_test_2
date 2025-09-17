import React, { PropsWithChildren } from 'react'

const AuthField = ({ children, label }: PropsWithChildren<{
    label: string,
}>) => {
    return (
        <div
            className='flex flex-nowrap items-center gap-[15px] border border-[#CECECE] rounded-[6px] relative py-[12px] px-[20px] focus-within:border-theme-secondary w-full'
        >
            <p
                className='absolute top-[-10px] left-[15px] text-[12px] bg-white text-[#5C5C5C] px-[5px]'
            >{label}</p>
            {children}
        </div>
    )
}

export default AuthField