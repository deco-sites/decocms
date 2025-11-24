import { useEffect } from "preact/hooks";
import { PostHog } from "posthog-js";

export interface Props {
  apiKey: string;
  apiHost: string;
}

export default function PostHogProvider({ apiKey, apiHost }: Props) {
  useEffect(() => {
    if (!apiKey) return;

    const win = globalThis as typeof globalThis & { posthog?: PostHog };

    if (!win.posthog) {
      const posthog = new PostHog();
      posthog.init(apiKey, {
        api_host: apiHost,
        person_profiles: "identified_only",
      });

      win.posthog = posthog;
    }
  }, [apiKey, apiHost]);

  return null;
}

