import type { ImageWidget } from "apps/admin/widgets.ts";
import BackboneScrollSection from "../islands/BackboneScrollSection.tsx";

/**
 * @titleBy title
 */
interface CardItem {
  /**
   * @title Card Background Color
   * @description Background color for the card (e.g., #a595ff for purple, #d0ec1a for green)
   */
  backgroundColor?: string;

  /**
   * @title Card Image
   * @description Image displayed inside the card
   */
  image?: ImageWidget;

  /**
   * @title Card Tag
   * @description Small tag displayed above the title (e.g., "New!", "Early Access", "Coming Soon")
   */
  tag?: string;

  /**
   * @title Tag Background Color
   * @description Tailwind color token for tag background (e.g., purple-light, primary-light, yellow-light)
   */
  tagBackgroundColor?: string;

  /**
   * @title Tag Text Color
   * @description Tailwind color token for tag text (e.g., purple-dark, primary-dark, yellow-dark)
   */
  tagTextColor?: string;

  /**
   * @title Card Title
   * @description Main title of the card (e.g., "MCP Mesh")
   */
  title?: string;

  /**
   * @title Subtitle - Before Highlight
   * @description Text before the highlighted portion
   */
  subtitleBefore?: string;

  /**
   * @title Subtitle - Highlighted Text
   * @description Text that appears in green
   */
  subtitleHighlight?: string;

  /**
   * @title Subtitle - After Highlight
   * @description Text after the highlighted portion
   */
  subtitleAfter?: string;

  /**
   * @title Description
   * @description Longer description text
   * @format textarea
   */
  description?: string;

  /**
   * @title Link Text
   * @description Text for the call-to-action link
   */
  linkText?: string;

  /**
   * @title Link URL
   * @description URL for the call-to-action link
   */
  linkUrl?: string;
}

/**
 * @titleBy label
 */
interface BulletPointItem {
  /**
   * @title Label
   * @description Text displayed for the bullet point
   */
  label?: string;

  /**
   * @title Target Card Index
   * @description Which card this bullet links to (0, 1, or 2)
   */
  targetIndex?: number;
}

export interface Props {
  /**
   * @title Section Title
   * @description Main heading for the section
   */
  title?: string;

  /**
   * @title Section Subtitle
   * @description Description text below the title
   * @format textarea
   */
  subtitle?: string;

  /**
   * @title Bullet Points
   * @description Navigation bullet points shown on desktop (hidden on mobile)
   */
  bulletPoints?: BulletPointItem[];

  /**
   * @title Cards
   * @description The three cards displayed on the right side
   */
  cards?: CardItem[];
}

export default function BackboneSection({
  title = "The Backbone of the Autonomous Enterprise.",
  subtitle = "Centralize governance and observability. Turn fragmented AI experiments into reliable, reusable assets that compound across your entire enterprise.",
  bulletPoints = [
    { label: "Context infrastructure", targetIndex: 0 },
    { label: "Reusable building blocks", targetIndex: 1 },
    { label: "Adoption without chaos", targetIndex: 2 },
  ],
  cards = [
    {
      backgroundColor: "#a595ff",
      image: "https://assets.decocache.com/decocms/6216bd1e-7bc1-40df-8ae1-6e431919f1e7/mesh_image.png",
      title: "MCP Mesh",
      subtitleBefore: "A secure and ",
      subtitleHighlight: "complete control plane",
      subtitleAfter: " to connect tools and data via MCP.",
      description: "Unify tool and model calls behind one endpoint, with policy enforcement, audit trails, and runtime strategies that optimize for cost, speed, and accuracy.",
      linkText: "Learn about MCP Mesh",
      linkUrl: "/mcp-mesh",
    },
    {
      backgroundColor: "#d0ec1a",
      image: "https://assets.decocache.com/decocms/6216bd1e-7bc1-40df-8ae1-6e431919f1e7/mesh_image.png",
      title: "MCP Studio",
      subtitleBefore: "Framework to ",
      subtitleHighlight: "build and curate MCP-native capabilities",
      subtitleAfter: " that become reusable assets.",
      description: "Create tools, workflows, and apps with consistent schemas, permissions, and interfaces, so other teams can reuse them while maintaining engineering standards.",
      linkText: "Get Studio Early Access",
      linkUrl: "/studio",
    },
    {
      backgroundColor: "#d0ec1a",
      image: "https://assets.decocache.com/decocms/6216bd1e-7bc1-40df-8ae1-6e431919f1e7/mesh_image.png",
      title: "MCP Apps + Store",
      subtitleBefore: "Marketplace to ",
      subtitleHighlight: "distribute and compose",
      subtitleAfter: " autonomous capabilities.",
      description: "Install premade solutions, publish internal apps across teams, and share / monetize through our store. Humans and agents run work safely with measurable costs and outcomes.",
    },
  ],
}: Props) {
  const formattedBulletPoints = bulletPoints.map((bp) => ({
    label: bp.label || "",
    targetIndex: bp.targetIndex ?? 0,
  }));

  const formattedCards = cards.map((card) => ({
    backgroundColor: card.backgroundColor || "#d0ec1a",
    image: card.image || "",
    tag: card.tag,
    tagBackgroundColor: card.tagBackgroundColor,
    tagTextColor: card.tagTextColor,
    title: card.title || "",
    subtitleBefore: card.subtitleBefore || "",
    subtitleHighlight: card.subtitleHighlight || "",
    subtitleAfter: card.subtitleAfter || "",
    description: card.description || "",
    linkText: card.linkText,
    linkUrl: card.linkUrl,
  }));

  return (
    <BackboneScrollSection
      title={title}
      subtitle={subtitle}
      bulletPoints={formattedBulletPoints}
      cards={formattedCards}
    />
  );
}

