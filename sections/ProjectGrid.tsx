import ProjectGridIsland from "../islands/ProjectGrid.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Screenshot {
  label?: string;
  img: ImageWidget;
  /**
   * @format color
   * @title Base
   * @default #FFFFFF
   */
  color: string;
}

export interface Project {
  label: string;
  description?: string;
  link?: string;
  icon?: ImageWidget;
  image?: Screenshot[];
  category?: string;
}

interface Category {
  label: string;
  hideCategoryNameOnCard?: boolean;
  cards: Project[];
}

interface Props {
  projectsTitle?: string;
  itensPerPage?: number;
  defaultCategory?: string;
  categories?: Category[];
  projects?: Project[];
  layoutCategoryCard?: {
    textPosition?: "top" | "bottom";
    textAlignment?: "center" | "left";
  };
}

export default function ProjectGrid(props: Props) {
  return <ProjectGridIsland {...props} />;
}