import React from "react";
import Header from "../components/header/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import EditBlogForm from "../components/forms/EditBlogForm";

const EditBlog = () => {
  return (
    <>
      <Header />
      <Card className="mx-auto w-full max-w-3xl space-y-3 p-6">
        <CardHeader className="p-0 md:p-6">
          <CardTitle className="text-2xl font-bold">Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-0 md:px-6">
          <EditBlogForm />
        </CardContent>
      </Card>
    </>
  );
};

export default EditBlog;
