import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "../config/axios";

async function handleForgotPassword(values) {
  const { data } = await axios.post("/api/user/forgot-password", values);
  return data;
}

export function useForgotPassword(onSuccess) {
  // React query mutation Logic
  return useMutation({
    mutationFn: handleForgotPassword,
    onSuccess,
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong!");
    },
  });
}
