import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/views/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: 'Contact Us | Leopard International Shipping & Logistics' },
      { name: "description", content: 'Contact Leopard by email, WhatsApp, or phone, or visit our office in Sheraton, Fifth District, Cairo, Egypt.' },
      { property: "og:title", content: 'Contact Us | Leopard International Shipping & Logistics' },
      { property: "og:description", content: 'Contact Leopard by email, WhatsApp, or phone, or visit our office in Sheraton, Fifth District, Cairo, Egypt.' },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ContactPage />,
});
