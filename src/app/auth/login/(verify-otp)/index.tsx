import AuthField from '@/components/ui-element/AuthField'
import AuthLayout from '@/layouts/AuthLayout'
import Link from 'next/link'
import React from 'react'

const AuthVerifyOtp = () => {
    return (
        <AuthLayout>
            <div
                className='flex flex-col justify-between gap-[40px] h-full'
            >
                <div
                    className='space-y-[16px]'
                >
                    <h2
                        className='text-[24px] font-semibold text-theme-primary'
                    >Enter the code we texted you</h2>
                    <p
                        className='text-16px text-theme-primary'
                    >We’ve sent an SMS to +91 1234 567891</p>

                    <AuthField
                        label='SMS code'
                    >
                        <input
                            type="text"
                            className='outline-none w-full'
                            placeholder='123 456'
                        />
                    </AuthField>

                    <p
                        className='text-[12px] text-[#5C5C5C]'
                    >
                        Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
                    </p>

                    <button
                        className='text-[14px] font-semibold text-theme-primary underline'
                    >Resend code</button>

                </div>

                <button
                    className='primary-btn bg-theme-primary text-white'
                >
                    Verify OTP
                </button>
            </div>
        </AuthLayout>
    )
}

export default AuthVerifyOtp