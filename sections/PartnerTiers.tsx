import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import {
  Briefcase,
  DollarSign,
  MapPin,
  Newspaper,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-preact";

export interface Benefit {
  /** @title Benefit Text */
  text: string;
  /** @title Icon */
  /** @description Choose from: zap, newspaper, dollar-sign, users, map-pin, briefcase, trending-up, star */
  icon:
    | "zap"
    | "newspaper"
    | "dollar-sign"
    | "users"
    | "map-pin"
    | "briefcase"
    | "trending-up"
    | "star";
}

export interface Tier {
  /** @title Tier Name */
  name: string;
  /** @title Tier Image */
  /** @description Square image (1:1 aspect ratio) for the tier */
  image?: ImageWidget;
  /** @title Requirements */
  requirements: string;
  /** @title Benefits */
  benefits: Benefit[];
}

export interface Props {
  /** @title Section Subtitle */
  subtitle?: string;
  /** @title Section Title */
  title?: string;
  /** @title Tiers */
  tiers?: Tier[];
  /** @title Full Details Note */
  fullDetailsNote?: string;
  /** @title Full Details URL */
  fullDetailsUrl?: string;
}

export default function PartnerTiers({
  subtitle,
  title,
  tiers = [],
  fullDetailsNote,
  fullDetailsUrl,
}: Props) {
  const getIcon = (iconName: string) => {
    const iconProps = {
      size: 16,
      strokeWidth: 2,
      class: "text-purple-light",
    };

    switch (iconName) {
      case "zap":
        return <Zap {...iconProps} />;
      case "newspaper":
        return <Newspaper {...iconProps} />;
      case "dollar-sign":
        return <DollarSign {...iconProps} />;
      case "users":
        return <Users {...iconProps} />;
      case "map-pin":
        return <MapPin {...iconProps} />;
      case "briefcase":
        return <Briefcase {...iconProps} />;
      case "trending-up":
        return <TrendingUp {...iconProps} />;
      case "star":
        return <Star {...iconProps} />;
      default:
        return <Zap {...iconProps} />;
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

          {/* Tiers Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 lg:gap-8 items-center"
              >
                {/* Tier Image */}
                <div className="w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex-shrink-0">
                  {tier.image
                    ? (
                      <Image
                        src={tier.image}
                        alt={`${tier.name} tier`}
                        width={160}
                        height={160}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    )
                    : (
                      <div className="w-full h-full bg-dc-100 rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-primary-dark rounded-full">
                          </div>
                        </div>
                      </div>
                    )}
                </div>

                {/* Tier Name */}
                <h3 className="text-dc-800 text-lg sm:text-2xl lg:text-3xl font-medium leading-tight text-center">
                  {tier.name}
                </h3>

                {/* Requirements */}
                <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 w-full">
                  <div className="border-t border-dc-300"></div>
                  <div className="text-dc-500 text-xs sm:text-sm font-mono leading-5 uppercase tracking-wide">
                    Requirements
                  </div>
                  <div className="text-dc-800 text-sm sm:text-base lg:text-lg leading-tight">
                    {tier.requirements}
                  </div>
                  <div className="border-t border-dc-300"></div>
                </div>

                {/* Benefits */}
                <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4 w-full">
                  <div className="text-dc-500 text-xs sm:text-sm font-mono leading-5 uppercase tracking-wide">
                    Benefits
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center gap-2"
                      >
                        <div className="flex-shrink-0 pt-1">
                          {getIcon(benefit.icon)}
                        </div>
                        <div className="text-dc-800 text-sm sm:text-base leading-tight">
                          {benefit.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Details Note */}
          {fullDetailsNote && fullDetailsUrl && (
            <div className="text-center">
              <p className="text-dc-600 text-sm md:text-base">
                <em>
                  {fullDetailsNote}{" "}
                  <a
                    href={fullDetailsUrl}
                    className="text-primary-light hover:underline font-medium"
                  >
                    {fullDetailsUrl}
                  </a>
                </em>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
