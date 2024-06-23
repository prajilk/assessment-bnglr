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
import { forgotPasswordSchema } from "../../libs/zodSchemas";
import { useForgotPassword } from "../../api/forgotPassword";
import { Button } from "../ui/button";

const ForgotPasswordForm = ({ setIsForgotPassword }) => {
  // Create a react-hook-form
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // onSuccess function execute after Successful response from server
  function onSuccess() {
    toast.success("We sent you an email. Check your inbox");
  }

  // React-Query Mutation function to send a POST method to reset password
  const mutation = useForgotPassword(onSuccess);

  // 2. Define a submit handler.
  function onSubmit(values) {
    const result = forgotPasswordSchema.safeParse(values); // Validating form data using ZOD Schema
    if (result.success) {
      // Call the POST request (sending email to the server)
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
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
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
          Send Email
        </LoadingButton>
        <Button
          className="mx-auto block"
          variant="link"
          type="button"
          onClick={() => setIsForgotPassword(false)}
        >
          Back to Login
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
