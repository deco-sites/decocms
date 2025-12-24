import type { BlogPost } from "apps/blog/types.ts";
import LatestBlogPostsIsland from "../islands/LatestBlogPosts.tsx";
import { join } from "jsr:@std/path@^0.225.2/join";

export interface Props {
  /**
   * @title Título da seção
   * @description Título principal exibido acima dos posts
   */
  heading?: string;
  /**
   * @title Texto do botão
   * @description Texto do botão "Ver todos"
   */
  ctaText?: string;
  /**
   * @title URL do botão
   * @description Link para a página de blog
   */
  ctaHref?: string;
  /**
   * @title Quantidade máxima de posts
   * @description Número máximo de posts mais recentes a serem carregados
   */
  limit?: number;
}

const defaultProps: Props = {
  heading: "Latest from the blog",
  ctaText: "See all",
  ctaHref: "/blog",
  limit: 6,
};

export default function LatestBlogPosts(props: Props) {
  const {
    heading = defaultProps.heading!,
    ctaText = defaultProps.ctaText!,
    ctaHref = defaultProps.ctaHref!,
    limit = defaultProps.limit!,
    posts = [],
  } = props as Props & { posts?: BlogPost[] };

  const list = (posts || []).slice(0, limit);

  return (
    <LatestBlogPostsIsland
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
  const mockPosts: BlogPost[] = [
    {
      title: "Connect Your AI Workforce to Your Entire Tech Stack",
      slug: "ai-workforce-tech-stack",
      date: "2025-05-21",
      image:
        "https://assets.decocache.com/decocms/617f7695-bdf9-40a4-84fe-c25c60077286/blog.png",
      authors: [
        {
          name: "Rafael Valls",
          avatar:
            "https://assets.decocache.com/decocms/d377d0fc-343d-4f45-84aa-c7e1da1beaf0/Luciano-Junior-1.png",
        },
      ],
      excerpt: "Learn how to integrate AI agents with your existing tools.",
    },
    {
      title: "The Future of MCP: What's Coming Next",
      slug: "future-of-mcp",
      date: "2025-05-20",
      image:
        "https://assets.decocache.com/decocms/617f7695-bdf9-40a4-84fe-c25c60077286/blog.png",
      authors: [
        {
          name: "Rafael Valls",
          avatar:
            "https://assets.decocache.com/decocms/d377d0fc-343d-4f45-84aa-c7e1da1beaf0/Luciano-Junior-1.png",
        },
      ],
      excerpt: "Explore the upcoming features in the MCP ecosystem.",
    },
    {
      title: "Building Enterprise-Ready AI Applications",
      slug: "enterprise-ai-apps",
      date: "2025-05-19",
      image:
        "https://assets.decocache.com/decocms/617f7695-bdf9-40a4-84fe-c25c60077286/blog.png",
      authors: [
        {
          name: "Rafael Valls",
          avatar:
            "https://assets.decocache.com/decocms/d377d0fc-343d-4f45-84aa-c7e1da1beaf0/Luciano-Junior-1.png",
        },
      ],
      excerpt: "Best practices for deploying AI in enterprise environments.",
    },
  ] as unknown as BlogPost[];

  return (
    <LatestBlogPostsIsland
      heading={defaultProps.heading!}
      ctaText={defaultProps.ctaText!}
      ctaHref={defaultProps.ctaHref!}
      posts={mockPosts}
    />
  );
}

