import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEmailVerify } from "../api/emailVerify";
import { Show } from "../components/common/show";

const VerifyEmail = () => {
  const [isVerified, setIsVerified] = useState(false); // State to manage is email verified or not
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get("emailToken"); // Get email verification token from URL Search Params

  if (!emailToken) navigate("/"); // If not token, redirect

  function onSuccess(data) {
    localStorage.setItem("token", data.token);
    setIsVerified(true);
  }

  // React-Query Mutation function to send a POST method to verify Email
  const mutation = useEmailVerify(onSuccess);

  useEffect(() => {
    // Call the POST request when component mount (sending email token to server for verification);
    mutation.mutate(emailToken);
  }, [emailToken]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <span>
        <Show>
          <Show.When isTrue={isVerified}>Verified Successfully!</Show.When>
          <Show.Else>Verifying email...</Show.Else>
        </Show>
      </span>
      <Show>
        <Show.When isTrue={isVerified}>
          <Link
            to="/"
            className="mt-3 rounded-md bg-black px-4 py-2 text-sm text-white"
          >
            Go Home
          </Link>
        </Show.When>
      </Show>
    </div>
  );
};

export default VerifyEmail;
