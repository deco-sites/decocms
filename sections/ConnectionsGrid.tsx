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
   * @title Top Row Connections
   * @description First row of connection icons
   */
  topRowConnections?: ConnectionItem[];
  /**
   * @title Bottom Row Connections
   * @description Second row of connection icons
   */
  bottomRowConnections?: ConnectionItem[];
}

export default function ConnectionsGrid({
  title,
  subtitle,
  topRowConnections,
  bottomRowConnections,
}: Props) {
  return (
    <section class="w-full bg-dc-50 px-4 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-40">
      <div class="w-full max-w-[1440px] mx-auto">
        {/* Header */}
        <div class="w-full flex flex-col items-center gap-6 mb-16 lg:mb-20">
          {title && (
            <h2 class="text-center text-dc-900 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight max-w-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p class="text-center text-dc-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Connections Grid */}
        <div class="w-full flex flex-col gap-10">
          {/* Top Row */}
          {topRowConnections && topRowConnections.length > 0 && (
            <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-18 overflow-hidden">
              {topRowConnections.map((connection, index) => (
                <div
                  key={`top-${index}`}
                  class="flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  style={{ width: "78px", height: "78px" }}
                >
                  <Image
                    src={connection.icon}
                    alt={connection.name || `Connection ${index + 1}`}
                    width={47}
                    height={47}
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Bottom Row */}
          {bottomRowConnections && bottomRowConnections.length > 0 && (
            <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-18 overflow-hidden">
              {bottomRowConnections.map((connection, index) => (
                <div
                  key={`bottom-${index}`}
                  class="flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  style={{ width: "78px", height: "78px" }}
                >
                  <Image
                    src={connection.icon}
                    alt={connection.name || `Connection ${index + 1}`}
                    width={47}
                    height={47}
                    class="w-full h-full object-contain"
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
