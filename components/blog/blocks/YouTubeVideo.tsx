import type { YouTubeVideoBlock } from "../../../types/blogContent.ts";
import YouTubeVideoPlayer from "../../../islands/YouTubeVideoPlayer.tsx";

export function YouTubeVideo({
  videoId,
  buttonLabel = "Watch the video",
  thumbnailImage,
}: YouTubeVideoBlock) {
  const thumbnailUrl =
    thumbnailImage || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div class="my-8 border border-dc-300 rounded-[16px] overflow-hidden w-full aspect-video">
      <YouTubeVideoPlayer
        videoId={videoId}
        thumbnailUrl={thumbnailUrl}
        buttonLabel={buttonLabel}
      />
    </div>
  );
}

