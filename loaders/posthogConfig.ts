import { Secret } from "apps/website/loaders/secret.ts";

export interface Props {
  /** @title PostHog API Key */
  /** @description Your PostHog project API key (phc_xxx) */
  posthogKey: Secret;

  /** @title PostHog Host */
  /** @description PostHog API host (default: https://app.posthog.com) */
  posthogHost?: string;
}

export interface PostHogConfig {
  key: string | null;
  host: string;
}

export default async function posthogConfigLoader(
  props: Props,
): Promise<PostHogConfig> {
  const key = props.posthogKey?.get() ?? null;
  const host = props.posthogHost ?? "https://app.posthog.com";

  return {
    key,
    host,
  };
}

