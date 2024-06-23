import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "../config/axios";

async function handleDelete(postId) {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`/api/blog/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data;
}

export function useDeletePost(onSuccess) {
    // React query mutation Logic
    return useMutation({
        mutationFn: handleDelete,
        onSuccess,
        onError: (error) => {
            toast.error(error.response.data.message || "Something went wrong!");
        },
    });
}
