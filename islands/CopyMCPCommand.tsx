import { useEffect, useState } from "preact/hooks";

interface Props {
  /** @title Command Text */
  /** @description The command text to display and copy */
  command?: string;
  /** @title Class Name */
  class?: string;
  /** @title Disabled */
  /** @description If true, disables copy functionality and shows "Coming soon" */
  disabled?: boolean;
  /** @title Variant */
  /** @description Visual variant - "light" for light backgrounds, "dark" for green/dark backgrounds, "green" for #8CAA25 style */
  variant?: "light" | "dark" | "green";
}

export default function CopyMCPCommand({
  command = "npx deco-mesh start",
  class: className = "",
  disabled = false,
  variant = "light",
}: Props) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/touch device
    const checkMobile = () => {
      setIsMobile(globalThis.innerWidth < 768 || "ontouchstart" in globalThis);
    };

    checkMobile();
    globalThis.addEventListener("resize", checkMobile);

    return () => globalThis.removeEventListener("resize", checkMobile);
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

  const isDark = variant === "dark";
  const isGreen = variant === "green";

  const getButtonClasses = () => {
    if (isGreen) {
      return `bg-[#F0F4D8] ${disabled ? "cursor-default" : "hover:bg-[#e6ebc9] cursor-pointer"}`;
    }
    if (isDark) {
      return `bg-[#07401A] ${disabled ? "cursor-default" : "hover:bg-[#07401A]/90 cursor-pointer"}`;
    }
    return `bg-dc-200 ${disabled ? "cursor-default" : "hover:bg-dc-300 cursor-pointer"}`;
  };

  const getTextColor = () => {
    if (isGreen) return "text-primary-dark";
    if (isDark) return "text-[#D0EC1A]";
    return "text-dc-700";
  };

  const getSecondaryTextColor = () => {
    if (isGreen) return "text-primary-dark/70";
    if (isDark) return "text-[#D0EC1A]/70";
    return "text-dc-400";
  };

  const getCopiedTextColor = () => {
    if (isGreen) return "text-primary-dark";
    if (isDark) return "text-white";
    return "text-primary-dark";
  };

  const getHoverTextColor = () => {
    if (isGreen) return "text-primary-dark/80";
    if (isDark) return "text-[#D0EC1A]/80";
    return "text-dc-500";
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => !copied && setHovered(false)}
      class={`px-4 py-3 rounded-xl inline-flex transition-all duration-300 ${getButtonClasses()} ${className}`}
    >
      {/* Mobile layout (vertical) */}
      <div class="flex flex-col items-center gap-1 md:hidden">
        <span class={`text-base font-medium leading-5 font-mono ${getTextColor()}`}>
          {command}
        </span>
        {disabled && isMobile && (
          <span class={`text-xs font-medium ${getSecondaryTextColor()}`}>
            Coming soon
          </span>
        )}
      </div>

      {/* Desktop layout (horizontal with animation) */}
      <div class="hidden md:flex items-center gap-0">
        <span class={`text-base font-medium leading-5 font-mono ${getTextColor()}`}>
          {command}
        </span>
        <span
          class={`text-sm font-medium overflow-hidden whitespace-nowrap transition-all duration-300 ${
            copied ? getCopiedTextColor() : getHoverTextColor()
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
