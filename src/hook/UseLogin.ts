import { useMutation } from "@tanstack/react-query";
import api from "../api/internalFetcher";

export const useLogin = () =>
  useMutation({
    mutationFn: async ({ employeeId, password }: { employeeId: string; password: string }) => {
      const res = await api.post("/loginByToken", { userName: employeeId, password });
      return res.data;
    },
  });

export default useLogin;
