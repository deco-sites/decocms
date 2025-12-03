import { useState, useEffect } from "preact/hooks";

interface Props {
  /** @title Command Text */
  /** @description The command text to display and copy */
  command?: string;
  /** @title Class Name */
  class?: string;
  /** @title Disabled */
  /** @description If true, disables copy functionality and shows "Coming soon" */
  disabled?: boolean;
}

export default function CopyMCPCommand({
  command = "npx deco-mesh start",
  class: className = "",
  disabled = false,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCopy = async () => {
    if (disabled) return;
    
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      // Don't reset - keep "Copied!" visible forever
    } catch (_error) {
      // ignore
    }
  };

  // Show label permanently on mobile when disabled, or on hover/copied on desktop
  const showLabel = (disabled && isMobile) || copied || hovered;

  // Determine label text based on state
  const getLabelText = () => {
    if (disabled) return "Coming soon";
    if (copied) return "Copied!";
    return "Click to copy";
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => !copied && setHovered(false)}
      class={`px-4 py-3 bg-dc-200 rounded-xl inline-flex transition-all duration-300 ${
        disabled ? "cursor-default" : "hover:bg-dc-300 cursor-pointer"
      } ${className}`}
    >
      {/* Mobile layout (vertical) */}
      <div class="flex flex-col items-center gap-1 md:hidden">
        <span class="text-dc-700 text-base font-medium leading-5 font-mono">
          {command}
        </span>
        {disabled && isMobile && (
          <span class="text-xs font-medium text-dc-400">
            Coming soon
          </span>
        )}
      </div>

      {/* Desktop layout (horizontal with animation) */}
      <div class="hidden md:flex items-center gap-0">
        <span class="text-dc-700 text-base font-medium leading-5 font-mono">
          {command}
        </span>
        <span
          class={`text-sm font-medium overflow-hidden whitespace-nowrap transition-all duration-300 ${
            copied ? "text-primary-dark" : "text-dc-500"
          }`}
          style={{
            maxWidth: showLabel ? "120px" : "0px",
            opacity: showLabel ? 1 : 0,
            marginLeft: showLabel ? "12px" : "0px",
          }}
        >
          {getLabelText()}
        </span>
      </div>
    </button>
  );
}

