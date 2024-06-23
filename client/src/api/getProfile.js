import { useQuery } from "@tanstack/react-query";
import axios from "../config/axios";

async function handleGetProfile() {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/api/user/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data;
}

export function useProfile() {
    // React query Logic
    return useQuery({
        queryKey: ["users", "profile"],
        queryFn: handleGetProfile,
        retry: false,
    });
}
