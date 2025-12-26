import { useState, useMemo, useCallback } from "preact/hooks";
import { BlogPost, Category } from "apps/blog/types.ts";
import Icon from "../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import BlogAuthorTag from "../components/blog/BlogAuthorTag.tsx";
import TrackedLink from "./TrackedLink.tsx";

export interface Props {
  /**
   * @title Posts
   * @description All blog posts (unfiltered) - categories will be extracted from these
   */
  posts?: BlogPost[] | null;
  /**
   * @title Placeholder de busca
   * @description Texto de placeholder exibido no campo de busca
   */
  searchPlaceholder?: string;
  /**
   * @title URL da página de blog
   * @description URL base da página de blog para navegação entre categorias
   */
  blogUrl?: string;
  /**
   * @title Categoria inicial selecionada
   * @description Slug da categoria atualmente selecionada (do URL)
   */
  initialCategory?: string;
  /**
   * @title Termo de busca inicial
   * @description Termo de busca inicial (do URL)
   */
  initialSearchTerm?: string;
  /**
   * @title Tempo de debounce
   * @description Tempo em ms para debounce da busca automática
   */
  debounceTime?: number;
  /**
   * @title Posts por página
   * @description Número de posts a exibir por página
   */
  perPage?: number;
  /**
   * @title Show More text
   * @description Text for the show more button
   */
  showMoreText?: string;
}

export default function BlogFilteredPosts({
  posts = [],
  searchPlaceholder = "Search posts",
  blogUrl = "/blog",
  initialCategory = "",
  initialSearchTerm = "",
  debounceTime = 200,
  perPage = 6,
  showMoreText = "Show more",
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [displayedCount, setDisplayedCount] = useState(perPage);

  // Extract unique categories from ALL posts
  const categories = useMemo(() => {
    if (!posts || posts.length === 0) return [];
    
    const uniqueCategories = new Map<string, Category>();
    
    posts.forEach((post) => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach((category) => {
          if (category && category.slug && !uniqueCategories.has(category.slug)) {
            uniqueCategories.set(category.slug, category);
          }
        });
      }
    });
    
    const categoriesArray = Array.from(uniqueCategories.values());
    categoriesArray.sort((a, b) => a.name.localeCompare(b.name));
    return categoriesArray;
  }, [posts]);

  // All categories including "All" option
  const allCategories = useMemo(() => {
    return [{ name: "All", slug: "" }, ...categories];
  }, [categories]);

  // Filter posts by category and search term
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    return posts.filter((post) => {
      // Filter by category
      if (selectedCategory) {
        const hasCategory = post.categories?.some(
          (cat) => cat && cat.slug === selectedCategory
        );
        if (!hasCategory) return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesTitle = post.title?.toLowerCase().includes(searchLower);
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(searchLower);
        const matchesAuthor = post.authors?.some((author) =>
          author && typeof author === "object" && "name" in author &&
          (author.name as string)?.toLowerCase().includes(searchLower)
        );
        const matchesCategory = post.categories?.some((cat) =>
          cat && cat.name?.toLowerCase().includes(searchLower)
        );
        
        if (!matchesTitle && !matchesExcerpt && !matchesAuthor && !matchesCategory) {
          return false;
        }
      }
      
      return true;
    });
  }, [posts, selectedCategory, searchTerm]);

  // Reset displayed count when filters change
  const handleCategoryClick = useCallback((categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setDisplayedCount(perPage);
    
    // Update URL without reload (for sharing/bookmarking)
    const url = new URL(window.location.href);
    if (categorySlug) {
      // Use path-based category
      const newPath = `${blogUrl}/${categorySlug}`;
      window.history.replaceState({}, "", searchTerm ? `${newPath}?search=${encodeURIComponent(searchTerm)}` : newPath);
    } else {
      window.history.replaceState({}, "", searchTerm ? `${blogUrl}?search=${encodeURIComponent(searchTerm)}` : blogUrl);
    }
  }, [blogUrl, searchTerm, perPage]);

  // Debounced search handler
  const handleSearchInput = useCallback((e: Event) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    setSearchTerm(value);
    setDisplayedCount(perPage);
    
    // Update URL without reload
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("search", value);
    } else {
      url.searchParams.delete("search");
    }
    window.history.replaceState({}, "", url.toString());
  }, [perPage]);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    setDisplayedCount(perPage);
    
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.history.replaceState({}, "", url.toString());
  }, [perPage]);

  const handleShowMore = useCallback(() => {
    setDisplayedCount((prev) => prev + perPage);
  }, [perPage]);

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
    } catch (_e) {
      return dateString;
    }
  };

  // Helper function to render post categories
  const renderCategories = (post: BlogPost) => {
    if (!post.categories?.length) return null;
    return (
      <div class="inline-flex flex-wrap justify-start items-start gap-2">
        {post.categories.slice(0, 2).map((category) =>
          category && category.name ? (
            <button
              type="button"
              onClick={() => handleCategoryClick(category.slug)}
              class="px-4 py-1 bg-dc-50 rounded-full outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center hover:bg-dc-100 transition-colors cursor-pointer"
            >
              <div class="justify-center text-dc-600 text-base font-semibold font-sans leading-tight">
                {category.name}
              </div>
            </button>
          ) : null
        )}
      </div>
    );
  };

  // Split posts for display
  const featuredPosts = filteredPosts.slice(0, 2);
  const regularPosts = filteredPosts.slice(2, displayedCount);
  const hasMorePosts = displayedCount < filteredPosts.length;

  return (
    <>
      {/* Categories and Search Bar */}
      <div class="w-full bg-dc-50 px-4 md:px-8 lg:px-16 py-8 pt-24">
        <div class="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Categories */}
          <div class="flex flex-wrap justify-start items-center gap-2">
            {allCategories.map((category) => {
              const isSelected = category.slug
                ? selectedCategory === category.slug
                : !selectedCategory || selectedCategory === "";

              return (
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.slug)}
                  class={`px-3 py-2 bg-dc-50 rounded-full outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center gap-2 hover:bg-dc-100 transition-colors cursor-pointer ${
                    isSelected ? "bg-dc-100 outline-dc-400" : ""
                  }`}
                >
                  <div class="text-dc-600 text-base font-semibold font-sans leading-tight">
                    {category.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div class="flex justify-start items-center gap-2 w-full md:w-auto md:flex-1 md:max-w-[500px]">
            <div class="flex-1 w-full px-4 py-2.5 bg-dc-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-start items-center gap-1 overflow-hidden">
              <Icon name="search" class="text-dc-400 w-6 h-6" />
              <input
                type="text"
                value={searchTerm}
                placeholder={searchPlaceholder}
                onInput={handleSearchInput}
                class="flex-1 bg-transparent border-none outline-none text-dc-800 placeholder:text-dc-400 text-lg font-normal font-sans leading-tight"
              />
              {searchTerm && (
                <button
                  type="button"
                  class="w-6 h-6 flex items-center justify-center cursor-pointer"
                  onClick={handleClearSearch}
                >
                  <Icon name="close" class="text-dc-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div class="w-full bg-dc-50 px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div class="w-full max-w-[1440px] mx-auto flex flex-col justify-start items-center gap-8">
          {/* Featured Posts (first 2 posts, 2-column layout) */}
          {featuredPosts.length > 0 && (
            <div class="self-stretch grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div class="flex flex-col justify-start items-start">
                  <TrackedLink
                    href={`/blog/post/${post.slug}`}
                    event="blog_post_click"
                    properties={{
                      post_slug: post.slug,
                      post_title: post.title,
                      post_type: "featured",
                      click_element: "image",
                    }}
                    class="block w-full"
                  >
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
                  </TrackedLink>
                  <div class="self-stretch py-6 flex flex-col justify-start items-start gap-4">
                    {renderCategories(post)}

                    <TrackedLink
                      href={`/blog/post/${post.slug}`}
                      event="blog_post_click"
                      properties={{
                        post_slug: post.slug,
                        post_title: post.title,
                        post_type: "featured",
                        click_element: "title",
                      }}
                      class="block w-full hover:opacity-80 transition-opacity"
                    >
                      <h2 class="self-stretch text-dc-800 text-2xl md:text-3xl font-semibold font-sans leading-tight md:leading-10">
                        {post.title}
                      </h2>
                    </TrackedLink>

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
          {filteredPosts.length === 0 && (
            <div class="w-full flex flex-col items-center justify-center py-12 text-center">
              <h2 class="text-dc-800 text-2xl font-semibold font-sans mb-2">
                No posts found
              </h2>
              <p class="text-dc-600 text-lg font-sans mb-6">
                {searchTerm
                  ? `We couldn't find any posts matching "${searchTerm}"${selectedCategory ? ` in this category` : ""}`
                  : selectedCategory
                    ? `No posts in this category yet`
                    : `No posts available`}
              </p>
              {(searchTerm || selectedCategory) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setDisplayedCount(perPage);
                    window.history.replaceState({}, "", blogUrl);
                  }}
                  class="px-4 py-2 bg-primary-light text-primary-dark rounded-xl font-semibold font-sans hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Regular Posts (3-column layout for large screens) */}
          {regularPosts.length > 0 && (
            <div class="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <div class="flex flex-col justify-start items-start">
                  <TrackedLink
                    href={`/blog/post/${post.slug}`}
                    event="blog_post_click"
                    properties={{
                      post_slug: post.slug,
                      post_title: post.title,
                      post_type: "regular",
                      click_element: "image",
                    }}
                    class="block w-full"
                  >
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
                  </TrackedLink>
                  <div class="self-stretch py-6 flex flex-col justify-start items-start gap-4">
                    {renderCategories(post)}

                    <TrackedLink
                      href={`/blog/post/${post.slug}`}
                      event="blog_post_click"
                      properties={{
                        post_slug: post.slug,
                        post_title: post.title,
                        post_type: "regular",
                        click_element: "title",
                      }}
                      class="block w-full hover:opacity-80 transition-opacity"
                    >
                      <h3 class="self-stretch text-dc-800 text-xl md:text-2xl font-semibold font-sans leading-tight md:leading-7">
                        {post.title}
                      </h3>
                    </TrackedLink>

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

          {/* Load More Button */}
          {hasMorePosts && (
            <div class="flex justify-center w-full mt-8">
              <button
                type="button"
                onClick={handleShowMore}
                class="px-4 py-2 bg-primary-light text-primary-dark rounded-xl font-semibold font-sans cursor-pointer hover:opacity-90 transition-opacity"
              >
                {showMoreText}
              </button>
            </div>
          )}

          {/* Results count indicator */}
          {filteredPosts.length > 0 && (
            <div class="text-dc-500 text-sm font-medium font-sans">
              Showing {Math.min(displayedCount, filteredPosts.length)} of {filteredPosts.length} posts
              {selectedCategory && ` in ${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

