import { useQuery } from "@tanstack/react-query";
import axios from "../config/axios";

async function handleGetPost(slug) {
    const { data } = await axios.get(`/api/blog/${slug}`);
    return data;
}

export function useBlogPost(slug) {
    // React query Logic
    return useQuery({
        queryKey: ["blog"],
        queryFn: () => handleGetPost(slug),
        retry: false,
    });
}
