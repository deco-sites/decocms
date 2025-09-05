// Types for podcast functionality
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface PodcastEpisode {
  /**
   * @title Episode Number
   * @description Episode number (e.g., 20, 19, 18)
   */
  episodeNumber: number;
  /**
   * @title Title
   * @description Episode title
   */
  title: string;
  /**
   * @title Description
   * @description Episode description or subtitle
   */
  description?: string;
  /**
   * @title YouTube Video ID
   * @description YouTube video ID for embedding (e.g., "dQw4w9WgXcQ")
   */
  youtubeVideoId?: string;
  /**
   * @title YouTube URL
   * @description Full YouTube URL for linking
   */
  youtubeUrl?: string;
  /**
   * @title Thumbnail
   * @description Episode thumbnail image
   */
  thumbnail?: ImageWidget;
  /**
   * @title Guest Name
   * @description Guest speaker name
   */
  guestName?: string;
  /**
   * @title Guest Title
   * @description Guest title/position (e.g., "Founder, Abacatepay")
   */
  guestTitle?: string;
  /**
   * @title Publication Date
   * @description When the episode was published
   */
  publishedAt?: string;
  /**
   * @title Featured
   * @description Whether this episode should be featured
   */
  featured?: boolean;
}

export interface PodcastPlatform {
  /**
   * @title Platform Name
   * @description Name of the platform (e.g., "Apple", "Spotify")
   */
  name: string;
  /**
   * @title URL
   * @description Link to the podcast on this platform
   */
  url: string;
  /**
   * @title Icon
   * @description Icon name for the platform
   */
  icon?: string;
}
