import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PublicLayout } from "@/components/public/PublicLayout";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — FinTech Anomaly Detection" },
      {
        name: "description",
        content: "From stream ingestion to analyst investigation and decision.",
      },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Workflow"
        title="From raw events to clear analyst decisions."
        body="How our signal extraction and scoring pipeline observes transaction deviations without black-box opacity."
      />
    </PublicLayout>
  );
}
