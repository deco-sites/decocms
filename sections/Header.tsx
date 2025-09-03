// Removed ImageWidget import as logo is now hardcoded as SVG

export interface MenuItem {
  label: string;
  href?: string;
}

export interface Props {
  menuItems?: MenuItem[];
}

export default function Header({ 
  menuItems = [
    { label: "Apps", href: "/apps" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Community", href: "/community" },
    { label: "Resources", href: "/resources" }
  ]
}: Props) {
  return (
    <header class="bg-[#F1F0EF] rounded-t-[24px] px-10 py-4 rounded-2xl flex justify-between items-center">
      {/* Logo */}
      <div class="w-10 h-10 px-2 flex justify-center items-center gap-2.5">
        <div class="w-7 h-7 relative">
          <div class="w-7 h-7 left-0 top-0 absolute bg-[#07401A]"></div>
          <div class="w-5 h-5 left-[3.60px] top-[3.74px] absolute bg-[#D0EC1A]"></div>
        </div>
      </div>

      {/* Navigation */}
      <div class="p-1 bg-[#E7E5E4] rounded-2xl flex justify-start items-center gap-12">
        <div class="flex justify-start items-center gap-2">
          {menuItems.map((item, index) => (
            <div key={index} class="px-4 py-1.5 rounded-full flex justify-center items-center gap-2">
              <div class="text-[#1C1917] text-sm font-normal leading-tight">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div class="w-10 h-10 px-4 py-1.5 bg-[#D0EC1A] rounded-xl flex justify-center items-center gap-2">
        <div class="w-5 h-5 relative overflow-hidden">
          <div class="w-3 h-3 left-[4.17px] top-[4.17px] absolute border-[1.67px] border-[#07401A] rounded-sm"></div>
        </div>
      </div>
    </header>
  );
}