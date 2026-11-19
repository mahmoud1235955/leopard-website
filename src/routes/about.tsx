import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/views/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: 'About Us | Leopard International Shipping & Logistics' },
      { name: "description", content: 'Learn about Leopard, our mission, vision and values, and our approach to international shipping and logistics coordination.' },
      { property: "og:title", content: 'About Us | Leopard International Shipping & Logistics' },
      { property: "og:description", content: 'Learn about Leopard, our mission, vision and values, and our approach to international shipping and logistics coordination.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <AboutPage />,
});
