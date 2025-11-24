import { Secret } from "apps/website/loaders/secret.ts";
import { Head } from "$fresh/runtime.ts";

export interface Props {
  /** @title PostHog API Key */
  /** @description Your PostHog project API key (phc_xxx) */
  posthogKey?: Secret;

  /** @title PostHog Host */
  /** @description PostHog API host (default: https://app.posthog.com) */
  posthogHost?: string;
}

export default function PostHogAnalytics({ posthogKey, posthogHost }: Props) {
  const key = posthogKey?.get();
  const host = posthogHost ?? "https://app.posthog.com";

  if (!key) {
    return null;
  }

  return (
    <Head>
      <script src="https://cdn.posthog.com/posthog.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (!window.posthog || !window.posthog.init) return;
              try {
                window.posthog.init('${key}', {
                  api_host: '${host}',
                });
              } catch (err) {
                console.warn('PostHog init failed', err);
              }
            })();
          `,
        }}
      />
    </Head>
  );
}

