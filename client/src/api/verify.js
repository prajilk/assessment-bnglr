import { useQuery } from "@tanstack/react-query";
import axios from "../config/axios";

async function handleVerify() {
  const token = localStorage.getItem("token");
  const { data } = await axios.get("/api/user/verify", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export function useVerify() {
  // React query Logic
  return useQuery({
    queryKey: ["verify"],
    queryFn: handleVerify,
    retry: false,
  });
}
