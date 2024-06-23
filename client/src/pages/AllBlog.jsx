import Header from "../components/header/Header";
import Post from "../components/blog/Post";
import { useAllBlogPost } from "../api/getAllBlogs";
import React from "react";
import { Show } from "../components/common/show";

export default function AllBlog() {
  const { data: allPosts } = useAllBlogPost(); // Requesting All posts from the server

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <section className="pb-5 md:pb-24 lg:pb-10">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl space-y-8">
              <h1 className="text-2xl font-bold">All Blogs</h1>
              <div className="grid gap-6">
                <Show>
                  <Show.When isTrue={allPosts?.length === 0}>
                    <h1 className="text-center">No Blogs found!</h1>
                  </Show.When>
                  <Show.Else>
                    {allPosts?.map((post, i) => (
                      <Post
                        key={i}
                        _id={post._id}
                        author={post.author}
                        content={post.content}
                        image={post.image}
                        createdAt={post.createdAt}
                        slug={post.slug}
                        summary={post.summary}
                        title={post.title}
                      />
                    ))}
                  </Show.Else>
                </Show>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
