'use client';

import AuthLayout from '@/layouts/AuthLayout'
import React, { useState } from 'react'
import { RiCameraLine, RiCloseLargeLine } from "@remixicon/react";
import AuthField from '@/components/ui-element/AuthField';
import Image from 'next/image';

const CreateAccountPage = () => {

    const [profile, setProfile] = useState<File | null>(null);

    return (
        <AuthLayout>
            <div
                className='space-y-[20px]'
            >
                <h2
                    className='text-[24px] font-semibold'
                >Add Your Details</h2>
                <div>
                    <div
                        className='flex flex-col items-center space-y-[20px]'
                    >
                        <label
                            htmlFor='profile'
                            className='max-w-[130px] w-full min-h-[130px] border-dashed border-2 border-[#CECECE80] rounded-[8px] p-[5px] flex flex-col justify-center items-center gap-[10px] cursor-pointer'
                        >
                            {
                                profile ?
                                    <div
                                        className='relative h-full'
                                    >
                                        <Image
                                            alt='"Profile image'
                                            src={URL.createObjectURL(profile)}
                                            width={500}
                                            height={500}
                                            className='w-full h-full'
                                        />
                                        <button
                                            className='w-[30px] h-[30px] rounded-full bg-theme-primary flex items-center justify-center text-white absolute top-0 right-0 cursor-pointer'
                                            onClick={() => {
                                                setProfile(null)
                                            }}
                                        >
                                            <RiCloseLargeLine
                                                size={18}
                                            />
                                        </button>
                                    </div>
                                    :
                                    <>
                                        <RiCameraLine
                                            size={25}
                                        />
                                        <p
                                            className='text-[9px] font-medium text-[#CECECE]'
                                        >Add Your Profile picture</p>
                                    </>
                            }
                        </label>
                        <input
                            type='file'
                            accept='image/*'
                            id='profile'
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                    setProfile(file)
                                }
                            }}
                            hidden
                        />

                        <AuthField
                            label='Name*'
                        >
                            <input
                                type='text'
                                className='outline-none'
                                placeholder='Enter your Full Name'
                            />
                        </AuthField>

                        <AuthField
                            label='Email'
                        >
                            <input
                                type='email'
                                className='outline-none'
                                placeholder='Enter your Email Address'
                            />
                        </AuthField>

                        <AuthField
                            label='Your qualification*'
                        >
                            <input
                                type='text'
                                className='outline-none'
                                placeholder='Enter your qualification'
                            />
                        </AuthField>
                    </div>
                </div>

                <button
                    className='primary-btn bg-theme-primary text-white'
                >
                    Create Account
                </button>
            </div>
        </AuthLayout>
    )
}

export default CreateAccountPage