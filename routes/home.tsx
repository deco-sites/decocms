import { PageProps } from "$fresh/server.ts";

export default function HomePage(props: PageProps) {
  return (
    <div>
      {/* This page will be managed through the admin interface */}
      <div id="page-content">
        {/* Content will be injected here by the CMS */}
      </div>
    </div>
  );
}