import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "../config/axios";

async function handleEmailVerify(emailToken) {
    const { data } = await axios.post("/api/user/verify-email", { emailToken });
    return data;
}

export function useEmailVerify(onSuccess) {
    // React query mutation Logic
    return useMutation({
        mutationFn: handleEmailVerify,
        onSuccess,
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong!");
        },
    });
}
