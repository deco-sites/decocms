import Posthog, { Props } from "site/islands/PostHog.tsx";

export default function PostHog({ posthogKey, posthogHost }: Props) {
 return <Posthog posthogKey={posthogKey} posthogHost={posthogHost} />
}