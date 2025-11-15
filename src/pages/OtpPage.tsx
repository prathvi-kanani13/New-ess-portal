import * as React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/image.png";
import backImg from "../assets/back.png";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import useVerifyOTP from "../hook/UseVerifyOtp";
import { useAuth } from "../context/AuthProvider";

export default function OtpPage() {
    const [value, setValue] = React.useState("");
    const [timeLeft, setTimeLeft] = React.useState(60);
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();

    // useMutation hook
    const verifyMutation = useVerifyOTP();

    const { login } = useAuth();

    React.useEffect(() => {
        if (timeLeft === 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (value.length < 6) {
            setErrorMessage("Please enter full 6-digit OTP");
            return;
        }

        verifyMutation.mutate(
            { otp: value },
            {
                onSuccess: (res) => {
                    try {
                        if (res.status.toLowerCase() === "success") {
                            login(res.data);    // save token
                            sessionStorage.removeItem("otpUser"); // clear otp session after successful otp verification
                            navigate("/employee-dashboard");
                        } else {
                            setErrorMessage(res.message); // this is show backend error because code is same
                        }
                    } catch {
                        setErrorMessage("Something went wrong. Please try again.");
                    }
                },
            }
        );
    };

    const handleResendOTP = () => {
        setErrorMessage("");
        setTimeLeft(60);
    };

    return (
        <div className="min-h-screen flex">

            {/* left side */}
            <div
                className="hidden md:flex w-[41%] relative h-screen"
                style={{ background: "linear-gradient(to bottom, #126195, #5C260C)" }}
            >
                <img src={backImg} className="absolute bottom-0 right-0 w-48 md:w-64 opacity-90" />
                <div className="m-auto text-center text-white py-12 bg-white/20 h-[65%] rounded-lg border border-white/80">
                    <h1 className="text-4xl font-bold leading-tight">
                        Empowering people<br />through seamless Employee<br />management.
                    </h1>
                    <img src={LoginImg} className="mx-auto w-80 h-80" />
                    <p className="text-xl font-medium">
                        Efficiently manage your workforce,<br />streamline operations effortlessly.
                    </p>
                </div>
            </div>

            {/* right side */}
            <div className="flex flex-1 items-center justify-center bg-gray-100">
                <form onSubmit={handleSubmit} className="p-10 w-full max-w-2xl space-y-6 text-center">
                    <h1 className="text-2xl font-bold">Enter OTP</h1>
                    <p className="text-sm text-gray-500">Sent to your email-address.</p>

                    <InputOTP maxLength={6} value={value} onChange={setValue}>
                        <InputOTPGroup className="flex justify-between gap-2 px-2">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <InputOTPSlot key={i} index={i} className="w-22 border-gray-300" />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    {errorMessage && (
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    )}

                    <div className="text-gray-600 text-md">
                        {timeLeft > 0 ? (
                            <>Resend OTP in <b>{timeLeft}s</b></>
                        ) : (
                            <button type="button" className="text-blue-600" onClick={handleResendOTP}>
                                Resend OTP
                            </button>
                        )}
                    </div>

                    <Button type="submit" className="w-full py-2 text-md">
                        {verifyMutation.isPending ? "Verifying..." : "Confirm"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
