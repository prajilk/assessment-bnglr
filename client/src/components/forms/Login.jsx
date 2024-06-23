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
import { Label } from "../ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLogin } from "../../api/login";
import LoadingButton from "../ui/loading-button";
import { loginSchema } from "../../libs/zodSchemas";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";

const LoginForm = ({ setIsForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false); // State to show and hide password
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Create a react-hook-form
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // onSuccess function execute after Successful response from server
  function onSuccess(data) {
    localStorage.setItem("token", data.token); // Set token in localStorage
    toast.success("Login successfully.");
    dispatch(setAuth(true)); // Set auth status in "auth" redux state
    navigate("/", { replace: true });
  }

  // React-Query Mutation function to send a POST method to login
  const mutation = useLogin(onSuccess);

  // 2. Define a submit handler.
  function onSubmit(values) {
    const result = loginSchema.safeParse(values);
    if (result.success) {
      // Call the POST request (sending login data to the server)
      mutation.mutate(values);
    } else {
      toast.error("Invalid data format");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Email</Label>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="border border-zinc-300 bg-white focus:border-zinc-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="cursor-pointer text-sm underline opacity-60 hover:opacity-100"
                >
                  Forgot password?
                </button>
              </div>
              <FormControl>
                <Input
                  {...field}
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
          Log in
        </LoadingButton>
        <div>
          <span className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register now
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
