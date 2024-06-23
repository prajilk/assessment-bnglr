import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "../config/axios";

async function handleEditPost(values) {
    const token = localStorage.getItem("token");
    const { data } = await axios.put("/api/blog", values, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data;
}

export function useEditPost(
    onSuccess,
) {
    // React query mutation Logic
    return useMutation({
        mutationFn: handleEditPost,
        onSuccess,
        onError: (error) => {
            toast.error(
                error.response.data.message || "Registration failed! Try again.",
            );
        },
    });
}