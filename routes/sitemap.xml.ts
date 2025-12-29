import { RouteContext } from "@deco/deco";

export const handler = (_req: Request, _ctx: RouteContext): Response => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->

<url>
  <loc>https://www.decocms.com/</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://www.decocms.com/partners</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.decocms.com/blog</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.decocms.com/use-case/deco-sites</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.decocms.com/cx</loc>
  <lastmod>2025-12-29T00:00:00+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.decocms.com/blog/culture</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://www.decocms.com/blog/integrations</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://www.decocms.com/blog/product</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://www.decocms.com/blog/story</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://www.decocms.com/blog/post/ai-cms</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://www.decocms.com/blog/post/deco-day-2025</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://www.decocms.com/blog/post/context-is-the-next-CMS</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://www.decocms.com/blog/post/epiphany-to-zap</loc>
  <lastmod>2025-09-25T17:57:58+00:00</lastmod>
  <priority>0.64</priority>
</url>

</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
