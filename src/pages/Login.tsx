import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../hook/UseLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import LoginImg from "../assets/image.png";
import backImg from "../assets/back.png";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useRef } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [Error, setError] = useState<string | null>(null);

  const loginMutation = useLogin();
  const { login } = useAuth();

  const employeeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Auto focus employee ID
  useEffect(() => {
    employeeRef.current?.focus();
  }, []);

  const {
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    setError(null);

    loginMutation.mutate(
      { employeeId: data.employeeId, password: data.password },
      {
        onSuccess: (resData) => {
          try {
            if (resData.status === "Success") {
              // Check OTP Flow
              if (resData.message.toLowerCase().includes("otp")) { //checks if the message contains "otp" anywhere in it
                localStorage.removeItem("token");  // old token remove
                sessionStorage.setItem("otpUser", data.employeeId);
                sessionStorage.setItem("otpPass", data.password); // resend otp use
                navigate("/otp");
              } else {
                login(resData.data);  // store token JWT
                navigate("/employee-dashboard"); // Direct login without OTP
              }
            }
            // Backend sends status = "error" but code is different so this is not show without this logic
            else {
              setError(resData.message);
            }
          } catch (err) {
            setError("Something went wrong. Please try again.");
          }
          // console.log("Login successful:", resData);
        },

        // backend error code is defferent so this is not show without this logic
        onError: (err: any) => {
          // Show backend detailed errors if available
          if (err.response && err.response.data) {
            const data = err.response.data;

            if (data.message) setError(data.message);
            else if (data.errors) setError(data.errors.join(", "));
            else setError("Server error. Please try again later.");
          } else {
            setError("Server error. Please try again later.");
          }
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
      <div className="flex flex-1 items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-10 py-10 md:py-0">
        <div className="w-full max-w-lg lg:max-w-2xl">
          <div className="mb-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold mb-2">Sign In</h1>
            <p className="text-[#6B7280] text-sm sm:text-md">
              Please enter your details to sign in
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-md font-medium mb-1">Employee ID</label>
              <Input
                type="text"
                {...register("employeeId")}
                placeholder="Enter your employee ID"
                ref={employeeRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    passwordRef.current?.focus();
                  }
                }}
              />
            </div>

            <div>
              <label className="block text-md font-medium mb-1">Password</label>
              <Input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                ref={passwordRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSubmit({
                      employeeId: employeeRef.current?.value,
                      password: passwordRef.current?.value,
                    });
                  }
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-3">
              <div className="flex items-center">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="mr-2"
                />
                <label className="text-md text-gray-600">Remember me</label>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgot-password");
                }}
                className="text-md text-[#126195] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {Error && <p className="text-red-600 text-sm">{Error}</p>}

            <Button
              type="button"
              className="w-full py-2 text-md"
              onClick={() =>
                onSubmit({
                  employeeId: employeeRef.current?.value,
                  password: passwordRef.current?.value,
                })
              }
            >
              {isSubmitting || loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
