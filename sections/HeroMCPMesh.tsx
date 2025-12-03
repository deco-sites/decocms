import { useScript } from "@deco/deco/hooks";
import CopyMCPCommand from "../islands/CopyMCPCommand.tsx";

export interface Props {
  /**
   * @title Title Line 1
   * @description First line of the title
   */
  titleLine1?: string;

  /**
   * @title Title Line 2 (Highlighted)
   * @description Second line with accent color
   */
  titleLine2?: string;

  /**
   * @title Subtitle
   * @description Description text below the title
   */
  subtitle?: string;

  /**
   * @title Copy Command
   * @description The npx command to copy
   */
  copyCommand?: string;

  /**
   * @title Docs Button Text
   */
  docsButtonText?: string;

  /**
   * @title Docs Button URL
   */
  docsButtonUrl?: string;

  /**
   * @title Code Window Title
   * @description Title shown in the code window header
   */
  codeWindowTitle?: string;

  /**
   * @title Code Text
   * @description The code to display in the code window
   * @format textarea
   */
  codeText?: string;
}

const DEFAULT_CODE = `import { z } from 'zod';
import { defineTool } from '../../core/define-tool';

// Type-safe tool definition with Zod
export const CONNECTION_CREATE = defineTool({
  name: 'CONNECTION_CREATE',
  description: 'Create a new governed connection',

  inputSchema: z.object({
    name: z.string(),
    connection: z.discriminatedUnion('type', [
      z.object({ type: z.literal('HTTP'), url: z.string() }),
      z.object({ type: z.literal('SSE'), url: z.string() })
    ]),
  }),

  handler: async (input, ctx) => {
    // Explicit Access Control Check
    await ctx.access.check();

    // Business Logic execution...
    const connection = await ctx.storage.connections.create({
      organizationId: ctx.auth.organization.id,
      ...input
    });

    return connection;
  }
});`;

export default function HeroMCPMesh({
  titleLine1 = "The Control Layer for",
  titleLine2 = "Governed Context",
  subtitle =
    "Stop duct-taping integrations. Build a distributed MCP Mesh with TypeScript. Centralize auth, enforce RBAC, and observe every agent interaction.",
  copyCommand = "npx deco-mesh start",
  docsButtonText = "View docs",
  docsButtonUrl = "/docs",
  codeWindowTitle = "core/define-tool.ts",
  codeText = DEFAULT_CODE,
}: Props) {
  const sectionId = `hero-mcp-mesh-${Math.random().toString(36).substr(2, 9)}`;

  // Parse code and add syntax highlighting
  const highlightCode = (code: string) => {
    const lines = code.split("\n");
    return lines.map((line, idx) => {
      // Apply syntax highlighting
      let highlighted = line
        // Keywords (green)
        .replace(
          /\b(import|export|const|from|async|await|return)\b/g,
          '<span class="text-green-600">$1</span>',
        )
        // Strings (fuchsia)
        .replace(
          /'([^']+)'/g,
          "'<span class=\"text-fuchsia-500\">$1</span>'",
        )
        // Comments (gray)
        .replace(
          /(\/\/.+)/g,
          '<span class="text-gray-400">$1</span>',
        );

      return { lineNum: idx + 1, content: highlighted };
    });
  };

  const codeLines = highlightCode(codeText);

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 pt-6 rounded-[24px] flex flex-col h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Hero Content Area */}
        <div class="flex flex-col items-center pt-16 sm:pt-20 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-10 relative z-20">
          {/* Main Content - Centered */}
          <div class="w-full max-w-[930px] flex flex-col items-center gap-4 md:gap-6">
            {/* Title */}
            <h1 class="text-center text-dc-900 text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-[80px] font-medium leading-none tracking-tight">
              {titleLine1}
              <br />
              <span class="text-[#8caa25]">{titleLine2}</span>
            </h1>

            {/* Subtitle */}
            <p class="w-full max-w-[542px] text-dc-500 text-base md:text-lg lg:text-xl font-normal leading-relaxed text-center">
              {subtitle}
            </p>

            {/* Buttons */}
            <div class="flex flex-wrap items-center justify-center gap-2">
              <CopyMCPCommand command={copyCommand} disabled={true} />
              <a
                href={docsButtonUrl}
                class="px-4 py-3 bg-primary-light rounded-xl inline-flex items-center justify-center hover:bg-primary-light/90 transition-colors"
              >
                <span class="text-primary-dark text-sm font-medium leading-5">
                  {docsButtonText}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ASCII Dithering Animation - Behind code window */}
        <div class="absolute bottom-0 left-0 right-0 h-[45%] overflow-hidden pointer-events-none z-0">
          <canvas
            id={`dither-canvas-${sectionId}`}
            class="absolute inset-0 w-full h-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Code Window - Positioned at bottom, starts hidden until JS positions it */}
        <div
          id={`code-window-${sectionId}`}
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[800px] z-10 transition-all duration-300"
          style={{
            transform: "translateX(-50%) translateY(80%)",
            opacity: "0",
          }}
        >
          <div class="bg-neutral-100 border border-gray-200 rounded-[10px] overflow-hidden shadow-xl">
            {/* Window Header */}
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 bg-neutral-100">
              <div class="flex items-center gap-4">
                {/* Traffic Lights */}
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-primary-light"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-light"></div>
                  <div class="w-3 h-3 rounded-full bg-purple-light"></div>
                </div>
                {/* File Name */}
                <span class="text-gray-400 text-sm font-normal">
                  {codeWindowTitle}
                </span>
              </div>
            </div>

            {/* Code Content */}
            <div class="px-6 py-4">
              <pre class="text-[13px] leading-[21px] font-mono">
                {codeLines.map((line) => (
                  <div key={line.lineNum} class="flex">
                    <span class="w-8 text-right pr-6 text-gray-300 text-xs select-none">
                      {line.lineNum}
                    </span>
                    <code
                      class="text-dc-800 flex-1"
                      dangerouslySetInnerHTML={{ __html: line.content || "&nbsp;" }}
                    />
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Code Window Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const codeWindow = document.getElementById(
              `code-window-${sectionId}`,
            );
            if (!codeWindow) return;

            const updateCodeWindowPosition = () => {
              // Find the hero content area (buttons container)
              const heroContent = codeWindow.closest("section")?.querySelector(
                ".flex.flex-col.items-center.pt-16",
              );
              if (!heroContent) return;

              const heroContentRect = heroContent.getBoundingClientRect();
              const heroContentBottom = heroContentRect.bottom;

              const codeWindowRect = codeWindow.getBoundingClientRect();
              const codeWindowHeight = codeWindowRect.height;

              const sectionElement = codeWindow.closest(".bg-dc-100");
              if (!sectionElement) return;

              const sectionRect = sectionElement.getBoundingClientRect();
              const sectionBottom = sectionRect.bottom;

              // Calculate available space below content
              const availableSpace = sectionBottom - heroContentBottom;

              // Detect mobile
              const isMobile = window.innerWidth < 768;

              // How much of the code window should be visible
              // We want more gap on mobile to account for larger content
              const minGap = isMobile ? 80 : 60;
              const visibleCodeWindowHeight = availableSpace - minGap;

              // Calculate translateY percentage based on how much should be hidden
              // If visibleCodeWindowHeight <= 0, hide completely
              // If visibleCodeWindowHeight >= codeWindowHeight, show ~40% (default)

              if (visibleCodeWindowHeight <= 50) {
                // Not enough space - hide completely
                codeWindow.style.opacity = "0";
                codeWindow.style.pointerEvents = "none";
                codeWindow.style.transform =
                  "translateX(-50%) translateY(100%)";
              } else {
                const hiddenPortion = Math.max(
                  0,
                  codeWindowHeight - visibleCodeWindowHeight,
                );
                const translateYPercent = (hiddenPortion / codeWindowHeight) *
                  100;

                // Clamp between 30% (show a lot) and 90% (show very little)
                // On mobile, use higher minimum to show less code window
                const minTranslate = isMobile ? 50 : 30;
                const clampedTranslateY = Math.min(
                  90,
                  Math.max(minTranslate, translateYPercent),
                );

                codeWindow.style.opacity = "1";
                codeWindow.style.pointerEvents = "auto";
                codeWindow.style.transform =
                  `translateX(-50%) translateY(${clampedTranslateY}%)`;
              }
            };

            // Run positioning immediately
            updateCodeWindowPosition();

            // Also run after a short delay to catch any late layout shifts
            requestAnimationFrame(updateCodeWindowPosition);
            setTimeout(updateCodeWindowPosition, 50);
            setTimeout(updateCodeWindowPosition, 150);

            // Run on load event in case fonts/images affect layout
            window.addEventListener("load", updateCodeWindowPosition);

            // Update on resize
            window.addEventListener("resize", updateCodeWindowPosition);

            // Also update on scroll in case of any layout shifts
            window.addEventListener("scroll", updateCodeWindowPosition, {
              passive: true,
            });

            return () => {
              window.removeEventListener("load", updateCodeWindowPosition);
              window.removeEventListener("resize", updateCodeWindowPosition);
              window.removeEventListener("scroll", updateCodeWindowPosition);
            };
          }, sectionId),
        }}
      />

      {/* ASCII Dithering Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const canvas = document.getElementById(
              `dither-canvas-${sectionId}`,
            ) as HTMLCanvasElement;

            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            let animationRef: number;

            const resizeCanvas = () => {
              const rect = canvas.getBoundingClientRect();
              canvas.width = rect.width;
              canvas.height = rect.height;
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
            const cellSize = 3;

            const animate = () => {
              if (canvas.width === 0 || canvas.height === 0) return;

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              const imageData = ctx.createImageData(
                canvas.width,
                canvas.height,
              );
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  // Wave patterns
                  const waveBase = Math.sin(nx * 4 + time * 0.0004) * 0.15;
                  const waveSecond = Math.cos(nx * 7 + time * 0.0003) * 0.1;
                  const waveThird = Math.sin((nx + ny) * 3 + time * 0.0002) *
                    0.08;

                  // Gradient from top (transparent/light) to bottom (more green)
                  const verticalGradient = Math.pow(ny, 0.8);

                  let intensity = 0.95 - (verticalGradient * 0.5) + waveBase +
                    waveSecond + waveThird;

                  const noise = (Math.random() - 0.5) * 0.03 * verticalGradient;
                  intensity += noise;

                  intensity = Math.max(0, Math.min(1, intensity));

                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  const ditherResult = intensity > threshold;
                  // dc-100: #F1F0EE (background), dc-200: #E7E5E4
                  const r = ditherResult ? 0xf1 : 0xe7;
                  const g = ditherResult ? 0xf0 : 0xe5;
                  const b = ditherResult ? 0xee : 0xe4;

                  for (
                    let dy = 0;
                    dy < cellSize && y + dy < canvas.height;
                    dy++
                  ) {
                    for (
                      let dx = 0;
                      dx < cellSize && x + dx < canvas.width;
                      dx++
                    ) {
                      const pixelIndex = ((y + dy) * canvas.width + (x + dx)) *
                        4;
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

            const cleanup = () => {
              globalThis.removeEventListener("resize", resizeCanvas);
              if (animationRef) {
                cancelAnimationFrame(animationRef);
              }
            };

            globalThis.addEventListener("beforeunload", cleanup);

            return cleanup;
          }, sectionId),
        }}
      />
    </section>
  );
}
