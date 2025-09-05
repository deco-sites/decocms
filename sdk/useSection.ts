/**
 * Simplified hook to generate section URLs with updated props
 * Just adds query parameters to current URL
 */
export function useSection({ props, href }: {
  props: Record<string, unknown>;
  href?: string;
}) {
  // Get the base URL - either the provided href or current location
  const baseUrl = href
    ? new URL(href, window.location.href)
    : new URL(window.location.href);

  // Add all props as query parameters
  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === "object") {
      baseUrl.searchParams.set(key, JSON.stringify(value));
    } else if (value !== undefined) {
      baseUrl.searchParams.set(key, String(value));
    }
  });

  return baseUrl.toString();
}
