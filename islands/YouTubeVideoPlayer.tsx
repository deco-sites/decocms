import { useEffect, useRef, useState } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";
import { trackEvent } from "../sdk/tracking.ts";

// YouTube Player types
interface YTPlayer {
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

interface Props {
  /** @title YouTube Video ID */
  videoId: string;
  /** @title Thumbnail URL */
  thumbnailUrl: string;
  /** @title Button Label */
  buttonLabel?: string;
  /** @title Tracking event name */
  trackEventName?: string;
  /** @title Additional tracking properties */
  trackProperties?: Record<string, unknown>;
}

// YouTube Player States
const YT_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

export default function YouTubeVideoPlayer({
  videoId,
  thumbnailUrl,
  buttonLabel = "Watch the MCP Mesh in action",
  trackEventName,
  trackProperties,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const progressMilestonesRef = useRef<Set<number>>(new Set());
  const progressIntervalRef = useRef<number | null>(null);
  const playerContainerId = `yt-player-${videoId}`;

  // Track video event
  const trackVideoEvent = (action: string, extraProps?: Record<string, unknown>) => {
    if (trackEventName) {
      trackEvent(`${trackEventName}_${action}`, {
        video_id: videoId,
        ...trackProperties,
        ...extraProps,
      });
    }
  };

  // Check and track progress milestones
  const checkProgress = () => {
    if (!playerRef.current) return;

    const currentTime = playerRef.current.getCurrentTime();
    const duration = playerRef.current.getDuration();

    if (duration <= 0) return;

    const percentWatched = (currentTime / duration) * 100;
    const milestones = [25, 50, 75];

    for (const milestone of milestones) {
      if (percentWatched >= milestone && !progressMilestonesRef.current.has(milestone)) {
        progressMilestonesRef.current.add(milestone);
        trackVideoEvent(`progress_${milestone}`, {
          current_time: Math.round(currentTime),
          duration: Math.round(duration),
        });
      }
    }
  };

  // Initialize YouTube player
  const initPlayer = () => {
    const win = globalThis as typeof globalThis & {
      YT?: {
        Player: new (
          elementId: string,
          config: {
            videoId: string;
            playerVars: Record<string, number>;
            events: {
              onReady: (event: YTPlayerEvent) => void;
              onStateChange: (event: YTPlayerEvent) => void;
            };
          }
        ) => YTPlayer;
      };
      onYouTubeIframeAPIReady?: () => void;
    };

    const createPlayer = () => {
      if (!win.YT) return;

      playerRef.current = new win.YT.Player(playerContainerId, {
        videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            trackVideoEvent("play");
            // Start progress tracking
            progressIntervalRef.current = globalThis.setInterval(checkProgress, 1000);
          },
          onStateChange: (event: YTPlayerEvent) => {
            switch (event.data) {
              case YT_STATES.PAUSED:
                trackVideoEvent("pause", {
                  current_time: Math.round(playerRef.current?.getCurrentTime() || 0),
                });
                break;
              case YT_STATES.ENDED:
                trackVideoEvent("complete");
                if (progressIntervalRef.current) {
                  globalThis.clearInterval(progressIntervalRef.current);
                }
                break;
              case YT_STATES.PLAYING:
                // Resume tracking if it was paused
                if (!progressIntervalRef.current) {
                  progressIntervalRef.current = globalThis.setInterval(checkProgress, 1000);
                }
                break;
            }
          },
        },
      });
    };

    // Load YouTube IFrame API if not loaded
    if (!win.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      win.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        globalThis.clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    // Player initialization happens after render
    setTimeout(initPlayer, 100);
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
      onClick={!isPlaying ? handlePlay : undefined}
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
        /* YouTube Player Container */
        <div id={playerContainerId} class="absolute inset-0 w-full h-full" />
      )}
    </div>
  );
}
