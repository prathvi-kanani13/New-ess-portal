import * as React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/image.png";
import backImg from "../assets/back.png";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import useVerifyOTP from "../hook/UseVerifyOtp";
import { useAuth } from "../context/AuthProvider";
import useResendOtp from "../hook/useResendOtp";

export default function OtpPage() {
    const [value, setValue] = React.useState("");
    const [timeLeft, setTimeLeft] = React.useState(60);
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate();

    // useMutation hook
    const verifyMutation = useVerifyOTP();
    const resendMutation = useResendOtp();

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
                        if (res.status === "success") {
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

        const userName = sessionStorage.getItem("otpUser");
        const password = sessionStorage.getItem("otpPass");

        resendMutation.mutate(
            { userName, password },
            {
                onSuccess: (res) => {
                    if (res.status?.toLowerCase() === "success") {
                        setTimeLeft(60);
                    } else {
                        setErrorMessage(res.message || "Unable to resend OTP");
                    }
                },
                onError: (err) => {
                    setErrorMessage(err.message || "Failed to resend OTP");
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* left side */}
            <div
                className="flex w-full md:w-[41%] relative h-auto md:h-screen"
                style={{ background: "linear-gradient(to bottom, #126195, #5C260C)" }}
            >
                <img
                    src={backImg}
                    alt="decor"
                    className="absolute bottom-0 right-0 w-32 sm:w-40 md:w-64 opacity-90 pointer-events-none z-0"
                />


                <div className="m-auto text-center text-white mx-6 sm:mx-10 py-10 sm:py-12 bg-white/20 h-auto md:h-[65%] w-full rounded-lg border border-white/80 relative z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                        Empowering people<br />
                        through seamless Employee<br />
                        management.
                    </h1>

                    <img
                        src={LoginImg}
                        alt="Login illustration"
                        className="mx-auto w-52 sm:w-64 md:w-80 h-auto object-contain mt-4"
                    />

                    <p className="text-md sm:text-lg md:text-xl font-medium mt-4">
                        Efficiently manage your workforce, streamline<br />operations effortlessly.
                    </p>
                </div>
            </div>

            {/* right side */}
            <div className="flex flex-1 items-center justify-center md:bg-gray-100 px-4 sm:px-6 md:px-10 py-10 md:py-0">
                <div className="w-full max-w-lg lg:max-w-2xl">
                    <div className="mb-6 text-center">
                        <h1 className="text-xl sm:text-2xl font-bold mb-2">Enter OTP</h1>
                        <p className="text-[#6B7280] text-sm sm:text-md">
                            Sent to your email-address.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 text-center">
                        {/* OTP Input */}
                        <InputOTP autoFocus maxLength={6} value={value} onChange={setValue}>
                            <InputOTPGroup className="flex justify-between gap-2 sm:gap-3 px-2">
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <InputOTPSlot
                                        key={i}
                                        index={i}
                                        className="w-15 sm:w-18 md:w-20 lg:w-24 border-gray-300 rounded-md text-center"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>

                        {errorMessage && (
                            <p className="text-sm sm:text-base text-red-600">{errorMessage}</p>
                        )}

                        <div className="text-gray-600 text-sm sm:text-md mt-2">
                            {timeLeft > 0 ? (
                                <>Resend OTP in <b>{timeLeft}s</b></>
                            ) : (
                                <button
                                    type="button"
                                    className="text-blue-600 font-medium"
                                    onClick={handleResendOTP}
                                >
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
        </div>
    );
}
