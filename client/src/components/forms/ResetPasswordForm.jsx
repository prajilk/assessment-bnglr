import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { toast } from "sonner";
import LoadingButton from "../ui/loading-button";
import { resetPasswordSchema } from "../../libs/zodSchemas";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useResetPassword } from "../../api/resetPassword";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false); // State to show and hide password
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  // Create a react-hook-form
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  // onSuccess function execute after Successful response from server
  function onSuccess() {
    toast.success("Password reset successfully!");
    navigate("/login");
  }

  // React-Query Mutation function to send a POST method to reset password
  const mutation = useResetPassword(onSuccess);

  // 2. Define a submit handler.
  function onSubmit(values) {
    const result = resetPasswordSchema.safeParse(values); // Validating form data using ZOD Schema
    if (!token)
      return toast.error("The URL does not contain the required token!");
    if (result.success) {
      // Call the POST request (sending new password and token to the server)
      mutation.mutate({ ...values, token });
    } else {
      toast.error("Invalid data format");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="New Password"
                  endIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="flex items-center text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                  type={showPassword ? "text" : "password"}
                  className="border border-zinc-300 bg-white focus:border-zinc-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          isLoading={mutation.isPending}
          className="w-full"
          type="submit"
        >
          Reset password
        </LoadingButton>
        <Button className="mx-auto block" variant="link" type="button">
          <Link to="/login">Back to Login</Link>
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
