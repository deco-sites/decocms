import Image from "apps/website/components/Image.tsx";
import Button from "site/components/ui/Button.tsx";
import Icon from "site/components/ui/Icon.tsx";
import BlogAuthorTag from "../components/blog/BlogAuthorTag.tsx";
import { BlogPostPage } from "apps/blog/types.ts";

interface Props {
  /**
   * @description The blog post page data
   */
  page?: BlogPostPage | null;
}

// Content styling with responsive design
const PARAGRAPH_STYLES =
  "[&_p]:text-dc-600 [&_p]:text-base [&_p]:md:text-lg [&_p]:lg:text-xl [&_p]:font-normal [&_p]:font-sans [&_p]:leading-relaxed [&_p]:md:leading-loose [&_p]:mb-4 [&_p]:md:mb-6 [&_p]:break-words [&_p]:hyphens-auto";

const HEADING_STYLES =
  "[&>h1]:text-dc-800 [&>h1]:text-2xl [&>h1]:md:text-3xl [&>h1]:lg:text-4xl [&>h1]:font-semibold [&>h1]:font-sans [&>h1]:leading-tight [&>h1]:my-6 [&>h1]:md:my-8 [&>h1]:lg:my-10 [&>h1]:break-words " +
  "[&>h2]:text-dc-800 [&>h2]:text-xl [&>h2]:md:text-2xl [&>h2]:lg:text-3xl [&>h2]:font-semibold [&>h2]:font-sans [&>h2]:leading-tight [&>h2]:md:leading-10 [&>h2]:mt-8 [&>h2]:md:mt-10 [&>h2]:mb-4 [&>h2]:md:mb-6 [&>h2]:break-words " +
  "[&>h3]:text-dc-800 [&>h3]:text-lg [&>h3]:md:text-xl [&>h3]:lg:text-2xl [&>h3]:font-semibold [&>h3]:font-sans [&>h3]:leading-tight [&>h3]:md:leading-7 [&>h3]:mt-6 [&>h3]:md:mt-8 [&>h3]:lg:mt-10 [&>h3]:mb-3 [&>h3]:md:mb-4 [&>h3]:break-words " +
  "[&>h4]:text-dc-800 [&>h4]:text-base [&>h4]:md:text-lg [&>h4]:lg:text-xl [&>h4]:font-semibold [&>h4]:font-sans [&>h4]:leading-tight [&>h4]:md:leading-7 [&>h4]:mt-6 [&>h4]:md:mt-8 [&>h4]:mb-3 [&>h4]:md:mb-4 [&>h4]:break-words " +
  "[&>h5]:text-dc-800 [&>h5]:text-sm [&>h5]:md:text-base [&>h5]:lg:text-lg [&>h5]:font-semibold [&>h5]:font-sans [&>h5]:leading-tight [&>h5]:mt-4 [&>h5]:md:mt-6 [&>h5]:mb-2 [&>h5]:md:mb-3 [&>h5]:break-words " +
  "[&>h6]:text-dc-800 [&>h6]:text-sm [&>h6]:md:text-base [&>h6]:font-semibold [&>h6]:font-sans [&>h6]:leading-tight [&>h6]:mt-4 [&>h6]:md:mt-6 [&>h6]:mb-2 [&>h6]:md:mb-3 [&>h6]:break-words";

const CODE_BLOCK_STYLES =
  "[&>pre]:bg-dc-100 [&>pre]:text-dc-800 [&>pre]:p-3 [&>pre]:md:p-4 [&>pre]:font-mono [&>pre]:text-xs [&>pre]:md:text-sm [&>pre]:border [&>pre]:border-dc-200 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:max-w-full [&>pre]:my-4 [&>pre]:md:my-6 " +
  "[&_pre_code]:block [&_pre_code]:w-full [&_pre_code]:break-all md:[&_pre_code]:break-normal " +
  "[&_pre[data-lang]]:relative [&_pre[data-lang]::before]:content-[attr(data-lang)] [&_pre[data-lang]::before]:absolute [&_pre[data-lang]::before]:top-2 [&_pre[data-lang]::before]:right-3 [&_pre[data-lang]::before]:text-xs [&_pre[data-lang]::before]:px-2 [&_pre[data-lang]::before]:py-0.5 [&_pre[data-lang]::before]:rounded [&_pre[data-lang]::before]:bg-dc-200 [&_pre[data-lang]::before]:text-dc-700 [&_pre[data-lang]::before]:uppercase [&_pre[data-lang]::before]:font-semibold";

const IMAGE_STYLES =
  "[&_img]:rounded-lg [&_img]:md:rounded-2xl [&_img]:w-full [&_img]:h-auto [&_img]:my-6 [&_img]:md:my-8 [&_img]:lg:my-12 [&_img]:object-cover";

const BLOCKQUOTE_STYLES =
  "[&>blockquote]:my-4 [&>blockquote]:md:my-6 [&>blockquote]:border-l-4 [&>blockquote]:border-dc-300 [&>blockquote]:text-base [&>blockquote]:md:text-lg [&>blockquote]:lg:text-xl [&>blockquote]:italic [&>blockquote]:pl-4 [&>blockquote]:md:pl-6 [&>blockquote]:text-dc-600 [&>blockquote]:break-words " +
  "[&_blockquote[data-quote]]:border-l-4 [&_blockquote[data-quote]]:border-l-primary-dark [&_blockquote[data-quote]]:bg-dc-50 [&_blockquote[data-quote]]:border [&_blockquote[data-quote]]:border-dc-200 [&_blockquote[data-quote]]:p-4 md:[&_blockquote[data-quote]]:p-6 [&_blockquote[data-quote]]:rounded-lg [&_blockquote[data-quote]]:my-6 md:[&_blockquote[data-quote]]:my-8 " +
  "[&_blockquote[data-quote]_cite]:block [&_blockquote[data-quote]_cite]:mt-3 [&_blockquote[data-quote]_cite]:text-sm [&_blockquote[data-quote]_cite]:not-italic [&_blockquote[data-quote]_cite]:text-dc-500 [&_blockquote[data-quote]_cite]:font-semibold";

const LIST_STYLES =
  "[&>ul]:list-disc [&>ul]:pl-4 [&>ul]:md:pl-6 [&>ul]:mb-4 [&>ul]:md:mb-6 [&>ul]:text-dc-600 [&>ul]:text-base [&>ul]:md:text-lg [&>ul]:lg:text-xl [&>ul]:font-medium [&>ul]:font-sans [&>ul]:leading-relaxed [&>ul]:md:leading-loose [&>ul]:break-words " +
  "[&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:md:pl-6 [&>ol]:mb-4 [&>ol]:md:mb-6 [&>ol]:text-dc-600 [&>ol]:text-base [&>ol]:md:text-lg [&>ol]:lg:text-xl [&>ol]:font-medium [&>ol]:font-sans [&>ol]:leading-relaxed [&>ol]:md:leading-loose [&>ol]:break-words";

const LINK_STYLES =
  "[&_a]:underline [&_a]:decoration-dc-300 [&_a]:underline-offset-2 [&_a:hover]:opacity-80 [&_a]:transition-opacity [&_a]:break-words" +
  " [&_a]:!text-[#8CAA25]";

const HR_STYLES =
  "[&>hr]:my-8 md:[&>hr]:my-12 [&>hr]:border-0 [&>hr]:border-t [&>hr]:border-dc-200";

const TABLE_STYLES =
  "[&_table]:w-full [&_table]:text-left [&_table]:border-collapse [&_table]:border-spacing-0 [&_table]:my-6 md:[&_table]:my-8 [&_table]:overflow-hidden [&_table]:border [&_table]:border-dc-200 [&_table]:rounded-lg " +
  "[&_thead]:bg-dc-100 " +
  "[&_thead_th]:text-dc-800 [&_thead_th]:font-semibold [&_thead_th]:text-sm md:[&_thead_th]:text-base " +
  "[&_th]:px-3 md:[&_th]:px-4 [&_th]:py-2 md:[&_th]:py-3 [&_th]:border-b [&_th]:border-dc-200 [&_th]:text-left [&_th]:whitespace-nowrap " +
  "[&_td]:px-3 md:[&_td]:px-4 [&_td]:py-2 md:[&_td]:py-3 [&_td]:border-b [&_td]:border-dc-100 [&_td]:text-dc-600 [&_td]:text-sm md:[&_td]:text-base [&_td]:align-middle " +
  "[&_tbody_tr:last-child_td]:border-b-0 " +
  "[&_tbody_tr:hover]:bg-dc-50 [&_tbody_tr]:transition-colors";

const FIGURE_STYLES = "[&_figure]:my-8 md:[&_figure]:my-12 " +
  "[&_figure_img]:rounded-xl [&_figure_img]:w-full [&_figure_img]:h-auto " +
  "[&_figcaption]:mt-3 [&_figcaption]:text-sm md:[&_figcaption]:text-base [&_figcaption]:text-dc-500 [&_figcaption]:text-center [&_figcaption]:italic";

const DETAILS_STYLES =
  "[&_details]:my-4 md:[&_details]:my-6 [&_details]:border [&_details]:border-dc-200 [&_details]:rounded-lg [&_details]:p-4 [&_details]:bg-dc-50 " +
  "[&_summary]:cursor-pointer [&_summary]:font-semibold [&_summary]:text-dc-800 [&_summary]:text-base md:[&_summary]:text-lg [&_summary]:select-none " +
  "[&_details[open]_summary]:mb-3 " +
  "[&_summary::-webkit-details-marker]:hidden [&_summary::marker]:hidden";

const CALLOUT_STYLES =
  "[&_div[data-callout]]:bg-white [&_div[data-callout]]:border [&_div[data-callout]]:border-dc-200 [&_div[data-callout]]:border-b-4 [&_div[data-callout]]:border-b-primary-light [&_div[data-callout]]:rounded-lg [&_div[data-callout]]:p-4 md:[&_div[data-callout]]:p-6 [&_div[data-callout]]:my-6 md:[&_div[data-callout]]:my-8 " +
  "[&_div[data-callout]_strong]:font-semibold [&_div[data-callout]_strong]:text-dc-800 [&_div[data-callout]_strong]:block [&_div[data-callout]_strong]:mb-2 [&_div[data-callout]_strong]:text-base md:[&_div[data-callout]_strong]:text-lg " +
  "[&_div[data-callout]_p]:text-sm md:[&_div[data-callout]_p]:text-base [&_div[data-callout]_p]:text-dc-600 [&_div[data-callout]_p]:mb-0 [&_div[data-callout]_p]:leading-relaxed";

const CARD_STYLES =
  "[&_div[data-card]]:bg-white [&_div[data-card]]:border [&_div[data-card]]:border-dc-200 [&_div[data-card]]:rounded-xl [&_div[data-card]]:p-6 md:[&_div[data-card]]:p-8 [&_div[data-card]]:my-4 " +
  "[&_div[data-card='accent']]:bg-primary-light [&_div[data-card='accent']]:border-primary-dark " +
  "[&_div[data-card-icon]]:text-4xl md:[&_div[data-card-icon]]:text-5xl [&_div[data-card-icon]]:mb-4 " +
  "[&_div[data-card]_h3]:text-lg md:[&_div[data-card]_h3]:text-xl [&_div[data-card]_h3]:font-semibold [&_div[data-card]_h3]:text-dc-800 [&_div[data-card]_h3]:mb-2 [&_div[data-card]_h3]:mt-0 " +
  "[&_div[data-card]_h4]:text-base md:[&_div[data-card]_h4]:text-lg [&_div[data-card]_h4]:font-semibold [&_div[data-card]_h4]:text-dc-800 [&_div[data-card]_h4]:mb-2 [&_div[data-card]_h4]:mt-0 " +
  "[&_div[data-card]_p]:text-sm md:[&_div[data-card]_p]:text-base [&_div[data-card]_p]:text-dc-600 [&_div[data-card]_p]:mb-0 [&_div[data-card]_p]:leading-relaxed";

const CARD_GRID_STYLES =
  "[&_div[data-card-grid]]:grid [&_div[data-card-grid]]:gap-6 md:[&_div[data-card-grid]]:gap-8 [&_div[data-card-grid]]:my-6 md:[&_div[data-card-grid]]:my-8 " +
  "[&_div[data-card-grid='2']]:grid-cols-1 md:[&_div[data-card-grid='2']]:grid-cols-2 " +
  "[&_div[data-card-grid='3']]:grid-cols-1 md:[&_div[data-card-grid='3']]:grid-cols-3 " +
  "[&_div[data-card-grid='4']]:grid-cols-1 md:[&_div[data-card-grid='4']]:grid-cols-2 lg:[&_div[data-card-grid='4']]:grid-cols-4 " +
  "[&_div[data-card-grid]_div[data-card]]:my-0";

const STEPS_STYLES = "[&_div[data-steps]]:my-8 md:[&_div[data-steps]]:my-12 " +
  "[&_div[data-step]]:flex [&_div[data-step]]:gap-4 md:[&_div[data-step]]:gap-6 [&_div[data-step]]:items-start [&_div[data-step]]:relative [&_div[data-step]]:pb-8 md:[&_div[data-step]]:pb-12 " +
  "[&_div[data-step]:not(:last-child)]:after:content-[''] [&_div[data-step]:not(:last-child)]:after:absolute [&_div[data-step]:not(:last-child)]:after:left-[19px] md:[&_div[data-step]:not(:last-child)]:after:left-[23px] [&_div[data-step]:not(:last-child)]:after:top-[40px] md:[&_div[data-step]:not(:last-child)]:after:top-[48px] [&_div[data-step]:not(:last-child)]:after:bottom-0 [&_div[data-step]:not(:last-child)]:after:w-[2px] [&_div[data-step]:not(:last-child)]:after:bg-dc-200 " +
  "[&_div[data-step-number]]:flex-shrink-0 [&_div[data-step-number]]:w-10 md:[&_div[data-step-number]]:w-12 [&_div[data-step-number]]:h-10 md:[&_div[data-step-number]]:h-12 [&_div[data-step-number]]:rounded-full [&_div[data-step-number]]:bg-primary-light [&_div[data-step-number]]:text-primary-dark [&_div[data-step-number]]:flex [&_div[data-step-number]]:items-center [&_div[data-step-number]]:justify-center [&_div[data-step-number]]:font-bold [&_div[data-step-number]]:text-lg md:[&_div[data-step-number]]:text-xl [&_div[data-step-number]]:relative [&_div[data-step-number]]:z-10 " +
  "[&_div[data-step-content]]:flex-1 [&_div[data-step-content]]:flex [&_div[data-step-content]]:flex-col [&_div[data-step-content]]:justify-center " +
  "[&_div[data-step-content]_h3]:text-lg md:[&_div[data-step-content]_h3]:text-xl [&_div[data-step-content]_h3]:font-semibold [&_div[data-step-content]_h3]:mb-3 [&_div[data-step-content]_h3]:mt-0 [&_div[data-step-content]_h3]:leading-tight " +
  "[&_div[data-step-content]_p]:text-sm md:[&_div[data-step-content]_p]:text-base [&_div[data-step-content]_p]:mb-3 " +
  "[&_p[data-step-goal]]:font-semibold [&_p[data-step-goal]]:text-primary-dark [&_p[data-step-goal]]:mt-4";

const COLUMNS_STYLES =
  "[&_div[data-columns]]:grid [&_div[data-columns]]:gap-6 md:[&_div[data-columns]]:gap-8 [&_div[data-columns]]:my-6 md:[&_div[data-columns]]:my-8 " +
  "[&_div[data-columns='2']]:grid-cols-1 md:[&_div[data-columns='2']]:grid-cols-2 " +
  "[&_div[data-columns='3']]:grid-cols-1 md:[&_div[data-columns='3']]:grid-cols-3";

const BUTTON_STYLES =
  "[&_a[data-btn]]:inline-flex [&_a[data-btn]]:items-center [&_a[data-btn]]:gap-2 [&_a[data-btn]]:px-4 md:[&_a[data-btn]]:px-6 [&_a[data-btn]]:py-2 md:[&_a[data-btn]]:py-3 [&_a[data-btn]]:rounded-lg [&_a[data-btn]]:font-semibold [&_a[data-btn]]:text-sm md:[&_a[data-btn]]:text-base [&_a[data-btn]]:no-underline [&_a[data-btn]]:transition-all [&_a[data-btn]:hover]:opacity-90 [&_a[data-btn]:hover]:scale-105 " +
  "[&_a[data-btn='primary']]:bg-primary-light [&_a[data-btn='primary']]:text-primary-dark [&_a[data-btn='primary']]:border-0 " +
  "[&_a[data-btn='secondary']]:bg-dc-800 [&_a[data-btn='secondary']]:text-white [&_a[data-btn='secondary']]:border-0 " +
  "[&_a[data-btn='ghost']]:bg-transparent [&_a[data-btn='ghost']]:text-dc-800 [&_a[data-btn='ghost']]:border [&_a[data-btn='ghost']]:border-dc-300";

const BUTTON_GROUP_STYLES =
  "[&_div[data-btn-group]]:flex [&_div[data-btn-group]]:flex-wrap [&_div[data-btn-group]]:gap-3 md:[&_div[data-btn-group]]:gap-4 [&_div[data-btn-group]]:my-6";

const HERO_BOX_STYLES =
  "[&_div[data-hero-box]]:bg-primary-dark [&_div[data-hero-box]]:rounded-2xl [&_div[data-hero-box]]:p-8 md:[&_div[data-hero-box]]:p-12 [&_div[data-hero-box]]:my-8 md:[&_div[data-hero-box]]:my-12 [&_div[data-hero-box]]:text-center " +
  "[&_div[data-hero-box='accent']]:bg-purple-dark " +
  "[&_div[data-hero-box]>h2]:text-2xl md:[&_div[data-hero-box]>h2]:text-3xl lg:[&_div[data-hero-box]>h2]:text-4xl [&_div[data-hero-box]>h2]:font-bold [&_div[data-hero-box]>h2]:mb-4 md:[&_div[data-hero-box]>h2]:mb-6 [&_div[data-hero-box]>h2]:mt-0 [&_div[data-hero-box]>h2]:text-primary-light " +
  "[&_div[data-hero-box='accent']>h2]:text-purple-light " +
  "[&_div[data-hero-box]>h3]:text-xl md:[&_div[data-hero-box]>h3]:text-2xl [&_div[data-hero-box]>h3]:font-bold [&_div[data-hero-box]>h3]:mb-4 [&_div[data-hero-box]>h3]:mt-0 [&_div[data-hero-box]>h3]:text-primary-light " +
  "[&_div[data-hero-box='accent']>h3]:text-purple-light " +
  "[&_div[data-hero-box]>p]:text-base md:[&_div[data-hero-box]>p]:text-lg [&_div[data-hero-box]>p]:mb-6 [&_div[data-hero-box]>p]:max-w-2xl [&_div[data-hero-box]>p]:mx-auto [&_div[data-hero-box]>p]:text-primary-light " +
  "[&_div[data-hero-box='accent']>p]:text-purple-light";

const COMPARISON_STYLES =
  "[&_div[data-comparison]]:grid [&_div[data-comparison]]:grid-cols-1 md:[&_div[data-comparison]]:grid-cols-2 [&_div[data-comparison]]:gap-6 [&_div[data-comparison]]:my-6 md:[&_div[data-comparison]]:my-8 " +
  "[&_div[data-comparison-item]]:p-6 md:[&_div[data-comparison-item]]:p-8 [&_div[data-comparison-item]]:rounded-xl [&_div[data-comparison-item]]:border-2 " +
  "[&_div[data-comparison-item='before']]:border-red-200 [&_div[data-comparison-item='before']]:bg-red-50 " +
  "[&_div[data-comparison-item='after']]:border-green-200 [&_div[data-comparison-item='after']]:bg-green-50 " +
  "[&_div[data-comparison-item]_h4]:text-base md:[&_div[data-comparison-item]_h4]:text-lg [&_div[data-comparison-item]_h4]:font-semibold [&_div[data-comparison-item]_h4]:mb-3 [&_div[data-comparison-item]_h4]:mt-0 " +
  "[&_div[data-comparison-item]_p]:text-sm md:[&_div[data-comparison-item]_p]:text-base [&_div[data-comparison-item]_p]:mb-0";

const STATS_STYLES =
  "[&_div[data-stats]]:grid [&_div[data-stats]]:grid-cols-2 md:[&_div[data-stats]]:grid-cols-3 lg:[&_div[data-stats]]:grid-cols-auto [&_div[data-stats]]:gap-6 md:[&_div[data-stats]]:gap-8 [&_div[data-stats]]:my-8 md:[&_div[data-stats]]:my-12 " +
  "[&_div[data-stat]]:text-center [&_div[data-stat]]:p-6 [&_div[data-stat]]:rounded-xl [&_div[data-stat]]:bg-dc-50 [&_div[data-stat]]:border [&_div[data-stat]]:border-dc-200 " +
  "[&_div[data-stat-number]]:text-3xl md:[&_div[data-stat-number]]:text-4xl lg:[&_div[data-stat-number]]:text-5xl [&_div[data-stat-number]]:font-bold [&_div[data-stat-number]]:text-primary-dark [&_div[data-stat-number]]:mb-2 " +
  "[&_div[data-stat-label]]:text-sm md:[&_div[data-stat-label]]:text-base [&_div[data-stat-label]]:text-dc-600 [&_div[data-stat-label]]:font-medium";

const TIMELINE_STYLES =
  "[&_div[data-timeline]]:my-8 md:[&_div[data-timeline]]:my-12 " +
  "[&_div[data-timeline-item]]:flex [&_div[data-timeline-item]]:gap-4 [&_div[data-timeline-item]]:items-start [&_div[data-timeline-item]]:relative [&_div[data-timeline-item]]:pb-8 md:[&_div[data-timeline-item]]:pb-12 [&_div[data-timeline-item]:last-child]:pb-0 " +
  "[&_div[data-timeline-item]:not(:last-child)]:after:content-[''] [&_div[data-timeline-item]:not(:last-child)]:after:absolute [&_div[data-timeline-item]:not(:last-child)]:after:left-[5px] [&_div[data-timeline-item]:not(:last-child)]:after:top-[12px] [&_div[data-timeline-item]:not(:last-child)]:after:bottom-0 [&_div[data-timeline-item]:not(:last-child)]:after:w-[2px] [&_div[data-timeline-item]:not(:last-child)]:after:bg-dc-200 " +
  "[&_div[data-timeline-date]]:flex-shrink-0 [&_div[data-timeline-date]]:w-3 [&_div[data-timeline-date]]:h-3 [&_div[data-timeline-date]]:rounded-full [&_div[data-timeline-date]]:bg-primary-light [&_div[data-timeline-date]]:border-2 [&_div[data-timeline-date]]:border-primary-dark [&_div[data-timeline-date]]:relative [&_div[data-timeline-date]]:z-10 [&_div[data-timeline-date]]:mt-1 " +
  "[&_div[data-timeline-content]]:flex-1 " +
  "[&_div[data-timeline-content]_h4]:text-base md:[&_div[data-timeline-content]_h4]:text-lg [&_div[data-timeline-content]_h4]:font-bold [&_div[data-timeline-content]_h4]:text-primary-dark [&_div[data-timeline-content]_h4]:mb-2 [&_div[data-timeline-content]_h4]:mt-0 " +
  "[&_div[data-timeline-content]_p]:text-sm md:[&_div[data-timeline-content]_p]:text-base [&_div[data-timeline-content]_p]:text-dc-600 [&_div[data-timeline-content]_p]:mb-0";

const CHECKLIST_STYLES =
  "[&_div[data-checklist]]:space-y-2 [&_div[data-checklist]]:my-6 md:[&_div[data-checklist]]:my-8 " +
  "[&_div[data-check]]:flex [&_div[data-check]]:items-center [&_div[data-check]]:gap-3 [&_div[data-check]]:text-sm md:[&_div[data-check]]:text-base [&_div[data-check]]:text-dc-700 " +
  "[&_div[data-check='true']]:before:content-['✓'] [&_div[data-check='true']]:before:flex [&_div[data-check='true']]:before:items-center [&_div[data-check='true']]:before:justify-center [&_div[data-check='true']]:before:w-5 [&_div[data-check='true']]:before:h-5 [&_div[data-check='true']]:before:rounded [&_div[data-check='true']]:before:bg-green-500 [&_div[data-check='true']]:before:text-white [&_div[data-check='true']]:before:font-bold [&_div[data-check='true']]:before:text-xs " +
  "[&_div[data-check='false']]:before:content-['✗'] [&_div[data-check='false']]:before:flex [&_div[data-check='false']]:before:items-center [&_div[data-check='false']]:before:justify-center [&_div[data-check='false']]:before:w-5 [&_div[data-check='false']]:before:h-5 [&_div[data-check='false']]:before:rounded [&_div[data-check='false']]:before:bg-red-500 [&_div[data-check='false']]:before:text-white [&_div[data-check='false']]:before:font-bold [&_div[data-check='false']]:before:text-xs";

const VIDEO_STYLES =
  "[&_div[data-video]]:relative [&_div[data-video]]:w-full [&_div[data-video]]:aspect-video [&_div[data-video]]:my-8 md:[&_div[data-video]]:my-12 [&_div[data-video]]:rounded-xl [&_div[data-video]]:overflow-hidden [&_div[data-video]]:bg-dc-100 " +
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
                  <Icon name="arrow_back" class="text-dc-500" />
                  <span>Blog</span>
                </Button>
              </div>
              <h1 className="self-stretch text-center text-dc-800 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold font-sans leading-tight break-words hyphens-auto">
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
                  <div className="justify-start text-dc-500 text-base md:text-lg lg:text-xl font-medium font-sans">
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
          <div
            className={`${CONTENT_STYLES} w-full`}
            id="blog-post-content"
            dangerouslySetInnerHTML={{
              __html: content.replaceAll("&lt;iframe", "<iframe ").replaceAll(
                "&lt;/iframe&gt;",
                " </iframe>",
              ).replaceAll("allowfullscreen&gt;", "allowfullscreen>") || "",
            }}
          />
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
