import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import LoginForm from "../components/forms/Login";
import { useState } from "react";
import { cn } from "../libs/utils";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

export default function Login() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <div className="flex h-[100dvh] justify-center bg-muted md:items-center">
      <div className="relative flex h-full overflow-hidden md:block md:h-auto">
        {/* Login Form Card*/}
        <Card className="relative h-full w-full max-w-md space-y-4 p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
            <CardDescription>
              Enter your email and password to access your blog account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LoginForm setIsForgotPassword={setIsForgotPassword} />
          </CardContent>
        </Card>

        {/* Forgot Password Card */}
        <ForgotPassword
          isForgotPassword={isForgotPassword}
          setIsForgotPassword={setIsForgotPassword}
        />
      </div>
    </div>
  );
}

const ForgotPassword = ({ isForgotPassword, setIsForgotPassword }) => {
  return (
    <Card
      className={cn(
        "absolute h-full w-full max-w-md space-y-4 p-6 text-center transition-transform duration-500",
        isForgotPassword
          ? "-translate-x-0 md:-translate-y-full"
          : "translate-x-full md:translate-x-0 md:translate-y-0",
      )}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Password recovery</CardTitle>
        <CardDescription>
          We will send you an email containing a password reset link
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} />
      </CardContent>
    </Card>
  );
};
