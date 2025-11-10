import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

const OtpProtect = ({ children }: { children: ReactNode }) => {
    const otpUser = sessionStorage.getItem("otpUser");
    const token = localStorage.getItem("token");

    // If already logged in - no need OTP → go dashboard
    if (token) return <Navigate to="/employee-dashboard" replace />;

    // If no otpUser - user did not start login → go login
    if (!otpUser) return <Navigate to="/login" replace />;

    return <>{children}</>;
};

export default OtpProtect;
