import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../blog/Editor";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../libs/zodSchemas";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useBlogPost } from "../../api/getBlogPost";
import { useEditPost } from "../../api/editPost";
import LoadingButton from "../ui/loading-button";
import Error404 from "../common/error404";
import PageLoading from "../common/page-loading";

export default function EditBlogForm() {
  const navigate = useNavigate();
  const params = useParams();
  const { data: post, isError, isLoading } = useBlogPost(params.id);
  const [content, setContent] = useState(post?.content || "");

  // Create a react-hook-form
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      summary: post?.summary || "",
      image: post?.image || "",
    },
  });

  useEffect(() => {
    form.setValue("title", post?.title);
    form.setValue("summary", post?.summary);
    form.setValue("image", post?.image);
    setContent(post?.content);
  }, [post]);

  // onSuccess function execute after Successful response from server
  function onSuccess(data) {
    toast.success("Post edited successfully.");
    navigate(`/blog/${data.slug || ""}`);
  }

  // React-Query Mutation function to send a POST method to update a Blog Post
  const mutation = useEditPost(onSuccess);

  // 2. Define a submit handler.
  function onSubmit(values) {
    const result = postSchema.safeParse(values); // Validating form data using ZOD Schema
    if (result.success && post.userId && post._id) {
      // Call the POST request (sending post data to the server)
      mutation.mutate({
        ...values,
        content,
        userId: post.userId,
        _id: post._id,
      });
    } else {
      toast.error("Invalid data format");
    }
  }

  if (isLoading) return <PageLoading />;
  if (isError) return <Error404 />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label className="font-semibold" htmlFor="title">
                Title
              </Label>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder={"Title"}
                  className="border border-zinc-300 bg-white focus:border-zinc-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <Label className="font-semibold" htmlFor="title">
                Summary
              </Label>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder={"Summary"}
                  className="border border-zinc-300 bg-white focus:border-zinc-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <Label className="font-semibold" htmlFor="title">
                Image
              </Label>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder={"Image"}
                  className="border border-zinc-300 bg-white focus:border-zinc-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Label className="font-semibold">Content</Label>
          <Editor value={content} onChange={setContent} />
        </div>
        <div className="mt-5 flex justify-end">
          <LoadingButton
            isLoading={mutation.isPending}
            style={{ marginTop: "5px" }}
          >
            Save changes
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
