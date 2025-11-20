import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/image.png"
import backImg from "../assets/back.png"

export default function ForgotPassword() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col md:flex-row">

            {/* Left side */}
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

            {/* Right side */}
            <div className="flex flex-1 items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-10 py-10 md:py-0">
                <div className="w-full max-w-lg lg:max-w-2xl">
                    <div className="mb-12 text-center">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Forgot Password</h1>
                        <p className="text-[#6B7280] text-sm sm:text-md">
                            Temporary password has been sent to your Mobile Number.
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/login")}
                        type="button"
                        className="w-full py-2 sm:py-3 text-md"
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
}
