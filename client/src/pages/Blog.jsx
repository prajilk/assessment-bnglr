import { useParams } from "react-router-dom";
import { useBlogPost } from "../api/getBlogPost";
import { formatISO9075 } from "date-fns";
import Header from "../components/header/Header";
import { useSelector } from "react-redux";
import PageLoading from "../components/common/page-loading";
import Error404 from "../components/common/error404";
import PostSettings from "../components/dropdown/PostSettings";
import { Show } from "../components/common/show";

export default function Blog() {
  const placeholderImage =
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
  const params = useParams();
  const { data: post, isLoading, isError } = useBlogPost(params.id); // Requesting a B;og post details from the server using slug
  const user = useSelector((state) => state.user); // Getting user details form "user" redux state

  if (isLoading) return <PageLoading />;

  if (isError) return <Error404 />;

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6 md:pb-16 lg:px-8 lg:pb-20">
        <Header />
        <div className="mx-auto rounded-md bg-white p-5 shadow">
          <div className="not-prose space-y-2">
            <h1 className="text-2xl font-bold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
              {post?.title}
            </h1>
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-4">
                <h3 className="font-bold">{post?.author?.fullname}</h3>
                <span>|</span>
                <time>
                  {formatISO9075(new Date(post?.createdAt || Date()))}
                </time>
              </div>
              <Show>
                {/* Compare userId and authorId to show the post settings */}
                <Show.When isTrue={user?._id === post?.author._id}>
                  <PostSettings _id={post?._id} slug={post?.slug} />
                </Show.When>
              </Show>
            </div>
          </div>

          <img
            src={post?.image || placeholderImage}
            alt={post?.title}
            className="my-10"
          />
          <article
            className="prose mx-auto mt-5 max-w-full"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </div>
      </div>
    </>
  );
}
