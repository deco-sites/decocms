import { useRef, useState } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";

interface Props {
  /** @title YouTube Video ID */
  videoId: string;
  /** @title Thumbnail URL */
  thumbnailUrl: string;
  /** @title Button Label */
  buttonLabel?: string;
}

export default function YouTubeVideoPlayer({
  videoId,
  thumbnailUrl,
  buttonLabel = "Watch the MCP Mesh in action",
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      class="relative w-full h-full rounded-[16px] overflow-hidden cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePlay}
    >
      {!isPlaying ? (
        <>
          {/* Thumbnail with overlay */}
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            class="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div class="absolute inset-0 bg-[rgba(68,64,60,0.4)]" />
          
          {/* Play button - centered */}
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-20 h-20 rounded-full bg-dc-200 flex items-center justify-center group-hover:bg-dc-300 transition-colors">
              <Icon
                name="play_arrow"
                size="xxl"
                class="text-dc-900"
              />
            </div>
          </div>

          {/* Cursor-following label */}
          <div
            class="absolute pointer-events-none left-0 top-0"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              willChange: "transform",
            }}
          >
            <div
              class="transition-[opacity,transform] duration-200 ease-out -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0.85})`,
                opacity: isHovering ? 1 : 0,
              }}
            >
              <div class="bg-dc-200 h-10 px-4 py-2 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span class="text-primary-dark text-sm font-medium whitespace-nowrap">
                  {buttonLabel}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* YouTube iframe */
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="YouTube video player"
          class="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}
