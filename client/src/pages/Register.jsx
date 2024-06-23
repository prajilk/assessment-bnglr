import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import RegisterForm from "../components/forms/Register";

export default function Register() {
  return (
    <div className="flex min-h-[100dvh] justify-center bg-muted md:items-center">
      <Card className="w-full max-w-md space-y-4 p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Register for an account
          </CardTitle>
          <CardDescription>
            Enter below details to create a new blog account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
