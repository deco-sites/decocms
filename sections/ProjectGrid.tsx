import ProjectGridIsland from "../islands/ProjectGrid.tsx";

export interface Screenshot {
  label?: string;
  img: string;
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
  icon?: string;
  image?: Screenshot[];
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
  layoutCategoryCard?: {
    textPosition?: "top" | "bottom";
    textAlignment?: "center" | "left";
  };
}

export default function ProjectGrid(props: Props) {
  return <ProjectGridIsland {...props} />;
}
