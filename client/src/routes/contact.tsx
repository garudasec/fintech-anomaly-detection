import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PublicLayout } from "@/components/public/PublicLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FinTech Anomaly Detection" },
      { name: "description", content: "Get in touch with the FinTech Anomaly Detection team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Inquiries"
        title="Connect with our platform team."
        body="Whether you are evaluating behavioral monitoring architectures or exploring pilot integrations, we are here to assist."
      />
    </PublicLayout>
  );
}
