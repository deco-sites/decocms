import type { ImageWidget } from "apps/admin/widgets.ts";
import HeroInteractiveClient from "../islands/HeroInteractiveClient.tsx";

/**
 * @titleBy name
 */
interface AppIcon {
  /** @title Nome do App */
  /** @description Nome interno do app (ex: "Gmail") */
  name: string;
  
  /** @title Ícone */
  /** @description Imagem do ícone do app */
  icon: ImageWidget;
  
  /** @title Identificador */
  /** @description Identificador do app (ex: "gmail", "slack") */
  mention: string;
}

/**
 * @titleBy label
 */
interface PromptTemplate {
  /** @title Label */
  /** @description Texto do botão */
  label: string;
  
  /** @title Ícone (Material Design) */
  /** @description Nome do ícone do Material Design */
  icon: string;
  
  /** @title Texto Completo */
  /** @description Texto que será preenchido no input quando clicar */
  fullText: string;
}

/**
 * @titleBy name
 */
interface Theme {
  /** @title Nome do Tema */
  name: string;
  
  /** @title Cores */
  /** @description Array com 4 cores hex para o tema [primary, background, border, foreground] */
  colors?: string[];
}

export interface Props {
  /** @title Título */
  title?: string;
  
  /** @title Subtítulo */
  subtitle?: string;
  
  /** @title Apps / Integrações */
  /** @description Lista de ícones de apps para o carrossel */
  apps?: AppIcon[];
  
  /** @title Templates de Prompt */
  /** @description Botões de exemplo que preenchem o input */
  promptTemplates?: PromptTemplate[];
  
  /** @title Temas Disponíveis */
  /** @description Lista de temas para o usuário escolher */
  themes?: Theme[];
}

export default function HeroInteractive({
  title,
  subtitle,
  apps,
  promptTemplates,
  themes,
}: Props) {
  return (
    <>
      {/* Load GSAP library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

      {/* Client-side rendered island */}
      <HeroInteractiveClient 
        title={title}
        subtitle={subtitle}
        apps={apps}
        promptTemplates={promptTemplates}
        themes={themes}
      />
    </>
  );
}

export function Preview(props: Props) {
  return <HeroInteractive {...props} />;
}

export function LoadingFallback(props: Props) {
  return <HeroInteractive {...props} />;
}
