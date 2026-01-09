import { useEffect, useState } from "preact/hooks";
import InvestorPresentation from "./InvestorPresentation.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface BulletPoint {
  text: string;
  highlight?: boolean;
}

interface SlideItem {
  title?: string;
  subtitle?: string;
  bullets?: BulletPoint[];
  value?: string;
  label?: string;
}

interface Slide {
  title: string;
  subtitle?: string;
  layout: "title" | "content" | "two-column" | "stats" | "timeline" | "list" | "revenue-resilience" | "product-platform" | "organizational-maturity";
  backgroundColor?:
    | "primary-light"
    | "primary-dark"
    | "purple-light"
    | "purple-dark"
    | "yellow-light"
    | "dc-950"
    | "dc-900"
    | "dc-50"
    | "white";
  textColor?: "dark" | "light";
  items?: SlideItem[];
  backgroundImage?: ImageWidget;
  slideNumber?: string;
  tag?: string;
}

export interface Props {
  presentationTitle?: string;
  presentationSubtitle?: string;
  logo?: ImageWidget;
  slides?: Slide[];
  /** SHA-256 hash of the password - generated server-side and passed as prop */
  passwordHash: string;
  /** Storage key for session authentication */
  storageKey?: string;
}

// SHA-256 hash function using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function PasswordProtectedPresentation({
  presentationTitle,
  presentationSubtitle,
  logo,
  slides = [],
  passwordHash,
  storageKey = "investor_auth",
}: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Check if already authenticated on mount
  useEffect(() => {
    if (typeof globalThis.sessionStorage !== "undefined") {
      const authToken = sessionStorage.getItem(storageKey);
      if (authToken === passwordHash) {
        setIsAuthenticated(true);
      }
    }
    setIsChecking(false);
  }, [storageKey, passwordHash]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError("");

    // Add delay to prevent brute force (increases with attempts)
    const delay = Math.min(attempts * 500, 3000);
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    try {
      const inputHash = await hashPassword(password);
      
      if (inputHash === passwordHash) {
        // Store auth token in sessionStorage
        if (typeof globalThis.sessionStorage !== "undefined") {
          sessionStorage.setItem(storageKey, passwordHash);
        }
        setIsAuthenticated(true);
      } else {
        setAttempts((prev) => prev + 1);
        setError("Incorrect password");
        setPassword("");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div class="fixed inset-0 w-screen h-screen bg-dc-950 flex items-center justify-center">
        <div class="animate-pulse">
          <div class="w-8 h-8 rounded-full border-2 border-primary-light border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  // Show presentation if authenticated
  if (isAuthenticated) {
    return (
      <InvestorPresentation
        presentationTitle={presentationTitle}
        presentationSubtitle={presentationSubtitle}
        logo={logo}
        slides={slides}
      />
    );
  }

  // Password screen - styled like InvestorPresentation
  return (
    <div class="fixed inset-0 w-screen h-screen bg-dc-950 flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div 
        class="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse at 30% 70%, rgba(208, 236, 26, 0.15) 0%, transparent 50%)",
        }}
      />
      
      <div class="relative z-10 flex flex-col items-center" style={{ maxWidth: "480px", padding: "32px" }}>
        {/* Logo */}
        <img
          src="https://assets.decocache.com/decocms/4869c863-d677-4e5b-b3fd-4b3913a56034/deco-logo.png"
          alt="deco logo"
          style={{
            width: "120px",
            height: "auto",
            marginBottom: "48px",
          }}
        />

        {/* Title */}
        <h1
          class="text-dc-50 text-center leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px", marginBottom: "12px" }}
        >
          {presentationTitle || "Investor Updates"}
        </h1>
        
        {presentationSubtitle && (
          <p
            class="text-dc-400 font-mono uppercase text-center"
            style={{ fontSize: "14px", letterSpacing: "1px", marginBottom: "48px" }}
          >
            {presentationSubtitle}
          </p>
        )}

        {/* Lock icon */}
        <div 
          class="flex items-center justify-center rounded-full border border-dc-700 mb-6"
          style={{ width: "64px", height: "64px" }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            class="text-dc-400"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <p class="text-dc-500 text-center mb-8" style={{ fontSize: "15px" }}>
          This presentation is password protected.
        </p>

        {/* Password form */}
        <form onSubmit={handleSubmit} class="w-full flex flex-col" style={{ gap: "16px" }}>
          <div class="relative">
            <input
              type="password"
              value={password}
              onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              placeholder="Enter password"
              disabled={isSubmitting}
              class="w-full bg-dc-900 border border-dc-700 rounded-lg text-dc-100 placeholder-dc-600 focus:outline-none focus:border-primary-light/50 transition-colors disabled:opacity-50"
              style={{
                padding: "16px 20px",
                fontSize: "16px",
              }}
              autoFocus
            />
          </div>

          {error && (
            <p class="text-red-400 text-center" style={{ fontSize: "14px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password}
            class="w-full bg-primary-light text-dc-950 font-medium rounded-lg transition-all hover:bg-primary-light/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{
              padding: "16px 20px",
              fontSize: "16px",
            }}
          >
            {isSubmitting ? (
              <div class="w-5 h-5 rounded-full border-2 border-dc-950 border-t-transparent animate-spin" />
            ) : (
              "Access Presentation"
            )}
          </button>
        </form>

        {/* Subtle hint about attempts */}
        {attempts >= 3 && (
          <p class="text-dc-600 text-center mt-6" style={{ fontSize: "13px" }}>
            Multiple incorrect attempts detected.
          </p>
        )}
      </div>
    </div>
  );
}
