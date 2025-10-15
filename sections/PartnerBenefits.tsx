import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { BookmarkCheck, Sprout, Users, Trophy, Briefcase, Building2, DollarSign, Gem } from "lucide-preact";

export interface TopBenefit {
  /** @title Benefit Title */
  title: string;
  /** @title Benefit Description */
  description: string;
  /** @title Benefit Image */
  image?: ImageWidget;
}

export interface BottomBenefit {
  /** @title Benefit Title */
  title: string;
  /** @title Benefit Description */
  description: string;
  /** @title Icon Name */
  /** @description Choose from: bookmark-check, sprout, users, trophy, dollar-sign, gem, briefcase, building */
  icon: "bookmark-check" | "sprout" | "users" | "trophy" | "dollar-sign" | "gem" | "briefcase" | "building";
}

export interface Props {
  /** @title Section Subtitle */
  subtitle?: string;
  /** @title Section Title */
  title?: string;
  /** @title Top Benefits (with images) */
  topBenefits?: TopBenefit[];
  /** @title Bottom Benefits (with icons) */
  bottomBenefits?: BottomBenefit[];
}

export default function PartnerBenefits({
  subtitle,
  title,
  topBenefits = [],
  bottomBenefits = [],
}: Props) {
  const getIcon = (iconName: string) => {
    const iconProps = {
      size: 40,
      strokeWidth: 2,
      class: "text-primary-light",
    };

    switch (iconName) {
      case "bookmark-check":
        return <BookmarkCheck {...iconProps} />;
      case "sprout":
        return <Sprout {...iconProps} />;
      case "users":
        return <Users {...iconProps} />;
      case "trophy":
        return <Trophy {...iconProps} />;
      case "dollar-sign":
        return <DollarSign {...iconProps} />;
      case "gem":
        return <Gem {...iconProps} />;
      case "briefcase":
        return <Briefcase {...iconProps} />;
      case "building":
        return <Building2 {...iconProps} />;
      default:
        return <BookmarkCheck {...iconProps} />;
    }
  };

  return (
    <section className="w-full bg-dc-50 py-16 sm:py-20 lg:py-32">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-14">
          {/* Header */}
          <div className="flex flex-col gap-3 items-start justify-center max-w-lg">
            {subtitle && (
              <div className="text-dc-500 text-sm sm:text-base font-mono leading-5 uppercase tracking-wide">
                {subtitle}
              </div>
            )}
            {title && (
              <h2 className="text-dc-800 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
                {title}
              </h2>
            )}
          </div>

          {/* Bento Grid */}
          <div className="flex flex-col gap-3">
            {/* Top Row - 2 cards with images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {topBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-2 overflow-hidden flex flex-col"
                  style={{
                    background:
                      "radial-gradient(ellipse at center top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 90%)",
                  }}
                >
                  {/* Image placeholder */}
                  <div className="h-32 sm:h-40 lg:h-48 rounded-2xl mb-4 overflow-hidden">
                    {benefit.image && (
                      <Image
                        src={benefit.image}
                        alt={benefit.title}
                        width={600}
                        height={200}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-2">
                    <h3 className="text-dc-800 text-base sm:text-xl lg:text-2xl font-normal leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-dc-500 text-xl font-normal leading-tight">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row - 3 cards with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {bottomBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 sm:p-8 lg:p-10 flex flex-col gap-6 sm:gap-8"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {getIcon(benefit.icon)}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-dc-800 text-base sm:text-xl lg:text-2xl font-normal leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-dc-500 text-xl font-normal leading-tight">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
