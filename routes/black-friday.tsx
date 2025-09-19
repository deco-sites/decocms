import { PageProps } from "$fresh/server.ts";

export default function BlackFridayPage(props: PageProps) {
  return (
    <div>
      {/* SEO Meta tags serão adicionados automaticamente */}
    </div>
  );
}

export const config = {
  routeOverride: "/black-friday"
};