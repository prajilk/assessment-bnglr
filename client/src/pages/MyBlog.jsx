import React from "react";
import Header from "../components/header/Header";
import { useAllMyBlogPost } from "../api/getAllMyBlogs";
import PageLoading from "../components/common/page-loading";
import Post from "../components/blog/Post";
import { Show } from "../components/common/show";

const MyBlog = () => {
  const { data: myPost, isLoading } = useAllMyBlogPost();

  if (isLoading) return <PageLoading />;
  return (
    <>
      <Header />
      <div className="mx-auto max-w-4xl w-full space-y-5 px-2 lg:px-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Blog post</h1>
          <span className="text-sm text-gray-700">
            Total {myPost?.length} post published.
          </span>
        </div>
        <div className="space-y-3">
          <Show>
            <Show.When isTrue={myPost?.length === 0}>
              <h1 className="mt-10 text-center">No Blog post found!</h1>
            </Show.When>
            <Show.Else>
              {myPost?.map((post, i) => (
                <Post {...post} key={i} />
              ))}
            </Show.Else>
          </Show>
        </div>
      </div>
    </>
  );
};

export default MyBlog;
