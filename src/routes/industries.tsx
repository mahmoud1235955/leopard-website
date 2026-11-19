import { createFileRoute } from "@tanstack/react-router";
import { IndustriesPage } from "@/views/IndustriesPage";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: 'Industries We Serve | Leopard International Shipping & Logistics' },
      { name: "description", content: 'Shipping solutions for food, textiles, chemicals, construction, electronics, medical, handicrafts, and furniture cargo.' },
      { property: "og:title", content: 'Industries We Serve | Leopard International Shipping & Logistics' },
      { property: "og:description", content: 'Shipping solutions for food, textiles, chemicals, construction, electronics, medical, handicrafts, and furniture cargo.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <IndustriesPage />,
});
