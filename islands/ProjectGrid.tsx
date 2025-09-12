import { useSignal } from "@preact/signals";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

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
}

export interface TemplateInfo {
  link?: string;
  label?: string;
  category?: string;
  description?: string;
  alignment?: "center" | "left";
  image?: string;
  icon?: string;
}

export interface Classification {
  categoriaSelecionada: string;
  paginaAtual?: number;
  itensPorPagina: number;
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

function ProjectCard({ link, label, category, image, icon }: TemplateInfo) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      class="flex flex-col gap-4 group"
    >
      {image && (
        <div class="rounded-2xl p-2 border border-dc-700 bg-dc-900">
          <div class="overflow-hidden h-[400px] md:h-[300px] rounded-lg">
            <Image
              class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              src={image}
              alt={label || "Project image"}
              width={398}
              height={300}
              loading="lazy"
            />
          </div>
        </div>
      )}

      <div class="w-full p-2 flex gap-4 justify-between items-center">
        <div class="flex items-center w-full gap-2">
          {icon && (
            <Image
              class="rounded-full flex-shrink-0"
              src={icon}
              alt=""
              width={20}
              height={20}
              loading="lazy"
            />
          )}
          {label && (
            <h3 class="font-medium text-lg sm:text-xl leading-tight tracking-tight text-dc-200 group-hover:text-primary-light transition-colors">
              {label}
            </h3>
          )}
        </div>
        {category && (
          <div class="text-xs sm:text-sm leading-tight rounded-lg bg-primary-light/10 border border-primary-light text-primary-light whitespace-nowrap py-1 px-2">
            {category}
          </div>
        )}
      </div>
    </a>
  );
}

function CategoryIndex({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: (label: string) => void;
}) {
  return (
    <button
      type="button"
      class={`transition-all duration-300 whitespace-nowrap pb-2 border-b-2 font-medium ${
        active
          ? "text-primary-light border-primary-light"
          : "text-dc-400 border-transparent hover:text-dc-200 hover:border-dc-600"
      }`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
}

export default function ProjectGrid(props: Props) {
  const {
    projectsTitle = "Explore deco's Live Projects",
    itensPerPage = 6,
    categories = [],
    layoutCategoryCard = {
      textPosition: "top",
      textAlignment: "center",
    },
    defaultCategory = "All",
  } = props;

  const currentPage = useSignal(0);
  const currentCategory = useSignal(defaultCategory);
  const projects = useSignal(
    categories
      .map((category) =>
        category.cards.map((project) => ({
          ...project,
          category: category.label,
        }))
      )
      .flat(),
  );

  const handleChangeCategoria = (newCategory: string) => {
    currentPage.value = 0;
    currentCategory.value = newCategory;

    if (newCategory === defaultCategory) {
      // Show all projects when default category is selected
      const allProjects = categories
        .map((category) =>
          category.cards.map((project) => ({
            ...project,
            category: category.label,
          }))
        )
        .flat();
      projects.value = allProjects;
    } else {
      // Show only projects from selected category
      const newProjects = categories
        .filter((category) => category.label === newCategory)
        .map((category) =>
          category.cards.map((project) => ({
            ...project,
            category: category.label,
          }))
        )
        .flat();
      projects.value = newProjects;
    }
  };

  return (
    <section class="w-full bg-dc-50 p-2">
      <div class="w-full bg-dc-900 rounded-3xl px-4 sm:px-8 lg:px-16 py-12 lg:py-20">
        <div class="w-full max-w-[1440px] mx-auto flex flex-col gap-8 lg:gap-12">
          <h2 class="text-dc-200 text-2xl sm:text-3xl lg:text-5xl font-medium leading-tight">
            {projectsTitle}
          </h2>

          <div class="flex gap-8 overflow-x-auto pb-2">
            {[{ label: defaultCategory }, ...categories].map(({ label }) => (
              <CategoryIndex
                key={label}
                label={label}
                active={label === currentCategory.value}
                onClick={() => handleChangeCategoria(label)}
              />
            ))}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.value
              .slice(
                currentPage.value * itensPerPage,
                (currentPage.value + 1) * itensPerPage,
              )
              .map((
                { label, description, link, image, category, icon },
                index,
              ) => (
                <ProjectCard
                  key={`${label}-${index}`}
                  icon={icon}
                  link={link}
                  image={image?.at(0)?.img ?? ""}
                  label={label}
                  category={category}
                  description={description}
                  alignment={layoutCategoryCard?.textAlignment}
                />
              ))}
          </div>

          {Math.ceil(projects.value.length / itensPerPage) > 1 && (
            <div class="flex items-center justify-center gap-2">
              {Array.from({
                length: Math.ceil(projects.value.length / itensPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => (currentPage.value = index)}
                  class={`w-10 h-10 rounded-full font-medium transition-colors ${
                    index === currentPage.value
                      ? "bg-primary-light text-primary-dark"
                      : "bg-dc-700 text-dc-200 hover:bg-dc-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
