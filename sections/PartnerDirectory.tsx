import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "../components/ui/Button.tsx";

export interface Partner {
  slug: string;
  logo: ImageWidget;
  name: string;
  tier: "Registered" | "Certified" | "Premier" | "Elite";
  bio: string;
  type: string[];
  certifications: string[];
  verticals: string[];
  stacks: string[];
  languages: string[];
  geos: string[];
  launches?: number;
  nps?: number;
}

export interface Props {
  /** @title Section Title */
  title?: string;
  /** @title Section Subtitle */
  subtitle?: string;
  /** @title Partners List */
  partners?: Partner[];
}

const TIER_COLORS = {
  "Registered": "bg-dc-100 text-dc-700",
  "Certified": "bg-primary text-primary-light",
  "Premier": "bg-tertiary text-primary-light",
  "Elite": "bg-warning text-dc-900",
};

const TYPE_COLORS = {
  "SI/Agency": "bg-success/10 text-success",
  "ISV": "bg-warning/10 text-warning",
  "Technology": "bg-info/10 text-info",
  "Training": "bg-error/10 text-error",
};

export default function PartnerDirectory({
  title = "Partner Directory",
  subtitle = "Find the right partner for your project",
  partners = [],
}: Props) {
  return (
    <section className="w-full bg-dc-50 py-16 sm:py-20 lg:py-32">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-14">
          <div className="flex flex-col gap-3 items-start justify-center max-w-lg">
            {title && (
              <h2 className="text-dc-800 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-dc-500 text-base sm:text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search partners (name, bio, verticals, stacks…)"
                  className="w-full px-4 py-3 border border-dc-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-dc-800"
                  data-analytics="directory_search_used"
                />
              </div>

              <div className="flex gap-2 items-center">
                <select className="px-4 py-3 border border-dc-200 rounded-lg focus:ring-2 focus:ring-primary bg-white text-dc-800">
                  <option value="relevance">Relevance</option>
                  <option value="tier">Tier (desc)</option>
                  <option value="launches">Most launches</option>
                  <option value="nps">Highest NPS</option>
                </select>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 bg-white border border-dc-200 rounded-full text-sm hover:bg-dc-50 text-dc-700">
                Type ▼
              </button>
              <button className="px-3 py-1 bg-white border border-dc-200 rounded-full text-sm hover:bg-dc-50 text-dc-700">
                Tier ▼
              </button>
              <button className="px-3 py-1 bg-white border border-dc-200 rounded-full text-sm hover:bg-dc-50 text-dc-700">
                Certifications ▼
              </button>
              <button className="px-3 py-1 bg-white border border-dc-200 rounded-full text-sm hover:bg-dc-50 text-dc-700">
                Verticals ▼
              </button>
              <button className="px-3 py-1 bg-white border border-dc-200 rounded-full text-sm hover:bg-dc-50 text-dc-700">
                Geos ▼
              </button>
              <button className="px-3 py-1 bg-white border border-dc-200 rounded-full text-sm hover:bg-dc-50 text-dc-700">
                Stacks ▼
              </button>
              <button className="px-3 py-1 bg-white border border-dc-200 rounded-full text-sm hover:bg-dc-50 text-dc-700">
                Languages ▼
              </button>
            </div>
          </div>

          {/* Results Grid */}
          {partners.length === 0
            ? (
              <div className="text-center py-16">
                <p className="text-xl text-dc-500 mb-6">
                  No matches yet. Try removing filters or tell us what you need
                </p>
                <Button
                  variant="primary"
                  size="medium"
                  href="/partners/deal-registration"
                  className="!bg-primary !text-primary-light hover:!bg-primary/90"
                >
                  Register a project
                </Button>
              </div>
            )
            : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map((partner) => (
                  <div
                    key={partner.slug}
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 border border-dc-200"
                    data-analytics="directory_partner_card_viewed"
                    data-partner-slug={partner.slug}
                  >
                    {/* Logo and Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-dc-50 rounded-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={64}
                          height={64}
                          loading="lazy"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-medium text-dc-800">
                            {partner.name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              TIER_COLORS[partner.tier]
                            }`}
                          >
                            {partner.tier}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-dc-500 text-sm mb-4 line-clamp-3">
                      {partner.bio}
                    </p>

                    {/* Type and Certifications */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {partner.type.map((type) => (
                        <span
                          key={type}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            TYPE_COLORS[type] || "bg-dc-100 text-dc-700"
                          }`}
                        >
                          {type}
                        </span>
                      ))}
                      {partner.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {[
                        ...partner.verticals,
                        ...partner.stacks,
                        ...partner.languages,
                      ].slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full text-xs bg-dc-100 text-dc-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    {(partner.launches || partner.nps) && (
                      <div className="flex gap-4 text-sm text-dc-500 mb-4">
                        {partner.launches && (
                          <span>{partner.launches} launches</span>
                        )}
                        {partner.nps && <span>NPS: {partner.nps}</span>}
                      </div>
                    )}

                    {/* CTA */}
                    <Button
                      variant="primary"
                      size="small"
                      href={`/find-a-partner/${partner.slug}`}
                      className="w-full !bg-primary !text-primary-light hover:!bg-primary/90"
                    >
                      View profile
                    </Button>
                  </div>
                ))}
              </div>
            )}

          {/* Pagination */}
          {partners.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-dc-200 rounded-lg text-dc-600 hover:bg-dc-50">
                  Previous
                </button>
                <button className="px-4 py-2 bg-primary text-primary-light rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 border border-dc-200 rounded-lg text-dc-600 hover:bg-dc-50">
                  2
                </button>
                <button className="px-4 py-2 border border-dc-200 rounded-lg text-dc-600 hover:bg-dc-50">
                  3
                </button>
                <button className="px-4 py-2 border border-dc-200 rounded-lg text-dc-600 hover:bg-dc-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
