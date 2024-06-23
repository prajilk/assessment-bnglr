import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useProfile } from "../api/getProfile";
import { setUser } from "../redux/userSlice";
import PageLoading from "../components/common/page-loading";
import { useQueryClient } from "@tanstack/react-query";

const ProfileProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useProfile(); // Requesting user profile details from the server
  const isAuthenticated = useSelector((state) => state.auth); // Get auth status from redux
  const dispatch = useDispatch();

  useEffect(() => {
    // If user not Authenticated set user state to null
    if (!isAuthenticated.user) {
      dispatch(setUser(null));
    } else {
      // Refetch the user profile from server by invalidating React-Query with key ["users", "profiles"]
      queryClient.invalidateQueries(["users", "profile"]);
      dispatch(setUser(profile)); // Set fetched profile to "user" redux state
    }
  }, [profile, isAuthenticated]);

  if (isLoading) {
    return <PageLoading />;
  }

  return <>{children}</>;
};

export default ProfileProvider;
