import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "../config/axios";

async function handleResetPassword(values) {
  const { data } = await axios.post("/api/user/reset-password", values);
  return data;
}

export function useResetPassword(onSuccess) {
  // React query mutation Logic
  return useMutation({
    mutationFn: handleResetPassword,
    onSuccess,
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong!");
    },
  });
}
