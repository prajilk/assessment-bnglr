import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center">
      <div className="grid gap-4 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            404 Error
          </h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
            Oops! Page not found.
          </p>
        </div>
        <div className="mx-auto max-w-[400px] space-y-4">
          <p className="text-sm/relaxed text-gray-500 dark:text-gray-400">
            Sorry, we couldn't find the page you're looking for. Please check
            the URL in the address bar and try again.
          </p>
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium underline transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            to="/"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
