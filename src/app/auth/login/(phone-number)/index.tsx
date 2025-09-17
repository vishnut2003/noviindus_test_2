import AuthField from '@/components/ui-element/AuthField'
import AuthLayout from '@/layouts/AuthLayout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AuthPhoneNumber = () => {
    return (
        <AuthLayout>
            <div
                className='flex flex-col justify-between gap-[40px] h-full'
            >
                <div
                    className='space-y-[16px]'
                >
                    <h1
                        className='text-[24px] font-semibold text-theme-primary'
                    >Enter your phone number</h1>
                    <p
                        className='text-16px text-theme-primary'
                    >We use your mobile number to identify your account</p>

                    <AuthField
                        label='Phone number'
                    >
                        <Image
                            alt='Code'
                            src={"/images/country-code.png"}
                            width={47}
                            height={17}
                            className='w-[45px] mt-[-3px]'
                        />
                        <input
                            type="text"
                            className='outline-none w-full'
                            placeholder='88 912 312 36'
                        />
                    </AuthField>

                    <p
                        className='text-[12px] text-[#5C5C5C]'
                    >
                        By tapping Get started, you agree to the
                        <Link
                            href={"#"}
                            className='text-theme-primary'
                        >Terms & Conditions</Link>
                    </p>

                </div>

                <button
                    className='primary-btn bg-theme-primary text-white'
                >
                    Get Started
                </button>
            </div>
        </AuthLayout>
    )
}

export default AuthPhoneNumber