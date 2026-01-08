import { ComponentChildren, JSX } from "preact";
import { trackEvent } from "../sdk/tracking.ts";

export interface Props {
  /** @title URL */
  href: string;
  /** @title Event name */
  event: string;
  /** @title Additional properties */
  properties?: Record<string, unknown>;
  /** @title CSS classes */
  class?: string;
  /** @title Inline styles */
  style?: JSX.CSSProperties;
  /** @title Target */
  target?: string;
  /** @title Rel */
  rel?: string;
  /** @title Children */
  children: ComponentChildren;
}

export default function TrackedLink({
  href,
  event,
  properties,
  class: className,
  style,
  target,
  rel,
  children,
}: Props) {
  const handleClick = () => {
    trackEvent(event, { href, ...properties });
  };

  return (
    <a
      href={href}
      class={className}
      style={style}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
