import { useState } from "preact/hooks";

interface Props {
  /** @title Command Text */
  command?: string;
  /** @title Class Name */
  class?: string;
}

export default function CopyCommandSimple({
  command = "npx @decocms/mesh",
  class: className = "",
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch (_error) {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      class={`w-full px-4 py-3 rounded-xl inline-flex items-center justify-center gap-3 transition-all duration-200 bg-dc-100 hover:bg-dc-200 cursor-pointer ${className}`}
    >
      <span class="text-sm font-medium leading-5 font-mono text-dc-700">
        {command}
      </span>
      <span class={`text-xs font-medium transition-colors duration-200 ${copied ? "text-[#8caa25]" : "text-dc-400"}`}>
        {copied ? "Copied!" : "Click to copy"}
      </span>
    </button>
  );
}

