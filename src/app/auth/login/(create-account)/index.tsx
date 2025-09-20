'use client';

import AuthLayout from '@/layouts/AuthLayout'
import React, { ChangeEvent, useState } from 'react'
import { RiCameraLine, RiCloseLargeLine } from "@remixicon/react";
import AuthField from '@/components/ui-element/AuthField';
import Image from 'next/image';
import { signIn } from "next-auth/react";
import { CreateProfileRequestInterface } from '@/functions/server/novindus_api';
import ErrorTemplate from '@/components/ui-element/ErrorTemplate';
import axios from 'axios';
import { handleCatchBlock } from '@/functions/common';

const CreateAccountPage = ({
    mobile,
}: {
    mobile: string,
}) => {

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [profile, setProfile] = useState<File | null>(null);
    const [formData, setFormData] = useState<{
        name: string,
        email: string,
        qualification: string,
    }>({
        email: "",
        name: "",
        qualification: "",
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    async function handleSubmitAction() {
        setError(null);
        setInProgress(true)

        for (const [key, value] of Object.entries({
            ...formData,
            "Profile Image": profile,
        })) {
            if (!value) {
                setError(`${key} is required`);
                setInProgress(false);
                return;
            }
        }

        const mailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!mailReg.test(formData.email)) {
            setError("Email format is not correct");
            setInProgress(false);
            return;
        }

        const requestData: CreateProfileRequestInterface = {
            ...formData,
            profile_image: profile!,
            mobile,
        }

        const newFormData = new FormData();

        for (const [key, value] of Object.entries(requestData)) {
            newFormData.append(key, value);
        }

        try {
            await axios.post("/api/noviindus/create-account", newFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
            setInProgress(false);
            return;
        }

        await signIn("Credentials", {
            callbackUrl: "/app",
            name: formData.name,
            email: formData.email,
        })

        setInProgress(false)
    }

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
                                className='outline-none w-full'
                                placeholder='Enter your Full Name'
                                value={formData.name}
                                name='name'
                                onChange={handleInputChange}
                            />
                        </AuthField>

                        <AuthField
                            label='Email'
                        >
                            <input
                                type='email'
                                name='email'
                                className='outline-none w-full'
                                placeholder='Enter your Email Address'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </AuthField>

                        <AuthField
                            label='Your qualification*'
                        >
                            <input
                                type='text'
                                className='outline-none w-full'
                                placeholder='Enter your qualification'
                                name='qualification'
                                value={formData.qualification}
                                onChange={handleInputChange}
                            />
                        </AuthField>
                    </div>
                </div>

                <button
                    className='primary-btn bg-theme-primary text-white'
                    onClick={handleSubmitAction}
                    disabled={inProgress}
                >
                    {inProgress ? "Loading..." : "Create Account"}
                </button>

                {
                    error &&
                    <ErrorTemplate
                        message={error}
                    />
                }
            </div>
        </AuthLayout>
    )
}

export default CreateAccountPage