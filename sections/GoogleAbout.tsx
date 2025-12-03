import UnicornStudioBackground from "../islands/UnicornStudioBackground.tsx";

export interface GoogleService {
  /** @title Service Name */
  name: string;
  /** @title Service Description */
  description?: string;
}

export interface Props {
  /** @title Page Title */
  /** @description Main title displayed at the top */
  title?: string;
  /** @title Main Description */
  /** @description Main explanation of OAuth integration */
  mainDescription?: string;
  /** @title Google Services Title */
  servicesTitle?: string;
  /** @title Google Services */
  /** @description List of Google services integrated */
  services?: GoogleService[];
  /** @title MCP Capabilities Title */
  mcpTitle?: string;
  /** @title MCP Description */
  /** @description Explanation of MCP capabilities */
  mcpDescription?: string;
  /** @title Security Title */
  securityTitle?: string;
  /** @title Security Description */
  /** @description Security and privacy statement */
  securityDescription?: string;
  /** @title Enable Unicorn Studio Background */
  /** @description Enable animated background using Unicorn Studio */
  enableUnicornBackground?: boolean;
  /** @title Unicorn Studio Project ID */
  /** @description Project ID for Unicorn Studio animation (default: NHShCtm10Ryd0k5eAqgY) */
  unicornProjectId?: string;
}

const defaultServices: GoogleService[] = [
  { name: "Gmail", description: "Email management and automation" },
  { name: "Sheets", description: "Spreadsheet creation and data processing" },
  { name: "Docs", description: "Document creation and editing" },
  { name: "Calendar", description: "Event scheduling and management" },
  { name: "YouTube", description: "Video publishing and management" },
  { name: "Drive", description: "File storage and organization" },
  { name: "Veo", description: "Video creation and editing" },
  { name: "Google Sites", description: "Website building and publishing" },
  { name: "Slides", description: "Presentation creation and sharing" },
];

export default function GoogleAbout({
  title = "Google Integration with OAuth",
  mainDescription =
    "Deco uses Google's OAuth to ensure secure user authentication and the selected use of Google services, such as Gmail, Sheets, Docs, Calendar, YouTube, Drive, Veo, Google Sites, and Slides.",
  servicesTitle = "Integrated Google Services",
  services = defaultServices,
  mcpTitle = "AI-Powered Automation with MCPs",
  mcpDescription =
    "Our MCPs (Model Context Protocols) allow AI agents to intelligently interact with these services, automating workflows, creating and organizing files, managing appointments, publishing content, and exchanging information between Google platforms — all in an integrated and secure way.",
  securityTitle = "Security & Privacy",
  securityDescription =
    "By using Google's OAuth, we ensure that all permissions are granted transparently, adhering to the security and privacy standards defined by Google itself.",
  enableUnicornBackground = true,
  unicornProjectId = "NHShCtm10Ryd0k5eAqgY",
}: Props) {
  return (
    <section className="w-full bg-dc-50 flex flex-col p-2 relative">
      <div className="bg-primary-dark rounded-3xl relative overflow-hidden py-20 sm:py-24 px-4 sm:px-8">
        {/* Unicorn Studio Background - covers entire section */}
        {enableUnicornBackground && (
          <UnicornStudioBackground
            projectId={unicornProjectId}
            className="absolute inset-0 z-0 opacity-100"
          />
        )}

        {/* White Content Container - in front of background */}
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 lg:p-16">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-dc-900 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
                {title}
              </h1>
            </div>

            {/* Main Description */}
            <div className="mb-12">
              <p className="text-dc-800 text-lg sm:text-xl leading-relaxed">
                {mainDescription}
              </p>
            </div>

            {/* Google Services Section */}
            <div className="mb-12">
              <h2 className="text-dc-900 text-2xl sm:text-3xl font-medium mb-6 tracking-tight">
                {servicesTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-4 bg-dc-50 rounded-xl border border-dc-200 hover:border-primary-light transition-colors"
                  >
                    <h3 className="text-dc-900 text-base sm:text-lg font-medium">
                      {service.name}
                    </h3>
                    {service.description && (
                      <p className="text-dc-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* MCP Capabilities Section */}
            <div className="mb-12 p-6 sm:p-8 bg-primary-light/10 rounded-2xl border border-primary-light/20">
              <h2 className="text-dc-900 text-2xl sm:text-3xl font-medium mb-4 tracking-tight">
                {mcpTitle}
              </h2>
              <p className="text-dc-700 text-base sm:text-lg leading-relaxed">
                {mcpDescription}
              </p>
            </div>

            {/* Security Section */}
            <div className="p-6 sm:p-8 bg-dc-100 rounded-2xl border border-dc-200">
              <h2 className="text-dc-900 text-2xl sm:text-3xl font-medium mb-4 tracking-tight">
                {securityTitle}
              </h2>
              <p className="text-dc-700 text-base sm:text-lg leading-relaxed">
                {securityDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
