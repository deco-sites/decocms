import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy name
 */
export interface Connection {
  /**
   * @title Connection Icon
   * @description Icon for the connection/integration
   */
  icon: ImageWidget;
  /**
   * @title Connection Name
   * @description Name of the connection/integration
   */
  name?: string;
}

export interface Props {
  /**
   * @title Main Title
   * @description Main section title
   */
  title?: string;
  /**
   * @title Subtitle
   * @description Section subtitle/description
   */
  subtitle?: string;
  /**
   * @title Connections
   * @description Array of connection icons to display
   */
  connections?: Connection[];
}

export default function ConnectionsGrid({
  title,
  subtitle,
  connections,
}: Props) {
  // Create duplicated arrays for seamless looping
  const allConnections = connections || [];
  // Duplicate the array multiple times to ensure enough items for continuous scrolling
  const duplicatedConnections = [...allConnections, ...allConnections, ...allConnections];
  
  // Split into two rows
  const midPoint = Math.ceil(duplicatedConnections.length / 2);
  const topRowConnections = duplicatedConnections.slice(0, midPoint);
  const bottomRowConnections = duplicatedConnections.slice(midPoint);

  return (
    <section class="w-full bg-dc-50 px-4 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-40">
      <div class="w-full max-w-[1440px] mx-auto">
        {/* Main Container */}
        <div class="w-full bg-dc-100 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col gap-12 lg:gap-14 overflow-hidden">
          {/* Top Row Connections - Moving Left to Right */}
          {topRowConnections.length > 0 && (
            <div class="relative overflow-hidden">
              {/* Gradient masks for smooth edges */}
              <div class="pointer-events-none absolute z-30 left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-dc-100 to-dc-100/0"></div>
              <div class="pointer-events-none absolute z-30 right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-dc-100 to-dc-100/0"></div>
              
              <div class="flex items-center gap-3 sm:gap-4 lg:gap-6 animate-scroll-left">
                {topRowConnections.map((connection, index) => (
                  <div
                    key={`top-${index}`}
                    class="flex items-center justify-center backdrop-blur-sm bg-white/90 rounded-xl border border-stone-300/10 hover:shadow-sm transition-all duration-300 flex-shrink-0"
                    style={{ width: "78px", height: "78px" }}
                  >
                    <Image
                      src={connection.icon}
                      alt={connection.name || `Connection ${index + 1}`}
                      width={47}
                      height={47}
                      class="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Section */}
          <div class="flex flex-col items-center gap-6 text-center px-4 sm:px-8 lg:px-10">
            {title && (
              <h2 class="text-dc-900 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight max-w-4xl whitespace-pre-line">
                {title}
              </h2>
            )}
            {subtitle && (
              <p class="text-dc-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Bottom Row Connections - Moving Right to Left */}
          {bottomRowConnections.length > 0 && (
            <div class="relative overflow-hidden">
              {/* Gradient masks for smooth edges */}
              <div class="pointer-events-none absolute z-30 left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-dc-100 to-dc-100/0"></div>
              <div class="pointer-events-none absolute z-30 right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-dc-100 to-dc-100/0"></div>
              
              <div class="flex items-center gap-3 sm:gap-4 lg:gap-6 animate-scroll-right">
                {bottomRowConnections.map((connection, index) => (
                  <div
                    key={`bottom-${index}`}
                    class="flex items-center justify-center backdrop-blur-sm bg-white/90 rounded-xl border border-stone-300/10 hover:shadow-sm transition-all duration-300 flex-shrink-0"
                    style={{ width: "78px", height: "78px" }}
                  >
                    <Image
                      src={connection.icon}
                      alt={connection.name || `Connection ${index + 1}`}
                      width={47}
                      height={47}
                      class="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 45s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 45s linear infinite;
        }
        
        /* Pause animations on hover for better UX */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
