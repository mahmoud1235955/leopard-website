import { createFileRoute } from "@tanstack/react-router";
import { QuotePage } from "@/views/QuotePage";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: 'Request a Quote | Leopard International Shipping & Logistics' },
      { name: "description", content: 'Request a shipping quotation for air, sea, or land freight. Share your shipment details and receive a tailored offer.' },
      { property: "og:title", content: 'Request a Quote | Leopard International Shipping & Logistics' },
      { property: "og:description", content: 'Request a shipping quotation for air, sea, or land freight. Share your shipment details and receive a tailored offer.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <QuotePage />,
});
