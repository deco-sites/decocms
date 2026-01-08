import ScrollTracker from "../../islands/ScrollTracker.tsx";

export interface Props {
  /**
   * @title Event Name
   * @description Base name for scroll events. Will generate events like "{eventName}_scroll_25", "{eventName}_scroll_50", "{eventName}_scroll_75"
   * @default home_page
   */
  eventName?: string;
}

/**
 * @title Scroll Tracking
 * @description Tracks page scroll milestones (25%, 50%, 75%) and sends events to PostHog
 */
export default function ScrollTracking({
  eventName = "home_page",
}: Props) {
  return <ScrollTracker eventName={eventName} />;
}
