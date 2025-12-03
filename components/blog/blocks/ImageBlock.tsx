import Image from "apps/website/components/Image.tsx";
import type { ImageBlock as ImageBlockType } from "../../../types/blogContent.ts";

export function ImageBlock({ src, alt, caption }: ImageBlockType) {
  if (caption) {
    return (
      <figure className="my-6">
        <Image
          src={src}
          alt={alt || ""}
          width={700}
          height={400}
          className="rounded-lg w-full h-auto"
        />
        {caption && (
          <figcaption className="mt-3 text-sm text-dc-600 text-center italic leading-[1.5]">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={700}
      height={400}
      className="rounded-lg w-full h-auto my-6 object-cover"
    />
  );
}
