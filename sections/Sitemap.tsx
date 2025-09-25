import type { SitemapEntry } from "../loaders/sitemap.ts";

export interface Props {
  entries?: SitemapEntry[] | null;
}

export default function Sitemap({ entries = [] }: Props) {
  if (!entries || entries.length === 0) {
    return <div>No sitemap entries found</div>;
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: xmlContent }}
      style={{ 
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        fontSize: '12px'
      }}
    />
  );
}

export const loader = (props: Props, req: Request) => {
  // Set the response content type to XML
  const response = new Response();
  response.headers.set('Content-Type', 'application/xml');
  
  return props;
};