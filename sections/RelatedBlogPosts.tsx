import type { BlogPost } from "apps/blog/types.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "../components/ui/Button.tsx";
import BlogAuthorTag from "../components/blog/BlogAuthorTag.tsx";

export interface Props {
  /**
   * @title Post limit
   * @description Number of posts to display
   */
  count?: number;
  /**
   * @title Heading text
   * @description Text to display in the section heading
   */
  heading?: string;
  /**
   * @title Button text
   * @description Text to display in the 'See all' button
   */
  buttonText?: string;
  /**
   * @title Blog URL
   * @description URL to redirect when clicking 'See all'
   */
  blogUrl?: string;
  /**
   * @title Posts
   * @description Posts to display (loaded from the blog loader)
   */
  posts?: BlogPost[] | null;
}

export default function RelatedBlogPosts({
  count = 3,
  heading = "You might also like",
  buttonText = "See all",
  blogUrl = "/blog",
  posts = [],
}: Props) {
  // Ensure we only show exactly the number specified in count
  const displayPosts = posts?.length ? posts.slice(0, count) : [];

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      const dateStr = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const timeStr = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      return `${dateStr} at ${timeStr}`;
    } catch (e) {
      return dateString;
    }
  };

  // Helper function to render categories
  const renderCategories = (post: BlogPost) => {
    if (!post.categories?.length) return null;

    return (
      <div className="flex flex-wrap justify-start items-start gap-2">
        {post.categories.slice(0, 2).map((category, idx) =>
          category && category.name
            ? (
              <a
                key={idx}
                href={`/blog/${category.slug}`}
                className="px-4 py-1 bg-dc-50 rounded-full outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center hover:bg-dc-100 transition-colors"
              >
                <div className="justify-center text-dc-600 text-base font-semibold font-sans leading-tight">
                  {category.name}
                </div>
              </a>
            )
            : null
        )}
      </div>
    );
  };

  return (
    <div className="w-full min-w-full bg-dc-50 flex flex-col justify-start items-center overflow-hidden px-4 md:px-8 lg:px-16 py-8 md:py-16 gap-8 md:gap-14">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-dc-800 text-4xl font-semibold font-sans leading-tight">
          {heading}
        </h2>
        <Button
          variant="secondary"
          size="medium"
          href={blogUrl}
        >
          {buttonText}
        </Button>
      </div>

      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {displayPosts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-start gap-6"
            >
              <a href={`/blog/post/${post.slug}`} className="block w-full">
                <div className="aspect-3/2 w-full bg-primary-light rounded-2xl overflow-hidden">
                  <Image
                    src={post.image || "https://placehold.co/416x256"}
                    alt={post.title || ""}
                    width={416}
                    height={256}
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </a>
              <div className="w-full flex flex-col justify-start items-start gap-4">
                {renderCategories(post)}

                <a
                  href={`/blog/post/${post.slug}`}
                  className="block w-full hover:opacity-80 transition-opacity"
                >
                  <h3 className="text-dc-800 text-xl md:text-2xl font-semibold font-sans leading-tight">
                    {post.title}
                  </h3>
                </a>

                <div className="inline-flex justify-start items-center gap-3">
                  <BlogAuthorTag
                    authors={post.authors}
                    avatarSize={20}
                    showName={post.authors?.length === 1}
                    outlineColor="outline-dc-50"
                  />

                  {post.date && (
                    <>
                      <div className="w-1 h-1 bg-dc-500 rounded-[1px]"></div>
                      <div className="text-dc-500 text-sm font-medium font-sans leading-tight">
                        {formatDate(post.date)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Preview() {
  // Just return the component with empty posts - the preview will work
  // through the UI without needing to mock the data structure
  return (
    <RelatedBlogPosts
      heading="You might also like"
      buttonText="See all"
      count={3}
    />
  );
}
