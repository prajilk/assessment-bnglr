import { useQuery } from "@tanstack/react-query";
import axios from "../config/axios";

async function handleGetPost() {
    const { data } = await axios.get("/api/blog");
    return data;
}

export function useAllBlogPost() {
    // React query Logic
    return useQuery({
        queryKey: ["blogs"],
        queryFn: handleGetPost,
        retry: false,
    });
}
