import { createFileRoute } from "@tanstack/react-router";
import { FeedHubPage } from "@/views/FeedHubPage";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "El-Allafa | Animal Feed Importers & Exporters Directory" },
      { name: "description", content: "Egyptian feed suppliers and Gulf importers — yellow corn, alfalfa and soybean meal — with company contact details." },
      { property: "og:title", content: "El-Allafa | Animal Feed Importers & Exporters Directory" },
      { property: "og:description", content: "Egyptian feed suppliers and Gulf importers — yellow corn, alfalfa and soybean meal — with company contact details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <FeedHubPage />,
});
