import type { VideoBlock } from "../../../types/blogContent.ts";

export function Video({ embedUrl }: VideoBlock) {
  return (
    <div className="relative w-full aspect-video my-8 rounded-xl overflow-hidden bg-dc-100">
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
      />
    </div>
  );
}

