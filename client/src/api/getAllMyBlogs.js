import { useQuery } from "@tanstack/react-query";
import axios from "../config/axios";

async function handleGetMyPost() {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`/api/blog/my-post`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data;
}

export function useAllMyBlogPost() {
    // React query Logic
    return useQuery({
        queryKey: ["my", "blogs"],
        queryFn: handleGetMyPost,
        retry: false,
    });
}
