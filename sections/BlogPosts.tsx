import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ComponentChildren, Fragment } from "preact";
import { BlogPost } from "apps/blog/types.ts";
import { useId } from "../sdk/useId.ts";
import BlogAuthorTag from "../components/blog/BlogAuthorTag.tsx";

export interface CTA {
  text?: string;
}

/** @title {{{title}}} */
export interface Post {
  url?: string;
  title?: string;
  author?: string;
  excerpt?: string;
  image?: ImageWidget;
  date?: string;
  readingTime?: string;
  tags?: string[];
}

export interface Props {
  cta?: CTA;
  posts?: BlogPost[] | null;
  pagination?: {
    /**
     * @title First page
     * @description Leave it as 0 to start from the first page
     */
    page?: number;
    /** @title items per page */
    perPage?: number;
  };
  /**
   * @title Search term
   * @description Filter posts by search term
   */
  searchTerm?: string;
  /**
   * @title Component ID
   * @description ID for the component to be targeted by HTMX
   */
  id?: string;
}

function Container({ children }: {
  children: ComponentChildren;
}) {
  return (
    <div class="w-full bg-dc-50 px-4 md:px-8 lg:px-16 py-8 md:py-12">
      <div class="w-full max-w-[1440px] mx-auto flex flex-col justify-start items-center gap-8">
        {children}
      </div>
    </div>
  );
}

export default function BlogPosts({
  cta = { text: "Show more" },
  posts,
  pagination: { page = 0, perPage = 6 } = {},
  searchTerm = "",
  id = "blog-posts",
}: Props) {
  const from = perPage * page;
  const to = perPage * (page + 1);

  // It's boring to generate ids. Let's autogen them
  const postList = useId();

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

  // Helper function to render post categories
  const renderCategories = (post: BlogPost) => {
    if (!post.categories?.length) return null;

    return (
      <div class="inline-flex flex-wrap justify-start items-start gap-2">
        {post.categories.slice(0, 2).map((category) =>
          category && category.name
            ? (
              <a
                href={`/blog/${category.slug}`}
                class="px-4 py-1 bg-dc-50 rounded-full outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center hover:bg-dc-100 transition-colors"
              >
                <div class="justify-center text-dc-600 text-base font-semibold font-sans leading-tight">
                  {category.name}
                </div>
              </a>
            )
            : null
        )}
      </div>
    );
  };

  const ContainerComponent = page === 0 ? Container : Fragment;

  // Filter posts by search term if provided
  const filteredPosts = searchTerm && posts
    ? posts.filter((post) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        post.title?.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower) ||
        post.authors?.some((author) =>
          author && typeof author === "object" && "name" in author &&
          (author.name as string)?.toLowerCase().includes(searchLower)
        )
      );
    })
    : posts;

  // Split posts into featured (first 2) and regular
  const featuredPosts = filteredPosts && page === 0
    ? filteredPosts.slice(0, 2)
    : [];
  const regularPosts = filteredPosts
    ? (page === 0 ? filteredPosts.slice(2, to) : filteredPosts.slice(from, to))
    : [];

  // Generate a standard URL for the next page
  const getNextPageUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", (page + 1).toString());
    return url.toString();
  };

  return (
    <ContainerComponent>
      <section id={id} data-page={page}>
        {/* Featured Posts (first 2 posts, 2-column layout) */}
        {page === 0 && featuredPosts.length > 0 && (
          <div class="self-stretch grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div class="flex flex-col justify-start items-start">
                <a href={`/blog/post/${post.slug}`} class="block w-full">
                  <div class="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={post.image || "https://placehold.co/640x427"}
                      alt={post.title || ""}
                      width={640}
                      height={427}
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </a>
                <div class="self-stretch py-6 flex flex-col justify-start items-start gap-4">
                  {renderCategories(post)}

                  <a
                    href={`/blog/post/${post.slug}`}
                    class="block w-full hover:opacity-80 transition-opacity"
                  >
                    <h2 class="self-stretch text-dc-800 text-2xl md:text-3xl font-semibold font-sans leading-tight md:leading-10">
                      {post.title}
                    </h2>
                  </a>

                  <div class="inline-flex justify-start items-center gap-3">
                    <BlogAuthorTag
                      authors={post.authors}
                      avatarSize={20}
                      showName={post.authors?.length === 1}
                      outlineColor="outline-dc-50"
                    />

                    {post.date && (
                      <>
                        <div class="w-1 h-1 bg-dc-500 rounded-[1px]"></div>
                        <div class="text-dc-500 text-sm font-medium font-sans leading-tight">
                          {formatDate(post.date)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {searchTerm && filteredPosts && filteredPosts.length === 0 && (
          <div class="w-full flex flex-col items-center justify-center py-12 text-center">
            <h2 class="text-dc-800 text-2xl font-semibold font-sans mb-2">
              No posts found
            </h2>
            <p class="text-dc-600 text-lg font-sans mb-6">
              We couldn't find any posts matching "{searchTerm}"
            </p>
            <a
              href="/blog"
              class="px-4 py-2 bg-primary-light text-primary-dark rounded-xl font-semibold font-sans hover:opacity-90 transition-opacity"
            >
              Back to all posts
            </a>
          </div>
        )}

        {/* Regular Posts (3-column layout for large screens) */}
        {regularPosts.length > 0 && (
          <div class="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <div class="flex flex-col justify-start items-start">
                <a href={`/blog/post/${post.slug}`} class="block w-full">
                  <div class="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={post.image || "https://placehold.co/416x277"}
                      alt={post.title || ""}
                      width={416}
                      height={277}
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </a>
                <div class="self-stretch py-6 flex flex-col justify-start items-start gap-4">
                  {renderCategories(post)}

                  <a
                    href={`/blog/post/${post.slug}`}
                    class="block w-full hover:opacity-80 transition-opacity"
                  >
                    <h3 class="self-stretch text-dc-800 text-xl md:text-2xl font-semibold font-sans leading-tight md:leading-7">
                      {post.title}
                    </h3>
                  </a>

                  <div class="inline-flex justify-start items-center gap-3">
                    <BlogAuthorTag
                      authors={post.authors}
                      avatarSize={20}
                      showName={post.authors?.length === 1}
                      outlineColor="outline-dc-50"
                    />

                    {post.date && (
                      <>
                        <div class="w-1 h-1 bg-dc-500 rounded-[1px]"></div>
                        <div class="text-dc-500 text-sm font-medium font-sans leading-tight">
                          {formatDate(post.date)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button - Replace HTMX with standard link */}
        {filteredPosts && to < filteredPosts.length && (
          <div class="flex justify-center w-full mt-8">
            <a
              href={getNextPageUrl()}
              class="px-4 py-2 bg-primary-light text-primary-dark rounded-xl font-semibold font-sans"
            >
              {cta.text}
            </a>
          </div>
        )}
      </section>
    </ContainerComponent>
  );
}

export function loader(
  props: Props,
  req: Request,
  ctx: any,
) {
  try {
    // Extract search term from URL if present
    const url = new URL(req.url);
    const searchTerm = url.searchParams.get("search") || "";

    // Extract category if present for additional filtering
    const pathParts = url.pathname.split("/").filter(Boolean);
    const categoryFromPath =
      pathParts.length > 1 && pathParts[0] === "blog" && pathParts[1] !== "post"
        ? pathParts[1]
        : undefined;
    const categoryFromQuery = url.searchParams.get("category") || undefined;
    const category = categoryFromPath || categoryFromQuery;

    // Set a standard ID for the component
    const id = "blog-posts";

    // Get pagination from query parameters if available
    const pageParam = url.searchParams.get("page");
    const perPageParam = url.searchParams.get("perPage");

    const pagination = {
      page: pageParam ? parseInt(pageParam, 10) : props.pagination?.page || 0,
      perPage: perPageParam
        ? parseInt(perPageParam, 10)
        : props.pagination?.perPage || 6,
    };

    return {
      ...props,
      searchTerm,
      category,
      id,
      pagination,
    };
  } catch (error) {
    console.error("Error in BlogPosts loader:", error);
    // Return default props on error
    return {
      ...props,
      id: "blog-posts",
      searchTerm: "",
      category: undefined,
      pagination: { page: 0, perPage: 6 },
    };
  }
}
