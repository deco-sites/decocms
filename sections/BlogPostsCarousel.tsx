import type { BlogPost } from "apps/blog/types.ts";
import BlogPostsCarouselIsland from "../islands/BlogPostsCarousel.tsx";
import { join } from "jsr:@std/path@^0.225.2/join";
import { walk } from "jsr:@std/fs@^0.229.1/walk";

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
    // Read blog post blocks from .deco/blocks/collections/blog/posts/*.json
    const blocksDir = join(Deno.cwd(), ".deco", "blocks", "collections%2Fblog%2Fposts%2F");

    const posts: BlogPost[] = [];

    try {
      for await (const entry of walk(blocksDir, { includeDirs: false, exts: [".json"], maxDepth: 1 })) {
        const text = await Deno.readTextFile(entry.path);
        const data = JSON.parse(text);
        if (data && data.post) {
          const p = data.post as BlogPost;
          posts.push(p);
        }
      }
    } catch (_e) {
      // If path with encoded slashes is not present (varies by env), fallback to nested directories
      const altDir = join(Deno.cwd(), ".deco", "blocks", "collections", "blog", "posts");
      for await (const entry of walk(altDir, { includeDirs: false, exts: [".json"], maxDepth: 1 })) {
        const text = await Deno.readTextFile(entry.path);
        const data = JSON.parse(text);
        if (data && data.post) {
          posts.push(data.post as BlogPost);
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
  return (
    <BlogPostsCarousel />
  );
}


