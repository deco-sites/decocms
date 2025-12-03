// Base content block types
export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | CodeBlock
  | ImageBlock
  | BlockquoteBlock
  | ListBlock
  | LinkBlock
  | HrBlock
  | TableBlock
  | CalloutBlock
  | CardBlock
  | CardGridBlock
  | StepsBlock
  | ColumnsBlock
  | ComparisonBlock
  | StatsBlock
  | TimelineBlock
  | ChecklistBlock
  | HeroBoxBlock
  | ButtonGroupBlock
  | VideoBlock;

// Basic markdown blocks
export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface CodeBlock {
  type: "code";
  code: string;
  language?: string;
  inline?: boolean;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt?: string;
  caption?: string;
}

export interface BlockquoteBlock {
  type: "blockquote";
  text: string;
  cite?: string;
  variant?: "default" | "quote";
}

export interface ListBlock {
  type: "list";
  ordered: boolean;
  items: string[];
}

export interface LinkBlock {
  type: "link";
  text: string;
  href: string;
}

export interface HrBlock {
  type: "hr";
}

export interface TableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

// Custom component blocks
export interface CalloutBlock {
  type: "callout";
  title?: string;
  content: string;
  variant?: "default" | "info" | "warning" | "tip" | "success" | "danger";
}

export interface CardBlock {
  type: "card";
  icon?: string;
  title: string;
  content: string;
}

export interface CardGridBlock {
  type: "cardGrid";
  columns: 2 | 3 | 4;
  cards: Array<{
    icon?: string;
    title: string;
    content: string;
  }>;
}

export interface StepsBlock {
  type: "steps";
  steps: Array<{
    number: number;
    title: string;
    content: string;
    goal?: string;
  }>;
}

export interface ColumnsBlock {
  type: "columns";
  columns: 2 | 3;
  content: string[];
}

export interface ComparisonBlock {
  type: "comparison";
  before: {
    title: string;
    items: string[];
  };
  after: {
    title: string;
    items: string[];
  };
}

export interface StatsBlock {
  type: "stats";
  stats: Array<{
    number: string;
    label: string;
  }>;
}

export interface TimelineBlock {
  type: "timeline";
  items: Array<{
    title: string;
    content: string;
  }>;
}

export interface ChecklistBlock {
  type: "checklist";
  items: string[];
}

export interface HeroBoxBlock {
  type: "heroBox";
  title: string;
  content: string;
  variant?: "default" | "accent";
  buttons?: Array<{
    text: string;
    href: string;
    variant: "primary" | "secondary" | "ghost";
  }>;
}

export interface ButtonGroupBlock {
  type: "buttonGroup";
  buttons: Array<{
    text: string;
    href: string;
    variant: "primary" | "secondary" | "ghost";
  }>;
}

export interface VideoBlock {
  type: "video";
  embedUrl: string;
}
