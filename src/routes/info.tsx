import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/views/InfoPage";

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: 'Leopard INFO – Your Digital Business Card' },
      { name: "description", content: 'Contact Leopard International Shipping & Logistics — email, WhatsApp, phone, address, and website in one place.' },
      { property: "og:title", content: 'Leopard INFO – Your Digital Business Card' },
      { property: "og:description", content: 'Contact Leopard International Shipping & Logistics — email, WhatsApp, phone, address, and website in one place.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <InfoPage />,
});
