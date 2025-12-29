import MCPMeshLayersPinned from "../islands/MCPMeshLayersPinned.tsx";

export interface LayerContent {
  /**
   * @title Label (e.g., "1) FOUNDATION")
   */
  label?: string;
  /**
   * @title Title
   */
  title?: string;
  /**
   * @title Subtitle - Text before highlight
   */
  subtitleBefore?: string;
  /**
   * @title Subtitle - Highlighted text (green)
   */
  subtitleHighlighted?: string;
  /**
   * @title Subtitle - Text after highlight
   */
  subtitleAfter?: string;
  /**
   * @title Description
   */
  description?: string;
  /**
   * @title Link Text
   */
  linkText?: string;
  /**
   * @title Link URL
   */
  linkHref?: string;
}

export interface Props {
  /**
   * @title Section Title (First Line)
   */
  title?: string;
  /**
   * @title Section Subtitle (Second Line)
   */
  subtitle?: string;
  /**
   * @title Layer 1 Image
   */
  layer1Image?: string;
  /**
   * @title Layer 2 Image
   */
  layer2Image?: string;
  /**
   * @title Layer 3 Image
   */
  layer3Image?: string;
  /**
   * @title Layer 1 Content
   */
  layer1Content?: LayerContent;
  /**
   * @title Layer 2 Content
   */
  layer2Content?: LayerContent;
  /**
   * @title Layer 3 Content
   */
  layer3Content?: LayerContent;
}

const defaultLayer1Content: LayerContent = {
  label: "1) FOUNDATION",
  title: "MCP Mesh",
  subtitleBefore: "A secure and ",
  subtitleHighlighted: "complete control plane",
  subtitleAfter: " to connect tools and data via MCP.",
  description: "Unify tool and model calls behind one endpoint, with policy enforcement, audit trails, and runtime strategies that optimize for cost, speed, and accuracy.",
  linkText: "Learn about MCP Mesh →",
  linkHref: "/mcp-mesh",
};

const defaultLayer2Content: LayerContent = {
  label: "2) BUILD",
  title: "MCP Studio",
  subtitleBefore: "Framework to build and curate ",
  subtitleHighlighted: "MCP-native capabilities",
  subtitleAfter: " that become reusable assets.",
  description: "Create tools, workflows, and apps with consistent schemas, permissions, and interfaces, so other teams can reuse them while maintaining engineering standards.",
  linkText: "Get Studio Early Access →",
  linkHref: "/mcp-studio",
};

const defaultLayer3Content: LayerContent = {
  label: "3) LEVERAGE",
  title: "MCP Apps + Store",
  subtitleBefore: "Marketplace to distribute and compose ",
  subtitleHighlighted: "autonomous capabilities",
  subtitleAfter: ".",
  description: "Install premade solutions, publish internal apps across teams, and share / monetize through our store. Humans and agents run work safely with measurable costs and outcomes.",
  linkText: "Explore the Store →",
  linkHref: "#mcp-store",
};

export default function MCPMeshLayers({
  title = "The platform:",
  subtitle = "Three layers that compound",
  layer1Image = "https://assets.decocache.com/decocms/017dd618-6091-4de3-bd5a-eb7032fdb8c3/layer1.png",
  layer2Image = "https://assets.decocache.com/decocms/cd46e66f-1dc0-457f-a685-9e2dcd76c1ab/layer2.png",
  layer3Image = "https://assets.decocache.com/decocms/82d35ce7-c78b-4ce6-bfd7-94a68b9a874f/layer3.png",
  layer1Content = defaultLayer1Content,
  layer2Content = defaultLayer2Content,
  layer3Content = defaultLayer3Content,
}: Props) {
  const contents = [
    {
      label: layer1Content.label || defaultLayer1Content.label!,
      title: layer1Content.title || defaultLayer1Content.title!,
      highlightedSubtitle: {
        before: layer1Content.subtitleBefore || defaultLayer1Content.subtitleBefore!,
        highlighted: layer1Content.subtitleHighlighted || defaultLayer1Content.subtitleHighlighted!,
        after: layer1Content.subtitleAfter || defaultLayer1Content.subtitleAfter!,
      },
      description: layer1Content.description || defaultLayer1Content.description!,
      linkText: layer1Content.linkText || defaultLayer1Content.linkText!,
      linkHref: layer1Content.linkHref || defaultLayer1Content.linkHref!,
    },
    {
      label: layer2Content.label || defaultLayer2Content.label!,
      title: layer2Content.title || defaultLayer2Content.title!,
      highlightedSubtitle: {
        before: layer2Content.subtitleBefore || defaultLayer2Content.subtitleBefore!,
        highlighted: layer2Content.subtitleHighlighted || defaultLayer2Content.subtitleHighlighted!,
        after: layer2Content.subtitleAfter || defaultLayer2Content.subtitleAfter!,
      },
      description: layer2Content.description || defaultLayer2Content.description!,
      linkText: layer2Content.linkText || defaultLayer2Content.linkText!,
      linkHref: layer2Content.linkHref || defaultLayer2Content.linkHref!,
    },
    {
      label: layer3Content.label || defaultLayer3Content.label!,
      title: layer3Content.title || defaultLayer3Content.title!,
      highlightedSubtitle: {
        before: layer3Content.subtitleBefore || defaultLayer3Content.subtitleBefore!,
        highlighted: layer3Content.subtitleHighlighted || defaultLayer3Content.subtitleHighlighted!,
        after: layer3Content.subtitleAfter || defaultLayer3Content.subtitleAfter!,
      },
      description: layer3Content.description || defaultLayer3Content.description!,
      linkText: layer3Content.linkText || defaultLayer3Content.linkText!,
      linkHref: layer3Content.linkHref || defaultLayer3Content.linkHref!,
    },
  ];

  return (
    <MCPMeshLayersPinned
      layer1Image={layer1Image}
      layer2Image={layer2Image}
      layer3Image={layer3Image}
      contents={contents}
      title={title}
      subtitle={subtitle}
    />
  );
}
