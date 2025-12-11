import { useEffect, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  repo: string;
  icon?: ImageWidget;
}

export default function GitHubStarsInline({ repo, icon }: Props) {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStars = async () => {
      if (!repo) return;
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (response.ok) {
          const data = await response.json();
          setStars(data.stargazers_count);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, [repo]);

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {icon ? (
        <Image
          src={icon}
          alt="GitHub"
          width={16}
          height={16}
          class="w-4 h-4 object-contain"
        />
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          class="w-4 h-4"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
            class="text-primary-light"
          />
        </svg>
      )}
      <span class="text-dc-800 text-sm font-medium leading-tight">
        {stars ? formatStars(stars) : "0"}
      </span>
    </>
  );
}

