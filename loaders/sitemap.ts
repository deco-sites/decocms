import { AppContext } from "../apps/site.ts";

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export interface Props {
  baseUrl?: string;
}

const loader = async (props: Props, req: Request, ctx: AppContext): Promise<SitemapEntry[]> => {
  const { baseUrl = "https://www.decocms.com" } = props;
  
  const sitemapEntries: SitemapEntry[] = [];
  
  // Add homepage
  sitemapEntries.push({
    loc: baseUrl,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: "daily",
    priority: 1.0
  });
  
  // Add static pages based on your current pages
  const staticPages = [
    { path: "/pricing", priority: 0.9, changefreq: "monthly" as const },
    { path: "/partners", priority: 0.8, changefreq: "monthly" as const },
    { path: "/blog", priority: 0.8, changefreq: "weekly" as const },
    { path: "/podcasts", priority: 0.7, changefreq: "weekly" as const },
    { path: "/find-a-partner", priority: 0.7, changefreq: "monthly" as const },
    { path: "/black-friday", priority: 0.6, changefreq: "yearly" as const },
    { path: "/termos-de-uso", priority: 0.3, changefreq: "yearly" as const },
    { path: "/politica-de-privacidade", priority: 0.3, changefreq: "yearly" as const },
    { path: "/terms-of-use", priority: 0.3, changefreq: "yearly" as const },
    { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" as const },
  ];
  
  staticPages.forEach(page => {
    sitemapEntries.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority
    });
  });
  
  return sitemapEntries;
};

export default loader;