'use client';

import AuthField from '@/components/ui-element/AuthField'
import ErrorTemplate from '@/components/ui-element/ErrorTemplate';
import AuthLayout from '@/layouts/AuthLayout'
import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { LoginPagesList } from '../page';
import { handleCatchBlock } from '@/functions/common';
import axios from 'axios';

const AuthPhoneNumber = ({
    setMobile: saveMobile,
    setCurrentPage,
}: {
    setMobile: Dispatch<SetStateAction<string>>,
    setCurrentPage: Dispatch<SetStateAction<LoginPagesList>>,
}) => {

    const [inProgress, setInProgress] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)

    const [mobile, setMobile] = useState<string>("");
    const [countryCode] = useState("+91");

    async function handleMobileSubmit() {
        setError("");
        setInProgress(true)

        try {
            await axios.post("/api/noviindus/send-otp", { mobile: `${countryCode}${mobile}` });
            saveMobile(`${countryCode}${mobile}`);
            setCurrentPage("verify-otp");
        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }

        setInProgress(false);
    }

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
                            value={mobile}
                            onChange={(event) => {

                                if (!event.target.value) {
                                    setMobile("");
                                    return;
                                }

                                try {
                                    const value = parseInt(event.target.value);
                                    if (isNaN(value)) {
                                        return;
                                    }

                                    setMobile(`${value}`);
                                } catch (err) {
                                    if (err) {
                                        console.error("Please enter Phone number")
                                        return;
                                    }
                                }
                            }}
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
                    onClick={handleMobileSubmit}
                    disabled={inProgress}
                >
                    {
                        inProgress ? "Loading..." : "Get Started"
                    }
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

export default AuthPhoneNumber