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
  promptTemplates = [
    {
      label: "Task Manager",
      icon: "task_alt",
      fullText:
        "Create a task manager that saves tasks to a database with title, priority, due date, and status. Let me add, edit, complete, and delete tasks with everything persisted.",
    },
    {
      label: "Expense Tracker",
      icon: "payments",
      fullText:
        "Build an expense tracker that stores all transactions in a database with amount, category, date, and description. Show monthly totals and spending charts from the saved data.",
    },
    {
      label: "Customer Database",
      icon: "badge",
      fullText:
        "Create a CRM that stores customer records in a database with name, email, phone, notes, and last contact date. Include search and the ability to update contact information.",
    },
    {
      label: "Inventory Manager",
      icon: "inventory",
      fullText:
        "Build an inventory system with a database to track products, quantities, SKUs, and reorder points. Let me update stock levels and get alerts when items need restocking.",
    },
    {
      label: "Reading List",
      icon: "menu_book",
      fullText:
        "Create a book tracker with a database storing title, author, genre, status (to-read/reading/read), and my personal rating. Let me search and filter my saved books.",
    },
    {
      label: "Habit Tracker",
      icon: "trending_up",
      fullText:
        "Build a habit tracker that saves daily check-ins to a database with habit name, completion status, and timestamp. Show my streak history and consistency patterns from stored data.",
    },
    {
      label: "Project Planner",
      icon: "folder_special",
      fullText:
        "Create a project manager that stores projects, tasks, and assignments in a database with due dates and status. Show progress calculations based on completed vs total tasks.",
    },
    {
      label: "Recipe Collection",
      icon: "restaurant",
      fullText:
        "Build a recipe organizer with a database storing recipe name, ingredients, instructions, prep time, and tags. Let me save new recipes and search through my collection.",
    },
    {
      label: "Event Calendar",
      icon: "event",
      fullText:
        "Create an event scheduler that saves appointments to a database with title, date, time, location, and attendees. Let me view, edit, and delete events with all changes persisted.",
    },
  ],
  themes,
}: Props) {
  return (
    <>
      {/* Load GSAP library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js">
      </script>

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
