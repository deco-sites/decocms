import { useState } from "preact/hooks";

interface Props {
  label?: string;
  class?: string;
}

export default function CopyCommandButton({
  label = "npm create deco@latest",
  class: className = "",
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(label);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_error) {
      // ignore
    }
  };

  return (
    <button type="button" onClick={handleCopy} class={`px-4 py-3 bg-dc-200 rounded-xl inline-flex items-center gap-2 ${className}`}>
      <span class="text-dc-700 text-base font-light leading-tight font-mono">{label}</span>
      {copied && <span class="ml-1 text-dc-700 text-sm">copied!</span>}
    </button>
  );
}


