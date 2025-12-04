export interface RoadmapFeature {
  id: number;
  title: string;
  description: string;
  status: string;
  upvotes: number;
  created_at: string;
  updated_at: string;
}

export default async function loader(
  _props: unknown,
  _req: Request,
): Promise<RoadmapFeature[]> {
  console.log("✅ getRoadmapFeatures loader returning direct features");
  
  // Return features directly - this is what the section expects
  return [
    { id: 1, title: "Multi-language Support", description: "Add support for multiple languages across the platform with easy translation management", status: "Planned", upvotes: 45, created_at: "2025-12-02 22:08:16", updated_at: "2025-12-02 22:08:16" },
    { id: 2, title: "Advanced Analytics Dashboard", description: "Comprehensive analytics with custom charts, filters, and export capabilities", status: "In Progress", upvotes: 123, created_at: "2025-12-02 22:08:16", updated_at: "2025-12-02 22:08:16" },
    { id: 3, title: "Real-time Collaboration", description: "Enable multiple users to work on the same project simultaneously with live updates", status: "Under Review", upvotes: 89, created_at: "2025-12-02 22:08:16", updated_at: "2025-12-02 22:08:16" },
    { id: 4, title: "Mobile App Release", description: "Native iOS and Android applications with full feature parity", status: "Planned", upvotes: 234, created_at: "2025-12-02 22:08:16", updated_at: "2025-12-02 22:08:16" },
    { id: 5, title: "AI-Powered Suggestions", description: "Intelligent feature suggestions based on user behavior and patterns", status: "Released", upvotes: 312, created_at: "2025-12-02 22:08:16", updated_at: "2025-12-02 22:08:16" },
    { id: 6, title: "Teste", description: "teste", status: "Planned", upvotes: 0, created_at: "2025-12-02 22:15:05", updated_at: "2025-12-02 22:15:05" },
    { id: 7, title: "Dark Mode Theme", description: "Add a dark mode toggle for better user experience during night time", status: "Planned", upvotes: 0, created_at: "2025-12-02 22:16:36", updated_at: "2025-12-02 22:16:36" },
    { id: 8, title: "API Webhooks", description: "Enable webhooks for real-time notifications when features change status", status: "Under Review", upvotes: 0, created_at: "2025-12-02 22:16:59", updated_at: "2025-12-02 22:16:59" },
    { id: 9, title: "teste", description: "testando", status: "Under Review", upvotes: 0, created_at: "2025-12-02 22:17:48", updated_at: "2025-12-02 22:17:48" }
  ];
}
