import type { ImageWidget } from "apps/admin/widgets.ts";

export interface MenuItem {
  label: string;
  href?: string;
}

export interface Props {
  logo?: ImageWidget;
  menuItems?: MenuItem[];
  ctaText?: string;
  ctaHref?: string;
}

export default function Header({ 
  logo = "https://deco.cx/logo.svg",
  menuItems = [
    { label: "Apps", href: "/apps" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Community", href: "/community" },
    { label: "Resources", href: "/resources" }
  ],
  ctaText = "Get Started",
  ctaHref = "/get-started"
}: Props) {
  return (
    <header class="w-full bg-[#F1F0E4] border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-10 py-4">
        <div class="flex items-center justify-between">
          {/* Logo */}
          <div class="flex items-center">
            <div class="w-10 h-10 bg-[#D1EC1A] rounded-full flex items-center justify-center">
              <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 0C6.49187 0 0 6.49187 0 14.5C0 22.5081 6.49187 29 14.5 29C22.5081 29 29 22.5081 29 14.5C29 6.49187 22.5081 0 14.5 0Z" fill="#07401A"/>
                <path d="M14.5 3.625C20.5081 3.625 25.375 8.49187 25.375 14.5C25.375 20.5081 20.5081 25.375 14.5 25.375C8.49187 25.375 3.625 20.5081 3.625 14.5C3.625 8.49187 8.49187 3.625 14.5 3.625Z" fill="#D1EC1A"/>
              </svg>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav class="hidden md:flex items-center bg-[#E7E5E4] rounded-2xl px-1 py-1">
            {menuItems.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                class="px-4 py-1.5 text-sm text-[#28251F] hover:bg-white rounded-full transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div class="flex items-center">
            <a 
              href={ctaHref}
              class="bg-[#D1EC1A] text-[#07401A] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#C5E015] transition-colors flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3.33334V16.6667M3.33334 10H16.6667" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}