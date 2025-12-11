import { useScript } from "@deco/deco/hooks";

export interface Props {
  /**
   * @title Highlighted Quote
   * @description Main quote that appears on scroll
   */
  highlightedQuote?: string;
  /**
   * @title Description
   * @description Supporting description text
   */
  description?: string;
}

export default function MCPMeshProblem({
  highlightedQuote = "The vast majority of proof of concepts die before reaching production.",
  description = "It's easy to make something work 80% of the time, but critical software needs to work 99.9% of the time, safely.",
}: Props) {
  const sectionId = `mcp-mesh-problem-${Math.random().toString(36).substr(2, 9)}`;

  // Generate interconnected nodes for the background with dynamic sizing
  // Each node has a width estimate based on label length
  const estimateTextWidth = (text: string) => {
    // Approximate: each character is ~1.2 units wide at font-size 2
    return Math.max(text.length * 1.2, 6);
  };

  // Logo URLs mapping
  const logoUrls: Record<string, string> = {
    langsmith: "https://ai.nd.edu/assets/596220/claude_ai_logo.svg",
    openai: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1200px-OpenAI_Logo.svg.png",
    helicone: "https://mintcdn.com/helicone/H0xDJmuTzfSrq5RW/logo/light.png?fit=max&auto=format&n=H0xDJmuTzfSrq5RW&q=85&s=748e5ab8e134752664c5847901a2cb8c",
    traceloop: "https://raw.githubusercontent.com/traceloop/.github/main/img/traceloop-light.png",
    n8n: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/N8n-logo-new.svg/2560px-N8n-logo-new.svg.png",
    langfuse: "https://images.saasworthy.com/langfuse_51227_logo_1748446939_yd3my.png",
    promptlayer: "https://mintcdn.com/promptlayer/v0RzaTvbzopITX7U/logo/logo.png?fit=max&auto=format&n=v0RzaTvbzopITX7U&q=85&s=0decf70e3c444d489fa5f1152951bd6c",
  };

  // Initial node positions - more spread out and organically arranged
  const initialNodes = [
    { id: "claude", label: "Claude", x: 5, y: 12 },
    { id: "assistants", label: "ASSISTANTS", x: 20, y: 10 },
    { id: "crewai", label: "crewai", x: 38, y: 14 },
    { id: "workflows", label: "WORKFLOWS", x: 55, y: 12 },
    { id: "langsmith", label: "LangSmith", x: 3, y: 30 },
    { id: "prompts", label: "PROMPTS", x: 18, y: 32 },
    { id: "promptlayer", label: "PromptLayer", x: 35, y: 28 },
    { id: "helicone", label: "helicone", x: 52, y: 30 },
    { id: "models", label: "MODELS", x: 70, y: 32 },
    { id: "observability", label: "OBSERVABILITY", x: 85, y: 28 },
    { id: "n8n", label: "n8n", x: 92, y: 35 },
    { id: "permission", label: "PERMISSION MGMT", x: 6, y: 50 },
    { id: "infra", label: "INFRA", x: 24, y: 52 },
    { id: "cost", label: "COST CONTROL", x: 42, y: 48 },
    { id: "langfuse", label: "Langfuse", x: 60, y: 50 },
    { id: "traceloop", label: "traceloop", x: 2, y: 70 },
    { id: "agent", label: "AGENT FRAMEWORKS", x: 22, y: 72 },
    { id: "evals", label: "EVALS", x: 45, y: 68 },
    { id: "openai", label: "OpenAI", x: 65, y: 70 },
    { id: "measurement", label: "MEASUREMENT", x: 82, y: 72 },
    { id: "multi", label: "MULTI-AGENTS", x: 88, y: 68 },
    { id: "analytics", label: "ANALYTICS", x: 95, y: 75 },
  ];

  // Calculate widths
  const nodes = initialNodes.map((node) => {
    const width = estimateTextWidth(node.label);
    return { ...node, width };
  });

  // Function to check if two nodes overlap
  const nodesOverlap = (node1: typeof nodes[0], node2: typeof nodes[0], padding: number) => {
    const padding1 = 2.5;
    const padding2 = 2.5;
    const width1 = node1.width + padding1 * 2;
    const width2 = node2.width + padding2 * 2;
    const height = 4.5;
    
    const x1Min = node1.x - width1 / 2;
    const x1Max = node1.x + width1 / 2;
    const y1Min = node1.y - height / 2;
    const y1Max = node1.y + height / 2;
    
    const x2Min = node2.x - width2 / 2;
    const x2Max = node2.x + width2 / 2;
    const y2Min = node2.y - height / 2;
    const y2Max = node2.y + height / 2;
    
    const horizontalOverlap = !(x1Max + padding < x2Min || x2Max + padding < x1Min);
    const verticalOverlap = !(y1Max + padding < y2Min || y2Max + padding < y1Min);
    
    return horizontalOverlap && verticalOverlap;
  };

  // Adjust positions to prevent overlap with more spacing
  const adjustedNodes: typeof nodes = [];
  
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    let adjustedX = node.x;
    let adjustedY = node.y;
    const minSpacing = 4; // Minimum spacing between cards
    
    // Check all previous nodes for overlap
    for (let i = 0; i < adjustedNodes.length; i++) {
      const otherNode = adjustedNodes[i];
      
      // Check if they overlap
      let attempts = 0;
      while (nodesOverlap(
        { ...node, x: adjustedX, y: adjustedY },
        otherNode,
        minSpacing
      ) && attempts < 50) {
        // Try moving right first
        if (adjustedX < 95) {
          adjustedX += 2;
        } else if (adjustedY < 85) {
          // If can't move right, move down
          adjustedY += 3;
          adjustedX = node.x; // Reset X to original
        } else {
          // If can't move down, try moving left
          adjustedX = Math.max(5, adjustedX - 2);
        }
        attempts++;
      }
    }
    
    // Keep within bounds
    adjustedX = Math.max(3, Math.min(97, adjustedX));
    adjustedY = Math.max(8, Math.min(82, adjustedY));
    
    adjustedNodes.push({ ...node, x: adjustedX, y: adjustedY });
  }

  // Generate connections between nodes
  const connections = [
    ["claude", "prompts"],
    ["claude", "assistants"],
    ["prompts", "langsmith"],
    ["prompts", "promptlayer"],
    ["prompts", "models"],
    ["prompts", "assistants"],
    ["assistants", "crewai"],
    ["assistants", "workflows"],
    ["assistants", "models"],
    ["assistants", "observability"],
    ["models", "promptlayer"],
    ["models", "helicone"],
    ["models", "infra"],
    ["models", "cost"],
    ["models", "measurement"],
    ["models", "agent"],
    ["observability", "helicone"],
    ["observability", "n8n"],
    ["observability", "langfuse"],
    ["agent", "traceloop"],
    ["agent", "openai"],
    ["agent", "models"],
    ["agent", "multi"],
    ["measurement", "openai"],
    ["measurement", "cost"],
    ["measurement", "multi"],
    ["measurement", "analytics"],
    ["workflows", "crewai"],
    ["workflows", "observability"],
    ["permission", "prompts"],
    ["permission", "models"],
    ["infra", "models"],
    ["infra", "cost"],
    ["cost", "infra"],
    ["cost", "models"],
    ["cost", "measurement"],
    ["evals", "traceloop"],
    ["evals", "measurement"],
    ["multi", "agent"],
    ["multi", "measurement"],
    ["analytics", "measurement"],
    ["analytics", "langfuse"],
  ];

  return (
    <section
      id={sectionId}
      class="w-full bg-dc-50 py-24 md:py-32 lg:py-40 relative overflow-hidden"
    >
      {/* Background Network Visualization */}
      <div
        id={`${sectionId}-background`}
        class="absolute inset-0 w-full h-full pointer-events-none"
      >
        <svg
          class="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connections */}
          {connections.map(([from, to], index) => {
            const fromNode = adjustedNodes.find((n) => n.id === from);
            const toNode = adjustedNodes.find((n) => n.id === to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={`connection-${index}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#F97316"
                stroke-width="0.4"
                stroke-dasharray="1,1"
                opacity="0.5"
              />
            );
          })}

          {/* Nodes */}
          {adjustedNodes.map((node) => {
            const padding = 2.5; // Increased padding inside the card
            const hasLogo = logoUrls[node.id];
            const cardWidth = hasLogo ? 18 : node.width + padding * 2;
            const cardHeight = hasLogo ? 10 : 4.5;
            const logoSize = 14;
            
            return (
              <g key={node.id}>
                <rect
                  x={node.x - cardWidth / 2}
                  y={node.y - cardHeight / 2}
                  width={cardWidth}
                  height={cardHeight}
                  fill="#fce8e2"
                  stroke="#ff4516"
                  stroke-width="0.3"
                  stroke-dasharray="0.8,0.8"
                  rx="0.8"
                  opacity="0.8"
                />
                {hasLogo ? (
                  <image
                    href={logoUrls[node.id]}
                    x={node.x - logoSize / 2}
                    y={node.y - logoSize / 2}
                    width={logoSize}
                    height={logoSize}
                    preserveAspectRatio="xMidYMid meet"
                    opacity="0.9"
                  />
                ) : (
                  <text
                    x={node.x}
                    y={node.y + 0.8}
                    text-anchor="middle"
                    font-size="2"
                    fill="#78726E"
                    font-weight="500"
                    class="select-none"
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Radial Opacity Overlay - darkens center area where text is */}
      <div
        id={`${sectionId}-radial-overlay`}
        class="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-out"
        style="opacity: 0;"
      >
        <div
          class="w-full h-full"
          style="background: radial-gradient(circle at center, rgba(250, 250, 249, 0.85) 0%, rgba(250, 250, 249, 0.5) 25%, rgba(250, 250, 249, 0.2) 45%, rgba(250, 250, 249, 0) 70%, transparent 100%);"
        />
      </div>

      {/* Content Overlay */}
      <div class="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-16">
        <div
          id={`${sectionId}-content`}
          class="text-center opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          {/* Highlighted Quote */}
          <h2 class="text-dc-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 md:mb-8 max-w-5xl mx-auto">
            <span class="block lg:inline">
              The vast majority of proof of concepts
            </span>
            {" "}
            <span class="block lg:inline">
              die before reaching production.
            </span>
          </h2>

          {/* Description */}
          <p class="text-dc-500 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Scroll Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const background = document.getElementById(
              `${sectionId}-background`,
            );
            const radialOverlay = document.getElementById(
              `${sectionId}-radial-overlay`,
            );
            const content = document.getElementById(`${sectionId}-content`);

            if (!background || !radialOverlay || !content) return;

            const updateOpacity = () => {
              const rect = section.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              
              // Calculate how centered the section is
              // When section center is at viewport center, progress = 1
              const sectionCenter = rect.top + rect.height / 2;
              const viewportCenter = windowHeight / 2;
              const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
              
              // Maximum distance for full effect (when section is fully visible)
              const maxDistance = windowHeight / 2 + rect.height / 2;
              
              // Progress from 0 (far from center) to 1 (centered)
              let progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / maxDistance)));
              
              // Delay the text appearance - only start showing when very close to center
              // Text starts appearing when progress > 0.5 (more centered)
              const textStartThreshold = 0.5;
              const textProgress = progress > textStartThreshold 
                ? (progress - textStartThreshold) / (1 - textStartThreshold)
                : 0;
              
              // Smooth the progress with easing
              const easedProgress = progress * progress * (3 - 2 * progress);
              const easedTextProgress = textProgress * textProgress * (3 - 2 * textProgress);
              
              // Radial overlay opacity: 0 (hidden) to 1 (visible) when text appears
              // This creates the radial darkening effect
              const radialOpacity = easedTextProgress;
              radialOverlay.style.opacity = String(radialOpacity);
              
              // Content opacity: 0 (hidden) to 1 (visible) - only when very centered
              const contentOpacity = easedTextProgress;
              content.style.opacity = String(contentOpacity);
              
              // Content transform: translateY(32px) to translateY(0)
              const translateY = 32 * (1 - easedTextProgress);
              content.style.transform = `translateY(${translateY}px)`;
            };

            // Update on scroll
            let ticking = false;
            const handleScroll = () => {
              if (!ticking) {
                window.requestAnimationFrame(() => {
                  updateOpacity();
                  ticking = false;
                });
                ticking = true;
              }
            };

            window.addEventListener("scroll", handleScroll, { passive: true });
            window.addEventListener("resize", updateOpacity);
            
            // Initial update
            updateOpacity();

            // Cleanup
            return () => {
              window.removeEventListener("scroll", handleScroll);
              window.removeEventListener("resize", updateOpacity);
            };
          }, sectionId),
        }}
      />
    </section>
  );
}

