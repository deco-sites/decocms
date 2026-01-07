import type { ImageWidget } from "apps/admin/widgets.ts";
import InvestorPresentationIsland from "../islands/InvestorPresentation.tsx";

/**
 * @titleBy text
 */
interface BulletPoint {
  /** @title Texto */
  text: string;

  /** @title Destacar? */
  highlight?: boolean;
}

/**
 * @titleBy title
 */
interface SlideItem {
  /** @title Título do Item */
  title?: string;

  /** @title Subtítulo do Item */
  subtitle?: string;

  /** @title Pontos / Bullets */
  bullets?: BulletPoint[];

  /** @title Valor (para stats) */
  value?: string;

  /** @title Label (para stats) */
  label?: string;
}

/**
 * @titleBy title
 */
interface Slide {
  /** @title Título do Slide */
  title: string;

  /** @title Subtítulo */
  subtitle?: string;

  /**
   * @title Layout do Slide
   * @description Escolha o tipo de layout para este slide
   */
  layout: "title" | "content" | "two-column" | "stats" | "timeline" | "list";

  /**
   * @title Cor de Fundo
   * @description Cor de fundo do slide
   */
  backgroundColor?:
    | "primary-light"
    | "primary-dark"
    | "purple-light"
    | "purple-dark"
    | "yellow-light"
    | "dc-950"
    | "dc-900"
    | "dc-50"
    | "white";

  /**
   * @title Cor do Texto
   * @description Tema de cor do texto
   */
  textColor?: "dark" | "light";

  /** @title Items do Slide */
  items?: SlideItem[];

  /** @title Imagem de Fundo */
  backgroundImage?: ImageWidget;

  /** @title Número do Slide (ex: "01") */
  slideNumber?: string;

  /** @title Tag/Badge */
  tag?: string;
}

export interface Props {
  /**
   * @title Título da Apresentação
   * @description Título principal que aparece no primeiro slide
   */
  presentationTitle?: string;

  /**
   * @title Subtítulo da Apresentação
   * @description Subtítulo que aparece abaixo do título principal
   */
  presentationSubtitle?: string;

  /**
   * @title Logo
   * @description Logo que aparece no slide de título
   */
  logo?: ImageWidget;

  /**
   * @title Slides
   * @description Lista de slides da apresentação
   */
  slides?: Slide[];
}

/**
 * @title Investor Presentation
 * @description Seção de apresentação em formato de slides com navegação e animações GSAP
 */
export default function InvestorPresentation({
  presentationTitle,
  presentationSubtitle,
  logo,
  slides,
}: Props) {
  return (
    <InvestorPresentationIsland
      presentationTitle={presentationTitle}
      presentationSubtitle={presentationSubtitle}
      logo={logo}
      slides={slides}
    />
  );
}

export function Preview(props: Props) {
  return <InvestorPresentation {...props} />;
}

