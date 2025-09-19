import AuthField from '@/components/ui-element/AuthField'
import AuthLayout from '@/layouts/AuthLayout'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { LoginPagesList } from '../page'
import axios from 'axios'
import { handleCatchBlock } from '@/functions/common'
import ErrorTemplate from '@/components/ui-element/ErrorTemplate'

const AuthVerifyOtp = ({
    mobile,
    setCurrentPage,
}: {
    mobile: string,
    setCurrentPage: Dispatch<SetStateAction<LoginPagesList>>,
}) => {

    const [error, setError] = useState<string | null>(null)
    const [inProgress, setInProgress] = useState<boolean>(false);

    const [otp, setOtp] = useState<string>("");
    const [resendTimer, setResendTimer] = useState<number>(50);

    useEffect(() => {
        setInterval(() => {
            if (resendTimer > 0) {
                setResendTimer(resendTimer - 1);
            }
        }, 1000)
    }, [])

    async function handleVerifyOtp() {
        setError(null);
        setInProgress(true);

        try {

            await axios.post(
                "/api/noviindus/verify-otp",
                { mobile, otp }
            );

            setCurrentPage("create-account");

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
                    <h2
                        className='text-[24px] font-semibold text-theme-primary'
                    >Enter the code we texted you</h2>
                    <p
                        className='text-16px text-theme-primary'
                    >We’ve sent an SMS to {mobile}</p>

                    <AuthField
                        label='SMS code'
                    >
                        <input
                            type="text"
                            className='outline-none w-full'
                            placeholder='123 456'
                            onChange={(event) => setOtp(event.target.value)}
                        />
                    </AuthField>

                    <p
                        className='text-[12px] text-[#5C5C5C]'
                    >
                        Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
                    </p>

                    <button
                        className='text-[14px] font-semibold text-theme-primary underline disabled:text-gray-400 cursor-pointer'
                        disabled={resendTimer > 0}
                        onClick={async () => {
                            setResendTimer(50);
                            await axios.post("/api/noviindus/send-otp", { mobile })
                        }}
                    >{resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}</button>

                </div>

                <button
                    className='primary-btn bg-theme-primary text-white'
                    onClick={handleVerifyOtp}
                    disabled={inProgress}
                >
                    {inProgress ? "Loading..." : "Verify OTP"}
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

export default AuthVerifyOtp