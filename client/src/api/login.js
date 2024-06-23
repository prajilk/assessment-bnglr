import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "../config/axios";

async function handleLogin(values) {
  const { data } = await axios.post("/api/user/login", values);
  return data;
}

export function useLogin(onSuccess) {
  // React query mutation Logic
  return useMutation({
    mutationFn: handleLogin,
    onSuccess,
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong!");
    },
  });
}
