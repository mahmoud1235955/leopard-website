import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/views/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: 'Leopard International Shipping & Logistics | Freight Forwarding & Customs Clearance' },
      { name: "description", content: 'International shipping company offering air freight, sea freight, customs clearance and trade support solutions connecting businesses with global markets.' },
      { property: "og:title", content: 'Leopard International Shipping & Logistics | Freight Forwarding & Customs Clearance' },
      { property: "og:description", content: 'International shipping company offering air freight, sea freight, customs clearance and trade support solutions connecting businesses with global markets.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <HomePage />,
});
