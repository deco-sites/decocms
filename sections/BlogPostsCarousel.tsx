import type { BlogPost } from "apps/blog/types.ts";
import BlogPostsCarouselIsland from "../islands/BlogPostsCarousel.tsx";
import { join } from "jsr:@std/path@^0.225.2/join";

export interface Props {
  heading?: string;
  ctaText?: string;
  ctaHref?: string;
  /**
   * @title Max posts
   * @description Quantidade máxima de posts a carregar
   */
  limit?: number;
}

export default function BlogPostsCarousel(props: Props) {
  const {
    heading = "Take a look inside the Agentic Era",
    ctaText = "Read all blogposts",
    ctaHref = "/blog",
    limit = 10,
    posts = [],
  } = props as Props & { posts?: BlogPost[] };

  const list = (posts || []).slice(0, limit);

  return (
    <BlogPostsCarouselIsland
      heading={heading}
      ctaText={ctaText}
      ctaHref={ctaHref}
      posts={list}
    />
  );
}

export async function loader(
  props: Props,
  _req: Request,
): Promise<Props & { posts: BlogPost[] }> {
  try {
    // Blog post files are directly in .deco/blocks/ with URL-encoded filenames
    // e.g., collections%2Fblog%2Fposts%2F0ce01f2de0ac.json
    const blocksDir = join(Deno.cwd(), ".deco", "blocks");
    const posts: BlogPost[] = [];

    // Read all files in the blocks directory and filter for blog posts
    for await (const entry of Deno.readDir(blocksDir)) {
      if (
        entry.isFile &&
        entry.name.startsWith("collections%2Fblog%2Fposts%2F") &&
        entry.name.endsWith(".json")
      ) {
        try {
          const filePath = join(blocksDir, entry.name);
          const text = await Deno.readTextFile(filePath);
          const data = JSON.parse(text);
          if (data && data.post) {
            posts.push(data.post as BlogPost);
          }
        } catch (_parseErr) {
          // Skip files that can't be parsed
          continue;
        }
      }
    }

    // Sort by date desc, newest first
    posts.sort((a, b) => {
      const ad = a.date ? Date.parse(a.date) : 0;
      const bd = b.date ? Date.parse(b.date) : 0;
      return bd - ad;
    });

    return { ...props, posts };
  } catch (_err) {
    return { ...props, posts: [] } as Props & { posts: BlogPost[] };
  }
}

export function Preview() {
  return <BlogPostsCarousel />;
}
