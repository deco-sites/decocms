import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { JSX } from "preact";
import Image from "apps/website/components/Image.tsx";
import BlogAuthorTag from "../components/blog/BlogAuthorTag.tsx";
import type { BlogPost } from "apps/blog/types.ts";

interface CarouselProps {
  heading?: string;
  ctaText?: string;
  ctaHref?: string;
  posts: BlogPost[];
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr} at ${timeStr}`;
  } catch (_e) {
    return dateString;
  }
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <div class="p-2 bg-dc-100 rounded-xl inline-flex flex-col justify-center items-start gap-6 overflow-hidden w-[320px] md:w-[420px] lg:w-[530px] shrink-0">
      <a href={`/blog/post/${post.slug}`} class="block w-full">
        <div class="w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden">
          <Image
            src={post.image || "https://placehold.co/530x353"}
            alt={post.title || ""}
            width={530}
            height={384}
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </a>
      <div class="self-stretch p-6 md:p-8 flex flex-col justify-start items-start gap-4 md:gap-6">
        <div class="self-stretch flex flex-col justify-start items-start gap-3 md:gap-6">
          {post.title && (
            <a href={`/blog/post/${post.slug}`} class="hover:opacity-90 transition-opacity">
              <div class="self-stretch text-dc-800 text-2xl md:text-3xl lg:text-4xl font-medium font-sans leading-tight md:leading-10">
                {post.title}
              </div>
            </a>
          )}
          {post.excerpt && (
            <div class="self-stretch text-dc-500 text-base md:text-lg lg:text-xl font-normal font-sans leading-relaxed md:leading-loose">
              {post.excerpt}
            </div>
          )}
        </div>
        <div class="inline-flex justify-start items-center gap-3">
          <BlogAuthorTag
            authors={post.authors}
            avatarSize={20}
            showName={post.authors?.length === 1}
            outlineColor="outline-dc-50"
          />
          {post.date && (
            <>
              <div class="w-1 h-1 bg-dc-500 rounded-[1px]"></div>
              <div class="text-dc-500 text-sm font-medium font-sans leading-tight">
                {formatDate(post.date)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BlogPostsCarouselIsland({
  heading = "Take a look inside the Agentic Era",
  ctaText = "Read all blogposts",
  ctaHref = "/blog",
  posts,
}: CarouselProps): JSX.Element | null {
  const [items, setItems] = useState<BlogPost[]>(posts ?? []);
  const [animating, setAnimating] = useState(false);
  const [fadeFirst, setFadeFirst] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setItems(posts ?? []);
  }, [posts]);

  // Measure width of a single card + gap from computed styles
  const measureStep = () => {
    const card = firstCardRef.current;
    const track = trackRef.current;
    if (!card || !track) return 0;
    const style = globalThis.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || "24");
    return card.offsetWidth + (isNaN(gap) ? 24 : gap);
  };

  const visible = 3;
  const _visibleItems = useMemo(() => items.slice(0, Math.max(visible, 1)), [items]);

  const shiftLeft = () => {
    if (animating || items.length === 0) return;
    setAnimating(true);
    setFadeFirst(true);
    const step = measureStep();
    setOffset(-step);

    // After transition, rotate array
    setTimeout(() => {
      setOffset(0);
      setItems((prev) => (prev.length > 0 ? [...prev.slice(1), prev[0]] : prev));
      setFadeFirst(false);
      setAnimating(false);
    }, 350);
  };

  const shiftRight = () => {
    if (animating || items.length === 0) return;
    setAnimating(true);
    // Prepend last item and start with negative offset, then animate back
    const step = measureStep();
    setItems((prev) => (prev.length > 0 ? [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)] : prev));
    // Immediately set offset to -step and then to 0 on next frame
    requestAnimationFrame(() => {
      setOffset(-step);
      requestAnimationFrame(() => {
        setOffset(0);
        setTimeout(() => setAnimating(false), 350);
      });
    });
  };

  if (!items?.length) return null;

  return (
    <div class="w-full px-4 md:px-8 lg:px-16 py-16 inline-flex flex-col justify-start items-center gap-10 overflow-hidden">
      <div class="w-full max-w-[1280px] inline-flex flex-col md:flex-row justify-start items-start md:items-stretch gap-8">
        {/* Left column */}
        <div class="flex-1 md:max-w-[536px] inline-flex flex-col justify-between items-start gap-8">
          <div class="flex flex-col justify-start items-start gap-8">
            <div class="w-full flex flex-col justify-start items-start gap-2">
              <div class="inline-flex justify-start items-end">
                <div class="w-full max-w-[768px] inline-flex flex-col justify-start items-start gap-4">
                  <h2 class="text-dc-800 text-4xl md:text-6xl font-medium font-sans leading-tight md:leading-[64px]">
                    {heading}
                  </h2>
                </div>
              </div>
            </div>
            <a
              href={ctaHref}
              class="px-6 md:px-8 lg:px-16 py-4 md:py-6 bg-lime-400 rounded-xl inline-flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <div class="text-primary-dark text-base md:text-xl font-medium font-sans leading-tight">
                {ctaText}
              </div>
            </a>
          </div>
          <div class="inline-flex justify-start items-start gap-4 mt-6">
            <button
              aria-label="Previous posts"
              onClick={shiftLeft}
              disabled={animating}
              type="button"
              class="w-14 h-14 md:w-20 md:h-20 px-6 md:px-8 py-3 origin-top-left -rotate-90 bg-dc-200 rounded-3xl flex justify-center items-center disabled:opacity-60"
            >
              <span class="material-symbols-rounded text-2xl">chevron_left</span>
            </button>
            <button
              aria-label="Next posts"
              onClick={shiftRight}
              disabled={animating}
              type="button"
              class="w-14 h-14 md:w-20 md:h-20 px-6 md:px-8 py-3 origin-top-left rotate-90 bg-dc-200 rounded-3xl flex justify-center items-center disabled:opacity-60"
            >
              <span class="material-symbols-rounded text-2xl">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Right column: carousel track */}
        <div class="flex-1 min-w-0 flex justify-start items-center">
          <div
            ref={trackRef}
            class="flex justify-start items-stretch gap-6 will-change-transform"
            style={{
              transform: `translateX(${offset}px)`,
              transition: "transform 350ms ease",
            }}
          >
            {items.map((post, index) => (
              <div
                key={`${post.slug || post.title || "post"}-${index}`}
                ref={index === 0 ? firstCardRef : undefined}
                class={
                  "transition-all duration-300 " +
                  (index === 0 && fadeFirst ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0")
                }
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


