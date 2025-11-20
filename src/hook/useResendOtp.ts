import { useMutation } from "@tanstack/react-query";
import api from "../api/internalFetcher"; // <-- use your axios instance

export default function useResendOtp() {
  return useMutation({
    mutationFn: async ({
      userName,
      password,
    }: {
      userName: string | null;
      password: string | null;
    }) => {
      if (!userName || !password) {
        throw new Error("Missing credentials for resend OTP");
      }

      const res = await api.post("/loginByToken", {
        userName,
        password,
      });

      return res.data;
    },
  });
}
