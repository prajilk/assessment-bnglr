import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "../config/axios";

async function handleRegister(values) {
    const { data } = await axios.post("/api/user/register", values);
    return data;
}

export function useRegister(
    onSuccess,
) {
    return useMutation({
        // React query mutation Logic
        mutationFn: handleRegister,
        onSuccess,
        onError: (error) => {
            toast.error(
                error.response.data.message || "Registration failed! Try again.",
            );
        },
    });
}