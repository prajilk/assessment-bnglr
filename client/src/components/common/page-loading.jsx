import { Loader2 } from "lucide-react";

const PageLoading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[rgb(247,250,252)]">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default PageLoading;
