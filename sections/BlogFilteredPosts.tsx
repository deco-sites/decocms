import { BlogPost } from "apps/blog/types.ts";
import BlogFilteredPostsIsland from "../islands/BlogFilteredPosts.tsx";

export interface Props {
  /**
   * @title Posts
   * @description All blog posts - pass unfiltered posts here for category extraction
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
   * @title Categoria selecionada
   * @description Slug da categoria atualmente selecionada (set by loader)
   * @hide
   */
  selectedCategory?: string;
  /**
   * @title Termo de busca atual
   * @description Termo de busca atualmente aplicado (set by loader)
   * @hide
   */
  searchTerm?: string;
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
  selectedCategory = "",
  searchTerm = "",
  perPage = 6,
  showMoreText = "Show more",
}: Props) {
  return (
    <BlogFilteredPostsIsland
      posts={posts}
      searchPlaceholder={searchPlaceholder}
      blogUrl={blogUrl}
      initialCategory={selectedCategory}
      initialSearchTerm={searchTerm}
      perPage={perPage}
      showMoreText={showMoreText}
    />
  );
}

export function loader(
  props: Props,
  req: Request,
  _ctx: unknown,
) {
  try {
    const url = new URL(req.url);
    
    // Extract category from path (e.g., /blog/news -> news)
    const pathParts = url.pathname.split("/").filter(Boolean);
    let selectedCategory: string | undefined;
    
    if (pathParts.length > 1 && pathParts[0] === "blog" && pathParts[1] !== "post") {
      selectedCategory = pathParts[1];
    }
    
    // Fallback to query parameter
    if (!selectedCategory) {
      selectedCategory = url.searchParams.get("category") || undefined;
    }

    // Get search term from URL
    const searchTerm = url.searchParams.get("search") || "";

    return {
      ...props,
      selectedCategory: selectedCategory || "",
      searchTerm,
    };
  } catch (error) {
    console.error("Error in BlogFilteredPosts loader:", error);
    return {
      ...props,
      selectedCategory: "",
      searchTerm: "",
    };
  }
}

