'use client';

import { useState } from "react";
import AuthPhoneNumber from "./(phone-number)";
import AuthVerifyOtp from "./(verify-otp)";
import CreateAccountPage from "./(create-account)";

export type LoginPagesList = "phone-number" | "verify-otp" | "create-account";

const LoginPage = () => {

    const [currentPage, setCurrentPage] = useState<LoginPagesList>("phone-number");

    const [mobile, setMobile] = useState<string>("+918891029928");

    if (currentPage == "phone-number") {
        return (
            <AuthPhoneNumber
                setCurrentPage={setCurrentPage}
                setMobile={setMobile}
            />
        )
    }

    if (currentPage == "verify-otp") {
        return (
            <AuthVerifyOtp
                mobile={mobile}
                setCurrentPage={setCurrentPage}
            />
        )
    }

    if (currentPage == "create-account") {
        return (
            <CreateAccountPage
                mobile={mobile}
            />
        )
    }

}

export default LoginPage