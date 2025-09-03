import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy text
 */
export interface FooterLink {
  /**
   * @title Texto do link
   * @description Texto a ser exibido no link
   */
  text: string;
  /**
   * @title URL do link
   * @description Link para onde o usuário será direcionado
   */
  url?: string;
  /**
   * @title Desabilitado
   * @description Se o link está desabilitado
   * @default false
   */
  disabled?: boolean;
}

/**
 * @titleBy title
 */
export interface LinkColumn {
  /**
   * @title Título da coluna
   * @description Título que aparecerá no topo da coluna de links
   */
  title: string;
  /**
   * @title Links
   * @description Lista de links a serem exibidos nesta coluna
   */
  links: FooterLink[];
}

export interface Props {
  /**
   * @title Colunas de links
   * @description Colunas com categorias de links no rodapé
   * @minItems 1
   * @maxItems 5
   */
  columns?: LinkColumn[];
  /**
   * @title Logo
   * @description Imagem exibida na parte inferior do rodapé
   */
  logo?: ImageWidget;
}

export default function Footer({
  columns = [
    {
      title: "Solutions",
      links: [
        { text: "AI Agents", url: "#" },
        { text: "Enterprise", url: "#" },
        { text: "Agencies", url: "#" },
        { text: "AI Chatbots", url: "#" },
        { text: "Internal Tools", url: "#" },
        { text: "Whitelabel", url: "#", disabled: true },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "LinkedIn", url: "#" },
        { text: "Youtube", url: "#" },
        { text: "Coming Soon", disabled: true },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Pricing", url: "#" },
        { text: "Documentation", url: "#" },
        { text: "Tutorials", url: "#" },
        { text: "Status Page", url: "#" },
        { text: "Changelog", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "Blog", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Afilliate Program", url: "#" },
        { text: "Deco Camp", url: "#" },
        { text: "Security", url: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy", url: "#" },
        { text: "Terms", url: "#" },
        { text: "SOC 2 Report", url: "#" },
        { text: "OpenAI DPA", url: "#" },
        { text: "Anthropic DPA", url: "#" },
      ],
    },
  ],
  logo = "https://placehold.co/1296x186",
}: Props) {
  return (
    <div class="w-full bg-[#FAF9F7]">
      <div class="p-2">
        <div class="w-full bg-[#07401A] pt-32 pb-0 px-4 md:px-8 lg:px-16 rounded-2xl">
          <div class="w-full max-w-[1440px] mx-auto flex flex-col justify-start items-center gap-10 md:gap-20">
            {/* Links Columns */}
            <div class="self-stretch grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10">
              {columns.map((column, index) => (
                <div
                  key={index}
                  class="flex flex-col justify-start items-start gap-4"
                >
                  <h3 class="text-[#D0EC1A] text-lg font-medium leading-relaxed">
                    {column.title}
                  </h3>
                  <div class="w-full flex flex-col justify-start items-start">
                    {column.links.map((link, linkIndex) => (
                      <div key={linkIndex} class="w-full py-2">
                        {link.url && !link.disabled
                          ? (
                            <a
                              href={link.url}
                              class="text-[#E7E5E4] text-base hover:text-[#D0EC1A]/80 transition-colors"
                            >
                              {link.text}
                            </a>
                          )
                          : (
                            <span
                              class={`text-[#E7E5E4] text-base ${
                                link.disabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              {link.text}
                            </span>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Logo */}
            {logo && (
              <div class="w-full overflow-hidden h-1/2">
                <img
                  src={logo}
                  alt="Logo"
                  width={1296}
                  height={186}
                  class="w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
