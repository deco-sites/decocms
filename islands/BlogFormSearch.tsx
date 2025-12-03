import { useState } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";

export interface Props {
  formId: string;
  searchPlaceholder?: string;
}

export default function BlogFormSearch({ formId, searchPlaceholder }: Props) {
  const [isSearching, setIsSearching] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

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
    <div class="flex justify-start items-center gap-2 w-full md:w-auto md:flex-1 md:max-w-[500px]">
      <form
        id={formId}
        class="flex-1 w-full"
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
    </div>
  );
}
