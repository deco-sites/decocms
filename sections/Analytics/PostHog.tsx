import { SectionProps } from "@deco/deco";
import Posthog, { Props } from "site/islands/PostHog.tsx";

export default function PostHog({ posthogKey, posthogHost }: SectionProps<typeof loader>) {
    if (!posthogKey || !posthogHost) {
        return null;
    }
 return <Posthog posthogKey={posthogKey} posthogHost={posthogHost} />
}

export const loader = (props: Props) => {

    return {
        ...props,
        posthogKey: props.posthogKey?.get(),
    }
}