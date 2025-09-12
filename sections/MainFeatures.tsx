import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface FeatureCard {
  /**
   * @title Categoria
   * @description Categoria da funcionalidade (ex: CHAT, TOOLS)
   */
  category: string;
  /**
   * @title Título
   * @description Título da funcionalidade
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição detalhada (opcional, aparece no hover)
   */
  description?: string;
  /**
   * @title Mostrar descrição
   * @description Se a descrição deve ser exibida no card
   */
  showDescription?: boolean;
  /**
   * @title Tipo de mídia
   * @description Escolha entre imagem ou vídeo
   */
  mediaType: "image" | "video";
  /**
   * @title Imagem
   * @description Imagem da funcionalidade (se tipo for imagem)
   */
  image?: ImageWidget;
  /**
   * @title URL do vídeo
   * @description URL do vídeo da funcionalidade (se tipo for vídeo)
   */
  videoUrl?: string;
  /**
   * @title Tamanho do card
   * @description Define o tamanho do card no grid
   */
  size: "small" | "wide";
  /**
   * @title Proporção da imagem
   * @description Proporção da imagem (width/height)
   */
  imageAspectRatio?: string;
}

interface Props {
  /**
   * @title Ícone da seção
   * @description Ícone que aparece no cabeçalho
   */
  icon?: ImageWidget;
  /**
   * @title Título principal
   * @description Título da seção
   */
  title?: string;
  /**
   * @title Descrição
   * @description Descrição da seção
   */
  description?: string;
  /**
   * @title Cards de funcionalidades
   * @description Lista de funcionalidades (máx 8 para layout 3-2-3)
   * @maxItems 8
   */
  featureCards?: FeatureCard[];
}

export default function NewHomeFeatures({
  icon,
  title,
  description,
  featureCards,
}: Props) {
  const sectionId = `features-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div class="w-full bg-dc-50 p-2">
      <div class="w-full bg-dc-900 rounded-3xl overflow-hidden">
        <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32">
          {/* Header */}
          <div class="w-full flex flex-col items-center gap-6 mb-16 lg:mb-20">
            {/* Icon */}
            {icon && (
              <div class="w-16 h-16 flex items-center justify-center">
                <Image
                  src={icon}
                  alt="Section icon"
                  width={64}
                  height={64}
                  class="w-16 h-16 object-contain"
                  loading="lazy"
                />
              </div>
            )}

            {/* Title */}
            <h2 class="text-center text-dc-200 text-2xl sm:text-3xl lg:text-5xl font-medium leading-tight max-w-4xl whitespace-pre-line">
              {title}
            </h2>

            {/* Description */}
            <p class="text-center text-dc-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-3xl">
              {description}
            </p>
          </div>

          {/* Features Grid */}
          <div
            id={sectionId}
            class="w-full features-grid"
          >
            {/* Row 1: 3 small cards */}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {featureCards?.slice(0, 3).map((feature, index) => (
                <FeatureCardComponent
                  key={index}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>

            {/* Row 2: 2 wide cards */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {featureCards?.slice(3, 5).map((feature, index) => (
                <FeatureCardComponent
                  key={index + 3}
                  feature={feature}
                  index={index + 3}
                  isWide
                />
              ))}
            </div>

            {/* Row 3: 3 small cards */}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featureCards?.slice(5, 8).map((feature, index) => (
                <FeatureCardComponent
                  key={index + 5}
                  feature={feature}
                  index={index + 5}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GSAP Animation Script */}
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        defer
      >
      </script>

      <script
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            function initializeAnimations() {
              // Initialize GSAP if available
              if (
                typeof (globalThis as unknown as { gsap?: unknown }).gsap !==
                  "undefined"
              ) {
                let animationsStarted = false;

                // Setup viewport observer
                const section = document.getElementById(sectionId);
                if (section) {
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        if (entry.isIntersecting && !animationsStarted) {
                          animationsStarted = true;
                          setupVideoAutoplay();
                          observer.unobserve(entry.target);
                        }
                      });
                    },
                    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
                  );
                  observer.observe(section);
                }
              }

              // Initialize video autoplay
              setupVideoAutoplay();
            }

            function setupVideoAutoplay() {
              // Setup video autoplay when they come into viewport
              const videos = document.querySelectorAll(".feature-video");

              videos.forEach((video) => {
                const videoElement = video as HTMLVideoElement;
                let hasPlayed = false; // Flag to track if video has already played

                const videoObserver = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting && !hasPlayed) {
                        // Play video only once when it first enters viewport
                        console.log(
                          "Attempting to play video:",
                          videoElement.src || videoElement.currentSrc,
                        );
                        videoElement.play().catch((error) => {
                          console.log("Feature video autoplay blocked:", error);
                        });
                        hasPlayed = true; // Mark as played

                        // Stop observing this video since it should only play once
                        videoObserver.unobserve(videoElement);
                      }
                    });
                  },
                  { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
                );

                videoObserver.observe(videoElement);
              });
            }

            if (document.readyState === "loading") {
              document.addEventListener(
                "DOMContentLoaded",
                initializeAnimations,
              );
            } else {
              initializeAnimations();
            }
          }, sectionId),
        }}
      />
    </div>
  );
}

// Feature Card Component
function FeatureCardComponent({
  feature,
  index,
  isWide = false,
}: {
  feature: FeatureCard;
  index: number;
  isWide?: boolean;
}) {
  // Standard aspect ratios for consistent layout
  const aspectRatio = isWide ? "16/9" : "4/3"; // Clean ratios: wide = 16:9, small = 4:3

  return (
    <div
      class={`relative bg-dc-800 rounded-2xl overflow-hidden feature-card transition-all duration-300 flex flex-col ${
        isWide ? "md:h-[600px]" : "md:h-[500px]"
      }`}
    >
      {/* Content - at top, flexible height */}
      <div class="relative z-10 p-6 flex flex-col gap-2.5 bg-dc-800 flex-shrink-0">
        {/* Category */}
        <div class="font-mono text-dc-500 text-sm sm:text-base uppercase leading-5">
          {feature.category}
        </div>

        {/* Title */}
        <h3 class="text-dc-200 text-lg md:text-xl lg:text-2xl font-medium leading-tight">
          {feature.title}
        </h3>

        {/* Description - shown based on toggle */}
        {feature.description && feature.showDescription && (
          <div class="description-content">
            <p class="text-dc-400 text-base sm:text-lg font-normal leading-relaxed">
              {feature.description}
            </p>
          </div>
        )}
      </div>

      {/* Spacer to push media to bottom - only on desktop */}
      <div class="hidden md:block flex-1"></div>

      {/* Media Container - always at bottom with fixed aspect ratio */}
      <div class="flex-shrink-0 overflow-hidden">
        <div
          class="w-full"
          style={{
            aspectRatio: feature.imageAspectRatio || aspectRatio,
            minHeight: "200px",
          }}
        >
          {feature.mediaType === "image" && feature.image
            ? (
              <Image
                src={feature.image}
                alt={feature.title}
                width={isWide ? 800 : 600}
                height={isWide ? 450 : 450}
                class="w-full h-full object-cover object-center"
                loading="lazy"
                fetchPriority="low"
              />
            )
            : feature.mediaType === "video" && feature.videoUrl
            ? (
              <video
                class="w-full h-full object-cover object-center feature-video"
                muted
                playsInline
                loop
                preload="none"
                data-feature-index={index}
                poster={feature.image}
                onError={() =>
                  console.log("Video error for:", feature.videoUrl)}
                onLoadedData={() =>
                  console.log("Video loaded:", feature.videoUrl)}
              >
                <source src={feature.videoUrl} type="video/webm" />
                {feature.videoUrl?.includes(".webm") && (
                  <source
                    src={feature.videoUrl.replace(".webm", ".mp4")}
                    type="video/mp4"
                  />
                )}
                Your browser does not support video.
              </video>
            )
            : (
              <div class="w-full h-full bg-dc-700 flex items-center justify-center">
                <span class="text-dc-400 text-sm">No media provided</span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export function Preview() {
  return <NewHomeFeatures />;
}
