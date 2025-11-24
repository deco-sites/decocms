import { Secret } from "apps/website/loaders/secret.ts";
import { useEffect } from "preact/hooks";
import { PostHog } from "posthog-js";

export interface Props {
  /** @title PostHog API Key */
  /** @description Your PostHog project API key (phc_xxx) */
  posthogKey?: Secret;

  /** @title PostHog Host */
  /** @description PostHog API host (default: https://us.i.posthog.com) */
  posthogHost?: string;
}

export default function PostHogAnalytics({ posthogKey, posthogHost }: Props) {
  const key = posthogKey?.get();
  const host = posthogHost ?? "https://us.i.posthog.com";

  useEffect(() => {
    if (!key) return;

    const win = globalThis as typeof globalThis & { posthog?: PostHog };

    if (!win.posthog) {
      const posthog = new PostHog();
      posthog.init(key, {
        api_host: host,
        person_profiles: "identified_only",
      });

      // Expose to window for island access
      win.posthog = posthog;
    }
  }, [key, host]);

  return null;
}
