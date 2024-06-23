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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "../ui/loading-button";
import { registerSchema } from "../../libs/zodSchemas";
import { useRegister } from "../../api/register";
import CheckVerifyEmail from "../dialog/CheckVerifyEmail";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false); // State to show and hide password
  const [open, setOpen] = useState(false); // State to manage Email verification alert Dialog

  // Create a react-hook-form
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  // onSuccess function execute after Successful response from server
  function onSuccess() {
    toast.success("Registered successfully.");
    setOpen(true); // Show Check email verify alert dialog box
  }

  // React-Query Mutation function to send a POST method to Register an account
  const mutation = useRegister(onSuccess);

  // 2. Define a submit handler.
  function onSubmit(values) {
    const result = registerSchema.safeParse(values); // Validating form data using ZOD Schema
    if (result.success) {
      // Call the POST request (sending register data to the server)
      mutation.mutate(values);
    } else {
      toast.error("Invalid data format");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="fullname">Full name</Label>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="John Doe"
                    className="border border-zinc-300 bg-white focus:border-zinc-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="example@mail.com"
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
                <Label htmlFor="password">Password</Label>
                <FormControl>
                  <Input
                    {...field}
                    endIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="flex items-center text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    }
                    placeholder="*********"
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
            Register
          </LoadingButton>
          <div>
            <span className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </span>
          </div>
        </form>
      </Form>
      <CheckVerifyEmail onOpenChange={setOpen} open={open} />
    </>
  );
};

export default RegisterForm;
