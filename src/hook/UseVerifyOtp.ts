import { useMutation } from "@tanstack/react-query";
import api from "../api/internalFetcher"; // same axios instance path

export const useVerifyOTP = () =>
  useMutation({
    mutationFn: async ({ otp }: { otp: string }) => {
      const res = await api.post("/verifyOTP", { OTP: otp });
      return res.data; // keep backend response raw
    },
  });

export default useVerifyOTP;
