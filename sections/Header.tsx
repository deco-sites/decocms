import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface MenuItem {
  label: string;
  href?: string;
}

export interface Props {
  /**
   * @title Logo image
   */
  logo?: ImageWidget;
  menuItems?: MenuItem[];
  ctaHref?: string;
  ctaText?: string;
}

export default function Header({
  logo,
  menuItems = [
    { label: "Apps", href: "/apps" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Community", href: "/community" },
    { label: "Resources", href: "/resources" },
  ],
  ctaHref = "/",
  ctaText = "Get started",
}: Props) {
  return (
    <div class="p-2 pb-0 relative">
      <header class="bg-dc-100 rounded-[24px] rounded-b-none px-4 sm:px-6 lg:px-10 py-4 flex items-center">
        {/* Left Section - Logo */}
        <div class="flex-1 flex justify-start">
          <a href="/" class="w-10 h-10 px-2 flex justify-center items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity">
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
                  <div class="w-7 h-7 left-0 top-0 absolute bg-[#07401A]"></div>
                  <div class="w-5 h-5 left-[3.60px] top-[3.74px] absolute bg-[#D0EC1A]">
                  </div>
                </div>
              )}
          </a>
        </div>

        {/* Center Section - Desktop Navigation */}
        <div class="hidden lg:flex lg:justify-center">
          <div class="p-1 bg-[#E7E5E4] rounded-2xl flex justify-center items-center gap-12">
            <div class="flex justify-center items-center gap-2">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  class="px-4 py-1.5 rounded-full flex justify-center items-center gap-2"
                >
                  <a
                    href={item.href}
                    class="text-[#1C1917] text-sm font-normal leading-tight hover:text-[#07401A] transition-colors"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Mobile Menu Button + CTA Button */}
        <div class="flex-1 flex justify-end items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            class="lg:hidden p-2 text-[#1C1917] hover:text-[#07401A] transition-colors"
            aria-label="Toggle menu"
            onclick="document.getElementById('mobile-menu').classList.toggle('hidden')"
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
          </button>

          {/* CTA Button */}
          <a
            href={ctaHref}
            class="h-10 px-3 sm:px-4 py-1.5 bg-[#D0EC1A] rounded-xl flex justify-center items-center gap-2 shrink-0 hover:bg-[#C5E016] transition-colors"
          >
            <span class="text-[#07401A] text-xs sm:text-sm font-medium leading-tight">
              {ctaText}
            </span>
          </a>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        class="lg:hidden hidden absolute top-full left-2 right-2 bg-[#F1F0EF] rounded-b-2xl border-t border-[#E7E5E4] z-50"
      >
        <div class="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              class="block px-4 py-3 text-[#1C1917] text-sm font-normal leading-tight hover:bg-[#E7E5E4] rounded-xl transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
