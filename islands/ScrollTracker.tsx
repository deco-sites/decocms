import { useEffect, useRef } from "preact/hooks";
import { trackEvent } from "../sdk/tracking.ts";

export interface Props {
  /** @title Base event name */
  /** @description Base name for scroll events (e.g., "home_page" will generate "home_page_scroll_25", etc.) */
  eventName?: string;
}

export default function ScrollTracker({
  eventName = "page",
}: Props) {
  const milestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollTop = globalThis.scrollY;
      const docHeight = document.documentElement.scrollHeight - globalThis.innerHeight;

      if (docHeight <= 0) return;

      const scrollPercent = (scrollTop / docHeight) * 100;

      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !milestonesRef.current.has(milestone)) {
          milestonesRef.current.add(milestone);
          trackEvent(`${eventName}_scroll_${milestone}`, {
            scroll_percent: milestone,
            scroll_position: Math.round(scrollTop),
            page_height: Math.round(docHeight),
          });
        }
      }
    };

    globalThis.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, [eventName]);

  // This component doesn't render anything visible
  return null;
}
