import { useState } from "preact/hooks";

interface Props {
  /** @title Command Text */
  /** @description The command text to display and copy */
  command?: string;
  /** @title Class Name */
  class?: string;
}

export default function CopyMCPCommand({
  command = "npx deco-mesh start",
  class: className = "",
}: Props) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      // Don't reset - keep "Copied!" visible forever
    } catch (_error) {
      // ignore
    }
  };

  const showLabel = copied || hovered;

  return (
    <button
      type="button"
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => !copied && setHovered(false)}
      class={`px-4 py-3 bg-dc-200 rounded-xl inline-flex items-center gap-0 hover:bg-dc-300 transition-all duration-300 cursor-pointer ${className}`}
    >
      <span class="text-dc-700 text-base font-medium leading-5 font-mono">
        {command}
      </span>
      <span
        class={`text-sm font-medium overflow-hidden whitespace-nowrap transition-all duration-300 ${
          copied ? "text-primary-dark" : "text-dc-500"
        }`}
        style={{
          maxWidth: showLabel ? "100px" : "0px",
          opacity: showLabel ? 1 : 0,
          marginLeft: showLabel ? "12px" : "0px",
        }}
      >
        {copied ? "Copied!" : "Click to copy"}
      </span>
    </button>
  );
}

