import { useEffect, useRef, useState } from "preact/hooks";

// Icon image URLs
const ICON_IMAGES = {
  aws: "https://assets.decocache.com/decocms/5909babe-04d1-4fcd-ac50-941b61070a75/AWS.png",
  gcp: "https://assets.decocache.com/decocms/8d9a7e38-e284-4d7a-88e2-3a6199e9eb03/GCP.png",
  azure: "https://assets.decocache.com/decocms/8433614b-898d-42f8-b8ea-10414cde1395/Microsoft_Azure-1.png",
  kubernetes: "https://assets.decocache.com/decocms/840cde04-b3f8-4fa2-b441-17fc1fe77473/Kubernets.png",
  onprem: "https://assets.decocache.com/decocms/500c831b-9c8c-4cb0-8cbc-c6ebb48f92fa/on-prem.png",
  cloud: "https://assets.decocache.com/decocms/f850a895-403b-48d1-ae74-2e8ce69a1858/cloud.png",
};

// Deco logo for center
const DECO_LOGO = "https://assets.decocache.com/decocms/69810c11-8a4b-4163-80c7-942ea7f6dcdd/deco-logo.svg";

interface OrbitIcon {
  id: string;
  icon: keyof typeof ICON_IMAGES;
  initialAngle: number;
  orbit: number;
}

// All icons orbit at the same speed to stay interlocked
const ORBIT_DURATION = 60; // seconds for full orbit - same for all

// Icons placement:
// OUTER (orbit 3): AWS, GCP, Kubernetes, Azure - 4 icons evenly spaced (90° apart)
// MIDDLE (orbit 2): Cloud, On-prem - 2 icons (180° apart)
const icons: OrbitIcon[] = [
  // Outermost circle - 4 icons at 0°, 90°, 180°, 270°
  { id: "azure", icon: "azure", initialAngle: 315, orbit: 3 },
  { id: "gcp", icon: "gcp", initialAngle: 45, orbit: 3 },
  { id: "aws", icon: "aws", initialAngle: 135, orbit: 3 },
  { id: "kubernetes", icon: "kubernetes", initialAngle: 225, orbit: 3 },
  // Middle circle - 2 icons at 0°, 180°
  { id: "cloud", icon: "cloud", initialAngle: 0, orbit: 2 },
  { id: "onprem", icon: "onprem", initialAngle: 180, orbit: 2 },
];

// Decorative dots - scattered organically on outer and middle orbits
const orbitDots = [
  // Outer orbit (3) - fewer dots, asymmetric
  { initialAngle: 0, orbit: 3 },
  { initialAngle: 180, orbit: 3 },
  { initialAngle: 270, orbit: 3 },
  // Middle orbit (2) - just a couple
  { initialAngle: 90, orbit: 2 },
  { initialAngle: 250, orbit: 2 },
];

// Figma sizes
const OUTER_CIRCLE_SIZE = 103; // px - outer container with blur
const INNER_CIRCLE_SIZE = 83;  // px - white circle
const IMAGE_SIZE = 48;         // px - actual icon image
const DOT_SIZE = 12;           // px - decorative dots
const CENTER_LOGO_SIZE = 116;  // px - deco logo

// Container and orbit calculations
const CONTAINER_SIZE = 560;
const HALF_CONTAINER = CONTAINER_SIZE / 2; // 280px

// Orbit radii - calculated to CENTER icons ON the circle lines
// Outer ring at inset-0: radius = 280px (100% of half)
// Middle ring at 17.5% inset: radius = 280 * 0.65 = 182px
// Inner ring at 30% inset: radius = 280 * 0.40 = 112px
const getOrbitRadius = (orbit: number) => {
  switch (orbit) {
    case 2:
      return HALF_CONTAINER * 0.65;  // middle ring
    case 3:
      return HALF_CONTAINER * 1.0;   // outermost ring - full radius to center on line
    default:
      return HALF_CONTAINER;
  }
};

// Icon circle component with Figma-accurate sizing
function IconCircle({
  icon,
  isVisible,
  delay,
  index,
}: {
  icon: keyof typeof ICON_IMAGES;
  isVisible: boolean;
  delay: number;
  index: number;
}) {
  return (
    <div
      class={`absolute transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: `${OUTER_CIRCLE_SIZE}px`,
        height: `${OUTER_CIRCLE_SIZE}px`,
        left: `calc(50% - ${OUTER_CIRCLE_SIZE / 2}px)`,
        top: `calc(50% - ${OUTER_CIRCLE_SIZE / 2}px)`,
        transitionDelay: `${delay}ms`,
        animation: isVisible
          ? `orbit-${index} ${ORBIT_DURATION}s linear infinite`
          : "none",
        transformOrigin: "center center",
      }}
    >
      {/* Outer ring with blur effect - Figma style */}
      <div
        class="absolute rounded-full"
        style={{
          inset: "-4px",
          background: "rgba(208, 236, 26, 0.06)",
          border: "2px solid rgba(7, 64, 26, 0.35)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          boxShadow: "0 0 20px rgba(208, 236, 26, 0.15)",
        }}
      />
      {/* Inner white circle - 83px centered in 103px */}
      <div
        class="absolute rounded-full bg-white flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
        style={{
          width: `${INNER_CIRCLE_SIZE}px`,
          height: `${INNER_CIRCLE_SIZE}px`,
          left: `${(OUTER_CIRCLE_SIZE - INNER_CIRCLE_SIZE) / 2}px`,
          top: `${(OUTER_CIRCLE_SIZE - INNER_CIRCLE_SIZE) / 2}px`,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Icon image - 48px centered in 83px */}
        <img
          src={ICON_IMAGES[icon]}
          alt={icon}
          style={{
            width: `${IMAGE_SIZE}px`,
            height: `${IMAGE_SIZE}px`,
          }}
          class="object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function DeployAnywhereOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate orbit keyframes for each icon
  const generateOrbitKeyframes = () => {
    return icons
      .map((item, index) => {
        const radius = getOrbitRadius(item.orbit);
        return `
          @keyframes orbit-${index} {
            from {
              transform: rotate(${item.initialAngle}deg) translateX(${radius}px) rotate(-${item.initialAngle}deg);
            }
            to {
              transform: rotate(${item.initialAngle + 360}deg) translateX(${radius}px) rotate(-${item.initialAngle + 360}deg);
            }
          }
        `;
      })
      .join("\n");
  };

  // Generate orbit keyframes for dots
  const generateDotKeyframes = () => {
    return orbitDots
      .map((dot, index) => {
        const radius = getOrbitRadius(dot.orbit);
        return `
          @keyframes dot-orbit-${index} {
            from {
              transform: rotate(${dot.initialAngle}deg) translateX(${radius}px) rotate(-${dot.initialAngle}deg);
            }
            to {
              transform: rotate(${dot.initialAngle + 360}deg) translateX(${radius}px) rotate(-${dot.initialAngle + 360}deg);
            }
          }
        `;
      })
      .join("\n");
  };

  return (
    <div
      ref={containerRef}
      class="relative w-full h-full min-h-[580px] flex items-center justify-center"
    >
      {/* Container for the orbital system */}
      <div 
        class="relative translate-x-8 lg:translate-x-12"
        style={{ width: `${CONTAINER_SIZE}px`, height: `${CONTAINER_SIZE}px` }}
      >
        {/* Outer orbit ring (solid) - outermost, icons centered ON this line */}
        <div
          class={`absolute inset-0 rounded-full border transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{
            borderColor: "rgba(208, 236, 26, 0.5)",
            transitionDelay: "200ms",
          }}
        />

        {/* Middle orbit ring (dashed) - 17.5% inset */}
        <div
          class={`absolute rounded-full border border-dashed transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{
            top: "17.5%",
            left: "17.5%",
            right: "17.5%",
            bottom: "17.5%",
            borderColor: "rgba(208, 236, 26, 0.45)",
            transitionDelay: "400ms",
          }}
        />

        {/* Inner orbit ring (dashed) - 30% inset */}
        <div
          class={`absolute rounded-full border border-dashed transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{
            top: "30%",
            left: "30%",
            right: "30%",
            bottom: "30%",
            borderColor: "rgba(208, 236, 26, 0.35)",
            transitionDelay: "600ms",
          }}
        />

        {/* Center glow effect - larger circle with gradient */}
        <div
          class={`absolute rounded-full transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{
            top: "22%",
            left: "22%",
            right: "22%",
            bottom: "22%",
            background: "radial-gradient(circle, rgba(208, 236, 26, 0.25) 0%, rgba(208, 236, 26, 0.08) 60%, transparent 80%)",
            transitionDelay: "700ms",
          }}
        />

        {/* Center lime circle */}
        <div
          class={`absolute rounded-full bg-primary-light flex items-center justify-center transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{
            top: "30%",
            left: "30%",
            right: "30%",
            bottom: "30%",
            boxShadow:
              "0 0 60px rgba(208, 236, 26, 0.4), 0 0 100px rgba(208, 236, 26, 0.2)",
            transitionDelay: "800ms",
          }}
        >
          {/* Deco Logo - 116px, centered in circle */}
          <img
            src={DECO_LOGO}
            alt="Deco Logo"
            style={{
              width: `${CENTER_LOGO_SIZE}px`,
              height: `${CENTER_LOGO_SIZE}px`,
            }}
            class="object-contain"
          />
        </div>

        {/* Orbiting icons */}
        {icons.map((item, index) => (
          <IconCircle
            key={item.id}
            icon={item.icon}
            isVisible={isVisible}
            delay={1000 + index * 150}
            index={index}
          />
        ))}

        {/* Small decorative dots - on outer and middle orbits */}
        {orbitDots.map((_dot, index) => (
          <div
            key={`dot-${index}`}
            class={`absolute rounded-full bg-primary-light transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: `${DOT_SIZE}px`,
              height: `${DOT_SIZE}px`,
              left: `calc(50% - ${DOT_SIZE / 2}px)`,
              top: `calc(50% - ${DOT_SIZE / 2}px)`,
              transitionDelay: `${1400 + index * 80}ms`,
              boxShadow: "0 0 6px rgba(208, 236, 26, 0.5)",
              animation: isVisible
                ? `dot-orbit-${index} ${ORBIT_DURATION}s linear infinite`
                : "none",
            }}
          />
        ))}
      </div>

      {/* Keyframe animations */}
      <style>
        {`
          ${generateOrbitKeyframes()}
          ${generateDotKeyframes()}
        `}
      </style>
    </div>
  );
}
