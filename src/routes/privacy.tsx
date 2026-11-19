import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/views/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: 'Privacy Policy | Leopard International Shipping & Logistics' },
      { name: "description", content: 'How Leopard handles the information you share through this website.' },
      { property: "og:title", content: 'Privacy Policy | Leopard International Shipping & Logistics' },
      { property: "og:description", content: 'How Leopard handles the information you share through this website.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <LegalPage kind="privacy" />,
});
