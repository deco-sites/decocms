import type { SitemapEntry } from "../loaders/sitemap.ts";

export interface Props {
  entries?: SitemapEntry[] | null;
}

export default function Sitemap({ entries = [] }: Props) {
  // This component should not render HTML for XML sitemap
  // The handler below will take care of the XML response
  return null;
}

export const loader = async (props: Props, req: Request, ctx: any) => {
  // Load the sitemap entries if not already provided
  if (!props.entries || (props.entries as any).__resolveType) {
    const entries = await ctx.invoke("site/loaders/sitemap.ts", {
      baseUrl: "https://www.decocms.com",
    });
    return { ...props, entries };
  }

  return props;
};

// Handler to return XML response
export const handler = async (req: Request, ctx: any, props: Props) => {
  // Load entries if needed
  let entries = props.entries;
  if (!entries || (entries as any).__resolveType) {
    entries = await ctx.invoke("site/loaders/sitemap.ts", {
      baseUrl: "https://www.decocms.com",
    });
  }

  if (!entries || entries.length === 0) {
    return new Response("No sitemap entries found", { status: 404 });
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${
    entries.map((entry) =>
      `  <url>
    <loc>${entry.loc}</loc>${
        entry.lastmod
          ? `
    <lastmod>${entry.lastmod}</lastmod>`
          : ""
      }${
        entry.changefreq
          ? `
    <changefreq>${entry.changefreq}</changefreq>`
          : ""
      }${
        entry.priority
          ? `
    <priority>${entry.priority}</priority>`
          : ""
      }
  </url>`
    ).join("\n")
  }
</urlset>`;

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
