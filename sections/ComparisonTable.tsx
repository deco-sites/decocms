import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy name
 */
interface Column {
  /** @title Nome da Coluna */
  /** @description Nome do produto, serviço ou plano a ser comparado (ex: "DecoCMS", "Lovable", "n8n") */
  name: string;
  /** @title Destacar Coluna */
  /** @description Marque para destacar esta coluna em verde (use para o produto principal) */
  highlighted?: boolean;
}

/**
 * @title Status
 * @description Tipo de ícone a ser exibido
 */
type FeatureStatus = "check" | "x" | "warning";

/**
 * @titleBy name
 */
interface Feature {
  /** @title Nome da Funcionalidade */
  /** @description Título da funcionalidade ou característica (ex: "Custom UI", "Workflows & Agents") */
  name: string;
  /** @title Descrição */
  /** @description Texto explicativo sobre a funcionalidade (opcional, aparece abaixo do nome) */
  description?: string;
  /** @title Status das Colunas */
  /** @description Para cada coluna, escolha: "check" (possui a funcionalidade ✓), "x" (não possui ✗), ou "warning" (possui parcialmente ⚠). A ordem deve corresponder à ordem das colunas. */
  columnStatus: FeatureStatus[];
}

interface Props {
  /** @title Título Principal */
  /** @description Título principal que aparece no topo da seção */
  title?: string;
  /** @title Subtítulo */
  /** @description Texto descritivo que aparece abaixo do título principal */
  subtitle?: string;
  /** @title Título da Primeira Coluna */
  /** @description Título da coluna de funcionalidades/características (ex: "What You Want", "Features") */
  firstColumnTitle?: string;
  /** @title Colunas de Comparação */
  /** @description Lista de produtos, serviços ou planos que serão comparados */
  /** @minItems 1 */
  /** @maxItems 6 */
  columns?: Column[];
  /** @title Funcionalidades */
  /** @description Lista de funcionalidades/características a serem comparadas entre as colunas */
  /** @minItems 1 */
  features?: Feature[];
  /** @title Cor de Fundo */
  /** @description Escolha a cor de fundo para esta seção */
  backgroundColor?: "white" | "dc-50" | "dc-100";
}

export default function ComparisonTable({
  title = "Lovable + n8n, but production-ready",
  subtitle,
  firstColumnTitle = "What You Want",
  columns = [
    { name: "DecoCMS", highlighted: true },
    { name: "Lovable", highlighted: false },
    { name: "n8n", highlighted: false },
  ],
  features = [
    {
      name: "Custom UI",
      description: "So your app can have a great UI",
      columnStatus: ["check", "check", "x"],
    },
    {
      name: "Workflows & Agents",
      description: "Build automation and AI agents",
      columnStatus: ["check", "x", "check"],
    },
    {
      name: "Both Together",
      description: "Full-stack apps in one codebase",
      columnStatus: ["check", "x", "x"],
    },
    {
      name: "Company Data",
      description: "Connect to your internal systems",
      columnStatus: ["check", "x", "warning"],
    },
    {
      name: "Production Deploy",
      description: "Ship to real infrastructure",
      columnStatus: ["check", "x", "warning"],
    },
    {
      name: "Governance",
      description: "Enterprise security and control",
      columnStatus: ["check", "x", "warning"],
    },
    {
      name: "Tech Support",
      description: "Get help when you need it",
      columnStatus: ["check", "x", "x"],
    },
  ],
  backgroundColor = "white",
}: Props) {
  const bgColorMap = {
    "white": "bg-white",
    "dc-50": "bg-dc-50",
    "dc-100": "bg-dc-100",
  };

  const renderIcon = (status: FeatureStatus) => {
    if (status === "check") {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="#8CAA25"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    } else if (status === "x") {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 7L7 17M7 7L17 17"
            stroke="#EF4444"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    } else {
      // warning
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9998 8.99999V13M11.9998 17H12.0098M10.6151 3.89171L2.39019 18.0983C1.93398 18.8863 1.70588 19.2803 1.73959 19.6037C1.769 19.8857 1.91677 20.142 2.14613 20.3088C2.40908 20.5 2.86435 20.5 3.77487 20.5H20.2246C21.1352 20.5 21.5904 20.5 21.8534 20.3088C22.0827 20.142 22.2305 19.8857 22.2599 19.6037C22.2936 19.2803 22.0655 18.8863 21.6093 18.0983L13.3844 3.89171C12.9299 3.10654 12.7026 2.71396 12.4061 2.58211C12.1474 2.4671 11.8521 2.4671 11.5935 2.58211C11.2969 2.71396 11.0696 3.10655 10.6151 3.89171Z"
            stroke="#EAB308"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    }
  };

  const DecoLogo = ({ isMobile = false }: { isMobile?: boolean }) => (
    <svg
      width={isMobile ? "80" : "64"}
      height={isMobile ? "33" : "27"}
      viewBox="0 0 967 402"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="inline-block"
    >
      <path
        d="M595.481 401.676C549.363 401.676 519.609 386.799 498.782 370.434C494.319 373.41 491.343 376.385 485.392 379.36C445.225 400.188 400.594 401.676 384.23 401.676C318.771 401.676 284.555 373.41 268.19 349.607C266.702 348.119 265.215 345.144 263.727 343.656C233.973 379.36 195.293 401.676 137.273 401.676C86.692 401.676 45.0368 382.336 21.2338 348.119C-4.05692 310.927 -7.03229 260.345 13.7953 206.789C42.0614 135.38 106.032 92.2366 184.879 92.2366C186.367 92.2366 186.367 92.2366 187.855 92.2366C187.855 90.7489 187.855 87.7736 187.855 86.2859C186.367 60.9952 202.732 38.6799 226.535 31.2414L296.456 4.46306C303.894 1.48769 311.333 0 318.771 0C341.087 0 361.914 11.9015 372.328 32.7291L402.082 93.7243C411.008 92.2366 419.934 92.2366 428.86 92.2366C472.003 92.2366 506.22 107.114 528.535 133.892C562.752 107.114 605.895 92.2366 653.501 92.2366C678.792 92.2366 702.595 96.6997 720.447 105.626C726.398 108.601 732.349 111.577 736.812 116.04C763.59 101.163 794.831 92.2366 829.048 92.2366C878.142 92.2366 919.797 111.577 943.6 145.793C968.891 181.498 973.354 230.592 956.989 279.685C930.211 354.07 861.777 401.676 781.442 401.676C747.225 401.676 715.984 392.75 692.181 374.897C687.718 379.36 681.767 383.823 675.816 385.311C653.501 395.725 625.235 400.188 596.969 401.676H595.481Z"
        fill="#D0EC1A"
      />
      <path
        d="M790.36 303.491C757.63 303.491 753.167 272.25 762.093 241.009C769.532 215.718 788.872 190.427 817.138 190.427C851.355 190.427 854.33 224.644 843.916 254.398C837.966 279.688 818.626 303.491 790.36 303.491ZM781.433 349.61C837.966 349.61 887.059 318.368 907.887 261.836C928.715 202.329 904.911 144.309 829.039 144.309C768.044 144.309 720.438 182.989 702.586 233.57C683.246 290.102 704.074 349.61 781.433 349.61ZM595.472 349.61C617.788 349.61 640.103 345.147 656.468 337.708C662.418 322.831 662.418 307.955 657.955 293.078C647.541 297.541 631.177 302.004 616.3 302.004C573.157 302.004 570.182 270.762 579.108 243.984C589.522 215.718 614.812 191.915 654.98 191.915C665.394 191.915 675.808 193.403 681.758 197.866C692.172 182.989 699.611 168.112 701.098 153.235C692.172 148.772 675.808 145.797 654.98 145.797C588.034 145.797 535.965 184.476 518.113 238.033C498.773 287.127 512.162 349.61 595.472 349.61ZM366.369 227.619C378.27 202.329 396.122 187.452 418.438 187.452C439.265 187.452 442.241 199.353 439.265 208.279C434.802 220.181 418.438 227.619 366.369 227.619ZM385.708 349.61C408.024 349.61 437.778 345.147 463.068 333.245C467.531 319.856 467.531 304.979 461.581 290.102C445.216 297.541 422.901 303.491 402.073 303.491C372.319 303.491 355.955 293.078 355.955 269.275C437.778 270.762 480.921 255.885 495.797 220.181C509.187 182.989 485.384 145.797 428.851 145.797C367.856 145.797 323.226 188.94 305.373 236.546C289.009 285.639 299.423 349.61 385.708 349.61ZM138.752 349.61C195.284 349.61 228.014 324.319 265.206 243.984C286.033 200.841 302.398 157.698 323.226 114.555L347.029 121.994C352.979 123.481 357.442 120.506 354.467 114.555L326.201 55.0476C321.738 52.0723 317.275 52.0723 314.299 52.0723L242.89 78.8506C236.94 80.3383 236.94 86.2891 242.89 87.7768L265.206 96.7029C247.354 136.87 226.526 196.378 208.674 233.57C189.334 275.225 178.92 304.979 146.191 304.979C113.462 304.979 107.511 279.688 120.9 242.496C137.265 199.353 164.043 187.452 195.284 196.378C204.211 184.476 210.161 166.624 213.137 150.26C204.211 147.284 193.797 147.284 184.871 147.284C134.289 147.284 85.1955 172.575 64.3679 227.619C37.5895 294.565 62.8802 349.61 138.752 349.61Z"
        fill="#07401A"
      />
    </svg>
  );

  return (
    <section
      class={`w-full px-4 py-12 sm:py-16 lg:py-24 ${bgColorMap[backgroundColor]} flex justify-center items-center`}
    >
      <div class="w-full max-w-4xl flex flex-col gap-8 lg:gap-12">
        {/* Title */}
        <div class="flex flex-col gap-4 items-center">
          {title && (
            <h2 class="text-center text-dc-900 text-2xl sm:text-3xl lg:text-4xl font-bold">
              {title}
            </h2>
          )}
          {subtitle && (
            <p class="text-center text-dc-600 text-base sm:text-lg max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>
        {/* Mobile: Carousel */}
        <div class="lg:hidden flex flex-col gap-6" id="comparison-carousel">
          {/* Tab Buttons */}
          <div class="flex justify-center gap-2" id="carousel-tabs">
            {columns?.map((column) => (
              <button
                type="button"
                class={`px-6 py-2 rounded-full text-base font-medium transition-all tab-button ${
                  column.highlighted
                    ? "bg-primary-light text-primary-dark"
                    : "bg-white border border-dc-200 text-dc-900"
                }`}
              >
                {column.highlighted ? "deco" : column.name}
              </button>
            ))}
          </div>

          {/* Carousel Container */}
          <div class="relative overflow-hidden" id="carousel-container">
            <div
              class="flex transition-transform duration-300 ease-out carousel-track"
              id="carousel-track"
            >
              {columns?.map((column, columnIndex) => (
                <div class="w-full flex-shrink-0 px-2 carousel-slide">
                  <div class="bg-white rounded-2xl border border-dc-200 overflow-hidden shadow-sm">
                    {/* Column Title */}
                    <div class="px-6 py-8 flex flex-col items-center justify-center gap-3 border-b border-dc-200">
                      {column.highlighted ? (
                        <DecoLogo isMobile={true} />
                      ) : (
                        <h3 class="text-3xl font-bold text-dc-900">
                          {column.name}
                        </h3>
                      )}
                    </div>

                    {/* Features for this column */}
                    <div class="divide-y divide-dc-200">
                      {features?.map((feature) => {
                        const status = feature.columnStatus[columnIndex];
                        return (
                          <div class="px-6 py-4 flex items-center justify-between gap-4">
                            <div class="flex-1">
                              <div class="text-base font-normal text-dc-900">
                                {feature.name}
                              </div>
                              {feature.description && (
                                <div class="text-sm text-dc-600 mt-1">
                                  {feature.description}
                                </div>
                              )}
                            </div>
                            <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                              {renderIcon(status)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div class="flex justify-center gap-2">
            {columns?.map((_, index) => (
              <div
                class={`w-2 h-2 rounded-full transition-all pagination-dot ${
                  index === 0 ? "bg-primary-dark" : "bg-dc-300"
                }`}
              >
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Table Layout */}
        <div class="hidden lg:block bg-white rounded-2xl border border-dc-200 overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full table-fixed">
              {/* Header */}
              <thead>
                <tr class="bg-dc-50 border-b border-dc-200">
                  <th class="px-6 py-4 text-left text-lg font-bold text-dc-900">
                    {firstColumnTitle}
                  </th>
                  {columns?.map((column) => (
                    <th class="px-4 py-4 text-center w-40">
                      {column.highlighted ? (
                        <div class="flex items-center justify-center">
                          <DecoLogo />
                        </div>
                      ) : (
                        <span class="text-lg font-bold text-dc-900">
                          {column.name}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody class="divide-y divide-dc-200">
                {features?.map((feature) => (
                  <tr class="hover:bg-dc-50 transition-colors">
                    {/* Feature Info */}
                    <td class="px-6 py-4">
                      <div class="text-base font-normal text-dc-900">
                        {feature.name}
                      </div>
                      {feature.description && (
                        <div class="text-sm text-dc-600 mt-1">
                          {feature.description}
                        </div>
                      )}
                    </td>

                    {/* Check/X/Warning for each column */}
                    {columns?.map((_, columnIndex) => {
                      const status = feature.columnStatus[columnIndex];
                      return (
                        <td class="px-4 py-4 text-center w-40">
                          <div class="inline-flex items-center justify-center">
                            {renderIcon(status)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(() => {
            const init = () => {
              let currentSlide = 0;
              const carousel = document.getElementById("comparison-carousel");
              if (!carousel) return;

              const track = carousel.querySelector("#carousel-track");
              const dots = carousel.querySelectorAll(".pagination-dot");
              const buttons = carousel.querySelectorAll(".tab-button");
              const slides = carousel.querySelectorAll(".carousel-slide");

              if (!track || slides.length === 0) return;

              const totalSlides = slides.length;
              let startX = 0;
              let endX = 0;

              function updateSlide(index) {
                if (index < 0 || index >= totalSlides) return;

                currentSlide = index;
                track.style.transform = `translateX(-${currentSlide * 100}%)`;

                // Update dots
                dots.forEach((dot, i) => {
                  if (i === currentSlide) {
                    dot.classList.remove("bg-dc-300");
                    dot.classList.add("bg-primary-dark");
                  } else {
                    dot.classList.remove("bg-primary-dark");
                    dot.classList.add("bg-dc-300");
                  }
                });

                // Update buttons
                buttons.forEach((btn, i) => {
                  if (i === currentSlide) {
                    btn.style.transform = "scale(1.05)";
                    btn.style.fontWeight = "600";
                  } else {
                    btn.style.transform = "scale(1)";
                    btn.style.fontWeight = "500";
                  }
                });
              }

              function handleSwipeEnd() {
                const swipeThreshold = 50;
                const diff = startX - endX;

                if (Math.abs(diff) > swipeThreshold) {
                  if (diff > 0) {
                    updateSlide(currentSlide + 1);
                  } else {
                    updateSlide(currentSlide - 1);
                  }
                }
              }

              // Tab button clicks
              buttons.forEach((button, index) => {
                button.addEventListener("click", (e) => {
                  e.preventDefault();
                  updateSlide(index);
                });
              });

              // Touch events
              track.addEventListener(
                "touchstart",
                (e) => {
                  startX = e.touches[0].clientX;
                },
                { passive: true },
              );

              track.addEventListener(
                "touchend",
                (e) => {
                  endX = e.changedTouches[0].clientX;
                  handleSwipeEnd();
                },
                { passive: true },
              );

              // Mouse events (for desktop testing)
              track.addEventListener("mousedown", (e) => {
                startX = e.clientX;
              });

              track.addEventListener("mouseup", (e) => {
                endX = e.clientX;
                handleSwipeEnd();
              });

              // Initialize
              updateSlide(0);
            };

            // Run when DOM is ready
            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", init);
            } else {
              init();
            }
          }),
        }}
      />
    </section>
  );
}

