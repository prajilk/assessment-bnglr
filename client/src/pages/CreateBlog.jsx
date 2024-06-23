import CreateBlogForm from "../components/forms/CreateBlogForm";
import Header from "../components/header/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const CreateBlog = () => {
  return (
    <>
      <Header />
      <Card className="mx-auto mb-10 w-full max-w-3xl space-y-3 p-6">
        <CardHeader className="p-0 md:p-6">
          <CardTitle className="text-2xl font-bold">
            Create new Blog Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-0 md:px-6">
          <CreateBlogForm />
        </CardContent>
      </Card>
    </>
  );
};

export default CreateBlog;
