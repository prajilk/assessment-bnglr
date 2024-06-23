import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../blog/Editor";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { useCreatePost } from "../../api/createPost";
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
import LoadingButton from "../ui/loading-button";

export default function CreateBlogForm() {
  const [content, setContent] = useState("");

  // Create a react-hook-form
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      summary: "",
      image: "",
    },
  });

  // onSuccess function execute after Successful response from server
  function onSuccess() {
    toast.success("Post created successfully.");
    form.reset();
    setContent("");
  }

  // React-Query Mutation function to send a POST method to create a Blog Post
  const mutation = useCreatePost(onSuccess);

  // 2. Define a submit handler.
  function onSubmit(values) {
    const result = postSchema.safeParse(values); // Validating form data using ZOD Schema
    if (result.success) {
      // Call the POST request (sending post data to the server)
      mutation.mutate({ ...values, content });
    } else {
      toast.error("Invalid data format");
    }
  }

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
          <LoadingButton isLoading={mutation.isPending} className="mt-1">
            Create post
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
