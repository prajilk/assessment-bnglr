import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "../config/axios";

async function handleCreatePost(values) {
    const token = localStorage.getItem("token");
    const { data } = await axios.post("/api/blog", values, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data;
}

export function useCreatePost(
    onSuccess,
) {
    // React query mutation Logic
    return useMutation({
        mutationFn: handleCreatePost,
        onSuccess,
        onError: (error) => {
            toast.error(
                error.response.data.message || "Registration failed! Try again.",
            );
        },
    });
}