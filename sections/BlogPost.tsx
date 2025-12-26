import Image from "apps/website/components/Image.tsx";
import Button from "site/islands/Button.tsx";
import Icon from "site/components/ui/Icon.tsx";
import BlogAuthorTag from "../components/blog/BlogAuthorTag.tsx";
import { BlogPostPage } from "apps/blog/types.ts";
import { BlockRenderer } from "../components/blog/BlockRenderer.tsx";

interface Props {
  /**
   * @description The blog post page data
   */
  page?: BlogPostPage | null;
}

// Figma-accurate markdown typography styles
const PARAGRAPH_STYLES =
  "[&_p]:text-dc-600 [&_p]:text-[16px] [&_p]:font-normal [&_p]:font-sans [&_p]:leading-[1.5] [&_p]:mb-6 [&_p]:break-words";

const HEADING_STYLES =
  "[&>h1]:text-dc-800 [&>h1]:text-[30px] [&>h1]:font-bold [&>h1]:font-sans [&>h1]:leading-[1.25] [&>h1]:mt-2 [&>h1]:mb-4 [&>h1]:break-words " +
  "[&>h2]:text-dc-800 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:font-sans [&>h2]:leading-[1.25] [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:break-words " +
  "[&>h3]:text-dc-800 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:font-sans [&>h3]:leading-[1.25] [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:break-words " +
  "[&>h4]:text-dc-800 [&>h4]:text-base [&>h4]:font-semibold [&>h4]:font-sans [&>h4]:leading-[1.5] [&>h4]:mt-6 [&>h4]:mb-4 [&>h4]:break-words " +
  "[&>h5]:text-dc-800 [&>h5]:text-sm [&>h5]:font-medium [&>h5]:font-sans [&>h5]:leading-[1.5] [&>h5]:mt-4 [&>h5]:mb-4 [&>h5]:break-words " +
  "[&>h6]:text-dc-800 [&>h6]:text-sm [&>h6]:font-medium [&>h6]:font-sans [&>h6]:leading-[1.5] [&>h6]:mt-4 [&>h6]:mb-4 [&>h6]:break-words";

const CODE_BLOCK_STYLES =
  "[&>pre]:bg-[#f5f5f4] [&>pre]:text-dc-600 [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-[16px] [&>pre]:rounded-[2px] [&>pre]:overflow-x-auto [&>pre]:max-w-full [&>pre]:my-4 [&>pre]:leading-[1.5] " +
  "[&_pre_code]:block [&_pre_code]:w-full [&_pre_code]:whitespace-pre " +
  "[&_code]:bg-[#f5f5f4] [&_code]:text-dc-800 [&_code]:px-2 [&_code]:py-px [&_code]:rounded-md [&_code]:font-mono [&_code]:text-[16px] [&_code]:leading-[1.5]";

const IMAGE_STYLES =
  "[&_img]:rounded-lg [&_img]:w-full [&_img]:h-auto [&_img]:my-6 [&_img]:object-cover";

const BLOCKQUOTE_STYLES =
  "[&>blockquote]:my-8 [&>blockquote]:border-l-4 [&>blockquote]:border-dc-200 [&>blockquote]:text-[16px] [&>blockquote]:pl-6 [&>blockquote]:text-dc-800 [&>blockquote]:leading-[1.5] [&>blockquote]:break-words " +
  "[&_blockquote[data-quote]]:border-l-4 [&_blockquote[data-quote]]:border-l-primary-dark [&_blockquote[data-quote]]:bg-dc-50 [&_blockquote[data-quote]]:border [&_blockquote[data-quote]]:border-dc-200 [&_blockquote[data-quote]]:p-6 [&_blockquote[data-quote]]:rounded-lg [&_blockquote[data-quote]]:my-8 " +
  "[&_blockquote[data-quote]_cite]:block [&_blockquote[data-quote]_cite]:mt-3 [&_blockquote[data-quote]_cite]:text-sm [&_blockquote[data-quote]_cite]:not-italic [&_blockquote[data-quote]_cite]:text-dc-600 [&_blockquote[data-quote]_cite]:font-semibold";

const LIST_STYLES =
  "[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-dc-600 [&>ul]:text-[16px] [&>ul]:font-normal [&>ul]:font-sans [&>ul]:leading-[1.5] [&>ul]:break-words " +
  "[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-dc-600 [&>ol]:text-[16px] [&>ol]:font-normal [&>ol]:font-sans [&>ol]:leading-[1.5] [&>ol]:break-words";

const LINK_STYLES =
  "[&_a:not([data-btn])]:text-[16px] [&_a:not([data-btn])]:leading-[1.5] [&_a:not([data-btn])]:break-words [&_a:not([data-btn])]:transition-opacity [&_a:not([data-btn]):hover]:opacity-80" +
  " [&_a:not([data-btn])]:!text-[#7f9300]";

const HR_STYLES =
  "[&>hr]:my-8 [&>hr]:border-0 [&>hr]:border-t [&>hr]:border-dc-200";

const TABLE_STYLES =
  "[&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_table]:border-spacing-0 [&_table]:my-6 [&_table]:overflow-hidden [&_table]:border [&_table]:border-dc-200 [&_table]:rounded-lg " +
  "[&_thead]:bg-dc-100 " +
  "[&_thead_th]:text-dc-800 [&_thead_th]:font-semibold [&_thead_th]:text-sm " +
  "[&_th]:px-4 [&_th]:py-3 [&_th]:border-b [&_th]:border-dc-200 [&_th]:text-left [&_th]:whitespace-nowrap " +
  "[&_td]:px-4 [&_td]:py-3 [&_td]:border-b [&_td]:border-dc-100 [&_td]:text-dc-600 [&_td]:text-[16px] [&_td]:align-middle [&_td]:leading-[1.5] " +
  "[&_tbody_tr:last-child_td]:border-b-0 " +
  "[&_tbody_tr:hover]:bg-dc-50 [&_tbody_tr]:transition-colors";

const FIGURE_STYLES = "[&_figure]:my-6 " +
  "[&_figure_img]:rounded-lg [&_figure_img]:w-full [&_figure_img]:h-auto " +
  "[&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:text-dc-600 [&_figcaption]:text-center [&_figcaption]:italic [&_figcaption]:leading-[1.5]";

const DETAILS_STYLES =
  "[&_details]:my-6 [&_details]:border [&_details]:border-dc-200 [&_details]:rounded-xl [&_details]:p-4 [&_details]:bg-white " +
  "[&_summary]:cursor-pointer [&_summary]:font-semibold [&_summary]:text-dc-800 [&_summary]:text-[16px] [&_summary]:select-none [&_summary]:flex [&_summary]:items-center [&_summary]:gap-2 " +
  "[&_details[open]_summary]:mb-3 " +
  "[&_summary::-webkit-details-marker]:hidden [&_summary::marker]:hidden";

// Figma callout styles - default and specific types
const CALLOUT_STYLES =
  "[&_div[data-callout]]:bg-white [&_div[data-callout]]:border [&_div[data-callout]]:border-dc-200 [&_div[data-callout]]:rounded-xl [&_div[data-callout]]:p-6 [&_div[data-callout]]:my-6 [&_div[data-callout]]:flex [&_div[data-callout]]:flex-col [&_div[data-callout]]:gap-2 " +
  "[&_div[data-callout]_strong]:text-[16px] [&_div[data-callout]_strong]:font-medium [&_div[data-callout]_strong]:text-dc-800 [&_div[data-callout]_strong]:block [&_div[data-callout]_strong]:leading-[1.5] " +
  "[&_div[data-callout]_p]:text-[16px] [&_div[data-callout]_p]:text-dc-600 [&_div[data-callout]_p]:mb-0 [&_div[data-callout]_p]:leading-[1.5] " +
  "[&_div[data-callout]_ul]:text-[16px] [&_div[data-callout]_ul]:leading-[1.5] " +
  "[&_div[data-callout]_ol]:text-[16px] [&_div[data-callout]_ol]:leading-[1.5] " +
  "[&_div[data-callout]_li]:text-[16px] [&_div[data-callout]_li]:leading-[1.5] " +
  "[&_div[data-callout='info']]:bg-sky-50 [&_div[data-callout='info']]:border-sky-200 [&_div[data-callout='info']_p]:text-sky-900 " +
  "[&_div[data-callout='warning']]:bg-amber-50 [&_div[data-callout='warning']]:border-amber-200 [&_div[data-callout='warning']_p]:text-amber-900 " +
  "[&_div[data-callout='tip']]:bg-lime-50 [&_div[data-callout='tip']]:border-lime-300 [&_div[data-callout='tip']_p]:text-lime-900 " +
  "[&_div[data-callout='success']]:bg-lime-50 [&_div[data-callout='success']]:border-lime-300 [&_div[data-callout='success']_p]:text-lime-900 " +
  "[&_div[data-callout='danger']]:bg-red-50 [&_div[data-callout='danger']]:border-red-300 [&_div[data-callout='danger']_p]:text-red-900";

// Figma card styles - vertical/column layout
const CARD_STYLES =
  "[&_div[data-card]]:bg-white [&_div[data-card]]:border [&_div[data-card]]:border-dc-200 [&_div[data-card]]:rounded-xl [&_div[data-card]]:p-6 [&_div[data-card]]:my-6 [&_div[data-card]]:flex [&_div[data-card]]:flex-col [&_div[data-card]]:items-start [&_div[data-card]]:gap-4 " +
  "[&_div[data-card-icon]]:size-6 [&_div[data-card-icon]]:text-dc-600 [&_div[data-card-icon]]:shrink-0 " +
  "[&_div[data-card-content]]:flex [&_div[data-card-content]]:flex-col [&_div[data-card-content]]:gap-0.5 [&_div[data-card-content]]:w-full " +
  "[&_div[data-card]_h3]:text-[16px] [&_div[data-card]_h3]:font-medium [&_div[data-card]_h3]:text-dc-800 [&_div[data-card]_h3]:mb-0 [&_div[data-card]_h3]:mt-0 [&_div[data-card]_h3]:leading-[1.5] " +
  "[&_div[data-card]_h4]:text-[16px] [&_div[data-card]_h4]:font-medium [&_div[data-card]_h4]:text-dc-800 [&_div[data-card]_h4]:mb-0 [&_div[data-card]_h4]:mt-0 [&_div[data-card]_h4]:leading-[1.5] " +
  "[&_div[data-card]_p]:text-[16px] [&_div[data-card]_p]:text-dc-600 [&_div[data-card]_p]:mb-0 [&_div[data-card]_p]:leading-[1.5] " +
  "[&_div[data-card]_ul]:text-[16px] [&_div[data-card]_ul]:text-dc-600 [&_div[data-card]_ul]:leading-[1.5] " +
  "[&_div[data-card]_ol]:text-[16px] [&_div[data-card]_ol]:text-dc-600 [&_div[data-card]_ol]:leading-[1.5] " +
  "[&_div[data-card]_li]:text-[16px] [&_div[data-card]_li]:leading-[1.5] " +
  "[&_div[data-card]_strong]:text-[16px]";

const CARD_GRID_STYLES =
  "[&_div[data-card-grid]]:grid [&_div[data-card-grid]]:gap-2 [&_div[data-card-grid]]:my-6 " +
  "[&_div[data-card-grid='2']]:grid-cols-1 md:[&_div[data-card-grid='2']]:grid-cols-2 " +
  "[&_div[data-card-grid='3']]:grid-cols-1 md:[&_div[data-card-grid='3']]:grid-cols-3 " +
  "[&_div[data-card-grid='4']]:grid-cols-1 md:[&_div[data-card-grid='4']]:grid-cols-2 lg:[&_div[data-card-grid='4']]:grid-cols-4 " +
  "[&_div[data-card-grid]_div[data-card]]:my-0";

// Figma steps with vertical timeline
const STEPS_STYLES = "[&_div[data-steps]]:my-8 " +
  "[&_div[data-step]]:flex [&_div[data-step]]:gap-5 [&_div[data-step]]:items-start [&_div[data-step]]:relative [&_div[data-step]]:pb-5 " +
  "[&_div[data-step]:not(:last-child)]:after:content-[''] [&_div[data-step]:not(:last-child)]:after:absolute [&_div[data-step]:not(:last-child)]:after:left-[11px] [&_div[data-step]:not(:last-child)]:after:top-[24px] [&_div[data-step]:not(:last-child)]:after:bottom-0 [&_div[data-step]:not(:last-child)]:after:w-[2px] [&_div[data-step]:not(:last-child)]:after:bg-neutral-300 " +
  "[&_div[data-step-number]]:flex-shrink-0 [&_div[data-step-number]]:w-6 [&_div[data-step-number]]:h-6 [&_div[data-step-number]]:rounded-full [&_div[data-step-number]]:bg-primary-light [&_div[data-step-number]]:text-dc-800 [&_div[data-step-number]]:flex [&_div[data-step-number]]:items-center [&_div[data-step-number]]:justify-center [&_div[data-step-number]]:font-normal [&_div[data-step-number]]:text-[16px] [&_div[data-step-number]]:relative [&_div[data-step-number]]:z-10 [&_div[data-step-number]]:leading-none " +
  "[&_div[data-step-content]]:flex-1 [&_div[data-step-content]]:flex [&_div[data-step-content]]:flex-col [&_div[data-step-content]]:gap-2.5 [&_div[data-step-content]]:pt-0.5 " +
  "[&_div[data-step-content]_h3]:text-xl [&_div[data-step-content]_h3]:font-medium [&_div[data-step-content]_h3]:text-dc-800 [&_div[data-step-content]_h3]:mb-0 [&_div[data-step-content]_h3]:mt-0 [&_div[data-step-content]_h3]:leading-[1.5] " +
  "[&_div[data-step-content]_p]:text-[16px] [&_div[data-step-content]_p]:text-dc-600 [&_div[data-step-content]_p]:mb-0 [&_div[data-step-content]_p]:leading-[1.5] " +
  "[&_div[data-step-content]_ol]:text-[16px] [&_div[data-step-content]_ol]:leading-[1.5] " +
  "[&_div[data-step-content]_ul]:text-[16px] [&_div[data-step-content]_ul]:leading-[1.5] " +
  "[&_div[data-step-content]_li]:text-[16px] [&_div[data-step-content]_li]:leading-[1.5]";

const COLUMNS_STYLES =
  "[&_div[data-columns]]:grid [&_div[data-columns]]:gap-2 [&_div[data-columns]]:my-6 " +
  "[&_div[data-columns='2']]:grid-cols-1 md:[&_div[data-columns='2']]:grid-cols-2 " +
  "[&_div[data-columns='3']]:grid-cols-1 md:[&_div[data-columns='3']]:grid-cols-3";

const BUTTON_STYLES =
  "[&_a[data-btn]]:inline-flex [&_a[data-btn]]:items-center [&_a[data-btn]]:gap-2 [&_a[data-btn]]:px-4 [&_a[data-btn]]:py-2 [&_a[data-btn]]:h-10 [&_a[data-btn]]:rounded-xl [&_a[data-btn]]:font-medium [&_a[data-btn]]:text-[16px] [&_a[data-btn]]:leading-5 [&_a[data-btn]]:no-underline [&_a[data-btn]]:transition-all [&_a[data-btn]:hover]:opacity-90 [&_a[data-btn]]:whitespace-nowrap " +
  "[&_a[data-btn='primary']]:bg-primary-light [&_a[data-btn='primary']]:text-primary-dark [&_a[data-btn='primary']]:border-0 " +
  "[&_a[data-btn='secondary']]:bg-dc-50 [&_a[data-btn='secondary']]:text-dc-800 [&_a[data-btn='secondary']]:border [&_a[data-btn='secondary']]:border-dc-200";

const BUTTON_GROUP_STYLES =
  "[&_div[data-btn-group]]:flex [&_div[data-btn-group]]:flex-wrap [&_div[data-btn-group]]:gap-2 [&_div[data-btn-group]]:my-2";

// Figma hero box (dark box with light text)
const HERO_BOX_STYLES =
  "[&_div[data-hero-box]]:bg-primary-dark [&_div[data-hero-box]]:border [&_div[data-hero-box]]:border-dc-200 [&_div[data-hero-box]]:rounded-xl [&_div[data-hero-box]]:p-6 [&_div[data-hero-box]]:my-6 [&_div[data-hero-box]]:flex [&_div[data-hero-box]]:flex-col [&_div[data-hero-box]]:gap-6 " +
  "[&_div[data-hero-box='accent']]:bg-purple-dark " +
  "[&_div[data-hero-box-content]]:flex [&_div[data-hero-box-content]]:flex-col [&_div[data-hero-box-content]]:gap-0.5 [&_div[data-hero-box-content]]:flex-1 " +
  "[&_div[data-hero-box]_h2]:text-2xl [&_div[data-hero-box]_h2]:font-medium [&_div[data-hero-box]_h2]:mb-0 [&_div[data-hero-box]_h2]:mt-0 [&_div[data-hero-box]_h2]:text-primary-light [&_div[data-hero-box]_h2]:leading-[1.5] " +
  "[&_div[data-hero-box='accent']_h2]:text-purple-light " +
  "[&_div[data-hero-box]_h3]:text-2xl [&_div[data-hero-box]_h3]:font-medium [&_div[data-hero-box]_h3]:mb-0 [&_div[data-hero-box]_h3]:mt-0 [&_div[data-hero-box]_h3]:text-primary-light [&_div[data-hero-box]_h3]:leading-[1.5] " +
  "[&_div[data-hero-box='accent']_h3]:text-purple-light " +
  "[&_div[data-hero-box]_p]:text-[16px] [&_div[data-hero-box]_p]:mb-0 [&_div[data-hero-box]_p]:text-primary-light [&_div[data-hero-box]_p]:leading-[1.5] " +
  "[&_div[data-hero-box='accent']_p]:text-purple-light " +
  "[&_div[data-hero-box]_a]:text-[16px] " +
  "[&_div[data-hero-box]_ul]:text-[16px] [&_div[data-hero-box]_ul]:leading-[1.5] " +
  "[&_div[data-hero-box]_ol]:text-[16px] [&_div[data-hero-box]_ol]:leading-[1.5] " +
  "[&_div[data-hero-box]_li]:text-[16px] [&_div[data-hero-box]_li]:leading-[1.5]";

// Figma comparison (before/after)
const COMPARISON_STYLES =
  "[&_div[data-comparison]]:grid [&_div[data-comparison]]:grid-cols-1 md:[&_div[data-comparison]]:grid-cols-2 [&_div[data-comparison]]:gap-2 [&_div[data-comparison]]:my-6 " +
  "[&_div[data-comparison-item]]:p-6 [&_div[data-comparison-item]]:rounded-xl [&_div[data-comparison-item]]:border [&_div[data-comparison-item]]:flex [&_div[data-comparison-item]]:flex-col [&_div[data-comparison-item]]:gap-2 " +
  "[&_div[data-comparison-item='before']]:border-red-300 [&_div[data-comparison-item='before']]:bg-red-50 " +
  "[&_div[data-comparison-item='after']]:border-lime-300 [&_div[data-comparison-item='after']]:bg-lime-50 " +
  "[&_div[data-comparison-item]_h3]:text-[16px] [&_div[data-comparison-item]_h3]:font-normal [&_div[data-comparison-item]_h3]:mb-0 [&_div[data-comparison-item]_h3]:mt-0 [&_div[data-comparison-item]_h3]:leading-[1.5] " +
  "[&_div[data-comparison-item]_h4]:text-[16px] [&_div[data-comparison-item]_h4]:font-normal [&_div[data-comparison-item]_h4]:mb-0 [&_div[data-comparison-item]_h4]:mt-0 [&_div[data-comparison-item]_h4]:leading-[1.5] " +
  "[&_div[data-comparison-item='before']_h3]:text-red-900 [&_div[data-comparison-item='before']_h4]:text-red-900 [&_div[data-comparison-item='before']_p]:text-red-900 [&_div[data-comparison-item='before']_ul]:text-red-900 [&_div[data-comparison-item='before']_li]:text-red-900 [&_div[data-comparison-item='before']_strong]:text-red-900 " +
  "[&_div[data-comparison-item='after']_h3]:text-lime-900 [&_div[data-comparison-item='after']_h4]:text-lime-900 [&_div[data-comparison-item='after']_p]:text-lime-900 [&_div[data-comparison-item='after']_ul]:text-lime-900 [&_div[data-comparison-item='after']_li]:text-lime-900 [&_div[data-comparison-item='after']_strong]:text-lime-900 " +
  "[&_div[data-comparison-item]_p]:text-[16px] [&_div[data-comparison-item]_p]:font-normal [&_div[data-comparison-item]_p]:mb-0 [&_div[data-comparison-item]_p]:leading-[1.5] " +
  "[&_div[data-comparison-item]_ul]:list-disc [&_div[data-comparison-item]_ul]:ml-6 [&_div[data-comparison-item]_ul]:text-[16px] [&_div[data-comparison-item]_ul]:mb-0 " +
  "[&_div[data-comparison-item]_ol]:list-decimal [&_div[data-comparison-item]_ol]:ml-6 [&_div[data-comparison-item]_ol]:text-[16px] [&_div[data-comparison-item]_ol]:mb-0 " +
  "[&_div[data-comparison-item]_li]:leading-[1.5] [&_div[data-comparison-item]_li]:mb-2 [&_div[data-comparison-item]_li]:text-[16px] " +
  "[&_div[data-comparison-item]_strong]:text-[16px]";

const STATS_STYLES =
  "[&_div[data-stats]]:grid [&_div[data-stats]]:grid-cols-1 md:[&_div[data-stats]]:grid-cols-3 [&_div[data-stats]]:gap-2.5 [&_div[data-stats]]:my-6 " +
  "[&_div[data-stat]]:p-8 [&_div[data-stat]]:rounded-xl [&_div[data-stat]]:bg-white [&_div[data-stat]]:border [&_div[data-stat]]:border-dc-200 [&_div[data-stat]]:flex [&_div[data-stat]]:flex-col [&_div[data-stat]]:gap-0.5 " +
  "[&_div[data-stat-number]]:text-5xl [&_div[data-stat-number]]:font-bold [&_div[data-stat-number]]:text-dc-800 [&_div[data-stat-number]]:mb-0 [&_div[data-stat-number]]:leading-none " +
  "[&_div[data-stat-label]]:text-[16px] [&_div[data-stat-label]]:text-dc-800 [&_div[data-stat-label]]:font-normal [&_div[data-stat-label]]:leading-[1.5]";

const TIMELINE_STYLES = "[&_div[data-timeline]]:my-8 " +
  "[&_div[data-timeline-item]]:flex [&_div[data-timeline-item]]:gap-4 [&_div[data-timeline-item]]:items-start [&_div[data-timeline-item]]:relative [&_div[data-timeline-item]]:pb-8 [&_div[data-timeline-item]:last-child]:pb-0 " +
  "[&_div[data-timeline-item]:not(:last-child)]:after:content-[''] [&_div[data-timeline-item]:not(:last-child)]:after:absolute [&_div[data-timeline-item]:not(:last-child)]:after:left-[5px] [&_div[data-timeline-item]:not(:last-child)]:after:top-[12px] [&_div[data-timeline-item]:not(:last-child)]:after:bottom-0 [&_div[data-timeline-item]:not(:last-child)]:after:w-[2px] [&_div[data-timeline-item]:not(:last-child)]:after:bg-dc-200 " +
  "[&_div[data-timeline-date]]:flex-shrink-0 [&_div[data-timeline-date]]:w-3 [&_div[data-timeline-date]]:h-3 [&_div[data-timeline-date]]:rounded-full [&_div[data-timeline-date]]:bg-primary-light [&_div[data-timeline-date]]:border-2 [&_div[data-timeline-date]]:border-primary-dark [&_div[data-timeline-date]]:relative [&_div[data-timeline-date]]:z-10 [&_div[data-timeline-date]]:mt-1 " +
  "[&_div[data-timeline-content]]:flex-1 " +
  "[&_div[data-timeline-content]_h4]:text-lg [&_div[data-timeline-content]_h4]:font-bold [&_div[data-timeline-content]_h4]:text-primary-dark [&_div[data-timeline-content]_h4]:mb-2 [&_div[data-timeline-content]_h4]:mt-0 [&_div[data-timeline-content]_h4]:leading-[1.5] " +
  "[&_div[data-timeline-content]_p]:text-[16px] [&_div[data-timeline-content]_p]:text-dc-600 [&_div[data-timeline-content]_p]:mb-0 [&_div[data-timeline-content]_p]:leading-[1.5]";

const CHECKLIST_STYLES =
  "[&_div[data-checklist]]:flex [&_div[data-checklist]]:flex-col [&_div[data-checklist]]:my-6 " +
  "[&_div[data-check]]:flex [&_div[data-check]]:items-center [&_div[data-check]]:gap-2.5 [&_div[data-check]]:py-2 [&_div[data-check]]:text-[16px] [&_div[data-check]]:text-dc-600 [&_div[data-check]]:leading-[1.5] [&_div[data-check]]:relative [&_div[data-check]]:pl-7 " +
  "[&_div[data-check]]:before:content-['✓'] [&_div[data-check]]:before:absolute [&_div[data-check]]:before:left-0 [&_div[data-check]]:before:flex [&_div[data-check]]:before:items-center [&_div[data-check]]:before:justify-center [&_div[data-check]]:before:w-4 [&_div[data-check]]:before:h-4 [&_div[data-check]]:before:rounded-full [&_div[data-check]]:before:bg-green-600 [&_div[data-check]]:before:text-white [&_div[data-check]]:before:text-xs [&_div[data-check]]:before:font-bold [&_div[data-check]]:before:shrink-0";

const VIDEO_STYLES =
  "[&_div[data-video]]:relative [&_div[data-video]]:w-full [&_div[data-video]]:aspect-video [&_div[data-video]]:my-8 [&_div[data-video]]:rounded-xl [&_div[data-video]]:overflow-hidden [&_div[data-video]]:bg-dc-100 " +
  "[&_div[data-video]_iframe]:absolute [&_div[data-video]_iframe]:inset-0 [&_div[data-video]_iframe]:w-full [&_div[data-video]_iframe]:h-full [&_div[data-video]_iframe]:border-0";

export const CONTENT_STYLES =
  `${PARAGRAPH_STYLES} ${HEADING_STYLES} ${CODE_BLOCK_STYLES} ${IMAGE_STYLES} ${BLOCKQUOTE_STYLES} ${LIST_STYLES} ${LINK_STYLES} ${HR_STYLES} ${TABLE_STYLES} ${FIGURE_STYLES} ${DETAILS_STYLES} ${CALLOUT_STYLES} ${CARD_STYLES} ${CARD_GRID_STYLES} ${STEPS_STYLES} ${COLUMNS_STYLES} ${BUTTON_STYLES} ${BUTTON_GROUP_STYLES} ${HERO_BOX_STYLES} ${COMPARISON_STYLES} ${STATS_STYLES} ${TIMELINE_STYLES} ${CHECKLIST_STYLES} ${VIDEO_STYLES}`;

const DEFAULT_AVATAR =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e";

const DEFAULT_PROPS: BlogPostPage["post"] = {
  title: "Connect Your AI Workforce to Your Entire Tech Stack",
  excerpt: "Excerpt goes here",
  authors: [
    {
      name: "Full name",
      email: "author@deco.cx",
      image: DEFAULT_AVATAR,
    },
  ],
  categories: [
    { name: "Platform", slug: "platform" },
    { name: "Updates", slug: "updates" },
  ],
  date: "2025-05-21",
  image:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9",
  slug: "blog-post",
  content:
    '<h1>Heading 1</h1><p>This is a paragraph under <strong>Heading 1</strong>. It can contain <em>italic</em> text, <strong>bold</strong> text, and even <code>code snippets</code>.</p><h2>Introduction</h2><p>Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p><p>Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.</p><h2>Heading 2</h2><p>More text can be placed here. This section is under <strong>Heading 2</strong>.</p><h3>Heading 3 with Code Block</h3><p>This is an example of a code block:</p><pre><code>// This is a code block console.log("Hello, World!");</code></pre><h4>Heading 4 with Image</h4><p>Below is an image:</p><img src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9" alt="Description of Image"><p><strong>Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.</strong></p><p>Collaboratively deploy intuitive partnerships whereas customized e-markets. Energistically maintain performance based strategic theme areas whereas just in time methodologies. Phosfluorescently drive functionalized intellectual capital and.</p><blockquote>"Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus."</blockquote><p>Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.<h2>Conclusion</h2><p>Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.</p><p>Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.</p><p>Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.</p>',
};

export default function BlogPost({ page }: Props) {
  // Add null checks when destructuring
  const post = page?.post || DEFAULT_PROPS;
  const title = post?.title || "";
  const authors = post?.authors || [];
  const image = post?.image || "";
  const date = post?.date || "";
  const content = post?.content || "";
  const categories = post?.categories || [];

  const formattedDate = date
    ? (() => {
      try {
        const dateObj = new Date(date);
        const dateStr = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const timeStr = dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return `${dateStr} at ${timeStr}`;
      } catch (e) {
        return date;
      }
    })()
    : "";

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-w-full relative bg-dc-50 flex flex-col justify-start items-center gap-12 md:gap-16 lg:gap-20 overflow-hidden px-4 md:px-8 lg:px-16 pt-16 md:pt-32">
        <div className="w-full md:w-[700px] max-w-[700px] flex flex-col justify-start items-start gap-6 md:gap-8 relative z-10">
          <div className="self-stretch flex flex-col justify-start items-center gap-6">
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div className="w-full flex justify-center">
                <Button
                  href="/blog"
                  variant="ghost"
                  size="small"
                >
                  <Icon name="arrow_back" class="text-dc-600" />
                  <span>Blog</span>
                </Button>
              </div>
              <h1 className="self-stretch text-center text-dc-800 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold font-sans leading-tight">
                {title}
              </h1>
            </div>
            <div className="inline-flex flex-wrap justify-center items-center gap-2 md:gap-4">
              {/* Authors */}
              <BlogAuthorTag
                authors={authors}
                avatarSize={32}
                showName={true}
                textSize="base"
                textColor="text-dc-600"
                outlineColor="outline-white"
              />

              {/* Date */}
              {formattedDate && (
                <>
                  <div className="w-1 h-1 bg-dc-500 rounded-[1px]"></div>
                  <div className="justify-start text-dc-600 text-base md:text-lg lg:text-xl font-medium font-sans">
                    {formattedDate}
                  </div>
                </>
              )}

              {/* Categories */}
              {categories && categories.length > 0 && (
                <>
                  <div className="w-1 h-1 bg-dc-500 rounded-[1px]"></div>
                  <div className="flex flex-wrap justify-start items-start gap-2">
                    {categories.map((category, index) => {
                      if (!category) return null;
                      return (
                        <a
                          href={`/blog/${category.slug}`}
                          key={index}
                          className="px-3 md:px-4 py-1 bg-dc-50 rounded-full outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center gap-2 hover:bg-dc-100 transition-colors"
                        >
                          <div className="justify-center text-dc-600 text-sm md:text-base font-semibold font-sans leading-tight">
                            {category.name}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="self-stretch pb-4 md:pb-6 flex flex-col justify-start items-center relative z-10">
          <div className="w-full md:w-[934px] aspect-video bg-primary-light rounded-2xl md:rounded-[32px] overflow-hidden">
            {image && (
              <Image
                src={image}
                alt={title}
                width={934}
                height={623}
                class="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full min-w-full bg-dc-50 flex justify-center items-start px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="flex-1 max-w-full md:max-w-[700px] flex flex-col justify-start items-start">
          {(() => {
            // Check if content is already an array (parsed from JSON)
            if (Array.isArray(content)) {
              return (
                <div className="w-full" id="blog-post-content">
                  <BlockRenderer blocks={content} />
                </div>
              );
            }

            // Try to detect if content is structured blocks (JSON string)
            if (
              content && typeof content === "string" &&
              content.trim().startsWith("[")
            ) {
              try {
                const parsed = JSON.parse(content);
                if (Array.isArray(parsed)) {
                  return (
                    <div className="w-full" id="blog-post-content">
                      <BlockRenderer blocks={parsed} />
                    </div>
                  );
                }
              } catch (e) {
                // Not valid JSON, fall through to HTML rendering
              }
            }

            // Fallback to legacy HTML string rendering
            return (
              <div
                className={`${CONTENT_STYLES} w-full`}
                id="blog-post-content"
                dangerouslySetInnerHTML={{
                  __html:
                    typeof content === "string"
                      ? content.replaceAll("&lt;iframe", "<iframe ").replaceAll(
                        "&lt;/iframe&gt;",
                        " </iframe>",
                      ).replaceAll("allowfullscreen&gt;", "allowfullscreen>")
                      : "",
                }}
              />
            );
          })()}
        </div>
      </div>
    </>
  );
}

export function loader(
  props: Props,
  req: Request,
  ctx: any,
) {
  try {
    const relatedLoader = ctx.invoke("blog/loaders/BlogpostList.ts", {
      count: 3,
      postSlugs: [], // Empty to get all posts
      sortBy: "date_desc",
    });

    return {
      ...props,
      relatedPosts: relatedLoader?.posts || [],
    };
  } catch (error) {
    console.error("Error in BlogPost loader:", error);
    return props;
  }
}
