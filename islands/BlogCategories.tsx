import Icon from "../components/ui/Icon.tsx";
import { Category } from "apps/blog/types.ts";
import { useId } from "../sdk/useId.ts";
import { useState } from "preact/hooks";

export interface Props {
  /**
   * @title Categorias
   * @description Lista de categorias para filtrar os posts do blog
   */
  categories?: Category[];
  /**
   * @title Categoria selecionada
   * @description Slug da categoria atualmente selecionada
   */
  selectedCategory?: string;
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
   * @title Usar URLs de categoria direta
   * @description Se true, usa /:category em vez de ?category=
   */
  useCategoryPath?: boolean;
  /**
   * @title Posts para extrair categorias
   * @description Lista de posts para extrair categorias (se não fornecidas diretamente)
   */
  posts?: Array<{ categories?: Category[] }>;
  /**
   * @title Termo de busca atual
   * @description Termo de busca atualmente aplicado
   */
  searchTerm?: string;
  /**
   * @title Tempo de debounce
   * @description Tempo em ms para debounce da busca automática
   */
  debounceTime?: number;
}

export default function BlogCategories({
  categories = [],
  selectedCategory,
  searchPlaceholder = "Search posts",
  blogUrl = "/blog",
  useCategoryPath = true,
  posts = [],
  searchTerm = "",
  debounceTime = 300,
}: Props) {
  // Generate unique ID for the form
  const formId = useId();
  const [isSearching, setIsSearching] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Function to generate the correct URL for a category
  const getCategoryUrl = (categorySlug: string) => {
    if (useCategoryPath) {
      return categorySlug ? `${blogUrl}/${categorySlug}` : blogUrl;
    }
    return `${blogUrl}${categorySlug ? `?category=${categorySlug}` : ""}`;
  };

  // If no categories were provided but we have posts, extract from posts
  let finalCategories = categories;
  if (categories.length === 0 && posts && posts.length > 0) {
    const uniqueCategories = new Map<string, Category>();

    posts.forEach((post) => {
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach((category) => {
          if (
            category && category.slug && !uniqueCategories.has(category.slug)
          ) {
            uniqueCategories.set(category.slug, category);
          }
        });
      }
    });

    finalCategories = Array.from(uniqueCategories.values());
    finalCategories.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Add an "All" category option that links to blog homepage
  const allBlogCategories = [
    { name: "All", slug: "" },
    ...finalCategories,
  ];

  // Determine form action URL based on whether we're using category paths
  const formAction = useCategoryPath && selectedCategory
    ? `${blogUrl}/${selectedCategory}`
    : blogUrl;

  // Handle form submission - standard form submission
  const handleSubmit = (e: Event) => {
    setIsSearching(true);
    // Let the form submit normally
  };

  // Clear search input and submit form
  const handleClearSearch = () => {
    // Clear the input value
    const form = document.getElementById(formId) as HTMLFormElement;
    const input = form.querySelector(
      'input[name="search"]',
    ) as HTMLInputElement;
    input.value = "";
    setLocalSearchTerm("");

    // Build the URL without the search parameter
    const url = new URL(window.location.href);
    url.searchParams.delete("search");

    // Redirect to the page without the search parameter
    window.location.href = url.toString();
  };

  // Handle input change
  const handleSearchInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    setLocalSearchTerm(input.value);
  };

  return (
    <div class="w-full bg-dc-50 px-4 md:px-8 lg:px-16 py-8 pt-24">
      <div class="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Categories */}
        <div class="flex flex-wrap justify-start items-center gap-2">
          {allBlogCategories.map((category) => {
            const isSelected = category.slug
              ? selectedCategory === category.slug
              : !selectedCategory || selectedCategory === "";

            // If there's an active search, preserve it when switching categories
            let categoryUrl = getCategoryUrl(category.slug);
            if (searchTerm) {
              categoryUrl += (categoryUrl.includes("?") ? "&" : "?") +
                `search=${encodeURIComponent(searchTerm)}`;
            }

            return (
              <a
                href={categoryUrl}
                class={`px-3 py-2 bg-dc-50 rounded-full outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center gap-2 hover:bg-dc-100 transition-colors ${
                  isSelected ? "bg-dc-100" : ""
                }`}
              >
                <div class="text-dc-600 text-base font-semibold font-sans leading-tight">
                  {category.name}
                </div>
              </a>
            );
          })}
        </div>

        {/* Search */}
        <div class="flex justify-start items-center gap-2 w-full md:w-auto md:flex-1 md:max-w-[500px]">
          <form
            id={formId}
            class="flex-1 w-full"
            action={formAction}
            method="GET"
            onSubmit={handleSubmit}
          >
            <div class="flex-1 w-full px-4 py-2.5 bg-dc-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-start items-center gap-1 overflow-hidden">
              {isSearching
                ? (
                  <div class="animate-spin w-6 h-6 flex items-center justify-center">
                    <Icon name="refresh" class="text-dc-400" />
                  </div>
                )
                : <Icon name="search" class="text-dc-400 w-6 h-6" />}
              <input
                type="text"
                name="search"
                value={localSearchTerm}
                placeholder={searchPlaceholder}
                onInput={handleSearchInput}
                class="flex-1 bg-transparent border-none outline-none text-dc-800 placeholder:text-dc-400 text-lg font-normal font-sans leading-tight"
              />
              {selectedCategory && !useCategoryPath && (
                <input type="hidden" name="category" value={selectedCategory} />
              )}
              {localSearchTerm && (
                <button
                  type="button"
                  class="w-6 h-6 flex items-center justify-center"
                  onClick={handleClearSearch}
                >
                  <Icon name="close" class="text-dc-400" />
                </button>
              )}
            </div>
          </form>

          <button
            type="submit"
            form={formId}
            class="w-11 px-4 py-2.5 bg-dc-50 rounded-xl outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center gap-1 overflow-hidden hover:bg-dc-100 transition-colors"
          >
            <Icon name="filter_list" class="text-dc-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function loader(
  props: Props,
  req: Request,
  ctx: any,
) {
  try {
    // Get current path to determine selected category
    const url = new URL(req.url);
    let selectedCategory: string | undefined;

    // First check if it's a direct category path (/:category)
    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts.length > 1 && pathParts[0] === "blog") {
      selectedCategory = pathParts[1];
    }

    // If not found as a path, check query parameter
    if (!selectedCategory) {
      selectedCategory = url.searchParams.get("category") || undefined;
    }

    // Get search term from URL
    const searchTerm = url.searchParams.get("search") || "";

    return {
      ...props,
      selectedCategory,
      searchTerm,
    };
  } catch (error) {
    console.error("Error in BlogCategories loader:", error);
    return {
      ...props,
      selectedCategory: undefined,
      searchTerm: "",
    };
  }
}
