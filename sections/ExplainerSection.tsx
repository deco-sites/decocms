import { useScript } from "@deco/deco/hooks";

export interface Props {
  /**
   * @title Title Line 1
   * @description First line of the title (with typing animation)
   */
  titleLine1?: string;

  /**
   * @title Title Line 2
   * @description Second line (gray, with typing animation)
   */
  titleLine2?: string;

  /**
   * @title Description
   * @description Text shown on the right side
   * @format textarea
   */
  description?: string;

  /**
   * @title Highlighted Text
   * @description The part of the description that should be highlighted in green
   */
  highlightedText?: string;
}

const defaultProps: Props = {
  titleLine1: "Infrastructure as Code.",
  titleLine2: 'Not "Integration Hell".',
  description:
    "Stop juggling scattered contexts and hardcoded keys; decoCMS MCP Mesh centralizes your AI infrastructure into a secure, typed layer that composes tools, enforces granular policies, and routes context seamlessly.",
  highlightedText:
    "centralizes your AI infrastructure into a secure, typed layer",
};

export default function ExplainerSection({
  titleLine1 = defaultProps.titleLine1,
  titleLine2 = defaultProps.titleLine2,
  description = defaultProps.description,
  highlightedText = defaultProps.highlightedText,
}: Props) {
  const sectionId = `explainer-section-${
    Math.random().toString(36).substr(2, 9)
  }`;

  // Split description into parts for highlighting
  const renderDescription = () => {
    if (!description || !highlightedText) {
      return <span>{description}</span>;
    }

    const parts = description.split(highlightedText);
    if (parts.length === 1) {
      return <span>{description}</span>;
    }

    return (
      <>
        <span>{parts[0]}</span>
        <span class="text-[#8caa25]">{highlightedText}</span>
        <span>{parts[1]}</span>
      </>
    );
  };

  return (
    <>
      {/* Load GSAP library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js">
      </script>

      <section
        class="w-full bg-stone-50 py-16 lg:py-20 px-8 lg:px-16"
        data-section-id={sectionId}
      >
        <div class="max-w-7xl mx-auto flex flex-col gap-14">
          {/* Header Row */}
          <div class="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* Title with Typing Animation */}
            <div class="flex-shrink-0">
              <h1
                id={`title-${sectionId}`}
                class="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-medium leading-none tracking-[-0.02em]"
                style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
              >
                <span
                  id={`line1-${sectionId}`}
                  class="block text-dc-900"
                  data-text={titleLine1}
                >
                  <span class="typing-text"></span>
                  <span class="typing-cursor">|</span>
                </span>
                <span
                  id={`line2-${sectionId}`}
                  class="block text-dc-500 mt-1"
                  data-text={titleLine2}
                >
                  <span class="typing-text"></span>
                  <span class="typing-cursor hidden">|</span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p
              id={`description-${sectionId}`}
              class="flex-1 text-lg lg:text-xl text-dc-500 leading-relaxed opacity-0 translate-y-5"
              style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
            >
              {renderDescription()}
            </p>
          </div>

          {/* Infographic Placeholder */}
          <div
            id={`infographic-${sectionId}`}
            class="w-full h-[500px] lg:h-[662px] bg-dc-200 border border-dc-300 rounded-2xl flex items-center justify-center opacity-0 translate-y-8"
          >
            {/* Placeholder for animated infographic */}
            <div class="text-dc-400 text-lg font-medium">
              Animated Infographic Placeholder
            </div>
          </div>
        </div>

        {/* Typing Animation Styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            
            .typing-cursor:not(.hidden) {
              display: inline-block;
              animation: blink 0.8s infinite;
              font-weight: 300;
              margin-left: 2px;
            }
          `,
          }}
        />

        {/* GSAP Typing Animation Script */}
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(
              (sectionId: string) => {
                let animationStarted = false;

                const startAnimation = () => {
                  if (animationStarted) return;
                  animationStarted = true;

                  const gsap = (
                    globalThis as unknown as {
                      gsap?: typeof import("gsap").gsap;
                    }
                  ).gsap;

                  if (!gsap) return;

                  const line1Container = document.querySelector(
                    `#line1-${sectionId}`,
                  ) as HTMLElement;
                  const line2Container = document.querySelector(
                    `#line2-${sectionId}`,
                  ) as HTMLElement;

                  if (!line1Container || !line2Container) return;

                  const line1Text = line1Container.dataset.text || "";
                  const line2Text = line2Container.dataset.text || "";

                  const line1El = line1Container.querySelector(
                    ".typing-text",
                  ) as HTMLElement;
                  const line1Cursor = line1Container.querySelector(
                    ".typing-cursor",
                  ) as HTMLElement;
                  const line2El = line2Container.querySelector(
                    ".typing-text",
                  ) as HTMLElement;
                  const line2Cursor = line2Container.querySelector(
                    ".typing-cursor",
                  ) as HTMLElement;
                  const descriptionEl = document.querySelector(
                    `#description-${sectionId}`,
                  ) as HTMLElement;
                  const infographicEl = document.querySelector(
                    `#infographic-${sectionId}`,
                  ) as HTMLElement;

                  if (!line1El || !line2El) return;

                  // Create master timeline
                  const tl = gsap.timeline({
                    defaults: { ease: "none" },
                  });

                  // Typing effect helper
                  const typeText = (
                    element: HTMLElement,
                    text: string,
                    duration: number,
                  ) => {
                    const chars = text.split("");

                    return gsap.to(
                      { progress: 0 },
                      {
                        progress: 1,
                        duration: duration,
                        ease: "steps(" + chars.length + ")",
                        onUpdate: function () {
                          const charIndex = Math.floor(
                            this.progress() * chars.length,
                          );
                          element.textContent = chars.slice(0, charIndex).join(
                            "",
                          );
                        },
                        onComplete: function () {
                          element.textContent = text;
                        },
                      },
                    );
                  };

                  // Animate line 1
                  tl.add(typeText(line1El, line1Text, 1.2));

                  // Hide line 1 cursor and show line 2 cursor
                  tl.to(
                    line1Cursor,
                    {
                      opacity: 0,
                      duration: 0.1,
                      onComplete: () => {
                        line1Cursor.classList.add("hidden");
                      },
                    },
                    "+=0.2",
                  );

                  tl.call(
                    () => {
                      line2Cursor.classList.remove("hidden");
                    },
                    [],
                    "<",
                  );

                  // Animate line 2
                  tl.add(typeText(line2El, line2Text, 1.0), "+=0.1");

                  // Hide line 2 cursor after typing
                  tl.to(
                    line2Cursor,
                    {
                      opacity: 0,
                      duration: 0.3,
                      onComplete: () => {
                        line2Cursor.classList.add("hidden");
                      },
                    },
                    "+=0.5",
                  );

                  // Fade in description
                  tl.to(
                    descriptionEl,
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      ease: "power2.out",
                      clearProps: "transform",
                    },
                    "-=0.3",
                  );

                  // Fade in infographic
                  tl.to(
                    infographicEl,
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.8,
                      ease: "power2.out",
                      clearProps: "transform",
                    },
                    "-=0.4",
                  );
                };

                const initObserver = () => {
                  const gsap = (
                    globalThis as unknown as {
                      gsap?: typeof import("gsap").gsap;
                    }
                  ).gsap;

                  if (!gsap) {
                    setTimeout(initObserver, 100);
                    return;
                  }

                  const section = document.querySelector(
                    `[data-section-id="${sectionId}"]`,
                  ) as HTMLElement;

                  if (!section) return;

                  // Use IntersectionObserver to trigger animation on scroll
                  const observer = new IntersectionObserver(
                    (entries) => {
                      entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                          startAnimation();
                          observer.disconnect();
                        }
                      });
                    },
                    {
                      threshold: 0.3, // Trigger when 30% of section is visible
                      rootMargin: "0px 0px -10% 0px",
                    },
                  );

                  observer.observe(section);
                };

                if (document.readyState === "loading") {
                  document.addEventListener("DOMContentLoaded", initObserver);
                } else {
                  initObserver();
                }
              },
              sectionId,
            ),
          }}
        />
      </section>
    </>
  );
}

export function Preview() {
  return <ExplainerSection {...defaultProps} />;
}
