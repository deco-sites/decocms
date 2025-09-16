import type { ImageWidget } from "apps/admin/widgets.ts";

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
  partners?: Partner[];
  title?: string;
  subtitle?: string;
}

const TIER_COLORS = {
  "Registered": "bg-gray-100 text-gray-800",
  "Certified": "bg-blue-100 text-blue-800", 
  "Premier": "bg-purple-100 text-purple-800",
  "Elite": "bg-yellow-100 text-yellow-800"
};

const TYPE_COLORS = {
  "SI/Agency": "bg-green-100 text-green-800",
  "ISV": "bg-orange-100 text-orange-800",
  "Technology": "bg-indigo-100 text-indigo-800",
  "Training": "bg-pink-100 text-pink-800"
};

export default function PartnerDirectory({
  partners = [],
  title = "Partner Directory",
  subtitle = "Find the right partner for your project"
}: Props) {
  return (
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Search and Filters */}
        <div class="mb-12 space-y-6">
          {/* Search Bar */}
          <div class="flex flex-col md:flex-row gap-4 items-center">
            <div class="w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search partners (name, bio, verticals, stacks…)"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                data-analytics="directory_search_used"
              />
            </div>
            
            <div class="flex gap-2 items-center">
              <select class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="relevance">Relevance</option>
                <option value="tier">Tier (desc)</option>
                <option value="launches">Most launches</option>
                <option value="nps">Highest NPS</option>
              </select>
            </div>
          </div>

          {/* Filter Chips */}
          <div class="flex flex-wrap gap-2">
            <button class="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
              Type ▼
            </button>
            <button class="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
              Tier ▼
            </button>
            <button class="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
              Certifications ▼
            </button>
            <button class="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
              Verticals ▼
            </button>
            <button class="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
              Geos ▼
            </button>
            <button class="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
              Stacks ▼
            </button>
            <button class="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50">
              Languages ▼
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {partners.length === 0 ? (
          <div class="text-center py-16">
            <p class="text-xl text-gray-600 mb-4">
              No matches yet. Try removing filters or tell us what you need
            </p>
            <a
              href="/partners/deal-registration"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Register a project →
            </a>
          </div>
        ) : (
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.slug}
                class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                data-analytics="directory_partner_card_viewed"
                data-partner-slug={partner.slug}
              >
                {/* Logo and Header */}
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="text-lg font-semibold text-gray-900">
                        {partner.name}
                      </h3>
                      <span class={`px-2 py-1 rounded-full text-xs font-medium ${TIER_COLORS[partner.tier]}`}>
                        {partner.tier}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                  {partner.bio}
                </p>

                {/* Type and Certifications */}
                <div class="flex flex-wrap gap-1 mb-3">
                  {partner.type.map((type) => (
                    <span
                      key={type}
                      class={`px-2 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[type] || "bg-gray-100 text-gray-800"}`}
                    >
                      {type}
                    </span>
                  ))}
                  {partner.certifications.map((cert) => (
                    <span
                      key={cert}
                      class="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                    >
                      {cert}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div class="flex flex-wrap gap-1 mb-4">
                  {[...partner.verticals, ...partner.stacks, ...partner.languages].slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      class="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                {(partner.launches || partner.nps) && (
                  <div class="flex gap-4 text-sm text-gray-600 mb-4">
                    {partner.launches && (
                      <span>{partner.launches} launches</span>
                    )}
                    {partner.nps && (
                      <span>NPS: {partner.nps}</span>
                    )}
                  </div>
                )}

                {/* CTA */}
                <a
                  href={`/find-a-partner/${partner.slug}`}
                  class="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View profile
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {partners.length > 0 && (
          <div class="flex justify-center mt-12">
            <div class="flex gap-2">
              <button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">
                1
              </button>
              <button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                2
              </button>
              <button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                3
              </button>
              <button class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}