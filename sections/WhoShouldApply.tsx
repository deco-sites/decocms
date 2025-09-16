import { CheckCircle, GraduationCap, Target, Users, Zap } from "lucide-preact";

export interface PartnerType {
  /** @title Partner Type */
  title: string;
  /** @title Description */
  description: string;
  /** @title Icon */
  /** @description Choose from: target, users, zap, graduation-cap */
  icon: "target" | "users" | "zap" | "graduation-cap";
}

export interface Requirement {
  /** @title Requirement */
  text: string;
}

export interface Props {
  /** @title Section Subtitle */
  subtitle?: string;
  /** @title Section Title */
  title?: string;
  /** @title Partner Types */
  partnerTypes?: PartnerType[];
  /** @title Minimum Readiness Title */
  readinessTitle?: string;
  /** @title Minimum Requirements */
  requirements?: Requirement[];
}

export default function WhoShouldApply({
  subtitle,
  title,
  partnerTypes = [],
  readinessTitle,
  requirements = [],
}: Props) {
  const getIcon = (iconName: string) => {
    const iconProps = {
      size: 32,
      strokeWidth: 2,
      class: "text-current",
    };

    switch (iconName) {
      case "target":
        return <Target {...iconProps} />;
      case "users":
        return <Users {...iconProps} />;
      case "zap":
        return <Zap {...iconProps} />;
      case "graduation-cap":
        return <GraduationCap {...iconProps} />;
      default:
        return <Target {...iconProps} />;
    }
  };

  return (
    <section className="w-full bg-dc-50 py-16 sm:py-20 lg:py-32">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
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

          {/* Partner Types - Clean List */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {partnerTypes.map((type, index) => (
              <div key={index} className="flex items-start gap-6 sm:gap-8">
                {/* Icon */}
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-primary-light rounded-full flex items-center justify-center">
                  <div className="text-primary-dark">
                    {getIcon(type.icon)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 sm:pt-3">
                  <h3 className="text-dc-800 text-xl sm:text-2xl lg:text-3xl font-medium leading-tight mb-2 sm:mb-3">
                    {type.title}
                  </h3>
                  <p className="text-dc-500 text-lg sm:text-xl leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Minimum Readiness - Modern Card */}
          {readinessTitle && requirements.length > 0 && (
            <div className="bg-gradient-to-br from-dc-100 to-dc-200 rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6">
                <h3 className="text-dc-800 text-xl sm:text-2xl lg:text-3xl font-medium leading-tight">
                  {readinessTitle}
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {requirements.map((requirement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-white/70 rounded-xl backdrop-blur-sm"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircle
                          size={20}
                          strokeWidth={2}
                          className="text-primary-dark"
                        />
                      </div>
                      <p className="text-dc-700 text-base sm:text-lg leading-relaxed">
                        {requirement.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
