import { createFileRoute } from "@tanstack/react-router";
import { AcademyPage } from "@/views/AcademyPage";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Leopard Academy | Free Shipping & Trade Learning" },
      { name: "description", content: "Free video lessons and an e-book library on import, export, customs clearance and international shipping." },
      { property: "og:title", content: "Leopard Academy | Free Shipping & Trade Learning" },
      { property: "og:description", content: "Free video lessons and an e-book library on import, export, customs clearance and international shipping." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <AcademyPage />,
});
