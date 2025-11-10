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

export default function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [Error, setError] = useState<string | null>(null);

  const loginMutation = useLogin();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    setError(null);

    loginMutation.mutate(
      { employeeId: data.employeeId, password: data.password },
      {
        onSuccess: (resData) => {
          try {
            if (resData.status.toLowerCase() === "success") {
              // Check OTP Flow
              if (resData.message.toLowerCase().includes("otp")) {
                sessionStorage.setItem("otpUser", data.employeeId);
                navigate("/otp");
              } else {
                login(resData.data);
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
    <div className="min-h-screen flex">

      {/* left side */}
      <div className="hidden md:flex w-[41%] relative h-screen"
        style={{ background: "linear-gradient(to bottom, #126195, #5C260C)" }}
      >
        <img src={backImg}
          alt="decor"
          className="absolute bottom-0 right-0 w-48 md:w-64 opacity-90 pointer-events-none z-0"
        />
        <div className="m-auto text-center text-white mb-30 mx-10 py-12 bg-white/20 h-[65%] w-full rounded-lg border border-white/80 relative z-10">
          <h1 className="text-4xl font-bold leading-tight">
            Empowering people<br />
            through seamless Employee<br />
            management.
          </h1>
          <img src={LoginImg} alt="Login illustration" className="mx-auto w-80 h-80 object-contain" />
          <p className="text-xl font-medium">
            Efficiently manage your workforce, streamline<br />operations effortlessly.
          </p>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-1 items-center justify-center bg-gray-100">
        <div className="p-10 w-full max-w-2xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Sign In</h1>
            <p className="text-[#6B7280] text-sm">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div>
              <label className="block text-md font-medium mb-1">Employee ID</label>
              <Input
                type="text"
                {...register("employeeId")}
                placeholder="Enter your employee ID"
              />
            </div>

            <div>
              <label className="block text-md font-medium mb-1">Password</label>
              <Input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <Checkbox checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} className="mr-2" />
                <label className="text-md text-gray-600">Remember me</label>
              </div>

              <button
                onClick={(e) => { e.preventDefault(); navigate("/forgot-password"); }}
                className="text-md text-[#126195] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {Error && <p className="text-red-600 text-sm">{Error}</p>}

            <Button type="submit" className="w-full py-2 text-md">
              {isSubmitting || loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}
