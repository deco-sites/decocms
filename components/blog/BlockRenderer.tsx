import type { ContentBlock } from "../../types/blogContent.ts";
import { Paragraph } from "./blocks/Paragraph.tsx";
import { Heading } from "./blocks/Heading.tsx";
import { CodeBlock } from "./blocks/CodeBlock.tsx";
import { ImageBlock } from "./blocks/ImageBlock.tsx";
import { Blockquote } from "./blocks/Blockquote.tsx";
import { List } from "./blocks/List.tsx";
import { Hr } from "./blocks/Hr.tsx";
import { Table } from "./blocks/Table.tsx";
import { Callout } from "./blocks/Callout.tsx";
import { CardGrid } from "./blocks/CardGrid.tsx";
import { Steps } from "./blocks/Steps.tsx";
import { Comparison } from "./blocks/Comparison.tsx";
import { Stats } from "./blocks/Stats.tsx";
import { Timeline } from "./blocks/Timeline.tsx";
import { Checklist } from "./blocks/Checklist.tsx";
import { HeroBox } from "./blocks/HeroBox.tsx";
import { ButtonGroup } from "./blocks/ButtonGroup.tsx";
import { Video } from "./blocks/Video.tsx";

interface BlockRendererProps {
  blocks: ContentBlock[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, i) => {
        const key = `block-${i}`;

        switch (block.type) {
          case "paragraph":
            return <Paragraph key={key} {...block} />;
          case "heading":
            return <Heading key={key} {...block} />;
          case "code":
            return <CodeBlock key={key} {...block} />;
          case "image":
            return <ImageBlock key={key} {...block} />;
          case "blockquote":
            return <Blockquote key={key} {...block} />;
          case "list":
            return <List key={key} {...block} />;
          case "hr":
            return <Hr key={key} />;
          case "table":
            return <Table key={key} {...block} />;
          case "callout":
            return <Callout key={key} {...block} />;
          case "cardGrid":
            return <CardGrid key={key} {...block} />;
          case "steps":
            return <Steps key={key} {...block} />;
          case "comparison":
            return <Comparison key={key} {...block} />;
          case "stats":
            return <Stats key={key} {...block} />;
          case "timeline":
            return <Timeline key={key} {...block} />;
          case "checklist":
            return <Checklist key={key} {...block} />;
          case "heroBox":
            return <HeroBox key={key} {...block} />;
          case "buttonGroup":
            return <ButtonGroup key={key} {...block} />;
          case "video":
            return <Video key={key} {...block} />;
          default:
            console.warn("Unknown block type:", block);
            return null;
        }
      })}
    </>
  );
}
