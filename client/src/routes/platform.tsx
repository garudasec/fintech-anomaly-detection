import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PublicLayout } from "@/components/public/PublicLayout";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — FinTech Anomaly Detection" },
      {
        name: "description",
        content: "Architecture and capabilities of the financial intelligence platform.",
      },
    ],
  }),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Architecture"
        title="Continuous intelligence for transaction streams."
        body="Designed to sit alongside transaction ingestion pipelines, extract behavioral baselines, score outliers, and empower analysts."
      />
    </PublicLayout>
  );
}
