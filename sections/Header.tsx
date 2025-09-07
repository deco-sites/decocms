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
    { label: "Resources", href: "/resources" }
  ],
  ctaHref = "/",
  ctaText = "Get started",
}: Props) {
  return (
    <>
      <header class="bg-[#F1F0EF] rounded-t-[24px] px-4 sm:px-6 lg:px-10 py-4 rounded-2xl relative flex items-center">
        {/* Logo */}
        <div class="w-10 h-10 px-2 flex justify-center items-center gap-2.5 shrink-0">
          {logo ? (
            <Image
              src={logo}
              alt="Logo"
              width={28}
              height={28}
              class="w-7 h-7 object-contain"
            />
          ) : (
            <div class="w-7 h-7 relative">
              <div class="w-7 h-7 left-0 top-0 absolute bg-[#07401A]"></div>
              <div class="w-5 h-5 left-[3.60px] top-[3.74px] absolute bg-[#D0EC1A]"></div>
            </div>
          )}
        </div>

        {/* Desktop Navigation - Absolutely centered, hidden on mobile */}
        <div class="hidden lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:p-1 lg:bg-[#E7E5E4] lg:rounded-2xl lg:flex lg:justify-center lg:items-center lg:gap-12">
          <div class="flex justify-center items-center gap-2">
            {menuItems.map((item, index) => (
              <div key={index} class="px-4 py-1.5 rounded-full flex justify-center items-center gap-2">
                <a href={item.href} class="text-[#1C1917] text-sm font-normal leading-tight hover:text-[#07401A] transition-colors">
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          class="lg:hidden ml-auto mr-4 p-2 text-[#1C1917] hover:text-[#07401A] transition-colors" 
          aria-label="Toggle menu"
          onclick="document.getElementById('mobile-menu').classList.toggle('hidden')"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        {/* CTA Button */}
        <a href={ctaHref} class="h-10 px-3 sm:px-4 py-1.5 bg-[#D0EC1A] rounded-xl flex justify-center items-center gap-2 shrink-0 hover:bg-[#C5E016] transition-colors">
          <span class="text-[#07401A] text-xs sm:text-sm font-medium leading-tight">{ctaText}</span>
        </a>
      </header>

      {/* Mobile Menu */}
      <div id="mobile-menu" class="lg:hidden hidden bg-[#F1F0EF] mx-4 sm:mx-6 rounded-b-2xl border-t border-[#E7E5E4]">
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
    </>
  );
}