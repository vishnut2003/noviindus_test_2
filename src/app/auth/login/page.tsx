'use client';

import { useState } from "react";
import AuthPhoneNumber from "./(phone-number)";
import AuthVerifyOtp from "./(verify-otp)";
import CreateAccountPage from "./(create-account)";

const LoginPage = () => {
    
    const [currentPage, setCurrentPage] = useState<"phone-number" | "verify-otp" | "create-account">("create-account");

    if (currentPage == "phone-number") {
        return <AuthPhoneNumber/>
    }

    if (currentPage == "verify-otp") {
        return <AuthVerifyOtp/>
    }

    if (currentPage == "create-account") {
        return <CreateAccountPage/>
    }

}

export default LoginPage