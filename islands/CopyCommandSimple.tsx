import { useState } from "preact/hooks";
import { trackEvent } from "../sdk/tracking.ts";

interface Props {
  /** @title Command Text */
  command?: string;
  /** @title Class Name */
  class?: string;
  /** @title Tracking event name */
  trackEventName?: string;
  /** @title Additional tracking properties */
  trackProperties?: Record<string, unknown>;
}

export default function CopyCommandSimple({
  command = "npx @decocms/mesh",
  class: className = "",
  trackEventName,
  trackProperties,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      if (trackEventName) {
        trackEvent(trackEventName, {
          command,
          ...trackProperties,
        });
      }
    } catch (_error) {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      class={`w-full px-4 py-2.5 rounded-xl inline-flex items-center justify-center gap-3 bg-dc-50 outline outline-1 outline-offset-[-0.5px] outline-dc-300 hover:bg-dc-100 active:bg-dc-200 hover:scale-95 transition-transform duration-200 ease-in-out cursor-pointer ${className}`}
    >
      <span class="text-sm font-medium leading-5 font-mono text-dc-800">
        {command}
      </span>
      <span class={`text-xs font-medium transition-colors duration-200 ${copied ? "text-[#8caa25]" : "text-dc-500"}`}>
        {copied ? "Copied!" : "Click to copy"}
      </span>
    </button>
  );
}

