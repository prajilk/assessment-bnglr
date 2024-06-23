import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  title,
  summary,
  image,
  slug,
  createdAt,
  author,
}) {
  // Placeholder image when no cover image found on the Post
  const placeholderImage =
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

  return (
    <>
      <div className="grid gap-5 rounded-md bg-white p-5 shadow md:grid-cols-3">
        <div className="image">
          <Link to={`/blog/${slug}`}>
            <img
              src={image || placeholderImage}
              alt={title}
              className="aspect-video"
            />
          </Link>
        </div>
        <div className="md:col-span-2">
          <Link to={`/blog/${slug}`}>
            <h2 className="text-2xl font-semibold">{title}</h2>
          </Link>
          <p className="my-3 flex gap-2 text-sm font-medium text-[#888]">
            <b className="text-[#333]">{author.fullname}</b>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="my-2 text-sm leading-7">{summary}</p>
        </div>
      </div>
    </>
  );
}
