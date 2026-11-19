import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/views/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: 'Terms & Conditions | Leopard International Shipping & Logistics' },
      { name: "description", content: 'Terms and conditions for the use of the Leopard International Shipping & Logistics website.' },
      { property: "og:title", content: 'Terms & Conditions | Leopard International Shipping & Logistics' },
      { property: "og:description", content: 'Terms and conditions for the use of the Leopard International Shipping & Logistics website.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <LegalPage kind="terms" />,
});
