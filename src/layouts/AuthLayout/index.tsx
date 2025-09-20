import AuthFieldSlideEffect from '@/components/ui-element/AuthFieldSlideEffect'
import Image from 'next/image'
import React, { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {

    return (
        <div
            className='w-screen min-h-screen bg-center bg-cover bg-no-repeat flex items-center justify-center p-[15px]'
            style={{
                backgroundImage: "url(/images/authlayout-bg-image.jpg)",
            }}
        >
            <div className='bg-black/50 absolute top-0 left-0 w-full h-max md:h-full z-0' />
            <div
                className='z-10 flex flex-col md:flex-row items-stretch bg-gradient-to-b from-theme-primary to-theme-secondary max-w-[900px] min-h-[400px] w-full p-[10px] rounded-[16]'
            >
                <div className='bg-black/30 absolute top-0 left-0 w-full md:h-full z-0' />

                <div
                    className='w-full z-10 flex flex-col items-center justify-between gap-[60px] py-[25px] px-[50px]'
                >
                    <Image
                        src={"/images/nexlearn-white-logo.png"}
                        alt='Logo'
                        width={266}
                        height={84}
                        className='w-[200px]'
                    />

                    <div
                        className='w-full'
                    >
                        <Image
                            alt='Auth Vector'
                            src={"/images/auth-vector-image.png"}
                            width={336}
                            height={262}
                            className='w-[60%] md:w-full mx-auto'
                        />
                    </div>
                </div>
                <div
                    className='w-full bg-white rounded-[6px] z-10 px-[20px] py-[30px] overflow-hidden'
                >
                    <div
                        className='w-full h-full'
                    >
                        <AuthFieldSlideEffect>
                            {children}
                        </AuthFieldSlideEffect>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout