import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/views/ServicesPages";

export const Route = createFileRoute("/services_/import-export")({
  head: () => ({
    meta: [
      { title: 'Our Services | Air, Sea, Land Freight & Customs Clearance' },
      { name: "description", content: 'Air freight, sea freight, customs clearance, land freight, and import & export services — coordinated as one service.' },
      { property: "og:title", content: 'Our Services | Air, Sea, Land Freight & Customs Clearance' },
      { property: "og:description", content: 'Air freight, sea freight, customs clearance, land freight, and import & export services — coordinated as one service.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ServiceDetailPage serviceKey="importExport" />,
});
