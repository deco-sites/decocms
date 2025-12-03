import { useEffect, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { trackEvent } from "../sdk/tracking.ts";

export interface GitHubStarsProps {
  repo: string;
  icon?: ImageWidget;
  /** @title Tracking event name */
  trackEventName?: string;
  /** @title Additional tracking properties */
  trackProperties?: Record<string, unknown>;
}

export default function GitHubStars(
  { repo, icon, trackEventName, trackProperties }: GitHubStarsProps,
) {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStars = async () => {
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

    if (repo) {
      fetchStars();
    }
  }, [repo]);

  if (!repo || loading) {
    return null;
  }

  const formatStars = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const handleClick = () => {
    if (trackEventName) {
      trackEvent(trackEventName, {
        href: `https://github.com/${repo}`,
        stars,
        ...trackProperties,
      });
    }
  };

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      class="backdrop-blur-sm bg-white/80 rounded-full py-2 pl-2 pr-3 flex items-center gap-1.5 hover:bg-white/90 transition-colors"
      onClick={handleClick}
    >
      {icon
        ? (
          <Image
            src={icon}
            alt="GitHub"
            width={16}
            height={16}
            class="w-4 h-4 object-contain"
          />
        )
        : (
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
              class="text-dc-800"
            />
          </svg>
        )}
      <span class="text-dc-800 text-sm font-medium leading-tight">
        {stars ? formatStars(stars) : "0"}
      </span>
    </a>
  );
}
