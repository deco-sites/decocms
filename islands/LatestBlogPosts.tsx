import { useEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact";
import Image from "apps/website/components/Image.tsx";
import type { BlogPost } from "apps/blog/types.ts";

interface Props {
  /**
   * @title Título da seção
   * @description Título principal exibido acima dos posts
   */
  heading: string;
  /**
   * @title Texto do botão
   * @description Texto do botão "Ver todos"
   */
  ctaText: string;
  /**
   * @title URL do botão
   * @description Link para a página de blog
   */
  ctaHref: string;
  /**
   * @title Lista de posts
   * @description Posts do blog a serem exibidos
   */
  posts: BlogPost[];
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (_e) {
    return dateString;
  }
}

function PostCard({ post }: { post: BlogPost }) {
  // Get author avatar and name
  const author = post.authors?.[0];
  const authorName = author?.name || "Author";
  const authorAvatar = author
    ? (("image" in author && author.image) ||
      ("avatar" in author && (author as any).avatar))
    : null;
  const firstLetter = authorName.charAt(0).toUpperCase();

  return (
    <a
      href={`/blog/post/${post.slug}`}
      class="flex flex-col gap-6 w-full cursor-pointer group"
    >
      {/* Cover Image */}
      <div class="aspect-[3/2] w-full overflow-hidden rounded-2xl bg-primary-light">
        {post.image
          ? (
            <Image
              src={post.image}
              alt={post.title || "Blog post cover"}
              width={600}
              height={400}
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )
          : (
            <div class="w-full h-full bg-primary-light" />
          )}
      </div>

      {/* Post Info */}
      <div class="flex flex-col gap-4 w-full">
        {/* Author & Date */}
        <div class="flex items-center gap-3">
          {/* Author */}
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-full overflow-hidden">
              <Image
                src={(authorAvatar as string) ||
                  `https://placehold.co/20x20?text=${firstLetter}`}
                alt={authorName}
                width={20}
                height={20}
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span class="text-dc-500 text-sm font-medium leading-normal whitespace-nowrap">
              {authorName}
            </span>
          </div>

          {/* Separator */}
          <div class="w-1 h-1 bg-dc-500 rounded-sm shrink-0" />

          {/* Date */}
          <span class="text-dc-500 text-sm font-medium leading-normal whitespace-nowrap">
            {formatDate(post.date)}
          </span>
        </div>

        {/* Title */}
        <h3 class="text-dc-800 text-[24px] font-normal leading-[1.2] tracking-normal group-hover:text-dc-600 transition-colors">
          {post.title}
        </h3>
      </div>
    </a>
  );
}

export default function LatestBlogPostsIsland({
  heading,
  ctaText,
  ctaHref,
  posts,
}: Props): JSX.Element | null {
  const [items] = useState<BlogPost[]>(posts ?? []);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const offsetRef = useRef(0);

  // Create duplicated items for infinite loop - we need enough copies
  // to allow smooth scrolling in both directions
  const extendedItems = items.length > 0
    ? [...items, ...items, ...items, ...items, ...items]
    : [];
  const originalLength = items.length;

  const getVisibleCount = () => {
    if (typeof globalThis !== "undefined" && globalThis.innerWidth) {
      if (globalThis.innerWidth >= 1024) return 3;
      if (globalThis.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  const getCardDimensions = () => {
    if (!cardsContainerRef.current) return { cardWidth: 0, gap: 24 };
    const containerWidth = cardsContainerRef.current.offsetWidth;
    const gap = 24;
    const visibleCount = getVisibleCount();
    const cardWidth =
      (containerWidth - gap * (visibleCount - 1)) / visibleCount;
    return { cardWidth, gap };
  };

  // Initialize position to start at the second set (index = originalLength)
  useEffect(() => {
    if (trackRef.current && items.length > 0) {
      const { cardWidth, gap } = getCardDimensions();
      // Start at the second set of items
      const initialOffset = -originalLength * (cardWidth + gap);
      offsetRef.current = initialOffset;
      trackRef.current.style.transform = `translateX(${initialOffset}px)`;
    }
  }, [items.length]);

  // Reset carousel position on resize
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current && items.length > 0) {
        const { cardWidth, gap } = getCardDimensions();
        const resetOffset = -originalLength * (cardWidth + gap);
        offsetRef.current = resetOffset;
        trackRef.current.style.transform = `translateX(${resetOffset}px)`;
      }
    };

    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, [items.length]);

  // GSAP entrance animations
  useEffect(() => {
    const loadGSAP = async () => {
      // @ts-ignore - Dynamic import for GSAP
      const gsap = (await import("gsap")).default;
      // @ts-ignore - Dynamic import for ScrollTrigger
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;

      const header = containerRef.current.querySelector(".section-header");
      const arrows = containerRef.current.querySelectorAll(".nav-arrow");
      const cardsContainer = containerRef.current.querySelector(
        ".cards-container",
      );

      gsap.set([header, cardsContainer, ...Array.from(arrows)], {
        opacity: 0,
        y: 40,
      });

      gsap.to(header, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(cardsContainer, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(arrows, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    };

    loadGSAP();
  }, []);

  const navigate = async (direction: "prev" | "next") => {
    if (animatingRef.current || items.length === 0) return;
    animatingRef.current = true;

    const { cardWidth, gap } = getCardDimensions();
    const step = cardWidth + gap;
    const totalSetWidth = originalLength * step;

    // Calculate new offset - always move in the same direction
    let newOffset = offsetRef.current;
    if (direction === "next") {
      newOffset = offsetRef.current - step;
    } else {
      newOffset = offsetRef.current + step;
    }

    // @ts-ignore - Dynamic import for GSAP
    const gsap = (await import("gsap")).default;

    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: newOffset,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          offsetRef.current = newOffset;

          // Calculate boundaries for the "safe zone" (middle sets: 2nd and 3rd)
          // We have 5 sets: [0][1][2][3][4]
          // Safe zone is sets 1, 2, 3 (indices originalLength to originalLength*4 - 1)
          const safeZoneStart = -originalLength * step; // Start of set 1
          const safeZoneEnd = -originalLength * 4 * step; // End of set 3

          // If we've gone too far left (into set 0), jump forward by one set
          if (newOffset > safeZoneStart) {
            const resetOffset = newOffset - totalSetWidth;
            offsetRef.current = resetOffset;
            if (trackRef.current) {
              trackRef.current.style.transform = `translateX(${resetOffset}px)`;
            }
          }
          // If we've gone too far right (into set 4), jump back by one set
          else if (newOffset < safeZoneEnd) {
            const resetOffset = newOffset + totalSetWidth;
            offsetRef.current = resetOffset;
            if (trackRef.current) {
              trackRef.current.style.transform = `translateX(${resetOffset}px)`;
            }
          }

          animatingRef.current = false;
        },
      });
    } else {
      animatingRef.current = false;
    }
  };

  if (!items?.length) return null;

  return (
    <section
      ref={containerRef}
      class="w-full bg-dc-50 py-12 md:py-16 relative"
    >
      {/* Full-width container for arrows */}
      <div class="absolute inset-0 flex items-center justify-between px-0 md:px-8 pointer-events-none z-10">
        {/* Left Arrow */}
        <button
          type="button"
          aria-label="Previous posts"
          onClick={() => navigate("prev")}
          class="nav-arrow pointer-events-auto w-9 h-9 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-dc-100 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-dc-200 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="text-dc-500 w-5 h-5 md:w-6 md:h-6 lg:w-10 lg:h-10"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          type="button"
          aria-label="Next posts"
          onClick={() => navigate("next")}
          class="nav-arrow pointer-events-auto w-9 h-9 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-dc-100 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-dc-200 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="text-dc-500 w-5 h-5 md:w-6 md:h-6 lg:w-10 lg:h-10"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Content Container */}
      <div class="w-full max-w-[1440px] mx-auto flex flex-col gap-12 md:gap-14 px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div class="section-header flex items-center justify-between">
          <h2 class="text-dc-800 text-3xl sm:text-4xl lg:text-[56px] font-semibold leading-[1.2] tracking-[-1.68px]">
            {heading}
          </h2>
          <a
            href={ctaHref}
            class="bg-dc-50 border border-dc-300 rounded-xl px-5 py-3 flex items-center justify-center hover:bg-dc-100 transition-colors"
          >
            <span class="text-dc-800 text-base lg:text-lg font-semibold leading-tight whitespace-nowrap">
              {ctaText}
            </span>
          </a>
        </div>

        {/* Carousel Container */}
        <div
          ref={cardsContainerRef}
          class="cards-container w-full overflow-hidden"
        >
          <div
            ref={trackRef}
            class="flex gap-6 will-change-transform"
          >
            {extendedItems.map((post, index) => (
              <div
                key={`${post.slug || post.title || "post"}-${index}`}
                class="post-card flex-shrink-0 w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

