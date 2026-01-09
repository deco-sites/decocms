import { useEffect, useRef, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../components/ui/Icon.tsx";

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
        <p
          class="animate-item"
          style={{
            fontSize: "18px",
            marginTop: "20px",
            opacity: 0.5,
          }}
        >
          All Sites
        </p>
      </div>

      {/* Page number - bottom right */}
      <div
        class="absolute font-mono"
        style={{ 
          bottom: "64px", 
          right: "80px", 
          fontSize: "13px",
          color: "#52504c",
        }}
      >
        02
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
          class="animate-item text-dc-200 leading-tight"
          style={{ fontSize: "32px", letterSpacing: "-0.5px" }}
        >
          <span class="text-primary-light">2025</span> in Numbers
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

// Interactive line chart component with hover tooltips
function InteractiveLineChart({
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

// Interactive bar chart component with hover tooltips
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

  const padding = { top: 60, right: 20, bottom: 50, left: 20 };
  const chartWidth = 500;
  const chartHeight = height;

  const maxValue = Math.max(...data.map((d) => d.value)) * 1.1;
  const barWidth = (chartWidth - padding.left - padding.right) / data.length - 8;

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
    <svg
      width="100%"
      height={chartHeight}
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      preserveAspectRatio="xMidYMid meet"
      class="absolute bottom-0 left-0 right-0"
      style={{ overflow: "visible" }}
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
  );
}

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
  // Sample data for the revenue line chart
  const revenueData = [
    { month: "Jul 2025", value: 100, label: "$100K" },
    { month: "Aug 2025", value: 120, label: "$120K" },
    { month: "Sep 2025", value: 115, label: "$115K" },
    { month: "Oct 2025", value: 140, label: "$140K" },
    { month: "Nov 2025", value: 280, label: "$280K" },
    { month: "Dec 2025", value: 320, label: "$320K" },
  ];

  // Sample data for traffic bar chart
  const trafficData = [
    { label: "Mon", value: 2, peak: false },
    { label: "Tue", value: 3, peak: false },
    { label: "Wed", value: 2.5, peak: false },
    { label: "Thu", value: 4, peak: false },
    { label: "Fri BF", value: 10.5, peak: true },
    { label: "Sat", value: 8, peak: false },
    { label: "Sun", value: 5, peak: false },
  ];

  // Sample data for customer impact
  const customerData = [
    { month: "2024", value: 100, label: "Baseline" },
    { month: "Jan 2025", value: 110, label: "+10%" },
    { month: "Apr 2025", value: 140, label: "+40%" },
    { month: "Jul 2025", value: 180, label: "+80%" },
    { month: "Oct 2025", value: 250, label: "+150%" },
    { month: "BF 2025", value: 400, label: "2-5× YoY" },
  ];

  // Card configurations
  const cards = [
    {
      tag: "REVENUE",
      title: "Record revenue",
      subtitle: "Black Friday and December",
      metric: "~3×",
      metricLabel: "YoY",
      chart: <InteractiveLineChart data={revenueData} height={280} id="revenue" />,
    },
    {
      tag: "RESILIENCE",
      title: "Traffic resilience",
      subtitle: "Handled peak load successfully",
      metric: ">10×",
      metricLabel: null,
      chart: <InteractiveBarChart data={trafficData} height={300} id="traffic" />,
    },
    {
      tag: "IMPACT",
      title: "Customer impact",
      subtitle: "Most customers grew sales on BF",
      metric: "2–5×",
      metricLabel: "YoY",
      chart: <InteractiveLineChart data={customerData} height={280} id="customer" />,
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

      {/* Three cards container - generous spacing */}
      <div
        class="flex-1 grid animate-item"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "32px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            class="relative rounded-xl border border-dc-800 overflow-hidden flex flex-col"
            style={{ padding: "32px 28px" }}
          >
            {/* Tag + Title */}
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                <span class="text-primary-light">[{card.tag}]</span>
                <span class="text-dc-100" style={{ marginLeft: "8px" }}>{card.title}</span>
              </p>
            </div>
            
            {/* Subtitle */}
            <p
              class="text-dc-400"
              style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}
            >
              {card.subtitle}
            </p>

            {/* Metric - cleaner, not oversized */}
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

            {/* Chart - positioned at bottom */}
            <div
              class="absolute bottom-0 left-0 right-0"
              style={{ height: "280px", opacity: 0.7 }}
            >
              {card.chart}
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
  // Card data for Product & Platform Results
  const cards = [
    {
      tag: "PARTNERS",
      title: "Design Partner Cases",
      description: "Superfrete, Gupy, Libertas, Livemode. Antifraud agent cut fraud detection from 7.5 days to minutes.",
    },
    {
      tag: "PLATFORM",
      title: "MCP Mesh Launch",
      description: "Open-source, self-hostable foundation. Early adoption from the developer community.",
    },
    {
      tag: "ENTERPRISE",
      title: "Enterprise Adoption",
      description: "First large-scale enterprise: Cogna. Inbound interest from 5+ others.",
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

      {/* Three cards container - generous spacing */}
      <div
        class="flex-1 grid animate-item"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "32px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            class="rounded-xl border border-dc-800 flex flex-col"
            style={{ padding: "32px 28px" }}
          >
            {/* Tag + Title */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                <span class="text-primary-light">[{card.tag}]</span>
                <span class="text-dc-100" style={{ marginLeft: "8px" }}>{card.title}</span>
              </p>
            </div>
            
            {/* Description */}
            <p
              class="text-dc-400"
              style={{ fontSize: "15px", lineHeight: "1.6" }}
            >
              {card.description}
            </p>

            {/* Spacer for visual balance */}
            <div class="flex-1" style={{ minHeight: "120px" }} />
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
      tag: "PRACTICE",
      title: "AI-first",
      description: "Agents used daily. Engineers build in Cursor. Business teams vibecode. Everything is MCP-first.",
    },
    {
      tag: "PRODUCTION",
      title: "Real AI team",
      description: "Hands-on with real systems, failures, and constraints. We operate with actual production workloads.",
    },
    {
      tag: "EXTERNAL",
      title: "Recognized expertise",
      description: "Leaders come to us for advice on scaling AI in their organizations.",
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

      {/* Three cards container - generous spacing */}
      <div
        class="flex-1 grid animate-item"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "32px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            class="rounded-xl border border-dc-800 flex flex-col"
            style={{ padding: "32px 28px" }}
          >
            {/* Tag + Title */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                <span class="text-primary-light">[{card.tag}]</span>
                <span class="text-dc-100" style={{ marginLeft: "8px" }}>{card.title}</span>
              </p>
            </div>
            
            {/* Description */}
            <p
              class="text-dc-400"
              style={{ fontSize: "15px", lineHeight: "1.6" }}
            >
              {card.description}
            </p>

            {/* Spacer for visual balance */}
            <div class="flex-1" style={{ minHeight: "120px" }} />
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
  layout: "title" | "content" | "two-column" | "stats" | "timeline" | "list" | "revenue-resilience" | "product-platform" | "organizational-maturity";

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
  logo,
  slides = [],
}: Props) {
  // Read initial slide from URL query param
  const getInitialSlide = () => {
    if (typeof globalThis.location === "undefined") return 0;
    const params = new URLSearchParams(globalThis.location.search);
    const slideParam = params.get("slide");
    if (slideParam) {
      const slideNum = parseInt(slideParam, 10);
      if (!isNaN(slideNum) && slideNum >= 0) {
        return slideNum;
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

  // Update URL when slide changes
  useEffect(() => {
    if (typeof globalThis.history === "undefined") return;
    const url = new URL(globalThis.location.href);
    url.searchParams.set("slide", String(currentSlide));
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

  // Load Unicorn Studio script for cover animation
  useEffect(() => {
    // @ts-ignore: UnicornStudio is a third-party global from external script
    if (!globalThis.UnicornStudio) {
      // @ts-ignore: UnicornStudio is a third-party global from external script
      globalThis.UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js";
      script.onload = () => {
        // @ts-ignore: UnicornStudio is a third-party global from external script
        if (!globalThis.UnicornStudio.isInitialized) {
          // @ts-ignore: UnicornStudio is a third-party global from external script
          UnicornStudio.init();
          // @ts-ignore: UnicornStudio is a third-party global from external script
          globalThis.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    } else {
      // @ts-ignore: UnicornStudio is a third-party global from external script
      if (!globalThis.UnicornStudio.isInitialized) {
        // @ts-ignore: UnicornStudio is a third-party global from external script
        UnicornStudio.init();
        // @ts-ignore: UnicornStudio is a third-party global from external script
        globalThis.UnicornStudio.isInitialized = true;
      }
    }
  }, []);

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
          {/* Cover/Title Slide (Slide 0) - minimalist with animation */}
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
              class="w-full h-full flex bg-dc-950 text-dc-50"
            >
              {/* Left side - Text content */}
              <div
                class="flex flex-col justify-center"
                style={{ width: "50%", padding: "96px" }}
              >
                {logo && (
                  <img
                    src={logo}
                    alt="Logo"
                    class="animate-item"
                    style={{
                      width: "48px",
                      height: "48px",
                      marginBottom: "48px",
                      opacity: 0.8,
                    }}
                  />
                )}
                <h1
                  class="animate-item text-dc-200 leading-tight"
                  style={{ fontSize: "48px", letterSpacing: "-0.5px" }}
                >
                  {presentationTitle}
                </h1>
                {presentationSubtitle && (
                  <p
                    class="animate-item text-dc-500"
                    style={{
                      fontSize: "18px",
                      marginTop: "24px",
                    }}
                  >
                    {presentationSubtitle}
                  </p>
                )}
                <div
                  class="animate-item flex items-center text-dc-600"
                  style={{ marginTop: "64px", gap: "12px" }}
                >
                  <span style={{ fontSize: "14px" }}>
                    {isMobile
                      ? "Swipe or tap arrows to navigate"
                      : "Press arrow keys to navigate"}
                  </span>
                  <Icon name="arrow_forward" size="small" class="text-dc-600" />
                </div>
              </div>

              {/* Right side - Unicorn Studio Animation */}
              <div
                class="relative overflow-hidden flex items-end"
                style={{ width: "50%", transform: "scaleX(-1)" }}
              >
                <div
                  data-us-project="3u9H2SGWSifD8DQZHG4X"
                  style={{ width: "100%", height: "900px" }}
                />
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

          {/* Slide dots navigation - more subtle */}
          <div
            class="absolute left-1/2 flex items-center z-50"
            style={{
              bottom: "40px",
              transform: "translateX(-50%)",
              gap: "8px",
            }}
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                class={`rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-primary-light"
                    : "bg-dc-700 hover:bg-dc-600"
                }`}
                style={{
                  width: currentSlide === index ? "16px" : "6px",
                  height: "6px",
                }}
              />
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
