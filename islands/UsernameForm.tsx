import { useSignal } from "@preact/signals";
import { useRef, useEffect } from "preact/hooks";

export interface Props {
  domainSuffix?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
}

export default function UsernameForm({
  domainSuffix = ".decomcp.com",
  ctaButtonText = "Get your mesh",
  ctaButtonUrl = "/signup",
}: Props) {
  const username = useSignal("");
  const showError = useSignal(false);
  const isShaking = useSignal(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const inputWidth = useSignal(70); // minimum width for placeholder

  // Update input width based on content
  useEffect(() => {
    if (measureRef.current) {
      const textWidth = measureRef.current.offsetWidth;
      // Check if mobile (window width < 640px)
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      const maxWidth = isMobile ? 500 : 200;
      // Minimum width of 120px (for placeholder "username"), max reasonable width
      const minWidth = isMobile ? 120 : 70;
      inputWidth.value = Math.max(minWidth, Math.min(textWidth + 4, maxWidth));
    }
  });

  // Update on window resize
  useEffect(() => {
    const handleResize = () => {
      if (measureRef.current) {
        const textWidth = measureRef.current.offsetWidth;
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        const maxWidth = isMobile ? 500 : 200;
        const minWidth = isMobile ? 120 : 70;
        inputWidth.value = Math.max(minWidth, Math.min(textWidth + 4, maxWidth));
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    username.value = target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    showError.value = false;
    
    // Update measurement span and width
    if (measureRef.current) {
      measureRef.current.textContent = username.value || "username";
      const textWidth = measureRef.current.offsetWidth;
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      const maxWidth = isMobile ? 500 : 200;
      const minWidth = isMobile ? 120 : 70;
      inputWidth.value = Math.max(minWidth, Math.min(textWidth + 4, maxWidth));
    }
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    if (!username.value.trim()) {
      showError.value = true;
      isShaking.value = true;
      
      // Focus the input
      inputRef.current?.focus();
      
      // Remove shake after animation completes
      setTimeout(() => {
        isShaking.value = false;
      }, 500);
      
      return;
    }

    // Navigate to signup with username
    globalThis.location.href = `${ctaButtonUrl}?username=${encodeURIComponent(username.value)}`;
  };

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Username Input Container */}
        <div
          class={`bg-dc-200 flex items-center gap-2 px-3 py-2 rounded-xl transition-all w-full sm:w-auto animate-glow ${
            isShaking.value ? "animate-shake" : ""
          } ${showError.value ? "ring-2 ring-red-500" : ""}`}
        >
          <div class="bg-dc-100 px-2 py-1 rounded-lg flex items-center">
            {/* Hidden span for measuring text width */}
            <span
              ref={measureRef}
              class="absolute invisible whitespace-pre font-mono text-sm font-medium"
              aria-hidden="true"
            >
              {username.value || "username"}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={username.value}
              onInput={handleInputChange}
              placeholder="username"
              class="bg-transparent text-dc-700 text-sm font-mono font-medium outline-none placeholder:text-dc-400 transition-all"
              style={{ width: `${inputWidth.value}px` }}
              maxLength={30}
              autocomplete="off"
              autocapitalize="off"
              spellcheck={false}
            />
          </div>
          <span class="text-dc-700 text-base font-mono font-medium">{domainSuffix}</span>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={handleSubmit}
          class="px-4 py-3 bg-primary-light rounded-xl inline-flex items-center justify-center hover:bg-primary-light/90 transition-colors cursor-pointer w-full sm:w-auto"
        >
          <span class="text-primary-dark text-sm font-medium leading-5">
            {ctaButtonText}
          </span>
        </button>
      </div>

      {/* Error Message */}
      <div
        class={`text-red-500 text-sm font-medium transition-all duration-200 ${
          showError.value ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        Choose your username first
      </div>

      {/* Shake Animation Styles */}
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
          }
          .animate-shake {
            animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          }
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(208, 236, 26, 0);
            }
            50% {
              box-shadow: 0 0 20px 4px rgba(208, 236, 26, 0.4);
            }
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
