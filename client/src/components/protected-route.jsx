import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PageLoading from "./common/page-loading";
import React, { useEffect } from "react";
import { useVerify } from "../api/verify";

const ProtectedRoute = () => {
  // Logic to validate token here
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not token found (Unauthorized)
    }
  }, []);

  const { isLoading, isError } = useVerify(); // Requesting the server to verify the user

  if (isError) {
    localStorage.removeItem("token");
    navigate(`/login?callback=${callback}`);
  }
  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <React.Suspense fallback={<PageLoading />}>
      <Outlet />
    </React.Suspense>
  );
};

export default ProtectedRoute;
