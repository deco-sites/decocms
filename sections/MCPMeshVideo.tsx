import type { ImageWidget } from "apps/admin/widgets.ts";
import YouTubeVideoPlayer from "../islands/YouTubeVideoPlayer.tsx";

export interface Props {
  /**
   * @title YouTube Video ID
   * @description The YouTube video ID (e.g., "dQw4w9WgXcQ" from https://youtube.com/watch?v=dQw4w9WgXcQ)
   */
  videoId?: string;

  /**
   * @title Thumbnail Image
   * @description Custom thumbnail for the video (leave empty to use YouTube's default)
   */
  thumbnailImage?: ImageWidget;

  /**
   * @title Button Label
   * @description Text shown below the play button
   */
  buttonLabel?: string;
}

export default function MCPMeshVideo({
  videoId = "dQw4w9WgXcQ",
  thumbnailImage,
  buttonLabel = "Watch the MCP Mesh in action",
}: Props) {
  // Use custom thumbnail or YouTube's maxresdefault
  const thumbnailUrl = thumbnailImage || 
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section class="bg-dc-50 w-full flex flex-col items-center px-4 sm:px-8 lg:px-16 py-10">
      <div class="border border-dc-300 rounded-[16px] overflow-hidden w-full max-w-[1296px] aspect-video">
        <YouTubeVideoPlayer
          videoId={videoId}
          thumbnailUrl={thumbnailUrl}
          buttonLabel={buttonLabel}
          trackEventName="mcp_mesh_video_play_click"
        />
      </div>
    </section>
  );
}
