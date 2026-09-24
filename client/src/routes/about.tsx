import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PublicLayout } from "@/components/public/PublicLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FinTech Anomaly Detection" },
      {
        name: "description",
        content: "Building next-generation behavioral monitoring tools for fintech security.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Mission"
        title="Modern financial intelligence, built for clarity."
        body="We believe financial risk monitoring should be elegant, transparent, and built to empower risk teams with actionable intelligence."
      />
    </PublicLayout>
  );
}
