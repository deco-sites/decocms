import { useEffect, useRef, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../components/ui/Icon.tsx";
import RevenueChart from "../components/RevenueChart.tsx";
import TrafficResilienceChart from "../components/TrafficResilienceChart.tsx";
import McpMeshDownloadsChart from "../components/McpMeshDownloadsChart.tsx";

// Material Symbols Component - Sharp style, outlined, weight 100
function MaterialSymbol({ icon, size = 24, className = "" }: { icon: string; size?: number; className?: string }) {
  return (
    <span
      class={`material-symbols-sharp ${className}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 48",
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {icon}
    </span>
  );
}

// Static image background for IMPACT card
function ImpactImageBackground() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "100px",
        bottom: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        zIndex: 0,
      }}
    >
      <img
        src="https://assets.decocache.com/decocms/f7196254-458c-4d02-bf8f-629f85329c6c/capiecomer.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// Timeline hover images configuration
interface TimelineHoverConfig {
  itemTitle: string;
  hoverImages?: {
    src: string;
    alt: string;
    delay?: number; // delay in ms before showing this image
    animationType?: "pop" | "slide-up" | "wave";
  }[];
}

const TIMELINE_HOVER_CONFIG: TimelineHoverConfig[] = [
  {
    itemTitle: "Webdraw sunset",
    hoverImages: [
      {
        src: "https://assets.decocache.com/decocms/19509439-7f6b-4885-825b-38def1e085de/webdraw.png",
        alt: "WebDraw Logo",
        delay: 0,
        animationType: "pop",
      },
      {
        src: "https://assets.decocache.com/decocms/648e45c7-a8b7-4a03-a319-131cb3b8d682/goodbye.png",
        alt: "Waving goodbye",
        delay: 300,
        animationType: "wave",
      },
    ],
  },
  {
    itemTitle: "Hard focus decisions",
    hoverImages: [
      {
        src: "https://assets.decocache.com/decocms/48451ad3-858f-45c3-a43f-69e85a3403af/star-wars.gif",
        alt: "Focus Yoda",
        delay: 0,
        animationType: "slide-up",
      },
    ],
  },
];

// Timeline item component with hover interaction
function TimelineItem({
  quarter,
  items,
  position,
}: {
  quarter: string;
  items: { title: string; subtitle?: string }[];
  position: "above" | "below";
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  const handleMouseEnter = (itemTitle: string) => {
    setHoveredItem(itemTitle);
    setVisibleImages([]);

    const config = TIMELINE_HOVER_CONFIG.find((c) => c.itemTitle === itemTitle);
    if (config?.hoverImages) {
      config.hoverImages.forEach((img, idx) => {
        setTimeout(() => {
          setVisibleImages((prev) => [...prev, idx]);
        }, img.delay || 0);
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setVisibleImages([]);
  };

  const config = hoveredItem
    ? TIMELINE_HOVER_CONFIG.find((c) => c.itemTitle === hoveredItem)
    : null;

  // Check if any item in this column has a hover config
  const hasHoverConfig = items.some((item) =>
    TIMELINE_HOVER_CONFIG.find((c) => c.itemTitle === item.title)
  );

  // Render hover images - they appear on the OPPOSITE side of the text
  const renderHoverImages = () => {
    if (!hasHoverConfig) return null;

    return (
      <div
        class="relative"
        style={{
          height: "160px",
        }}
      >
        {config?.hoverImages?.map((img, idx) => {
          const isVisible = visibleImages.includes(idx);
          const isWave = img.animationType === "wave";
          const isPop = img.animationType === "pop";
          const isSlideUp = img.animationType === "slide-up";

          return (
            <img
              key={idx}
              src={img.src}
              alt={img.alt}
              class={`absolute transition-all duration-300 ${
                isWave ? "origin-bottom" : ""
              }`}
              style={{
                height: isPop ? "54px" : isWave ? "54px" : "160px",
                width: "auto",
                left: isPop ? "0" : isWave ? "-25px" : "0",
                bottom: "0",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? isWave
                    ? "scale(1) rotate(-10deg)"
                    : isPop
                      ? "scale(1)"
                      : "translateY(0)"
                  : isSlideUp
                    ? "translateY(20px)"
                    : "scale(0.8)",
                animation: isVisible && isWave
                  ? "wave-hand 0.5s ease-in-out infinite"
                  : undefined,
              }}
            />
          );
        })}
      </div>
    );
  };

  // Render text content (quarter title + items) - minimalist
  const renderTextContent = () => (
    <>
      <h3
        class="animate-item text-primary-light"
        style={{ fontSize: "32px", marginBottom: "12px", lineHeight: "1" }}
      >
        {quarter}
      </h3>
      {items.map((item, idx) => (
        <div
          key={idx}
          class="cursor-pointer transition-colors duration-200"
          onMouseEnter={() => handleMouseEnter(item.title)}
          onMouseLeave={handleMouseLeave}
        >
          <p
            class={`animate-item transition-colors duration-200 ${
              hoveredItem === item.title ? "text-primary-light" : "text-dc-300"
            }`}
            style={{
              fontSize: "16px",
              lineHeight: "1.4",
            }}
          >
            {item.title}
          </p>
          {item.subtitle && (
            <p
              class={`animate-item transition-colors duration-200 ${
                hoveredItem === item.title ? "text-primary-light" : "text-dc-500"
              }`}
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                marginTop: "4px",
              }}
            >
              {item.subtitle}
            </p>
          )}
        </div>
      ))}
    </>
  );

  return (
    <div
      class="flex-1 relative h-full"
      style={{
        minWidth: "280px",
      }}
    >
      {/* Hover images - ABOVE the line (when text is BELOW) */}
      {position === "below" && hasHoverConfig && (
        <div
          class="absolute"
          style={{
            bottom: "calc(50% + 35px)",
            left: "0",
          }}
        >
          {renderHoverImages()}
        </div>
      )}

      {/* Text content - ABOVE the line */}
      {position === "above" && (
        <div
          class="flex flex-col absolute"
          style={{
            bottom: "calc(50% + 35px)",
            left: "0",
          }}
        >
          {renderTextContent()}
        </div>
      )}

      {/* Timeline dot - positioned on the line - minimalist */}
      <div
        class="absolute flex items-center justify-center"
        style={{
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
          width: "24px",
          height: "24px",
        }}
      >
        {/* Outer ring */}
        <div
          class="absolute rounded-full border border-dc-600"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
        {/* Inner solid dot */}
        <div
          class="relative rounded-full bg-primary-light"
          style={{ width: "8px", height: "8px" }}
        />
      </div>

      {/* Text content - BELOW the line */}
      {position === "below" && (
        <div
          class="flex flex-col absolute"
          style={{
            top: "calc(50% + 35px)",
            left: "0",
          }}
        >
          {renderTextContent()}
        </div>
      )}

      {/* Hover images - BELOW the line (when text is ABOVE) */}
      {position === "above" && hasHoverConfig && (
        <div
          class="absolute"
          style={{
            top: "calc(50% + 35px)",
            left: "0",
          }}
        >
          {renderHoverImages()}
        </div>
      )}
    </div>
  );
}

// Animated count-up component - triggers when isActive becomes true
function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
  style = {},
  isActive = false,
  delay = 0,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  style?: Record<string, string | number>;
  isActive?: boolean;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Only animate when slide becomes active and hasn't animated yet
    if (isActive && !hasAnimated) {
      const timeoutId = setTimeout(() => {
        setHasAnimated(true);
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(end);
          }
        };
        requestAnimationFrame(animate);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [isActive, end, duration, hasAnimated, delay]);

  // Reset animation state when slide becomes inactive (so it can replay)
  useEffect(() => {
    if (!isActive) {
      setHasAnimated(false);
      setCount(0);
    }
  }, [isActive]);

  return (
    <span class={className} style={style}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Retrospective data
const RETROSPECTIVE_DATA = {
  totalSites: 146,
  totalCommits: 86199,
  contentPublishes: 46332,
  developerCommits: 24897,
  uniqueAuthors: 448,
  uniqueDevelopers: 286,
  topSites: [
    { name: "farmrio", commits: 5404, contributors: 34 },
    { name: "osklenbr", commits: 4543, contributors: 24 },
    { name: "lojastorra-2", commits: 3828, contributors: 28 },
    { name: "montecarlo", commits: 3588, contributors: 21 },
    { name: "nkstore", commits: 3260, contributors: 37 },
    { name: "casaevideo", commits: 3163, contributors: 29 },
    { name: "oscarcalcados", commits: 2858, contributors: 23 },
    { name: "lebiscuit", commits: 2394, contributors: 31 },
    { name: "alphabeto", commits: 1853, contributors: 21 },
    { name: "aviator", commits: 1648, contributors: 18 },
  ],
  topAuthors: [
    { name: "mateus.sousa@casaevideo.com.br", site: "casaevideo", publishes: 2671 },
    { name: "stephanie.moraes@montecarlo.com.br", site: "montecarlo", publishes: 1824 },
    { name: "raissa.severino@osklen.com.br", site: "osklenbr", publishes: 1610 },
    { name: "Rodrigo Tassi", site: "gaston", publishes: 1239 },
    { name: "fernanda.borba.bioo@gmail.com", site: "nkstore", publishes: 1173 },
    { name: "ruzongiu@gmail.com", site: "frigidaire-us", publishes: 1155 },
    { name: "matheus.abreu@grupooscar.com.br", site: "gaston", publishes: 1107 },
    { name: "gabriella.oliveira@lojastorra.com.br", site: "lojastorra-2", publishes: 1044 },
    { name: "tais.moura@aviator.com.br", site: "aviator", publishes: 1034 },
    { name: "andrea.vilasboas@grupooscar.com.br", site: "gaston", publishes: 950 },
  ],
  topDevelopers: [
    { name: "dan-liberato", site: "osklenbr", commits: 1877 },
    { name: "Matheus Aparecido", site: "decocms", commits: 1328 },
    { name: "Enilson Silva", site: "consulta-vtex", commits: 1276 },
    { name: "decoWicommAlucard", site: "emporio", commits: 795 },
    { name: "Jorge Lucas", site: "osklenbr", commits: 703 },
    { name: "vitoo", site: "farmrio", commits: 617 },
    { name: "@yuri_assuncx", site: "zeedog", commits: 578 },
    { name: "Rafael Oliveira", site: "casaevideo", commits: 562 },
    { name: "Guilherme da Silva Benevides", site: "oficina-reserva", commits: 516 },
    { name: "EduardoBalbinotDev", site: "consulta-vtex", commits: 494 },
  ],
};

// Number of retrospective slides
const RETROSPECTIVE_SLIDE_COUNT = 4;

// Animated bar for leaderboard
function AnimatedBar({
  percentage,
  delay,
  isActive,
  highlight = false,
}: {
  percentage: number;
  delay: number;
  isActive: boolean;
  highlight?: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isActive) {
      const timeoutId = setTimeout(() => {
        setWidth(percentage);
      }, delay);
      return () => clearTimeout(timeoutId);
    } else {
      setWidth(0);
    }
  }, [isActive, percentage, delay]);

  return (
    <div
      class={`h-full transition-all duration-700 ease-out ${highlight ? "bg-primary-light" : "bg-primary-light/40"}`}
      style={{ width: `${width}%` }}
    />
  );
}

// Retrospective Slide 1: Intro - title layout with TOC
function RetrospectiveIntroSlide({ 
  isActive: _isActive = false,
  tocItems = [],
  goToSlide,
}: { 
  isActive?: boolean;
  tocItems?: { slideIndex: number; label: string; tocNumber: string }[];
  goToSlide?: (index: number) => void;
}) {
  return (
    <div 
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "64px 80px" }}
    >
      {/* Table of Contents - top left */}
      <div class="animate-item" style={{ marginBottom: "auto" }}>
        <div class="flex flex-col" style={{ gap: "2px" }}>
          {tocItems.map((item) => {
            const isCurrentSection = item.slideIndex === 1;
            return (
              <button
                key={item.slideIndex}
                type="button"
                onClick={() => goToSlide?.(item.slideIndex)}
                class="flex items-center text-left transition-colors duration-200 cursor-pointer hover:opacity-80"
                style={{ gap: "24px" }}
              >
                <span
                  style={{ 
                    fontSize: "15px", 
                    width: "24px",
                    color: isCurrentSection ? "#faf9f7" : "#52504c",
                  }}
                >
                  {item.tocNumber}
                </span>
                <span
                  style={{ 
                    fontSize: "15px",
                    color: isCurrentSection ? "#faf9f7" : "#52504c",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Title content - bottom left */}
      <div class="flex flex-col" style={{ marginTop: "auto" }}>
        <span
          class="animate-item font-mono uppercase tracking-[0.2em] block"
          style={{ 
            fontSize: "11px", 
            marginBottom: "16px",
            color: "#6d6a66",
          }}
        >
          RETROSPECTIVE
        </span>
              <h1
                class="animate-item leading-none"
                style={{ fontSize: "180px", letterSpacing: "-4px" }}
              >
                2025 in Review
              </h1>
            </div>
          </div>
  );
}

// Retrospective Slide 2: Main Stats - minimalist
function RetrospectiveStatsSlide({ isActive = false }: { isActive?: boolean }) {
  const [showElements, setShowElements] = useState<number[]>([]);

  const stats = [
    { label: "Total Sites", value: RETROSPECTIVE_DATA.totalSites },
    { label: "Total Commits", value: RETROSPECTIVE_DATA.totalCommits },
    { label: "Content Publishes", value: RETROSPECTIVE_DATA.contentPublishes },
    { label: "Developer Commits", value: RETROSPECTIVE_DATA.developerCommits },
    { label: "Unique Authors", value: RETROSPECTIVE_DATA.uniqueAuthors },
    { label: "Unique Developers", value: RETROSPECTIVE_DATA.uniqueDevelopers },
  ];

  useEffect(() => {
    if (!isActive) {
      setShowElements([]);
      return;
    }

    const timeouts = stats.map((_, i) =>
      setTimeout(() => {
        setShowElements((prev) => [...prev, i]);
      }, 300 + i * 150)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isActive]);

  const isVisible = (idx: number) => showElements.includes(idx);

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "80px" }}>
        <span
          class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
          style={{ fontSize: "12px", marginBottom: "16px" }}
        >
          OVERVIEW
        </span>
        <h2
          class="animate-item text-dc-200 leading-tight flex items-baseline"
          style={{ fontSize: "32px", letterSpacing: "-0.5px", gap: "12px" }}
        >
          <img 
            src="https://assets.decocache.com/decocms/ea17311a-2a1e-4926-a75b-0710b37f0807/decocx-logo.png"
            alt="deco"
            style={{ height: "32px", width: "auto", display: "inline-block" }}
          />
          <span>in Numbers</span>
        </h2>
      </div>

      <div
        class="flex-1 grid"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "64px",
        }}
      >
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            class={`animate-item flex flex-col transition-all duration-700 ${isVisible(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span
              class="text-primary-light"
              style={{ fontSize: "48px", lineHeight: "1", marginBottom: "12px", letterSpacing: "-1px" }}
            >
              <CountUp
                end={stat.value}
                duration={2000}
                isActive={isActive && isVisible(idx)}
              />
            </span>
            <span class="text-dc-500" style={{ fontSize: "15px" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Retrospective Slide 3: Top Sites - minimalist
function RetrospectiveTopSitesSlide({ isActive = false }: { isActive?: boolean }) {
  const [showElements, setShowElements] = useState<number[]>([]);
  const maxCommits = RETROSPECTIVE_DATA.topSites[0].commits;

  useEffect(() => {
    if (!isActive) {
      setShowElements([]);
      return;
    }

    const timeouts = RETROSPECTIVE_DATA.topSites.map((_, i) =>
      setTimeout(() => {
        setShowElements((prev) => [...prev, i]);
      }, 300 + i * 100)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isActive]);

  const isVisible = (idx: number) => showElements.includes(idx);

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "64px" }}>
        <span
          class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
          style={{ fontSize: "12px", marginBottom: "16px" }}
        >
          LEADERBOARD
        </span>
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          Top 10 Sites by <span class="text-primary-light">Contributions</span>
        </h2>
      </div>

      <div class="flex-1 flex flex-col" style={{ gap: "12px" }}>
        {RETROSPECTIVE_DATA.topSites.map((site, idx) => (
          <div
            key={site.name}
            class={`animate-item flex items-center transition-all duration-500 ${isVisible(idx) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            style={{ gap: "16px" }}
          >
            <span
              class={`font-mono ${idx < 3 ? "text-primary-light" : "text-dc-600"}`}
              style={{ fontSize: "13px", width: "32px" }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span
              class="text-dc-300"
              style={{ fontSize: "15px", width: "160px" }}
            >
              {site.name}
            </span>
            <div
              class="flex-1 relative rounded-sm overflow-hidden"
              style={{ height: "20px", backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <AnimatedBar
                percentage={(site.commits / maxCommits) * 100}
                delay={300 + idx * 100}
                isActive={isActive}
                highlight={idx < 3}
              />
            </div>
            <span
              class={idx < 3 ? "text-primary-light" : "text-dc-400"}
              style={{ fontSize: "14px", width: "80px", textAlign: "right" }}
            >
              {site.commits.toLocaleString()}
            </span>
            <span class="text-dc-600" style={{ fontSize: "13px", width: "60px" }}>
              {site.contributors} devs
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Retrospective Slide 4: Top Contributors - minimalist
function RetrospectiveContributorsSlide({ isActive = false }: { isActive?: boolean }) {
  const [showElements, setShowElements] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setShowElements([]);
      return;
    }

    const timeouts = Array.from({ length: 10 }, (_, i) =>
      setTimeout(() => {
        setShowElements((prev) => [...prev, i]);
      }, 300 + i * 100)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isActive]);

  const isVisible = (idx: number) => showElements.includes(idx);

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      <div
        class="grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          flex: 1,
        }}
      >
        {/* Top Content Authors */}
        <div class="flex flex-col">
          <div style={{ marginBottom: "40px" }}>
            <span
              class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
              style={{ fontSize: "12px", marginBottom: "12px" }}
            >
              CONTENT
            </span>
            <h3
              class="animate-item text-dc-200"
              style={{ fontSize: "24px", letterSpacing: "-0.5px" }}
            >
              Top <span class="text-primary-light">Authors</span>
            </h3>
          </div>

          <div class="flex flex-col" style={{ gap: "16px" }}>
            {RETROSPECTIVE_DATA.topAuthors.slice(0, 5).map((author, idx) => {
              const maxPublishes = RETROSPECTIVE_DATA.topAuthors[0].publishes;
              const displayName = author.name.includes("@")
                ? author.name.split("@")[0]
                : author.name;

              return (
                <div
                  key={author.name}
                  class={`animate-item flex items-center transition-all duration-500 ${isVisible(idx) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                  style={{ gap: "12px" }}
                >
                  <span
                    class={`font-mono ${idx < 3 ? "text-primary-light" : "text-dc-600"}`}
                    style={{ fontSize: "12px", width: "24px" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div class="flex-1 flex flex-col" style={{ gap: "6px" }}>
                    <div class="flex items-center justify-between">
                      <span
                        class="text-dc-300 truncate"
                        style={{ fontSize: "14px", maxWidth: "180px" }}
                      >
                        {displayName}
                      </span>
                      <span
                        class={idx < 3 ? "text-primary-light" : "text-dc-400"}
                        style={{ fontSize: "14px" }}
                      >
                        {author.publishes.toLocaleString()}
                      </span>
                    </div>
                    <div
                      class="relative rounded-sm overflow-hidden"
                      style={{ height: "4px", backgroundColor: "rgba(255,255,255,0.05)" }}
                    >
                      <AnimatedBar
                        percentage={(author.publishes / maxPublishes) * 100}
                        delay={400 + idx * 100}
                        isActive={isActive}
                        highlight={idx < 3}
                      />
                    </div>
                    <span class="text-dc-600" style={{ fontSize: "12px" }}>
                      {author.site}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Developers */}
        <div class="flex flex-col">
          <div style={{ marginBottom: "40px" }}>
            <span
              class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
              style={{ fontSize: "12px", marginBottom: "12px" }}
            >
              DEVELOPMENT
            </span>
            <h3
              class="animate-item text-dc-200"
              style={{ fontSize: "24px", letterSpacing: "-0.5px" }}
            >
              Top <span class="text-primary-light">Developers</span>
            </h3>
          </div>

          <div class="flex flex-col" style={{ gap: "16px" }}>
            {RETROSPECTIVE_DATA.topDevelopers.slice(0, 5).map((dev, idx) => {
              const maxCommits = RETROSPECTIVE_DATA.topDevelopers[0].commits;

              return (
                <div
                  key={dev.name}
                  class={`animate-item flex items-center transition-all duration-500 ${isVisible(idx + 5) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                  style={{ gap: "12px" }}
                >
                  <span
                    class={`font-mono ${idx < 3 ? "text-primary-light" : "text-dc-600"}`}
                    style={{ fontSize: "12px", width: "24px" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div class="flex-1 flex flex-col" style={{ gap: "6px" }}>
                    <div class="flex items-center justify-between">
                      <span
                        class="text-dc-300 truncate"
                        style={{ fontSize: "14px", maxWidth: "180px" }}
                      >
                        {dev.name}
                      </span>
                      <span
                        class={idx < 3 ? "text-primary-light" : "text-dc-400"}
                        style={{ fontSize: "14px" }}
                      >
                        {dev.commits.toLocaleString()}
                      </span>
                    </div>
                    <div
                      class="relative rounded-sm overflow-hidden"
                      style={{ height: "4px", backgroundColor: "rgba(255,255,255,0.05)" }}
                    >
                      <AnimatedBar
                        percentage={(dev.commits / maxCommits) * 100}
                        delay={400 + idx * 100}
                        isActive={isActive}
                        highlight={idx < 3}
                      />
                    </div>
                    <span class="text-dc-600" style={{ fontSize: "12px" }}>
                      {dev.site}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive line chart component with hover tooltips (currently unused)
function _InteractiveLineChart({
  data,
  color = "#d0ec1a",
  secondaryColor = "#8caa25",
  height = 300,
  id = "line",
}: {
  data: { month: string; value: number; label?: string }[];
  color?: string;
  secondaryColor?: string;
  height?: number;
  id?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const padding = { top: 20, right: 20, bottom: 40, left: 20 };
  const chartWidth = 500;
  const chartHeight = height;

  const maxValue = Math.max(...data.map((d) => d.value)) * 1.1;
  const minValue = Math.min(...data.map((d) => d.value)) * 0.9;

  const getX = (index: number) =>
    padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right);
  const getY = (value: number) =>
    padding.top + ((maxValue - value) / (maxValue - minValue)) * (chartHeight - padding.top - padding.bottom);

  // Create path for the line
  const linePath = data
    .map((d, i) => {
      const x = getX(i);
      const y = getY(d.value);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  // Create area path (fill below line)
  const areaPath = `${linePath} L ${getX(data.length - 1)} ${chartHeight - padding.bottom} L ${getX(0)} ${chartHeight - padding.bottom} Z`;

  return (
    <svg
      width="100%"
      height={chartHeight}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      preserveAspectRatio="xMidYMid meet"
      class="absolute bottom-0 left-0 right-0"
      style={{ overflow: "visible" }}
    >
      {/* Gradient definition */}
      <defs>
        <linearGradient id={`lineGradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path d={areaPath} fill={`url(#lineGradient-${id})`} />

      {/* Main line */}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Interactive points */}
      {data.map((d, i) => (
        <g key={i}>
          {/* Invisible larger hit area */}
          <circle
            cx={getX(i)}
            cy={getY(d.value)}
            r={25}
            fill="transparent"
            class="cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
          {/* Visible point */}
          <circle
            cx={getX(i)}
            cy={getY(d.value)}
            r={hoveredIndex === i ? 8 : 4}
            fill={hoveredIndex === i ? color : secondaryColor}
            class="transition-all duration-200"
            style={{ pointerEvents: "none" }}
          />
        </g>
      ))}

      {/* Tooltip - positioned based on data point SVG coordinates */}
      {hoveredIndex !== null && (() => {
        const pointX = getX(hoveredIndex);
        const pointY = getY(data[hoveredIndex].value);
        const tooltipWidth = 120;
        const tooltipHeight = 52;
        // Position tooltip above the point, clamped to chart bounds
        const tooltipX = Math.max(tooltipWidth / 2, Math.min(chartWidth - tooltipWidth / 2, pointX));
        const tooltipY = Math.max(tooltipHeight + 10, pointY - 15);
        
        return (
          <g style={{ pointerEvents: "none" }}>
            {/* Vertical line to point */}
            <line
              x1={pointX}
              y1={pointY}
              x2={pointX}
              y2={chartHeight - padding.bottom}
              stroke={color}
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.5"
            />
            {/* Tooltip box - centered on tooltipX */}
            <rect
              x={tooltipX - tooltipWidth / 2}
              y={tooltipY - tooltipHeight - 10}
              width={tooltipWidth}
              height={tooltipHeight}
              rx="8"
              fill="#1f1e1c"
              stroke={color}
              strokeWidth="1.5"
            />
            {/* Value text - positioned from top of box */}
            <text
              x={tooltipX}
              y={tooltipY - tooltipHeight + 8}
              textAnchor="middle"
              dominantBaseline="hanging"
              fill={color}
              fontSize="16"
              fontWeight="bold"
            >
              {data[hoveredIndex].label || data[hoveredIndex].value}
            </text>
            {/* Date text - positioned below value */}
            <text
              x={tooltipX}
              y={tooltipY - tooltipHeight + 30}
              textAnchor="middle"
              dominantBaseline="hanging"
              fill="#a8a5a0"
              fontSize="13"
            >
              {data[hoveredIndex].month}
            </text>
          </g>
        );
      })()}
    </svg>
  );
}

// Interactive bar chart component with hover tooltips (currently unused, kept for reference)
// deno-lint-ignore no-unused-vars
function InteractiveBarChart({
  data,
  color = "#d0ec1a",
  secondaryColor = "#8caa25",
  height = 300,
  id = "bar",
}: {
  data: { label: string; value: number; peak?: boolean }[];
  color?: string;
  secondaryColor?: string;
  height?: number;
  id?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(400);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container width with ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    
    observer.observe(containerRef.current);
    // Set initial width
    setContainerWidth(containerRef.current.clientWidth || 400);
    
    return () => observer.disconnect();
  }, []);

  const padding = { top: 60, right: 20, bottom: 50, left: 20 };
  const chartWidth = containerWidth;
  const chartHeight = height;

  const maxValue = Math.max(...data.map((d) => d.value)) * 1.1;
  // Clamp barWidth to minimum of 20px to prevent tiny/negative bars
  const rawBarWidth = (chartWidth - padding.left - padding.right) / data.length - 8;
  const barWidth = Math.max(20, rawBarWidth);

  const getX = (index: number) =>
    padding.left + index * ((chartWidth - padding.left - padding.right) / data.length) + 4;
  const getHeight = (value: number) =>
    ((value / maxValue) * (chartHeight - padding.top - padding.bottom));
  const getY = (value: number) =>
    chartHeight - padding.bottom - getHeight(value);

  // Get tooltip X position, clamped to chart bounds
  const getTooltipX = (index: number) => {
    const x = getX(index) + barWidth / 2;
    return Math.max(50, Math.min(chartWidth - 50, x));
  };

  return (
    <div ref={containerRef} style={{ width: "100%", height: `${chartHeight}px`, position: "relative" }}>
      <svg
        width="100%"
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id={`barGradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`barGradientSecondary-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Bars */}
      {data.map((d, i) => {
        const isHovered = hoveredIndex === i;
        const isPeak = d.peak;
        
        return (
          <g key={i}>
            {/* Invisible larger hit area */}
            <rect
              x={getX(i) - 4}
              y={0}
              width={barWidth + 8}
              height={chartHeight}
              fill="transparent"
              class="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {/* Bar */}
            <rect
              x={getX(i)}
              y={getY(d.value)}
              width={barWidth}
              height={getHeight(d.value)}
              fill={isPeak ? `url(#barGradient-${id})` : `url(#barGradientSecondary-${id})`}
              rx="6"
              class="transition-all duration-200"
              style={{
                filter: isHovered ? `drop-shadow(0 0 12px ${color})` : "none",
                pointerEvents: "none",
              }}
            />

            {/* Label */}
            <text
              x={getX(i) + barWidth / 2}
              y={chartHeight - padding.bottom + 25}
              textAnchor="middle"
              fill={isHovered || isPeak ? color : "#6d6a66"}
              fontSize="13"
              style={{ pointerEvents: "none" }}
            >
              {d.label}
            </text>

            {/* Value tooltip on hover */}
            {isHovered && (() => {
              const tooltipX = getTooltipX(i);
              const barTop = getY(d.value);
              const tooltipWidth = 90;
              const tooltipHeight = 36;
              const tooltipY = Math.max(tooltipHeight + 5, barTop - 10);
              
              return (
                <g style={{ pointerEvents: "none" }}>
                  <rect
                    x={tooltipX - tooltipWidth / 2}
                    y={tooltipY - tooltipHeight}
                    width={tooltipWidth}
                    height={tooltipHeight}
                    rx="8"
                    fill="#1f1e1c"
                    stroke={color}
                    strokeWidth="1.5"
                  />
                  <text
                    x={tooltipX}
                    y={tooltipY - tooltipHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={color}
                    fontSize="16"
                    fontWeight="bold"
                  >
                    {d.value.toLocaleString()}×
                  </text>
                </g>
              );
            })()}

            {/* Peak indicator */}
            {isPeak && !isHovered && (
              <text
                x={getX(i) + barWidth / 2}
                y={getY(d.value) - 12}
                textAnchor="middle"
                fill={color}
                fontSize="13"
                fontWeight="bold"
                style={{ pointerEvents: "none" }}
              >
                PEAK
              </text>
            )}
          </g>
        );
      })}
      </svg>
    </div>
  );
}

// Monthly revenue data from CSV (Jan 2025 - Dec 2025)
// Platform = Assinatura da plataforma + deco platform + deco.camp
// Services = deco Professional Services + GetSiteDone
const monthlyRevenueData = [
  { month: "Jan-25", platform: 355, services: 131, grossMargin: 33 },
  { month: "Feb-25", platform: 403, services: 56, grossMargin: 10 },
  { month: "Mar-25", platform: 449, services: 49, grossMargin: 54 },
  { month: "Apr-25", platform: 433, services: 62, grossMargin: 40 },
  { month: "May-25", platform: 608, services: 40, grossMargin: 32 },
  { month: "Jun-25", platform: 452, services: 351, grossMargin: 57 },
  { month: "Jul-25", platform: 529, services: 120, grossMargin: 69 },
  { month: "Aug-25", platform: 517, services: 199, grossMargin: 63 },
  { month: "Sep-25", platform: 451, services: 201, grossMargin: 56 },
  { month: "Oct-25", platform: 341, services: 264, grossMargin: 39 },
  { month: "Nov-25", platform: 1039, services: 77, grossMargin: 72 },
  { month: "Dec-25", platform: 533, services: 16, grossMargin: 79 },
];

// Revenue, Resilience & Customer Results slide component - minimalist
function RevenueResilienceSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
  isActive: _isActive = false,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
  isActive?: boolean;
}) {
  const [isFirstCardExpanded, setIsFirstCardExpanded] = useState(false);

  // Calculate total revenue metrics from monthlyRevenueData
  const totalPlatformRevenue = monthlyRevenueData.reduce((sum, d) => sum + d.platform, 0);
  const totalServicesRevenue = monthlyRevenueData.reduce((sum, d) => sum + d.services, 0);
  const totalRevenue = totalPlatformRevenue + totalServicesRevenue;
  
  
  // Daily traffic requests data (Oct-Nov 2025) - combined from Azion + Cloudflare
  const trafficRequestsDaily = [
    { date: "2025-10-01", total: 75546597, azion: 75546597, cloudflare: 0 },
    { date: "2025-10-02", total: 80992271, azion: 80992271, cloudflare: 0 },
    { date: "2025-10-03", total: 75606164, azion: 75606164, cloudflare: 0 },
    { date: "2025-10-04", total: 67585895, azion: 67585895, cloudflare: 0 },
    { date: "2025-10-05", total: 67999628, azion: 67999628, cloudflare: 0 },
    { date: "2025-10-06", total: 80609388, azion: 80609388, cloudflare: 0 },
    { date: "2025-10-07", total: 90036480, azion: 90036480, cloudflare: 0 },
    { date: "2025-10-08", total: 89798896, azion: 89798896, cloudflare: 0 },
    { date: "2025-10-09", total: 85806898, azion: 85806898, cloudflare: 0 },
    { date: "2025-10-10", total: 85933136, azion: 85933136, cloudflare: 0 },
    { date: "2025-10-11", total: 82561816, azion: 82561816, cloudflare: 0 },
    { date: "2025-10-12", total: 105025827, azion: 77118097, cloudflare: 27907730 },
    { date: "2025-10-13", total: 124967138, azion: 88901735, cloudflare: 36065403 },
    { date: "2025-10-14", total: 126228069, azion: 112125025, cloudflare: 14103044 },
    { date: "2025-10-15", total: 128768135, azion: 119405746, cloudflare: 9362389 },
    { date: "2025-10-16", total: 130271264, azion: 120898209, cloudflare: 9373055 },
    { date: "2025-10-17", total: 126702176, azion: 116720598, cloudflare: 9981578 },
    { date: "2025-10-18", total: 118845740, azion: 109383015, cloudflare: 9462725 },
    { date: "2025-10-19", total: 121259295, azion: 111848588, cloudflare: 9410707 },
    { date: "2025-10-20", total: 122002610, azion: 112165990, cloudflare: 9836620 },
    { date: "2025-10-21", total: 121933402, azion: 67256822, cloudflare: 54676580 },
    { date: "2025-10-22", total: 120926175, azion: 46688141, cloudflare: 74238034 },
    { date: "2025-10-23", total: 115922376, azion: 44644417, cloudflare: 71277959 },
    { date: "2025-10-24", total: 114005509, azion: 44525188, cloudflare: 69480321 },
    { date: "2025-10-25", total: 110514389, azion: 39766146, cloudflare: 70748243 },
    { date: "2025-10-26", total: 111496462, azion: 57620261, cloudflare: 53876201 },
    { date: "2025-10-27", total: 134311349, azion: 122337168, cloudflare: 11974181 },
    { date: "2025-10-28", total: 137437196, azion: 125769095, cloudflare: 11668101 },
    { date: "2025-10-29", total: 131357728, azion: 119211840, cloudflare: 12145888 },
    { date: "2025-10-30", total: 135888303, azion: 123429164, cloudflare: 12459139 },
    { date: "2025-10-31", total: 130184673, azion: 118068185, cloudflare: 12116488 },
    { date: "2025-11-01", total: 129488367, azion: 116667503, cloudflare: 12820864 },
    { date: "2025-11-02", total: 141849882, azion: 128880762, cloudflare: 12969120 },
    { date: "2025-11-03", total: 152705593, azion: 139770953, cloudflare: 12934640 },
    { date: "2025-11-04", total: 170620733, azion: 154511863, cloudflare: 16108870 },
    { date: "2025-11-05", total: 182181485, azion: 149231825, cloudflare: 32949660 },
    { date: "2025-11-06", total: 166867675, azion: 138887815, cloudflare: 27979860 },
    { date: "2025-11-07", total: 159689467, azion: 134217537, cloudflare: 25471930 },
    { date: "2025-11-08", total: 148331110, azion: 125737840, cloudflare: 22593270 },
    { date: "2025-11-09", total: 144590638, azion: 122147608, cloudflare: 22443030 },
    { date: "2025-11-10", total: 170033763, azion: 145294533, cloudflare: 24739230 },
    { date: "2025-11-11", total: 200496369, azion: 174817429, cloudflare: 25678940 },
    { date: "2025-11-12", total: 187426578, azion: 159767268, cloudflare: 27659310 },
    { date: "2025-11-13", total: 178970425, azion: 156910995, cloudflare: 22059430 },
    { date: "2025-11-14", total: 170198041, azion: 149368871, cloudflare: 20829170 },
    { date: "2025-11-15", total: 155882491, azion: 139838121, cloudflare: 16044370 },
    { date: "2025-11-16", total: 157396664, azion: 141362054, cloudflare: 16034610 },
    { date: "2025-11-17", total: 187049263, azion: 166642863, cloudflare: 20406400 },
    { date: "2025-11-18", total: 197439992, azion: 174148552, cloudflare: 23291440 },
    { date: "2025-11-19", total: 191423887, azion: 151470697, cloudflare: 39953190 },
    { date: "2025-11-20", total: 213433888, azion: 181127668, cloudflare: 32306220 },
    { date: "2025-11-21", total: 305525067, azion: 287474397, cloudflare: 18050670 },
    { date: "2025-11-22", total: 222165782, azion: 204030812, cloudflare: 18134970 },
    { date: "2025-11-23", total: 231876662, azion: 208119362, cloudflare: 23757300 },
    { date: "2025-11-24", total: 250778610, azion: 228319260, cloudflare: 22459350 },
    { date: "2025-11-25", total: 261908173, azion: 240161983, cloudflare: 21746190 },
    { date: "2025-11-26", total: 293192080, azion: 270524850, cloudflare: 22667230 },
    { date: "2025-11-27", total: 292473535, azion: 265604145, cloudflare: 26869390 },
    { date: "2025-11-28", total: 410703580, azion: 367173900, cloudflare: 43529680 }, // PEAK (Black Friday)
    { date: "2025-11-29", total: 281056647, azion: 250935357, cloudflare: 30121290 },
    { date: "2025-11-30", total: 225234954, azion: 200940564, cloudflare: 24294390 },
  ];

  // Filter to start from first Cloudflare day (exclude Azion-only days)
  const trafficRequestsDailyChart = trafficRequestsDaily.filter(d => d.date >= "2025-10-12");

  // Card configurations
  const cards = [
    {
      tag: "REVENUE",
      title: "3Q25 Gross Revenue grew 2.8x YoY",
      collapsedTitle: "Record revenue in BF & December",
      subtitle: "",
      metric: "2.8×",
      metricLabel: "YoY",
      chart: <RevenueChart data={monthlyRevenueData.slice(-3)} />,
      expandable: true,
    },
    {
      tag: "RESILIENCE",
      title: "We handled peak load successfully",
      subtitle: "",
      metric: ">4.5×",
      metricLabel: null,
      chart: <TrafficResilienceChart data={trafficRequestsDailyChart} />,
      expandable: false,
    },
    {
      tag: "IMPACT",
      title: "Largest store sold significantly above expectations YoY",
      subtitle: "Most customers sold:",
      metric: "2×",
      metricLabel: "YoY",
      chart: null, // Replaced with static image background
      expandable: false,
    },
  ];

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Header - minimal, airy */}
      <div style={{ marginBottom: "80px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
            style={{ fontSize: "12px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          {slide.title}
        </h2>
      </div>

      {/* Three cards container - reduced spacing */}
      <div
        class="flex-1 grid animate-item transition-all duration-500 ease-in-out"
        style={{
          gridTemplateColumns: isFirstCardExpanded ? "1fr 56px 56px" : "1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        {cards.map((card, index) => {
          const isCompressed = index !== 0 && isFirstCardExpanded;
          const isExpanded = index === 0 && isFirstCardExpanded;
          
          // Compressed cards (Resilience & Impact) - only show rotated label
          if (isCompressed) {
            return (
              <button
                key={index}
                type="button"
                onClick={() => setIsFirstCardExpanded(false)}
                class="relative rounded-xl border border-dc-800 overflow-hidden flex items-center justify-center transition-all duration-500 ease-in-out cursor-pointer hover:border-dc-600 hover:bg-dc-900/30"
                style={{ padding: "16px 8px" }}
              >
                {/* Rotated label - bottom to top */}
                <span
                  class="text-primary-light font-mono uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-200"
                  style={{
                    fontSize: "13px",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  [{card.tag}]
                </span>
              </button>
            );
          }

          // Normal or expanded first card
          return (
            <div
              key={index}
              class="relative rounded-xl border border-dc-800 overflow-hidden flex flex-col min-h-0 transition-all duration-500 ease-in-out"
              style={{ 
                padding: isExpanded ? "32px 36px" : "32px 28px",
              }}
            >
              {/* Image background for IMPACT card */}
              {card.tag === "IMPACT" && <ImpactImageBackground />}

              {card.tag === "IMPACT" ? (
                /* IMPACT card: content wrapped in z-10 container, no chart */
                <div class="relative z-10 flex flex-col h-full">
                  {/* Tag */}
                  <div style={{ marginBottom: "8px" }}>
                    <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                      <span class="text-primary-light">[{card.tag}]</span>
                    </p>
                  </div>
                  {/* Title */}
                  <p
                    class="text-dc-100"
                    style={{ fontSize: "28px", lineHeight: "1.5", marginBottom: "24px" }}
                  >
                    {card.collapsedTitle ?? card.title}
                  </p>
                  {/* Subtitle (only if not empty) */}
                  {card.subtitle && (
                    <p
                      class="text-dc-400"
                      style={{ fontSize: "16px", lineHeight: "24px", marginBottom: "24px" }}
                    >
                      {card.subtitle}
                    </p>
                  )}
                  {/* Metric */}
                  <div style={{ marginBottom: "auto" }}>
                    <span
                      class="text-primary-light"
                      style={{ fontSize: "64px", lineHeight: "1", letterSpacing: "-1px" }}
                    >
                      {card.metric}
                    </span>
                    {card.metricLabel && (
                      <span
                        class="text-dc-400"
                        style={{ fontSize: "24px", marginLeft: "12px" }}
                      >
                        {card.metricLabel}
                      </span>
                    )}
                  </div>
                  {/* No chart for IMPACT - image background is the visual */}
                </div>
              ) : (
                /* Non-IMPACT cards: render existing structure unchanged */
                <>
                  {/* Expand icon for first card */}
                  {card.expandable && (
                    <button
                      type="button"
                      onClick={() => setIsFirstCardExpanded(!isFirstCardExpanded)}
                      class="absolute top-4 right-4 p-2 rounded-lg bg-dc-800/50 hover:bg-dc-700/50 text-dc-400 hover:text-primary-light transition-all duration-200 cursor-pointer z-10"
                      style={{ width: "32px", height: "32px" }}
                      title={isExpanded ? "Collapse" : "Expand"}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      >
                        {isExpanded ? (
                          <>
                            <polyline points="4 14 10 14 10 20" />
                            <polyline points="20 10 14 10 14 4" />
                            <line x1="14" y1="10" x2="21" y2="3" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                          </>
                        ) : (
                          <>
                            <polyline points="15 3 21 3 21 9" />
                            <polyline points="9 21 3 21 3 15" />
                            <line x1="21" y1="3" x2="14" y2="10" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                          </>
                        )}
                      </svg>
                    </button>
                  )}

                  {isExpanded ? (
                    /* Expanded: Tag + Title inline */
                    <>
                      <div style={{ marginBottom: "16px" }}>
                        <p style={{ fontSize: "18px", lineHeight: "1.5" }}>
                          <span class="text-primary-light">[{card.tag}]</span>
                          <span class="text-dc-100" style={{ marginLeft: "8px" }}>{card.title}</span>
                        </p>
                      </div>
                      
                      {/* Subtitle */}
                      <p
                        class="text-dc-400"
                        style={{ 
                          fontSize: "15px", 
                          lineHeight: "1.6", 
                          marginBottom: "24px",
                        }}
                      >
                        {card.subtitle}
                      </p>
                    </>
                  ) : (
                    /* Collapsed: Tag and Title on separate lines */
                    <>
                      {/* Tag */}
                      <div style={{ marginBottom: "8px" }}>
                        <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                          <span class="text-primary-light">[{card.tag}]</span>
                        </p>
                      </div>
                      {/* Title */}
                      <p
                        class="text-dc-100"
                        style={{ fontSize: "28px", lineHeight: "1.5", marginBottom: "24px" }}
                      >
                        {card.collapsedTitle ?? card.title}
                      </p>
                      {/* Subtitle (only if not empty) */}
                      {card.subtitle && (
                        <p
                          class="text-dc-400"
                          style={{ fontSize: "16px", lineHeight: "24px", marginBottom: "24px" }}
                        >
                          {card.subtitle}
                        </p>
                      )}
                    </>
                  )}

                  {/* Metric */}
                  <div style={{ marginBottom: "auto" }}>
                    <span
                      class="text-primary-light transition-all duration-300"
                      style={{ 
                        fontSize: isExpanded ? "80px" : "64px", 
                        lineHeight: "1", 
                        letterSpacing: "-1px",
                      }}
                    >
                      {card.metric}
                    </span>
                    {card.metricLabel && (
                      <span
                        class="text-dc-400"
                        style={{ 
                          fontSize: "24px", 
                          marginLeft: "12px",
                        }}
                      >
                        {card.metricLabel}
                      </span>
                    )}
                  </div>

                  {/* Additional details when expanded - inline with metric */}
                  {isExpanded && (
                    <div class="flex gap-6 animate-fadeIn" style={{ marginTop: "20px" }}>
                      <div>
                        <span class="text-dc-500 block" style={{ fontSize: "11px", marginBottom: "2px" }}>
                          Total 2025
                        </span>
                        <span class="text-dc-100" style={{ fontSize: "14px", fontWeight: "600" }}>
                          R${totalRevenue}K
                        </span>
                      </div>
                      <div>
                        <span class="text-dc-500 block" style={{ fontSize: "11px", marginBottom: "2px" }}>
                          Platform
                        </span>
                        <span class="text-primary-light" style={{ fontSize: "14px", fontWeight: "600" }}>
                          R${totalPlatformRevenue}K
                        </span>
                      </div>
                      <div>
                        <span class="text-dc-500 block" style={{ fontSize: "11px", marginBottom: "2px" }}>
                          Services
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#a78bfa" }}>
                          R${totalServicesRevenue}K
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Chart - fills remaining space using flexbox */}
                  <div class={`mt-auto flex-1 min-h-0 px-2 pb-1 ${isExpanded ? "" : "pt-4"}`}>
                    {isExpanded ? (
                      <RevenueChart data={monthlyRevenueData} variant="expanded" />
                    ) : (
                      card.chart
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Operational Wins slide component - matches IMPACT card visual system
function OperationalWinsSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  // Card data for Operational Wins - matches Revenue/Resilience card structure
  const cards = [
    {
      tag: "INFRA",
      title: "Infra & CDN reorganization",
      subtitle: "Significant cost reduction + margin improvement",
      metric: "↓ 40%",
      metricLabel: "Cost",
      imageUrl: "https://assets.decocache.com/decocms/29fd1524-0562-4708-ac50-c97b6ff6a713/capicapi.png",
    },
    {
      tag: "PRICING",
      title: "Diagnostic + repricing process",
      subtitle: "Good reception, clients increasing contracts",
      metric: "~20–30%",
      metricLabel: "Increase",
      imageUrl: "https://assets.decocache.com/decocms/e12242bf-dae7-4465-93e6-5a296088cb79/capiprice.png",
    },
  ];

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Header - minimal, airy */}
      <div style={{ marginBottom: "80px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
            style={{ fontSize: "12px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          {slide.title}
        </h2>
      </div>

      {/* Two cards container - matching IMPACT card layout */}
      <div
        class="flex-1 grid animate-item"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            class="relative rounded-xl border border-dc-800 overflow-hidden flex flex-col"
            style={{ padding: "32px 28px" }}
          >
            {/* Image background - static, object-fit cover */}
            {card.imageUrl && (
              <div
                class="absolute inset-0 z-0"
                style={{
                  opacity: "1",
                }}
              >
                <img
                  src={card.imageUrl}
                  alt=""
                  class="w-full h-full object-cover"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            )}

            {/* Subtle gradient overlay for readability - bottom-left focus */}
            <div
              class="absolute inset-0 pointer-events-none"
              style={{
                zIndex: "5",
                background: "linear-gradient(to top, rgba(18, 17, 15, 0.85) 0%, rgba(18, 17, 15, 0.4) 30%, transparent 60%)",
              }}
            />

            {/* Content - elevated above background */}
            <div class="relative z-10 flex flex-col h-full">
              {/* Tag on its own line */}
              <div style={{ marginBottom: "8px" }}>
                <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  <span class="text-primary-light">[{card.tag}]</span>
                </p>
              </div>

              {/* Headline - 28px font size */}
              <p
                class="text-dc-100"
                style={{ fontSize: "28px", lineHeight: "1.5", marginBottom: "16px" }}
              >
                {card.title}
              </p>

              {/* Subtitle - 16px font, 24px line-height */}
              {card.subtitle && (
                <p
                  class="text-dc-400"
                  style={{ fontSize: "16px", lineHeight: "24px", marginBottom: "auto" }}
                >
                  {card.subtitle}
                </p>
              )}

              {/* Metric at bottom (optional) */}
              {card.metric && (
                <div style={{ marginTop: "24px" }}>
                  <span
                    class="text-primary-light"
                    style={{ fontSize: "48px", lineHeight: "1", letterSpacing: "-1px" }}
                  >
                    {card.metric}
                  </span>
                  {card.metricLabel && (
                    <span
                      class="text-dc-400"
                      style={{ fontSize: "18px", marginLeft: "12px" }}
                    >
                      {card.metricLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Product & Platform Results slide component - minimalist three-card layout
function ProductPlatformSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  // MCP Mesh downloads data
  const downloadsDaily = [
    { date: "2025-12-20", downloads: 0 },
    { date: "2025-12-21", downloads: 319 },
    { date: "2025-12-22", downloads: 642 },
    { date: "2025-12-23", downloads: 854 },
    { date: "2025-12-24", downloads: 277 },
    { date: "2025-12-25", downloads: 161 },
    { date: "2025-12-26", downloads: 368 },
    { date: "2025-12-27", downloads: 44 },
    { date: "2025-12-28", downloads: 291 },
    { date: "2025-12-29", downloads: 590 },
    { date: "2025-12-30", downloads: 1470 },
    { date: "2025-12-31", downloads: 293 },
    { date: "2026-01-01", downloads: 159 },
    { date: "2026-01-02", downloads: 774 },
    { date: "2026-01-03", downloads: 29 },
    { date: "2026-01-04", downloads: 188 },
    { date: "2026-01-05", downloads: 802 },
    { date: "2026-01-06", downloads: 649 },
    { date: "2026-01-07", downloads: 844 },
    { date: "2026-01-08", downloads: 1387 },
    { date: "2026-01-09", downloads: 881 },
  ];

  const totalDownloads = 11022;

  // Card data for Product & Platform Results
  const cards = [
    {
      tag: "PARTNERS",
      title: "Proven \"AI software in production\" through Design Partners",
      subtitle: "One anti-fraud agent cut fraud detection time from:",
      imageUrl: "",
    },
    {
      tag: "MCP MESH",
      title: "MCP Mesh launch — open-source, self-hosted foundation for Internal AI Platform",
      subtitle: "",
      imageUrl: "",
    },
    {
      tag: "ENTERPRISE",
      title: "Enterprise adoption: first self-hosted AI OS customer + interest from 5 others",
      subtitle: "",
      imageUrl: "https://assets.decocache.com/decocms/e3f1b9b4-a2e6-4978-ac50-e29db64f7167/cog2.png",
    },
  ];

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Header - minimal, airy */}
      <div style={{ marginBottom: "80px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
            style={{ fontSize: "12px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          {slide.title}
        </h2>
      </div>

      {/* Three cards container - matching IMPACT card layout */}
      <div
        class="flex-1 grid animate-item"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            class="relative rounded-xl border border-dc-800 overflow-hidden flex flex-col"
            style={{ padding: "32px 28px" }}
          >
            {/* Image background - static, object-fit cover */}
            {card.imageUrl && (
              <div
                class="absolute inset-0 z-0"
                style={{
                  opacity: "1",
                }}
              >
                <img
                  src={card.imageUrl}
                  alt=""
                  class="w-full h-full object-cover"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            )}

            {/* Subtle gradient overlay for readability - bottom-left focus */}
            <div
              class="absolute inset-0 pointer-events-none"
              style={{
                zIndex: "5",
                background: "linear-gradient(to top, rgba(18, 17, 15, 0.85) 0%, rgba(18, 17, 15, 0.4) 30%, transparent 60%)",
              }}
            />

            {/* Content - elevated above background */}
            <div class="relative z-10 flex flex-col h-full">
              {/* Tag on its own line */}
              <div style={{ marginBottom: "8px" }}>
                <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  <span class="text-primary-light">[{card.tag}]</span>
                </p>
              </div>

              {/* Headline - 28px font size */}
              <p
                class="text-dc-100"
                style={{ fontSize: "28px", lineHeight: "1.5", marginBottom: "16px" }}
              >
                {card.title}
              </p>

              {/* Subtitle - 16px font, 24px line-height */}
              {card.subtitle && (
                <p
                  class="text-dc-400"
                  style={{ fontSize: "16px", lineHeight: "24px", marginBottom: (index === 0 || index === 1) ? "0px" : "auto" }}
                >
                  {card.subtitle}
                </p>
              )}

              {/* PARTNERS card: Time savings big number */}
              {index === 0 && (
                <div style={{ marginTop: "16px" }}>
                  <span
                    class="text-dc-400"
                    style={{ fontSize: "28px", lineHeight: "1", letterSpacing: "-0.5px" }}
                  >
                    7.5 days →
                  </span>
                  <span
                    class="text-primary-light"
                    style={{ fontSize: "48px", lineHeight: "1", letterSpacing: "-1px", marginLeft: "12px" }}
                  >
                    MINUTES
                  </span>
                </div>
              )}

              {/* MCP MESH card: Big number + chart */}
              {index === 1 && (
                <>
                  {/* Big number metric */}
                  <div style={{ marginBottom: "16px" }}>
                    <span
                      class="text-primary-light"
                      style={{ fontSize: "64px", lineHeight: "1", letterSpacing: "-1px" }}
                    >
                      {totalDownloads.toLocaleString()}
                    </span>
                    <div
                      class="text-dc-400"
                      style={{ fontSize: "16px", marginTop: "4px" }}
                    >
                      Downloads
                    </div>
                  </div>

                  {/* Chart fills remaining space */}
                  <div class="flex-1 min-h-0">
                    <McpMeshDownloadsChart data={downloadsDaily} />
                  </div>
                </>
              )}

              {/* ENTERPRISE card: Big number metric */}
              {index === 2 && (
                <div style={{ marginTop: "24px" }}>
                  <span
                    class="text-primary-light"
                    style={{ fontSize: "48px", lineHeight: "1", letterSpacing: "-1px" }}
                  >
                    $70k–$150k
                  </span>
                  <span
                    class="text-dc-400"
                    style={{ fontSize: "18px", marginLeft: "12px" }}
                  >
                    ACV
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Organizational Maturity slide component - minimalist three-card layout
function OrganizationalMaturitySlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  // Card data for Organizational Maturity
  const cards = [
    {
      tag: "AI-FIRST",
      title: "Fully AI-first in practice: agents daily, engineers in Cursor, business teams vibecoding, MCP-first by default",
      subtitle: "",
      imageUrl: "",
    },
    {
      tag: "PRODUCTION",
      title: "We now operate as a production AI team: real systems, real constraints, real failures",
      subtitle: "",
      imageUrl: "",
    },
    {
      tag: "PULL",
      title: "This shows externally. Platform and engineering leaders increasingly come to us for advice on scaling AI internally.",
      subtitle: "",
      imageUrl: "",
    },
  ];

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Header - minimal, airy */}
      <div style={{ marginBottom: "80px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
            style={{ fontSize: "12px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          {slide.title}
        </h2>
      </div>

      {/* Three cards container - matching IMPACT card layout */}
      <div
        class="flex-1 grid animate-item"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            class="relative rounded-xl border border-dc-800 overflow-hidden flex flex-col"
            style={{ padding: "32px 28px" }}
          >
            {/* Image background - static, object-fit cover */}
            {card.imageUrl && (
              <div
                class="absolute inset-0 z-0"
                style={{
                  opacity: "1",
                }}
              >
                <img
                  src={card.imageUrl}
                  alt=""
                  class="w-full h-full object-cover"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
            )}

            {/* Subtle gradient overlay for readability - bottom-left focus */}
            <div
              class="absolute inset-0 pointer-events-none"
              style={{
                zIndex: "5",
                background: "linear-gradient(to top, rgba(18, 17, 15, 0.85) 0%, rgba(18, 17, 15, 0.4) 30%, transparent 60%)",
              }}
            />

            {/* Content - elevated above background */}
            <div class="relative z-10 flex flex-col h-full">
              {/* Tag on its own line */}
              <div style={{ marginBottom: "8px" }}>
                <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  <span class="text-primary-light">[{card.tag}]</span>
                </p>
              </div>

              {/* Headline - 28px font size */}
              <p
                class="text-dc-100"
                style={{ fontSize: "28px", lineHeight: "1.5", marginBottom: "16px" }}
              >
                {card.title}
              </p>

              {/* Subtitle - 16px font, 24px line-height */}
              {card.subtitle && (
                <p
                  class="text-dc-400"
                  style={{ fontSize: "16px", lineHeight: "24px", marginBottom: "auto" }}
                >
                  {card.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Execution Learnings slide - Large typography with centered layout and illustration
function ExecutionLearningsSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  // Execution learnings - punchy, inspirational statements with purple highlights
  const statements = [
    { text: "Focus = willingness to let go", highlight: "Focus" },
    { text: "Finish bets before starting new ones", highlight: "Finish bets" },
    { text: "Shoot bullets before cannonballs", highlight: "Shoot bullets" },
  ];

  return (
    <div
      class="w-full h-full relative bg-purple-dark text-dc-50 flex flex-col overflow-hidden"
      style={{ padding: "80px 96px" }}
    >
      {/* Background illustration - positioned at the bottom center */}
      <img
        src="https://assets.decocache.com/decocms/f4d2e0a7-551f-49b3-a06b-f6db6376e246/image-909-(Traced).png"
        alt=""
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "auto",
          height: "100%",
          maxWidth: "none",
          objectFit: "contain",
        }}
      />

      {/* Header - centered horizontally at the top */}
      <div class="text-center relative z-10" style={{ marginBottom: "64px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-400 block"
            style={{ fontSize: "12px", letterSpacing: "2.28px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          New principles
        </h2>
      </div>

      {/* Three large statements - centered both horizontally and vertically */}
      <div
        class="flex-1 flex flex-col justify-center items-center animate-item relative z-10"
        style={{ gap: "24px" }}
      >
        {statements.map((statement, index) => {
          const parts = statement.text.split(statement.highlight);
          return (
            <p
              key={index}
              class="text-dc-50 text-center font-sans"
              style={{
                fontSize: "88px",
                lineHeight: "88px",
                letterSpacing: "-1.76px",
                fontWeight: "normal",
              }}
            >
              <span class="text-purple-light">{statement.highlight}</span>
              <span>{parts[1]}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

// Product Learnings slide - 2x2 grid of insight cards with icons
function ProductLearningsSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  // Product learnings - insights about agents and collaboration with Material Symbols
  const insights = [
    {
      icon: "trending_up",
      title: "Business impact first",
      description: "Impact from a few agentic solutions comes before team autonomy",
    },
    {
      icon: "smart_toy",
      title: "Autonomy is earned",
      description: "Start with reliable, pre-built agents, then compose new ones",
    },
    {
      icon: "engineering",
      title: "Agents are software",
      description: "They require engineering, observability, and governance",
    },
    {
      icon: "handshake",
      title: "One system for all",
      description: "Devs and non-devs must work in the same system",
    },
  ];

  return (
    <>
      {/* Material Symbols Font - Sharp style, weight 100 */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100,0,0"
        rel="stylesheet"
      />
      
      <div
        class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
        style={{ padding: "80px 96px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          {slide.tag && (
            <span
              class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
              style={{ fontSize: "12px", marginBottom: "16px" }}
            >
              {slide.tag}
            </span>
          )}
          <h2
            class="animate-item text-dc-200 leading-tight"
            style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
          >
            Building with AI agents
          </h2>
        </div>

        {/* 2x2 Grid of insight cards - increased height */}
        <div
          class="flex-1 grid animate-item"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {insights.map((insight, index) => (
            <div
              key={index}
              class="rounded-xl border border-dc-800 flex flex-col"
              style={{ padding: "40px" }}
            >
              {/* Large Icon - purple-light, left-aligned */}
              <div
                class="text-purple-light"
                style={{
                  marginBottom: "32px",
                }}
              >
                <MaterialSymbol icon={insight.icon} size={160} />
              </div>
              {/* Title - larger size, left-aligned */}
              <h3
                class="text-purple-light"
                style={{
                  fontSize: "40px",
                  lineHeight: "48px",
                  marginBottom: "16px",
                  letterSpacing: "-0.5px",
                }}
              >
                {insight.title}
              </h3>
              {/* Description - increased size */}
              <p
                class="text-dc-300"
                style={{
                  fontSize: "22px",
                  lineHeight: "28px",
                }}
              >
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Strategy Learnings slide - Spin-off highlight + dual hypothesis
function StrategyLearningsSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
            style={{ fontSize: "12px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          Path forward
        </h2>
      </div>

      {/* Content: Spin-off + Dual Hypothesis */}
      <div
        class="flex-1 flex flex-col animate-item"
        style={{ gap: "32px" }}
      >
        {/* Spin-off highlight - full width card with image placeholder */}
        <div
          class="rounded-xl border border-dc-800 flex items-center"
          style={{ padding: "32px 40px", gap: "32px" }}
        >
          {/* Image placeholder - empty space for photo */}
          <div
            class="flex-shrink-0 rounded-full bg-dc-900 border border-dc-800"
            style={{ width: "72px", height: "72px" }}
          />
          {/* Content */}
          <div class="flex-1">
            <p
              class="text-dc-100"
              style={{
                fontSize: "28px",
                lineHeight: "1.4",
                marginBottom: "8px",
              }}
            >
              Co-founder spun out a services company{" "}
              <span class="text-purple-light">(SIP)</span>
            </p>
            <p
              class="text-dc-400"
              style={{
                fontSize: "18px",
                lineHeight: "1.5",
              }}
            >
              First deco spin-off. Praise to Lucis.
            </p>
          </div>
        </div>

        {/* Dual hypothesis card - contains title and two nested cards */}
        <div
          class="flex-1 rounded-xl border border-dc-800 flex flex-col"
          style={{ padding: "40px" }}
        >
          {/* Title */}
          <h3
            class="text-dc-200"
            style={{
              fontSize: "28px",
              lineHeight: "1.4",
              marginBottom: "32px",
              letterSpacing: "-0.5px",
            }}
          >
            We are validating two hypotheses in parallel and will choose one based on evidence:
          </h3>

          {/* Two hypothesis cards side by side */}
          <div
            class="flex-1 grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {/* Horizontal hypothesis */}
            <div
              class="rounded-xl border border-dc-800 flex flex-col relative overflow-hidden"
              style={{ padding: "32px" }}
            >
              {/* Space for background image */}
              <div
                class="absolute inset-0 bg-dc-900/50"
                style={{ zIndex: 0 }}
              />
              {/* Content */}
              <div class="relative z-10 flex flex-col h-full">
                {/* Badge */}
                <span
                  class="font-mono uppercase tracking-[0.15em] text-purple-light"
                  style={{ fontSize: "13px", marginBottom: "16px" }}
                >
                  [HORIZONTAL]
                </span>
                {/* Title */}
                <h4
                  class="text-dc-100"
                  style={{
                    fontSize: "32px",
                    lineHeight: "1.2",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Internal AI Platform
                </h4>
              </div>
            </div>

            {/* Vertical hypothesis */}
            <div
              class="rounded-xl border border-dc-800 flex flex-col relative overflow-hidden"
              style={{ padding: "32px" }}
            >
              {/* Space for background image */}
              <div
                class="absolute inset-0 bg-dc-900/50"
                style={{ zIndex: 0 }}
              />
              {/* Content */}
              <div class="relative z-10 flex flex-col h-full">
                {/* Badge */}
                <span
                  class="font-mono uppercase tracking-[0.15em] text-purple-light"
                  style={{ fontSize: "13px", marginBottom: "16px" }}
                >
                  [VERTICAL]
                </span>
                {/* Title */}
                <h4
                  class="text-dc-100"
                  style={{
                    fontSize: "32px",
                    lineHeight: "1.2",
                    letterSpacing: "-0.5px",
                  }}
                >
                  AI software for e-commerce
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Q1 Validation slide - Two hypotheses comparison with yellow accents
function Q1ValidationSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  const [hoveredHypothesis, setHoveredHypothesis] = useState<string | null>(null);

  // ASCII Dithering animation for hypothesis cards - faster with more movement
  useEffect(() => {
    const canvasA = document.getElementById("hypothesis-a-canvas") as HTMLCanvasElement | null;
    const canvasB = document.getElementById("hypothesis-b-canvas") as HTMLCanvasElement | null;
    
    const animateCanvas = (canvas: HTMLCanvasElement, offset: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      let animationRef: number;
      const scale = 2;

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width / scale;
        canvas.height = rect.height / scale;
      };

      resizeCanvas();
      globalThis.addEventListener("resize", resizeCanvas);

      // Bayer matrix 8x8 for dithering
      const bayerMatrix8x8 = [
        [0, 32, 8, 40, 2, 34, 10, 42],
        [48, 16, 56, 24, 50, 18, 58, 26],
        [12, 44, 4, 36, 14, 46, 6, 38],
        [60, 28, 52, 20, 62, 30, 54, 22],
        [3, 35, 11, 43, 1, 33, 9, 41],
        [51, 19, 59, 27, 49, 17, 57, 25],
        [15, 47, 7, 39, 13, 45, 5, 37],
        [63, 31, 55, 23, 61, 29, 53, 21],
      ];

      let time = 0;
      const cellSize = 4;

      const animate = () => {
        if (canvas.width === 0 || canvas.height === 0) {
          animationRef = requestAnimationFrame(animate);
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;

        for (let y = 0; y < canvas.height; y += cellSize) {
          for (let x = 0; x < canvas.width; x += cellSize) {
            const nx = x / canvas.width;
            const ny = y / canvas.height;

            // Wave patterns - faster and more pronounced
            const waveBase = Math.sin(nx * 5 + time * 0.0008 + offset) * 0.2;
            const waveSecond = Math.cos(nx * 8 + time * 0.0006 + offset) * 0.15;
            const waveThird = Math.sin((nx + ny) * 4 + time * 0.0005 + offset) * 0.12;
            const waveFourth = Math.cos(ny * 6 + time * 0.0007 + offset) * 0.1;

            // Gradient - more visible in center/bottom
            const verticalGradient = Math.pow(ny, 0.5);
            const horizontalGradient = 1 - Math.abs(nx - 0.5) * 0.6;

            let intensity = 0.9 - (verticalGradient * 0.45 * horizontalGradient) + 
                           waveBase + waveSecond + waveThird + waveFourth;

            const noise = (Math.random() - 0.5) * 0.06 * verticalGradient;
            intensity += noise;

            intensity = Math.max(0, Math.min(1, intensity));

            const matrixX = Math.floor(x / cellSize) % 8;
            const matrixY = Math.floor(y / cellSize) % 8;
            const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

            const ditherResult = intensity > threshold;

            // yellow-light: #FFC116
            const r = ditherResult ? 0xff : 0xcc;
            const g = ditherResult ? 0xc1 : 0x99;
            const b = ditherResult ? 0x16 : 0x11;

            for (let dy = 0; dy < cellSize && y + dy < canvas.height; dy++) {
              for (let dx = 0; dx < cellSize && x + dx < canvas.width; dx++) {
                const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                data[pixelIndex] = r;
                data[pixelIndex + 1] = g;
                data[pixelIndex + 2] = b;
                data[pixelIndex + 3] = 255;
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);

        time += 20; // Faster animation
        animationRef = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        globalThis.removeEventListener("resize", resizeCanvas);
        if (animationRef) {
          cancelAnimationFrame(animationRef);
        }
      };
    };

    const cleanupA = canvasA ? animateCanvas(canvasA, 0) : null;
    const cleanupB = canvasB ? animateCanvas(canvasB, Math.PI) : null;

    return () => {
      cleanupA?.();
      cleanupB?.();
    };
  }, []);

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
            style={{ fontSize: "12px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p
            class="animate-item text-dc-400"
            style={{
              fontSize: "17px",
              marginTop: "12px",
            }}
          >
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Main content - validation statement - centered */}
      <div
        class="animate-item text-center"
        style={{ marginBottom: "56px" }}
      >
        <p
          class="text-dc-200"
          style={{
            fontSize: "36px",
            lineHeight: "1.4",
            letterSpacing: "-0.4px",
          }}
        >
          In Q1, we will validate{" "}
          <span class="text-yellow-light">two hypotheses in parallel</span>{" "}
          and choose one to scale.
        </p>
      </div>

      {/* Two hypothesis cards side by side */}
      <div
        class="flex-1 grid animate-item"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        {/* Hypothesis A - Internal AI Platform */}
        <div
          class="rounded-xl border border-dc-800 flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer"
          style={{
            padding: "40px",
            backgroundColor: hoveredHypothesis === "A" ? "rgba(255, 193, 22, 0.05)" : "transparent",
            borderColor: hoveredHypothesis === "A" ? "#FFC116" : "",
          }}
          onMouseEnter={() => setHoveredHypothesis("A")}
          onMouseLeave={() => setHoveredHypothesis(null)}
        >
          {/* ASCII Dithering Animation Background */}
          <canvas
            id="hypothesis-a-canvas"
            class="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
            style={{
              imageRendering: "pixelated",
              opacity: hoveredHypothesis === "A" ? 0.15 : 0,
            }}
          />

          {/* Badge */}
          <span
            class="relative z-10 font-mono uppercase tracking-[0.15em] transition-colors duration-300"
            style={{
              fontSize: "13px",
              marginBottom: "20px",
              color: hoveredHypothesis === "A" ? "#FFC116" : "#A6A09D",
            }}
          >
            HYPOTHESIS A
          </span>

          {/* Title */}
          <h3
            class="relative z-10 transition-colors duration-300"
            style={{
              fontSize: "28px",
              lineHeight: "1.3",
              letterSpacing: "-0.5px",
              marginBottom: "16px",
              color: hoveredHypothesis === "A" ? "#FFC116" : "#F1F0EE",
            }}
          >
            Internal AI Platform
          </h3>

          {/* Subtitle */}
          <p
            class="relative z-10 text-dc-400"
            style={{
              fontSize: "15px",
              lineHeight: "1.5",
              marginBottom: "24px",
              fontStyle: "italic",
            }}
          >
            Cogna + other enterprises
          </p>

          {/* Description */}
          <p
            class="relative z-10 text-dc-300"
            style={{
              fontSize: "32px",
              lineHeight: "1.4",
              letterSpacing: "-0.4px",
              marginBottom: "20px",
            }}
          >
            Companies need a governed, extensible platform to build, run, and manage internal agents — and our MCP-first, open, composable approach can meet that need in a scalable, adoptable way.
          </p>

          {/* Article link */}
          <a
            href="https://simple.ai/p/what-are-context-graphs?_bhlid=e447f49ab61733e0e0abdbc49de9febe37f7a2e9"
            target="_blank"
            rel="noopener noreferrer"
            class="relative z-10 inline-flex items-center gap-2 text-dc-500 hover:text-yellow-light transition-colors duration-200"
            style={{
              fontSize: "14px",
              marginTop: "auto",
              paddingTop: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span>Read the reference article</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>

          {/* Visual accent line at bottom */}
          <div
            class="absolute bottom-0 left-0 right-0 transition-all duration-300"
            style={{
              height: "3px",
              backgroundColor: hoveredHypothesis === "A" ? "#FFC116" : "transparent",
            }}
          />
        </div>

        {/* Hypothesis B - AI Agents for E-commerce */}
        <div
          class="rounded-xl border border-dc-800 flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer"
          style={{
            padding: "40px",
            backgroundColor: hoveredHypothesis === "B" ? "rgba(255, 193, 22, 0.05)" : "transparent",
            borderColor: hoveredHypothesis === "B" ? "#FFC116" : "",
          }}
          onMouseEnter={() => setHoveredHypothesis("B")}
          onMouseLeave={() => setHoveredHypothesis(null)}
        >
          {/* ASCII Dithering Animation Background */}
          <canvas
            id="hypothesis-b-canvas"
            class="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
            style={{
              imageRendering: "pixelated",
              opacity: hoveredHypothesis === "B" ? 0.15 : 0,
            }}
          />

          {/* Badge */}
          <span
            class="relative z-10 font-mono uppercase tracking-[0.15em] transition-colors duration-300"
            style={{
              fontSize: "13px",
              marginBottom: "20px",
              color: hoveredHypothesis === "B" ? "#FFC116" : "#A6A09D",
            }}
          >
            HYPOTHESIS B
          </span>

          {/* Title */}
          <h3
            class="relative z-10 transition-colors duration-300"
            style={{
              fontSize: "28px",
              lineHeight: "1.3",
              letterSpacing: "-0.5px",
              marginBottom: "16px",
              color: hoveredHypothesis === "B" ? "#FFC116" : "#F1F0EE",
            }}
          >
            AI Agents for site & commerce evolution
          </h3>

          {/* Subtitle */}
          <p
            class="relative z-10 text-dc-400"
            style={{
              fontSize: "15px",
              lineHeight: "1.5",
              marginBottom: "24px",
              fontStyle: "italic",
            }}
          >
            Farm + deco.cx customer base
          </p>

          {/* Description */}
          <p
            class="relative z-10 text-dc-300 flex-1"
            style={{
              fontSize: "32px",
              lineHeight: "1.4",
              letterSpacing: "-0.4px",
            }}
          >
            Digital teams will pay for packaged AI software that moves real metrics — and our way of building and operating these agents can deliver that reliably and repeatably.
          </p>

          {/* Visual accent line at bottom */}
          <div
            class="absolute bottom-0 left-0 right-0 transition-all duration-300"
            style={{
              height: "3px",
              backgroundColor: hoveredHypothesis === "B" ? "#FFC116" : "transparent",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// What Never Changes slide - Foundation principles with yellow accents (inspired by ExecutionLearningsSlide)
function WhatNeverChangesSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  // Foundation principles - key statements with yellow highlights on important concepts
  const statements = [
    { text: "Software becomes more custom, composable, and owned", highlight: "custom, composable, and owned" },
    { text: "Companies need a system where humans, developers, and agents collaborate", highlight: "humans, developers, and agents" },
    { text: "Context is continuously optimized", highlight: "Context" },
    { text: "Governance is enforced", highlight: "Governance" },
    { text: "Autonomy is made safe", highlight: "Autonomy" },
  ];

  return (
    <div
      class="w-full h-full relative bg-yellow-dark text-dc-50 flex flex-col overflow-hidden"
      style={{ padding: "80px 96px" }}
    >
      {/* Background illustration - positioned at the center */}
      <img
        src="https://assets.decocache.com/decocms/f4d2e0a7-551f-49b3-a06b-f6db6376e246/image-909-(Traced).png"
        alt=""
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "auto",
          height: "100%",
          maxWidth: "none",
          objectFit: "contain",
          opacity: "0.15",
        }}
      />

      {/* Header - centered horizontally at the top */}
      <div class="text-center relative z-10" style={{ marginBottom: "64px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-400 block"
            style={{ fontSize: "12px", letterSpacing: "2.28px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          {slide.title}
        </h2>
      </div>

      {/* Five statements - centered both horizontally and vertically */}
      <div
        class="flex-1 flex flex-col justify-center items-center animate-item relative z-10"
        style={{ gap: "20px" }}
      >
        {statements.map((statement, index) => {
          const parts = statement.text.split(statement.highlight);
          return (
            <p
              key={index}
              class="text-dc-50 text-center font-sans"
              style={{
                fontSize: "52px",
                lineHeight: "60px",
                letterSpacing: "-1.04px",
                fontWeight: "normal",
              }}
            >
              <span>{parts[0]}</span>
              <span class="text-yellow-light">{statement.highlight}</span>
              <span>{parts[1]}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
}

// Our Approach slide - 3 horizontal cards with Material Design icons and yellow accents
function OurApproachSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Three approach cards with Material Symbols icons
  const approaches = [
    {
      icon: "architecture",
      tag: "OUR ROLE",
      description: "We build the AI OS primitives enterprises use to assemble, run, and evolve their own internal AI platforms.",
    },
    {
      icon: "extension",
      tag: "OUR IMPLEMENTATION",
      description: "deco CMS is our implementation: open-source, composable, extensible, MCP-first.",
    },
    {
      icon: "hub",
      tag: "OUR DISTRIBUTION",
      description: "The open-source community is central, not just for distribution, but for credibility, learning, and compounding.",
    },
  ];

  return (
    <>
      {/* Material Symbols Font - Sharp style, weight 100 */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100,0,0"
        rel="stylesheet"
      />

      <div
        class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
        style={{ padding: "80px 96px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          {slide.tag && (
            <span
              class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
              style={{ fontSize: "12px", marginBottom: "16px" }}
            >
              {slide.tag}
            </span>
          )}
          <h2
            class="animate-item text-dc-200 leading-tight"
            style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
          >
            {slide.title}
          </h2>
        </div>

        {/* 3 horizontal cards */}
        <div
          class="flex-1 grid animate-item"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "24px",
          }}
        >
          {approaches.map((approach, index) => (
            <div
              key={index}
              class="rounded-xl border flex flex-col relative overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                padding: "40px",
                backgroundColor: hoveredCard === index ? "rgba(255, 193, 22, 0.05)" : "transparent",
                borderColor: hoveredCard === index ? "#FFC116" : "#282524",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Large Icon - yellow-light, left-aligned */}
              <div
                class="transition-colors duration-300"
                style={{
                  marginBottom: "40px",
                  color: hoveredCard === index ? "#FFC116" : "#FFC116",
                }}
              >
                <MaterialSymbol icon={approach.icon} size={288} />
              </div>
              {/* Tag - small bracketed tag */}
              <span
                class="font-mono uppercase tracking-[0.15em] transition-colors duration-300"
                style={{
                  fontSize: "13px",
                  marginBottom: "24px",
                  color: hoveredCard === index ? "#FFC116" : "#A6A09D",
                }}
              >
                [{approach.tag}]
              </span>
              {/* Description - with hover highlights on key phrases */}
              <p
                class="flex-1 text-dc-300"
                style={{
                  fontSize: "40px",
                  lineHeight: "1.3",
                  letterSpacing: "-0.6px",
                }}
              >
                {index === 0 && (
                  <>
                    We build the{" "}
                    <span
                      class="transition-colors duration-300"
                      style={{ color: hoveredCard === index ? "#FFC116" : "#D6D3D1" }}
                    >
                      AI OS primitives
                    </span>{" "}
                    enterprises use to assemble, run, and evolve their own internal AI platforms.
                  </>
                )}
                {index === 1 && (
                  <>
                    <span
                      class="transition-colors duration-300"
                      style={{ color: hoveredCard === index ? "#FFC116" : "#D6D3D1" }}
                    >
                      deco CMS
                    </span>{" "}
                    is our implementation:{" "}
                    <span
                      class="transition-colors duration-300"
                      style={{ color: hoveredCard === index ? "#FFC116" : "#D6D3D1" }}
                    >
                      open-source, composable, extensible, MCP-first
                    </span>
                    .
                  </>
                )}
                {index === 2 && (
                  <>
                    The{" "}
                    <span
                      class="transition-colors duration-300"
                      style={{ color: hoveredCard === index ? "#FFC116" : "#D6D3D1" }}
                    >
                      open-source community
                    </span>{" "}
                    is central, not just for distribution, but for{" "}
                    <span
                      class="transition-colors duration-300"
                      style={{ color: hoveredCard === index ? "#FFC116" : "#D6D3D1" }}
                    >
                      credibility, learning, and compounding
                    </span>
                    .
                  </>
                )}
              </p>
              
              {/* Visual accent line at bottom */}
              <div
                class="absolute bottom-0 left-0 right-0 transition-all duration-300"
                style={{
                  height: "3px",
                  backgroundColor: hoveredCard === index ? "#FFC116" : "transparent",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// 2026 Priorities slide - 4 cards with green accents (following ProductLearningsSlide structure)
function Priorities2026Slide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  // Four priority cards
  const priorities = [
    {
      icon: "task_alt",
      title: "Validate and choose",
      description: "Generate decisive signal and commit",
    },
    {
      icon: "money_bag",
      title: "Operate profitably during discovery",
      description: "Disciplined cost, pricing, delivery",
    },
    {
      icon: "precision_manufacturing",
      title: "Turn production into product",
      description: "Systematically productize what works",
    },
    {
      icon: "diversity_3",
      title: "Grow through community",
      description: "OSS as the primary learning and distribution engine",
    },
  ];

  return (
    <>
      {/* Material Symbols Font - Sharp style, weight 100 */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100,0,0"
        rel="stylesheet"
      />

      <div
        class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
        style={{ padding: "80px 96px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          {slide.tag && (
            <span
              class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
              style={{ fontSize: "12px", marginBottom: "16px" }}
            >
              {slide.tag}
            </span>
          )}
          <h2
            class="animate-item text-dc-200 leading-tight"
            style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
          >
            {slide.title}
          </h2>
        </div>

        {/* 2x2 Grid of priority cards - exact same structure as ProductLearningsSlide */}
        <div
          class="flex-1 grid animate-item"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {priorities.map((priority, index) => (
            <div
              key={index}
              class="rounded-xl border border-dc-800 flex flex-col"
              style={{ padding: "40px" }}
            >
              {/* Large Icon - green (primary-light), left-aligned */}
              <div
                class="text-primary-light"
                style={{
                  marginBottom: "32px",
                }}
              >
                <MaterialSymbol icon={priority.icon} size={160} />
              </div>
              {/* Title - larger size, left-aligned, green */}
              <h3
                class="text-primary-light"
                style={{
                  fontSize: "40px",
                  lineHeight: "48px",
                  marginBottom: "16px",
                  letterSpacing: "-0.5px",
                }}
              >
                {priority.title}
              </h3>
              {/* Description - increased size */}
              <p
                class="text-dc-300"
                style={{
                  fontSize: "22px",
                  lineHeight: "28px",
                }}
              >
                {priority.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Our Asks slide - centered layout with 2 cards
function OurAsksSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const asks = [
    {
      number: "1",
      text: "Intros to platform / infra / automation leaders in large companies",
    },
    {
      number: "2",
      text: "(Optional) Intros to large e-commerce players with appetite for operational AI",
    },
  ];

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "64px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
            style={{ fontSize: "12px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          {slide.title}
        </h2>
      </div>

      {/* Two centered cards */}
      <div
        class="flex-1 flex flex-col justify-center animate-item"
        style={{ gap: "32px" }}
      >
        {asks.map((ask, index) => (
          <div
            key={index}
            class="rounded-xl border flex items-center transition-all duration-300 cursor-pointer"
            style={{
              padding: "48px 56px",
              backgroundColor: hoveredCard === index ? "rgba(208, 236, 26, 0.05)" : "transparent",
              borderColor: hoveredCard === index ? "#D0EC1A" : "#282524",
              gap: "32px",
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Number badge */}
            <div
              class="rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: hoveredCard === index ? "#D0EC1A" : "#282524",
              }}
            >
              <span
                class="font-mono font-bold transition-colors duration-300"
                style={{
                  fontSize: "24px",
                  color: hoveredCard === index ? "#121110" : "#78726E",
                }}
              >
                {ask.number}
              </span>
            </div>
            {/* Text */}
            <p
              class="flex-1 transition-colors duration-300"
              style={{
                fontSize: "32px",
                lineHeight: "1.4",
                letterSpacing: "-0.4px",
                color: hoveredCard === index ? "#D6D3D1" : "#A6A09D",
              }}
            >
              {ask.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Custom timeline slide component - minimalist design
function TimelineSlide({
  slide,
  bgClass: _bgClass,
  textColorClass: _textColorClass,
}: {
  slide: Slide;
  bgClass: string;
  textColorClass: string;
}) {
  // Hardcoded 2025 Journey timeline data
  // Position refers to where the TEXT appears. Hover images appear on the OPPOSITE side.
  const timelineData = [
    {
      quarter: "Q1",
      position: "below" as const,
      items: [
        { title: "Webdraw sunset" },
        { title: "Hard focus decisions" },
      ],
    },
    {
      quarter: "Q2",
      position: "above" as const,
      items: [
        {
          title: "Design partners",
          subtitle: "(deco.chat → early enterprise usage)",
        },
      ],
    },
    {
      quarter: "Q3",
      position: "below" as const,
      items: [
        { title: "Product consolidation" },
        { title: "BF preparation" },
      ],
    },
    {
      quarter: "Q4",
      position: "above" as const,
      items: [
        { title: "Black Friday scale" },
        { title: "MCP Mesh launch", subtitle: "(future-proof architecture)" },
      ],
    },
  ];

  return (
    <div
      class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
      style={{ padding: "80px 96px" }}
    >
      {/* Inject CSS animation for wave effect */}
      <style>
        {`
          @keyframes wave-hand {
            0%, 100% { transform: scale(1) rotate(-10deg); }
            50% { transform: scale(1) rotate(15deg); }
          }
        `}
      </style>

      {/* Header */}
      <div style={{ marginBottom: "64px" }}>
        {slide.tag && (
          <span
            class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
            style={{ fontSize: "12px", marginBottom: "16px" }}
          >
            {slide.tag}
          </span>
        )}
        <h2
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          {slide.title}
        </h2>
      </div>

      {/* Timeline container */}
      <div
        class="flex-1 relative"
        style={{ marginTop: "40px" }}
      >
        {/* Horizontal line spanning all items - positioned at vertical center */}
        <div
          class="absolute bg-dc-700"
          style={{
            left: "24px",
            right: "24px",
            height: "1px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        {/* Timeline items container - full height for absolute positioning */}
        <div
          class="relative flex justify-between w-full h-full"
          style={{ paddingLeft: "0", paddingRight: "0" }}
        >
          {timelineData.map((item, idx) => (
            <TimelineItem
              key={idx}
              quarter={item.quarter}
              items={item.items}
              position={item.position}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * @titleBy title
 */
interface BulletPoint {
  text: string;
  highlight?: boolean;
}

/**
 * @titleBy title
 */
interface SlideItem {
  title?: string;
  subtitle?: string;
  bullets?: BulletPoint[];
  value?: string;
  label?: string;
}

/**
 * @titleBy title
 */
export interface Slide {
  /** @title Título do Slide */
  title: string;

  /** @title Subtítulo */
  subtitle?: string;

  /** @title Layout do Slide */
  layout: "title" | "content" | "two-column" | "stats" | "timeline" | "list" | "revenue-resilience" | "product-platform" | "organizational-maturity" | "operational-wins" | "learnings-execution" | "learnings-product" | "learnings-strategy" | "what-never-changes" | "our-approach" | "q1-validation" | "priorities-2026" | "our-asks";

  /** @title Cor de Fundo */
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

  /** @title Cor do Texto */
  textColor?: "dark" | "light";

  /** @title Items do Slide */
  items?: SlideItem[];

  /** @title Imagem de Fundo */
  backgroundImage?: ImageWidget;

  /** @title Número do Slide (ex: "01") */
  slideNumber?: string;

  /** @title Tag/Badge */
  tag?: string;
}

export interface Props {
  /** @title Título da Apresentação */
  presentationTitle?: string;

  /** @title Subtítulo */
  presentationSubtitle?: string;

  /** @title Logo */
  logo?: ImageWidget;

  /** @title Slides */
  slides?: Slide[];
}

const bgColorMap: Record<string, string> = {
  "primary-light": "bg-primary-light",
  "primary-dark": "bg-primary-dark",
  "purple-light": "bg-purple-light",
  "purple-dark": "bg-purple-dark",
  "yellow-light": "bg-yellow-light",
  "dc-950": "bg-dc-950",
  "dc-900": "bg-dc-900",
  "dc-50": "bg-dc-50",
  "white": "bg-white",
};

// Base dimensions for the presentation (16:9 aspect ratio)
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

export default function InvestorPresentation({
  presentationTitle,
  presentationSubtitle,
  logo: _logo,
  slides = [],
}: Props) {
  // Read initial slide from URL query param (1-based in URL, 0-based internally)
  const getInitialSlide = () => {
    if (typeof globalThis.location === "undefined") return 0;
    const params = new URLSearchParams(globalThis.location.search);
    const slideParam = params.get("slide");
    if (slideParam) {
      const slideNum = parseInt(slideParam, 10);
      // URL is 1-based, internal state is 0-based
      if (!isNaN(slideNum) && slideNum >= 1) {
        return slideNum - 1;
      }
    }
    return 0;
  };

  const [currentSlide, setCurrentSlide] = useState(getInitialSlide);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gsapRef = useRef<any>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Calculate total slides (cover + 4 retrospective slides + content slides)
  const totalSlides = slides.length + 1 + RETROSPECTIVE_SLIDE_COUNT;

  // Validate and clamp initial slide to valid range
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(totalSlides - 1);
    }
  }, [totalSlides]);

  // Update URL when slide changes (1-based in URL, 0-based internally)
  useEffect(() => {
    if (typeof globalThis.history === "undefined") return;
    const url = new URL(globalThis.location.href);
    // URL is 1-based, internal state is 0-based
    url.searchParams.set("slide", String(currentSlide + 1));
    globalThis.history.replaceState({}, "", url.toString());
  }, [currentSlide]);

  // Calculate scale factor based on viewport
  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = globalThis.innerWidth;
      const viewportHeight = globalThis.innerHeight;

      // Calculate the maximum size that fits in viewport while maintaining 16:9
      const viewportAspect = viewportWidth / viewportHeight;
      const targetAspect = 16 / 9;

      let displayWidth: number;
      let displayHeight: number;

      if (viewportAspect > targetAspect) {
        // Viewport is wider than 16:9, constrain by height
        displayHeight = viewportHeight;
        displayWidth = displayHeight * targetAspect;
      } else {
        // Viewport is taller than 16:9, constrain by width
        displayWidth = viewportWidth;
        displayHeight = displayWidth / targetAspect;
      }

      // Calculate scale based on how much we need to scale from base to display size
      const newScale = displayWidth / BASE_WIDTH;
      setScale(newScale);
    };

    calculateScale();
    globalThis.addEventListener("resize", calculateScale);
    return () => globalThis.removeEventListener("resize", calculateScale);
  }, []);

  // Detect mobile and orientation
  useEffect(() => {
    const checkOrientation = () => {
      const isMobileDevice = globalThis.innerWidth <= 1024 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      setIsMobile(isMobileDevice);

      if (isMobileDevice) {
        setIsPortrait(globalThis.innerHeight > globalThis.innerWidth);
      } else {
        setIsPortrait(false);
      }
    };

    checkOrientation();
    globalThis.addEventListener("resize", checkOrientation);
    globalThis.addEventListener("orientationchange", checkOrientation);

    return () => {
      globalThis.removeEventListener("resize", checkOrientation);
      globalThis.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  useEffect(() => {
    const loadGSAP = async () => {
      // @ts-ignore - Dynamic import for GSAP
      const gsap = (await import("gsap")).default;
      gsapRef.current = gsap;

      // Initial animation for the current slide (from URL or default)
      animateSlideIn(currentSlide, gsap);
    };

    loadGSAP();
  }, []);

  // Load Unicorn Studio script for cover slide animation
  const [unicornScriptLoaded, setUnicornScriptLoaded] = useState(false);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // deno-lint-ignore no-explicit-any
    const win = window as any;
    
    // Check if script is already loaded
    if (win.UnicornStudio?.init) {
      setUnicornScriptLoaded(true);
      return;
    }
    
    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="unicornStudio"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => setUnicornScriptLoaded(true));
      return;
    }
    
    // Load the script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js";
    script.onload = () => setUnicornScriptLoaded(true);
    (document.head || document.body).appendChild(script);
  }, []);

  // Initialize Unicorn Studio after script loads AND component renders
  useEffect(() => {
    if (!unicornScriptLoaded || typeof window === "undefined") return;
    
    // deno-lint-ignore no-explicit-any
    const win = window as any;
    
    const initUnicorn = () => {
      // Use requestAnimationFrame to ensure we're in a render cycle
      requestAnimationFrame(() => {
        if (win.UnicornStudio?.init) {
          win.UnicornStudio.init().catch((err: Error) => {
            console.error("Unicorn Studio init error:", err);
          });
        }
      });
    };
    
    // Initial initialization - wait for DOM to be fully ready
    const timeoutId = setTimeout(initUnicorn, 100);
    
    // Re-initialize when tab becomes visible (browser throttles inactive tabs)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Small delay after visibility change to let browser "wake up"
        setTimeout(initUnicorn, 50);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Also re-init on window focus (backup for visibility)
    const handleFocus = () => initUnicorn();
    window.addEventListener("focus", handleFocus);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [unicornScriptLoaded]);

  // ASCII Dithering animation for intro slide
  useEffect(() => {
    const canvas = document.getElementById("intro-dither-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationRef: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      // Account for scale factor
      canvas.width = rect.width / scale;
      canvas.height = rect.height / scale;
    };

    resizeCanvas();
    globalThis.addEventListener("resize", resizeCanvas);

    // Bayer matrix 8x8 for dithering
    const bayerMatrix8x8 = [
      [0, 32, 8, 40, 2, 34, 10, 42],
      [48, 16, 56, 24, 50, 18, 58, 26],
      [12, 44, 4, 36, 14, 46, 6, 38],
      [60, 28, 52, 20, 62, 30, 54, 22],
      [3, 35, 11, 43, 1, 33, 9, 41],
      [51, 19, 59, 27, 49, 17, 57, 25],
      [15, 47, 7, 39, 13, 45, 5, 37],
      [63, 31, 55, 23, 61, 29, 53, 21],
    ];

    let time = 0;
    const cellSize = 4;

    const animate = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        animationRef = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y += cellSize) {
        for (let x = 0; x < canvas.width; x += cellSize) {
          const nx = x / canvas.width;
          const ny = y / canvas.height;

          // Wave patterns
          const waveBase = Math.sin(nx * 4 + time * 0.0004) * 0.15;
          const waveSecond = Math.cos(nx * 7 + time * 0.0003) * 0.1;
          const waveThird = Math.sin((nx + ny) * 3 + time * 0.0002) * 0.08;

          // Gradient - more visible in center/bottom
          const verticalGradient = Math.pow(ny, 0.6);
          const horizontalGradient = 1 - Math.abs(nx - 0.5) * 0.5;

          let intensity = 0.92 - (verticalGradient * 0.4 * horizontalGradient) + waveBase + waveSecond + waveThird;

          const noise = (Math.random() - 0.5) * 0.04 * verticalGradient;
          intensity += noise;

          intensity = Math.max(0, Math.min(1, intensity));

          const matrixX = Math.floor(x / cellSize) % 8;
          const matrixY = Math.floor(y / cellSize) % 8;
          const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

          const ditherResult = intensity > threshold;
          
          // primary-light: #d0ec1a, particle color: #8CAA25
          const r = ditherResult ? 0xd0 : 0x8c;
          const g = ditherResult ? 0xec : 0xaa;
          const b = ditherResult ? 0x1a : 0x25;

          for (let dy = 0; dy < cellSize && y + dy < canvas.height; dy++) {
            for (let dx = 0; dx < cellSize && x + dx < canvas.width; dx++) {
              const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
              data[pixelIndex] = r;
              data[pixelIndex + 1] = g;
              data[pixelIndex + 2] = b;
              data[pixelIndex + 3] = 255;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      time += 16;
      animationRef = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      globalThis.removeEventListener("resize", resizeCanvas);
      if (animationRef) {
        cancelAnimationFrame(animationRef);
      }
    };
  }, [scale]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPrevSlide();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isAnimating]);

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = touchEnd.y - touchStartRef.current.y;

    // Only trigger if horizontal swipe is dominant and significant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }

    touchStartRef.current = null;
  };

  const animateSlideIn = (slideIndex: number, gsap: any) => {
    const slideElement = slideRefs.current[slideIndex];
    if (!slideElement || !gsap) return;

    // Animate all child elements with stagger
    const elements = slideElement.querySelectorAll(".animate-item");
    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
    );
  };

  const animateSlideOut = (slideIndex: number, gsap: any): Promise<void> => {
    return new Promise((resolve) => {
      const slideElement = slideRefs.current[slideIndex];
      if (!slideElement || !gsap) {
        resolve();
        return;
      }

      const elements = slideElement.querySelectorAll(".animate-item");
      gsap.to(elements, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: resolve,
      });
    });
  };

  const goToNextSlide = async () => {
    if (isAnimating || currentSlide >= totalSlides - 1) return;

    setIsAnimating(true);
    const gsap = gsapRef.current;

    await animateSlideOut(currentSlide, gsap);
    setCurrentSlide((prev) => prev + 1);

    setTimeout(() => {
      animateSlideIn(currentSlide + 1, gsap);
      setIsAnimating(false);
    }, 100);
  };

  const goToPrevSlide = async () => {
    if (isAnimating || currentSlide <= 0) return;

    setIsAnimating(true);
    const gsap = gsapRef.current;

    await animateSlideOut(currentSlide, gsap);
    setCurrentSlide((prev) => prev - 1);

    setTimeout(() => {
      animateSlideIn(currentSlide - 1, gsap);
      setIsAnimating(false);
    }, 100);
  };

  const goToSlide = async (index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    const gsap = gsapRef.current;

    await animateSlideOut(currentSlide, gsap);
    setCurrentSlide(index);

    setTimeout(() => {
      animateSlideIn(index, gsap);
      setIsAnimating(false);
    }, 100);
  };

  // Build table of contents from title slides
  // Exclude intro/outro slides, include retrospective intro
  const contentSlideTitles = slides
    .map((s, idx) => ({
      slide: s,
      slideIndex: idx + 1 + RETROSPECTIVE_SLIDE_COUNT, // account for cover + retrospective slides
      originalIndex: idx,
    }))
    .filter((item) => 
      item.slide.layout === "title" && 
      !item.slide.title.includes("successfully transitioned") &&
      item.slide.title !== "Thank You"
    );

  // Add retrospective intro at the beginning
  const tocItems = [
    { slideIndex: 1, label: "2025 in Review", tocNumber: "01" },
    ...contentSlideTitles.map((item, tocIdx) => ({
      ...item,
      tocNumber: String(tocIdx + 2).padStart(2, "0"),
      label: item.slide.title,
    })),
  ];

  // Render individual slide content based on layout
  // Minimalist design: uniform weight, color-only hierarchy, generous spacing
  const renderSlideContent = (slide: Slide, _index: number, isActive: boolean) => {
    const bgClass = bgColorMap[slide.backgroundColor || "dc-950"];
    const textColorClass = slide.textColor === "light"
      ? "text-dc-50"
      : "text-dc-900";

    // Find current slide in TOC (for potential future use)
    const _currentTocIndex = tocItems.findIndex(
      (item) => item.slideIndex === _index + 1 + RETROSPECTIVE_SLIDE_COUNT
    );

    // Determine if this is a green (primary-light) background
    const isGreenBg = slide.backgroundColor === "primary-light";
    const activeColor = isGreenBg ? "#8CAA25" : undefined;
    const inactiveColor = isGreenBg ? "rgba(0,0,0,0.4)" : undefined;

    // Check if this is an intro/outro slide (centered, no TOC)
    const isIntroSlide = slide.title.includes("successfully transitioned") || slide.title === "Thank You";
    const isMainIntroSlide = slide.title.includes("successfully transitioned");

    switch (slide.layout) {
      case "title":
        // Intro/outro slides: centered, no TOC, no tag
        if (isIntroSlide) {
          return (
            <div
              class={`w-full h-full flex flex-col items-center justify-center ${bgClass} ${textColorClass} relative overflow-hidden`}
              style={{ padding: "96px" }}
            >
              {/* ASCII Dithering Animation Background */}
              {isMainIntroSlide && (
                <canvas
                  id="intro-dither-canvas"
                  class="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ imageRendering: "pixelated", opacity: 0.2 }}
                />
              )}
              
              {/* RETROSPECTIVE eyebrow for main intro slide */}
              {isMainIntroSlide && (
                <span
                  class="animate-item font-mono uppercase tracking-[0.2em] block relative z-10"
                  style={{ 
                    fontSize: "11px", 
                    marginBottom: "24px",
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  RETROSPECTIVE
                </span>
              )}
              
              <h1
                class="animate-item leading-none text-center relative z-10"
                style={{ fontSize: "140px", letterSpacing: "-3px", maxWidth: "1400px", lineHeight: "1" }}
              >
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p
                  class="animate-item text-center relative z-10"
                  style={{
                    fontSize: "24px",
                    marginTop: "32px",
                    opacity: 0.5,
                  }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          );
        }

        // Regular section slides: TOC + bottom-aligned title
        return (
          <div
            class={`w-full h-full flex flex-col ${bgClass} ${textColorClass}`}
            style={{ padding: "64px 80px" }}
          >
            {/* Table of Contents - top left */}
            <div class="animate-item" style={{ marginBottom: "auto" }}>
              <div class="flex flex-col" style={{ gap: "2px" }}>
                {tocItems.map((item) => {
                  const isCurrentSection = item.slideIndex === _index + 1 + RETROSPECTIVE_SLIDE_COUNT;
                  return (
                    <button
                      key={item.slideIndex}
                      type="button"
                      onClick={() => goToSlide(item.slideIndex)}
                      class={`flex items-center text-left transition-colors duration-200 cursor-pointer hover:opacity-80`}
                      style={{ gap: "24px" }}
                    >
                      <span
                        style={{ 
                          fontSize: "15px", 
                          width: "24px",
                          color: isCurrentSection 
                            ? (activeColor || (slide.textColor === "dark" ? "#1f1e1c" : "#faf9f7"))
                            : (inactiveColor || "#52504c"),
                        }}
                      >
                        {item.tocNumber}
                      </span>
                      <span
                        style={{ 
                          fontSize: "15px",
                          color: isCurrentSection 
                            ? (activeColor || (slide.textColor === "dark" ? "#1f1e1c" : "#faf9f7"))
                            : (inactiveColor || "#52504c"),
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title content - bottom left */}
            <div class="flex flex-col" style={{ marginTop: "auto" }}>
              {slide.tag && (
                <span
                  class="animate-item font-mono uppercase tracking-[0.2em] block"
                  style={{ 
                    fontSize: "11px", 
                    marginBottom: "16px",
                    color: inactiveColor || "#6d6a66",
                  }}
                >
                  {slide.tag}
                </span>
              )}
              <h1
                class="animate-item leading-none"
                style={{ fontSize: "180px", letterSpacing: "-4px" }}
              >
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p
                  class="animate-item"
                  style={{
                    fontSize: "18px",
                    marginTop: "20px",
                    opacity: 0.5,
                  }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        );

      case "content":
        return (
          <div
            class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
            style={{ padding: "80px 96px" }}
          >
            {/* Header */}
            <div style={{ marginBottom: "72px" }}>
              {slide.tag && (
                <span
                  class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
                  style={{ fontSize: "12px", marginBottom: "16px" }}
                >
                  {slide.tag}
                </span>
              )}
              <h2
                class="animate-item text-dc-200 leading-tight"
                style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
              >
                {slide.title}
              </h2>
            </div>
            {slide.items && (
              <div class="flex-1 flex flex-col" style={{ gap: "48px" }}>
                {slide.items.map((item, i) => (
                  <div key={i} class="animate-item">
                    {item.title && (
                      <h3
                        class="text-dc-300"
                        style={{ fontSize: "18px", marginBottom: "20px" }}
                      >
                        {item.title}
                      </h3>
                    )}
                    {item.bullets && (
                      <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {item.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            class="flex items-start"
                            style={{ fontSize: "17px", gap: "16px", lineHeight: "1.5" }}
                          >
                            <span
                              class="text-primary-light"
                              style={{ marginTop: "6px", fontSize: "8px" }}
                            >
                              ●
                            </span>
                            <span class={bullet.highlight ? "text-primary-light" : "text-dc-300"}>
                              {bullet.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "two-column":
        return (
          <div
            class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
            style={{ padding: "80px 96px" }}
          >
            {/* Header */}
            <div style={{ marginBottom: "72px" }}>
              {slide.tag && (
                <span
                  class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
                  style={{ fontSize: "12px", marginBottom: "16px" }}
                >
                  {slide.tag}
                </span>
              )}
              <h2
                class="animate-item text-dc-200 leading-tight"
                style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
              >
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p
                  class="animate-item text-dc-400"
                  style={{ fontSize: "17px", marginTop: "16px" }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
            {slide.items && (
              <div
                class="flex-1 grid"
                style={{
                  gridTemplateColumns: "1fr 1fr",
                  gap: "80px",
                }}
              >
                {slide.items.map((item, i) => (
                  <div key={i} class="animate-item">
                    {item.title && (
                      <h3
                        class="text-primary-light"
                        style={{ fontSize: "18px", marginBottom: "24px" }}
                      >
                        {item.title}
                      </h3>
                    )}
                    {item.bullets && (
                      <ul style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        {item.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            class={bullet.highlight ? "text-primary-light" : "text-dc-400"}
                            style={{ fontSize: "15px", lineHeight: "1.5" }}
                          >
                            {bullet.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "stats":
        return (
          <div
            class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
            style={{ padding: "80px 96px" }}
          >
            {/* Header */}
            <div style={{ marginBottom: "80px" }}>
              {slide.tag && (
                <span
                  class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
                  style={{ fontSize: "12px", marginBottom: "16px" }}
                >
                  {slide.tag}
                </span>
              )}
              <h2
                class="animate-item text-dc-200 leading-tight"
                style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
              >
                {slide.title}
              </h2>
            </div>
            {slide.items && (
              <div
                class="flex-1 grid items-center"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(slide.items.length, 4)}, 1fr)`,
                  gap: "64px",
                }}
              >
                {slide.items.map((item, i) => (
                  <div key={i} class="animate-item text-center">
                    {item.value && (
                      <span
                        class="block text-primary-light"
                        style={{ fontSize: "56px", marginBottom: "16px", letterSpacing: "-1px" }}
                      >
                        {item.value}
                      </span>
                    )}
                    {item.label && (
                      <span class="text-dc-400" style={{ fontSize: "16px" }}>
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "timeline":
        return (
          <TimelineSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "revenue-resilience":
        return (
          <RevenueResilienceSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
            isActive={isActive}
          />
        );

      case "product-platform":
        return (
          <ProductPlatformSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "organizational-maturity":
        return (
          <OrganizationalMaturitySlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "operational-wins":
        return (
          <OperationalWinsSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "learnings-execution":
        return (
          <ExecutionLearningsSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "learnings-product":
        return (
          <ProductLearningsSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "learnings-strategy":
        return (
          <StrategyLearningsSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "what-never-changes":
        return (
          <WhatNeverChangesSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "our-approach":
        return (
          <OurApproachSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "priorities-2026":
        return (
          <Priorities2026Slide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "our-asks":
        return (
          <OurAsksSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "q1-validation":
        return (
          <Q1ValidationSlide
            slide={slide}
            bgClass={bgClass}
            textColorClass={textColorClass}
          />
        );

      case "list":
        return (
          <div
            class="w-full h-full flex flex-col bg-dc-950 text-dc-50"
            style={{ padding: "80px 96px" }}
          >
            {/* Header */}
            <div style={{ marginBottom: "72px" }}>
              {slide.tag && (
                <span
                  class="animate-item font-mono uppercase tracking-[0.2em] text-dc-500 block"
                  style={{ fontSize: "12px", marginBottom: "16px" }}
                >
                  {slide.tag}
                </span>
              )}
              <h2
                class="animate-item text-dc-200 leading-tight"
                style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
              >
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p
                  class="animate-item text-dc-400"
                  style={{
                    fontSize: "17px",
                    marginTop: "16px",
                    maxWidth: "800px",
                  }}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
            {slide.items && (
              <div
                class="flex-1 grid"
                style={{
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: "80px",
                  rowGap: "40px",
                }}
              >
                {slide.items.map((item, i) => (
                  <div
                    key={i}
                    class="animate-item flex items-start"
                    style={{ gap: "20px" }}
                  >
                    <div
                      class="rounded-full bg-primary-light flex-shrink-0"
                      style={{ width: "6px", height: "6px", marginTop: "8px" }}
                    />
                    <div>
                      {item.title && (
                        <span
                          class="text-dc-100 block"
                          style={{ fontSize: "17px", lineHeight: "1.5" }}
                        >
                          {item.title}
                        </span>
                      )}
                      {item.subtitle && (
                        <span
                          class="text-dc-500 block"
                          style={{ fontSize: "15px", marginTop: "6px" }}
                        >
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div
            class={`w-full h-full flex items-center justify-center ${bgClass} ${textColorClass}`}
          >
            <h2 class="animate-item font-medium" style={{ fontSize: "72px" }}>
              {slide.title}
            </h2>
          </div>
        );
    }
  };

  // Portrait mode overlay for mobile
  if (isMobile && isPortrait) {
    return (
      <div
        class="fixed inset-0 w-screen h-screen bg-dc-950 flex flex-col items-center justify-center z-50"
        style={{ padding: "32px" }}
      >
        <div class="animate-bounce" style={{ marginBottom: "32px" }}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            class="text-primary-light"
          >
            <path
              d="M16.5 2.25H7.5C6.25736 2.25 5.25 3.25736 5.25 4.5V19.5C5.25 20.7426 6.25736 21.75 7.5 21.75H16.5C17.7426 21.75 18.75 20.7426 18.75 19.5V4.5C18.75 3.25736 17.7426 2.25 16.5 2.25Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 18.75H12.0075"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="relative" style={{ marginBottom: "24px" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            class="text-primary-light animate-spin"
            style={{ animationDuration: "2s" }}
          >
            <path
              d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M20 12L17 9M20 12L23 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2
          class="text-white font-medium text-center"
          style={{ fontSize: "24px", marginBottom: "16px" }}
        >
          Rotate your device
        </h2>
        <p
          class="text-dc-400 text-center"
          style={{ fontSize: "16px", maxWidth: "280px" }}
        >
          This presentation is optimized for landscape mode. Please rotate your
          device to continue.
        </p>
      </div>
    );
  }

  // Calculate the actual display dimensions
  const displayWidth = BASE_WIDTH * scale;
  const displayHeight = BASE_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      class="fixed inset-0 w-screen h-screen bg-dc-950 overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Centered container for the scaled presentation */}
      <div class="absolute inset-0 flex items-center justify-center">
        {/* Wrapper with actual display dimensions for proper centering */}
        <div
          style={{
            width: `${displayWidth}px`,
            height: `${displayHeight}px`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Scaled presentation container */}
          <div
            style={{
              width: `${BASE_WIDTH}px`,
              height: `${BASE_HEIGHT}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
          {/* Cover/Title Slide (Slide 0) - Figma design */}
          <div
            ref={(el) => {
              slideRefs.current[0] = el;
            }}
            class={`absolute inset-0 transition-opacity duration-300 ${
              currentSlide === 0
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              class="w-full h-full flex flex-col justify-between bg-dc-950 text-dc-50 relative overflow-hidden"
              style={{ padding: "90px 82px" }}
            >
              {/* Unicorn Studio Animation - Bottom right, flipped horizontally */}
              <div
                data-us-project="3u9H2SGWSifD8DQZHG4X"
                data-us-production="true"
                style={{
                  width: "1440px",
                  height: "900px",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "scaleX(-1)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              {/* Logo - Top left */}
              <div class="relative z-10">
                <img
                  src="https://assets.decocache.com/decocms/4869c863-d677-4e5b-b3fd-4b3913a56034/deco-logo.png"
                  alt="deco logo"
                  class="animate-item"
                  style={{
                    width: "241px",
                    height: "auto",
                  }}
                />
              </div>

              {/* Title content - Bottom left */}
              <div class="flex flex-col relative z-10" style={{ gap: "22px", maxWidth: "1175px" }}>
                {presentationSubtitle && (
                  <p
                    class="animate-item font-mono uppercase text-dc-400"
                    style={{
                      fontSize: "24px",
                      letterSpacing: "1.2px",
                    }}
                  >
                    {presentationSubtitle}
                  </p>
                )}
                <h1
                  class="animate-item text-dc-50 leading-none"
                  style={{ fontSize: "140px", letterSpacing: "-2.8px" }}
                >
                  {presentationTitle}
                </h1>
              </div>
            </div>
          </div>

          {/* Retrospective Slide 1: Intro (Slide 1) */}
          <div
            ref={(el) => {
              slideRefs.current[1] = el;
            }}
            class={`absolute inset-0 transition-opacity duration-300 ${
              currentSlide === 1
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <RetrospectiveIntroSlide 
              isActive={currentSlide === 1} 
              tocItems={tocItems}
              goToSlide={goToSlide}
            />
          </div>

          {/* Retrospective Slide 2: Stats (Slide 2) */}
          <div
            ref={(el) => {
              slideRefs.current[2] = el;
            }}
            class={`absolute inset-0 transition-opacity duration-300 ${
              currentSlide === 2
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <RetrospectiveStatsSlide isActive={currentSlide === 2} />
          </div>

          {/* Retrospective Slide 3: Top Sites (Slide 3) */}
          <div
            ref={(el) => {
              slideRefs.current[3] = el;
            }}
            class={`absolute inset-0 transition-opacity duration-300 ${
              currentSlide === 3
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <RetrospectiveTopSitesSlide isActive={currentSlide === 3} />
          </div>

          {/* Retrospective Slide 4: Top Contributors (Slide 4) */}
          <div
            ref={(el) => {
              slideRefs.current[4] = el;
            }}
            class={`absolute inset-0 transition-opacity duration-300 ${
              currentSlide === 4
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <RetrospectiveContributorsSlide isActive={currentSlide === 4} />
          </div>

          {/* Content Slides (Slide 5+) */}
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={(el) => {
                slideRefs.current[index + 1 + RETROSPECTIVE_SLIDE_COUNT] = el;
              }}
              class={`absolute inset-0 transition-opacity duration-300 ${
                currentSlide === index + 1 + RETROSPECTIVE_SLIDE_COUNT
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {renderSlideContent(slide, index, currentSlide === index + 1 + RETROSPECTIVE_SLIDE_COUNT)}
            </div>
          ))}

          {/* Navigation Controls - minimalist */}
          <div
            class="absolute flex items-center z-50"
            style={{ bottom: "40px", right: "48px", gap: "12px" }}
          >
            {/* Slide indicator */}
            <span
              class="text-dc-600 font-mono"
              style={{ fontSize: "12px", marginRight: "12px" }}
            >
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(totalSlides).padStart(2, "0")}
            </span>

            {/* First button */}
            <button
              type="button"
              onClick={() => goToSlide(0)}
              disabled={currentSlide === 0 || isAnimating}
              class={`rounded-full flex items-center justify-center transition-all border ${
                currentSlide === 0
                  ? "border-dc-800 text-dc-700 cursor-not-allowed"
                  : "border-dc-700 hover:border-dc-600 text-dc-400 hover:text-dc-300 cursor-pointer"
              }`}
              style={{ width: "36px", height: "36px" }}
            >
              <Icon name="first_page" size="small" />
            </button>

            {/* Previous button */}
            <button
              type="button"
              onClick={goToPrevSlide}
              disabled={currentSlide === 0 || isAnimating}
              class={`rounded-full flex items-center justify-center transition-all border ${
                currentSlide === 0
                  ? "border-dc-800 text-dc-700 cursor-not-allowed"
                  : "border-dc-700 hover:border-dc-600 text-dc-400 hover:text-dc-300 cursor-pointer"
              }`}
              style={{ width: "36px", height: "36px" }}
            >
              <Icon name="arrow_back" size="small" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={goToNextSlide}
              disabled={currentSlide === totalSlides - 1 || isAnimating}
              class={`rounded-full flex items-center justify-center transition-all ${
                currentSlide === totalSlides - 1
                  ? "border border-dc-800 text-dc-700 cursor-not-allowed"
                  : "bg-primary-light/10 border border-primary-light/30 hover:bg-primary-light/20 text-primary-light cursor-pointer"
              }`}
              style={{ width: "36px", height: "36px" }}
            >
              <Icon name="arrow_forward" size="small" />
            </button>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}
