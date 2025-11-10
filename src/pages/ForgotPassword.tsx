import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/image.png"
import backImg from "../assets/back.png"

export default function ForgotPassword() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex">
            {/* Left side */}
            <div
                className="hidden md:flex w-[41%] relative h-screen"
                style={{
                    background: "linear-gradient(to bottom, #126195, #5C260C)",
                }}
            >
                <img
                    src={backImg}
                    alt="decor"
                    className="absolute bottom-0 right-0 w-48 md:w-64 opacity-90 pointer-events-none z-0"
                />

                <div className="m-auto text-center text-white mb-30 mx-10 py-12 bg-white/20 h-[65%] w-full rounded-lg border border-white/80 relative z-10">
                    <h1 className="text-4xl font-bold leading-tight">
                        Empowering people<br />
                        through seamless Employee<br />
                        management.
                    </h1>

                    <img
                        src={LoginImg}
                        alt="Login illustration"
                        className="mx-auto w-80 h-80 object-contain"
                    />

                    <p className="text-xl font-medium">
                        Efficiently manage your workforce, streamline<br />
                        operations effortlessly.
                    </p>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="flex flex-1 items-center justify-center bg-gray-100">
                <div className="p-10 w-full max-w-2xl">
                    <div className="mb-12 text-center">
                        <h1 className="text-2xl font-bold mb-2">Forgot Password</h1>
                        <p className="text-[#6B7280] text-sm">Temporary pasword  Sent to your email address.</p>
                    </div>

                    <Button onClick={() => navigate("/login")} type="submit" className="w-full py-2 text-md">
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
}
