import DeployAnywhereOrbit from "../islands/DeployAnywhereOrbit.tsx";

export interface Props {
  /**
   * @title Title Line 1
   * @description First line of the title
   */
  titleLine1?: string;

  /**
   * @title Title Line 2
   * @description Second line of the title
   */
  titleLine2?: string;

  /**
   * @title Highlighted Text
   * @description Text that appears highlighted in lime green
   */
  highlightedText?: string;

  /**
   * @title Description Prefix
   * @description Text before the highlighted part
   */
  descriptionPrefix?: string;

  /**
   * @title Description
   * @description Main description paragraph
   * @format textarea
   */
  description?: string;
}

export default function MCPMeshDeployAnywhere({
  titleLine1 = "Own Your Context.",
  titleLine2 = "Deploy anywhere.",
  highlightedText = "open-source and self-hosted by design.",
  descriptionPrefix = "MCP Mesh is",
  description = "Run it on your infra, audit the code, and control context end-to-end—no lock-in. Kubernetes-native. Or run it as a self-hosted binary or container: laptop, IoT, cloud, on-prem—anywhere.",
}: Props) {
  return (
    <section class="w-full bg-dc-50 flex flex-col items-center p-2">
      {/* Green container with max-width for 1440px design */}
      <div class="bg-primary-dark rounded-[24px] flex flex-row relative overflow-hidden w-full max-w-[1424px]">
        {/* Left Content */}
        <div class="w-full lg:w-[55%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-20 lg:py-32 z-10">
          {/* Title with entrance animation - NOT italic */}
          <h2
            class="text-primary-light text-4xl sm:text-5xl lg:text-[56px] font-medium leading-[1.05] tracking-[-1.12px] mb-12 lg:mb-16 opacity-0"
            style="animation: slide-up 0.8s ease-out 0.2s forwards;"
          >
            <span class="block">{titleLine1}</span>
            <span class="block">{titleLine2}</span>
          </h2>

          {/* Description with entrance animation */}
          <div
            class="flex flex-col gap-6 text-dc-100 text-lg sm:text-xl lg:text-2xl font-normal leading-[1.5] max-w-[716px] opacity-0"
            style="animation: slide-up 0.8s ease-out 0.5s forwards;"
          >
            <p>
              {descriptionPrefix}{" "}
              <span class="text-primary-light font-medium">
                {highlightedText}
              </span>
            </p>
            <p class="text-dc-100/90">{description}</p>
          </div>
        </div>

        {/* Right Illustration - Orbital Diagram - Desktop */}
        <div class="hidden lg:flex w-[45%] relative min-h-[600px]">
          <div class="absolute inset-0 -right-16">
            <DeployAnywhereOrbit />
          </div>
        </div>

        {/* Mobile illustration - hidden on larger screens */}
        <div class="lg:hidden absolute inset-0 opacity-20 pointer-events-none">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-[400px] h-[400px] rounded-full border border-dashed border-primary-light/30" />
            <div class="absolute w-[250px] h-[250px] rounded-full border border-primary-light/40" />
            <div class="absolute w-[120px] h-[120px] rounded-full bg-primary-light/20" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/90 to-transparent" />
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
}
