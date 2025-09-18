import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface ConnectionItem {
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
  connections?: ConnectionItem[];
}

export default function ConnectionsGrid({
  title,
  subtitle,
  connections,
}: Props) {
  // Split connections into two rows for better layout
  const midPoint = connections ? Math.ceil(connections.length / 2) : 0;
  const topRowConnections = connections?.slice(0, midPoint) || [];
  const bottomRowConnections = connections?.slice(midPoint) || [];

  return (
    <section class="w-full bg-dc-50 px-4 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-40">
      <div class="w-full max-w-7xl mx-auto">
        {/* Main Container */}
        <div class="w-full bg-dc-100 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col gap-12 lg:gap-14">
          {/* Top Row Connections */}
          {topRowConnections.length > 0 && (
            <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 px-4">
              {topRowConnections.map((connection, index) => (
                <div
                  key={`top-${index}`}
                  class="flex items-center justify-center backdrop-blur-sm bg-white/90 rounded-xl border border-stone-300/10 hover:shadow-sm transition-all duration-300"
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
          )}

          {/* Content Section */}
          <div class="flex flex-col items-center gap-6 text-center px-4 sm:px-8 lg:px-10">
            {title && (
              <h2 class="text-dc-900 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight max-w-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p class="text-dc-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Bottom Row Connections */}
          {bottomRowConnections.length > 0 && (
            <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 px-4">
              {bottomRowConnections.map((connection, index) => (
                <div
                  key={`bottom-${index}`}
                  class="flex items-center justify-center backdrop-blur-sm bg-white/90 rounded-xl border border-stone-300/10 hover:shadow-sm transition-all duration-300"
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
          )}
        </div>
      </div>
    </section>
  );
}
