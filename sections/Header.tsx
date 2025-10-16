import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import GitHubStars from "../islands/GitHubStars.tsx";
import Button from "../components/ui/Button.tsx";

export interface MenuItem {
  label: string;
  href?: string;
  /**
   * @title Dropdown items
   * @description Optional list of submenu items for dropdowns
   */
  items?: Array<{
    /** @title Label */
    label: string;
    /** @title Href */
    href: string;
  }>;
}

export interface Props {
  /**
   * @title Logo image
   */
  logo?: ImageWidget;
  menuItems?: MenuItem[];
  ctaHref?: string;
  ctaText?: string;
  /**
   * @title GitHub Repository
   * @description Repository in format "owner/repo" to fetch stars from
   */
  githubRepo?: string;
  /**
   * @title GitHub Icon
   * @description Icon for GitHub stars display
   */
  githubIcon?: ImageWidget;
}

// moved to island in ../islands/GitHubStars.tsx

export default function Header({
  logo,
  menuItems = [
    { label: "Apps", href: "/apps" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Community", href: "/community" },
    { label: "Resources", href: "/resources" },
  ],
  ctaHref = "/",
  ctaText = "Start now (beta)",
  githubRepo = "deco-cx/chat",
  githubIcon,
}: Props) {
  return (
    <div class="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 pt-8">
      <header class="flex items-center justify-between rounded-2xl">
        {/* Left Section - Logo */}
        <div class="flex-1 flex justify-start">
          <a
            href="/"
            class="flex items-center gap-2.5 px-2 h-10 hover:opacity-80 transition-opacity"
          >
            {logo
              ? (
                <Image
                  src={logo}
                  alt="Logo"
                  width={28}
                  height={28}
                  class="w-7 h-7 object-contain"
                />
              )
              : (
                <div class="w-7 h-7 relative">
                  <div class="w-7 h-7 absolute bg-primary-dark rounded-sm">
                  </div>
                  <div class="w-5 h-5 absolute left-1 top-1 bg-primary-light rounded-sm">
                  </div>
                </div>
              )}
          </a>
        </div>

        {/* Center Section - Desktop Navigation */}
        <div class="hidden lg:flex">
          <div class="backdrop-blur-sm bg-white/80 rounded-2xl p-1 flex items-center gap-12">
            <div class="flex items-center gap-2">
              {menuItems.map((item, index) => (
                <div key={index} class="relative group" tabIndex={0}>
                  {item.items && item.items.length > 0
                    ? (
                      <div class="px-4 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer text-dc-800 hover:text-primary-dark transition-colors">
                        <span class="text-sm font-normal leading-tight">
                          {item.label}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          class="text-dc-600"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        {/* Dropdown Panel */}
                        <div class="hidden group-hover:block group-focus-within:block absolute left-0 top-full mt-0 inline-block w-max rounded-2xl bg-white/95 backdrop-blur-sm border border-dc-200 shadow-lg py-2 z-50">
                          {item.items.map((sub, subIndex) => (
                            <a
                              key={subIndex}
                              href={sub.href}
                              class="block px-4 py-2 text-sm text-dc-800 hover:bg-dc-100 rounded-xl mx-2"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )
                    : (
                      <div class="px-4 py-1.5 rounded-full flex items-center gap-2">
                        <a
                          href={item.href}
                          class="text-dc-800 text-sm font-normal leading-tight hover:text-primary-dark transition-colors"
                        >
                          {item.label}
                        </a>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - GitHub Stars + Mobile Menu Button + CTA Button */}
        <div class="flex-1 flex justify-end items-center gap-2.5">
          {/* GitHub Stars - Hidden on mobile */}
          <div class="hidden sm:block">
            <GitHubStars repo={githubRepo} icon={githubIcon} />
          </div>

          {/* Mobile Menu Button */}
          <label
            for="mobile-menu-toggle"
            class="lg:hidden p-2 text-dc-800 hover:text-primary-dark cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </label>

          {/* CTA Button - hidden on mobile */}
          <div class="hidden sm:block">
            <Button
              variant="primary"
              size="small"
              href={ctaHref}
              className="!bg-primary-dark !text-primary-light hover:bg-primary-dark/90"
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Toggle (checkbox) */}
      <input
        id="mobile-menu-toggle"
        type="checkbox"
        class="peer hidden lg:hidden"
      />

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        class="lg:hidden hidden peer-checked:block absolute top-full left-4 right-4 bg-white/95 backdrop-blur-sm rounded-b-2xl border-t border-dc-200 z-50 mt-2"
      >
        <div class="p-4 space-y-2">
          {menuItems.map((item, index) => (
            item.items && item.items.length > 0
              ? (
                <details class="px-2" key={index}>
                  <summary class="list-none flex items-center justify-between px-2 py-3 text-dc-800 text-sm font-normal leading-tight hover:bg-dc-100 rounded-xl cursor-pointer">
                    <span>{item.label}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      class="text-dc-600"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </summary>
                  <div class="mt-1 pl-2">
                    {item.items.map((sub, subIndex) => (
                      <a
                        key={subIndex}
                        href={sub.href}
                        class="block px-4 py-2 text-dc-800 text-sm font-normal leading-tight hover:bg-dc-100 rounded-xl transition-colors"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </details>
              )
              : (
                <a
                  key={index}
                  href={item.href}
                  class="block px-4 py-3 text-dc-800 text-sm font-normal leading-tight hover:bg-dc-100 rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              )
          ))}
          {/* GitHub Stars in mobile menu */}
          <div class="px-4 py-3 sm:hidden">
            <GitHubStars repo={githubRepo} icon={githubIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}
