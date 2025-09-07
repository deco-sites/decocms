import { BlogAuthor } from "../../types/blog.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  /**
   * @title Autores
   * @description Lista de autores do post
   */
  authors?: BlogAuthor[];
  /**
   * @title Tamanho do avatar
   * @description Tamanho em pixels para o avatar do autor
   */
  avatarSize?: number;
  /**
   * @title Mostrar nome
   * @description Se deve mostrar o nome do autor além do avatar
   */
  showName?: boolean;
  /**
   * @title Mostrar tooltip
   * @description Se deve mostrar um tooltip com os nomes de todos os autores
   */
  showTooltip?: boolean;
  /**
   * @title Tamanho do texto
   * @description Tamanho do texto do nome do autor
   */
  textSize?: "xs" | "sm" | "base" | "lg" | "xl";
  /**
   * @title Cor do texto
   * @description Classe de cor do texto (formato: text-*)
   */
  textColor?: string;
  /**
   * @title Cor do contorno
   * @description Classe de cor do contorno do avatar (formato: outline-*)
   */
  outlineColor?: string;
  /**
   * @title Classe CSS adicional
   * @description Classes CSS adicionais para o componente
   */
  className?: string;
}

export default function BlogAuthorTag({
  authors = [],
  avatarSize = 20,
  showName = false,
  showTooltip = true,
  textSize = "sm",
  textColor = "text-dc-500",
  outlineColor = "outline-dc-50",
  className = "",
}: Props) {
  if (!authors?.length) return null;

  // Filter out any null authors
  const validAuthors = authors.filter((author) => author);

  if (validAuthors.length === 0) return null;

  return (
    <div class={`flex justify-start items-center gap-2 ${className}`}>
      <div class="flex justify-start items-center relative group">
        <div class="flex justify-start items-center">
          {validAuthors.slice(0, 3).map((author, index) => {
            // Check for both image and avatar fields
            const authorImage = author &&
                (("image" in author && author.image) ||
                  ("avatar" in author && (author as any).avatar))
              ? ("image" in author
                ? author.image
                : (author as any).avatar) as string
              : null;

            const authorName = author.name || "Author";
            const firstLetter = authorName ? authorName.charAt(0) : "A";

            return (
              <div
                key={index}
                class="rounded-full overflow-hidden"
                style={{
                  marginLeft: index > 0 ? "-8px" : "0px",
                  zIndex: 10 - index,
                  position: "relative",
                }}
              >
                <Image
                  src={authorImage ||
                    `https://placehold.co/${avatarSize}x${avatarSize}?text=${firstLetter}`}
                  alt={authorName}
                  width={avatarSize}
                  height={avatarSize}
                  class={`w-${avatarSize / 4} h-${
                    avatarSize / 4
                  } rounded-full outline outline-2 ${outlineColor}`}
                />
              </div>
            );
          })}
        </div>

        {/* Tooltip with author names */}
        {showTooltip && validAuthors.length > 1 && (
          <div class="absolute top-full left-0 mt-2 bg-dc-50 shadow-md rounded-md px-3 py-2 text-sm text-dc-600 font-sans font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            {validAuthors.map((author, index) => (
              <div key={index} class="py-1">
                {author.name || "Author"}
              </div>
            ))}
          </div>
        )}
      </div>

      {showName && validAuthors[0]?.name && (
        <div
          class={`${textColor} ${
            textSize ? `text-${textSize}` : ""
          } font-medium font-sans leading-tight`}
        >
          {validAuthors[0].name}
          {validAuthors.length > 1 ? ` +${validAuthors.length - 1}` : ""}
        </div>
      )}
    </div>
  );
}
