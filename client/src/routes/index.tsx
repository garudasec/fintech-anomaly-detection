import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Activity, Brain, Radar, ShieldCheck } from "lucide-react";

import { HeroVisual } from "@/components/public/HeroVisual";
import { PublicLayout, SectionHeading } from "@/components/public/PublicLayout";
import { Button } from "@/components/ui/button";

const TITLE = "Fintech Anomaly Detection — Financial anomalies, detected early";
const DESCRIPTION =
  "Intelligent monitoring for unusual transaction behaviour. Score risk, surface anomalies and investigate before small signals become large problems.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: HomePage,
});

const FLOW = [
  {
    step: "01",
    label: "Transactions",
    body: "Card, wire, transfer and mobile events arrive as a continuous stream.",
  },
  {
    step: "02",
    label: "Analysis",
    body: "Each event is compared with the account's behavioural baseline.",
  },
  {
    step: "03",
    label: "Scoring",
    body: "Deviations become an anomaly score and a clear risk level.",
  },
  {
    step: "04",
    label: "Decision",
    body: "Analysts investigate context and decide — with the evidence in one place.",
  },
];

const PILLARS = [
  {
    icon: Radar,
    title: "See the outliers, not the noise",
    body: "Amount spikes, off-hours activity, location deviation and frequency bursts surface as ranked signals rather than raw rows.",
  },
  {
    icon: Brain,
    title: "Built for a learning system",
    body: "The platform is designed around behavioural baselines and scoring, ready for a detection service to plug in when it is available.",
  },
  {
    icon: ShieldCheck,
    title: "Investigation, not just alerts",
    body: "Every anomaly opens into a workspace linking the transaction, the account's pattern and related activity.",
  },
];

function HomePage() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 lg:pt-44">
        <Horizon />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-rise text-xs font-medium uppercase tracking-[0.24em] text-primary-glow">
              Transaction intelligence
            </p>
            <h1 className="mt-6 text-[2.75rem] font-light leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl">
              <span className="block animate-rise-blur" style={{ animationDelay: "60ms" }}>
                Financial anomalies,
              </span>
              <span
                className="block text-gradient animate-rise-blur"
                style={{ animationDelay: "180ms" }}
              >
                detected early.
              </span>
            </h1>
            <p
              className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground animate-rise sm:text-lg"
              style={{ animationDelay: "300ms" }}
            >
              Intelligent monitoring for unusual transaction behaviour — helping financial teams
              identify risk before it becomes a larger problem.
            </p>
            <div
              className="mt-9 flex flex-col items-center justify-center gap-3 animate-rise sm:flex-row"
              style={{ animationDelay: "400ms" }}
            >
              <Button asChild variant="hero" size="pill-lg">
                <Link to="/app">
                  Explore Platform
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="quiet" size="pill-lg">
                <Link to="/how-it-works">How it works</Link>
              </Button>
            </div>
          </div>

          <HeroVisual className="mt-16 sm:mt-20" />
        </div>
      </section>

      {/* FLOW */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="The pipeline"
            title="From raw transaction to analyst decision."
            body="One continuous path. Every stage is visible in the product, so a risk score is never a black box."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((f, i) => (
              <li
                key={f.step}
                className="group relative bg-background p-7 transition-colors duration-500 hover:bg-surface"
              >
                <span className="font-mono text-xs text-muted-foreground">{f.step}</span>
                <h3 className="mt-6 text-lg font-medium">{f.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                {i < FLOW.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute top-7 right-6 size-4 text-muted-foreground/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-primary-glow"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-x" />
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why it matters"
            title="Risk rarely announces itself."
            body="It shows up as a slightly wrong amount, at a slightly wrong time, from a slightly wrong place. The platform is designed to notice the slight."
          />
          <div className="grid gap-4">
            {PILLARS.map((p) => (
              <article key={p.title} className="panel flex gap-5 p-6 sm:p-7">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface-raised text-primary-glow">
                  <p.icon className="size-4.5" />
                </span>
                <div>
                  <h3 className="text-base font-medium">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <div className="pointer-events-none absolute inset-0 horizon opacity-80" />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Activity className="mx-auto size-5 text-primary-glow" aria-hidden />
          <h2 className="mt-6 text-3xl font-light tracking-tight text-balance sm:text-5xl">
            Step inside the monitoring platform.
          </h2>
          <p className="mt-5 text-muted-foreground">
            A working preview populated with representative data. No sign-up needed.
          </p>
          <Button asChild variant="hero" size="pill-lg" className="mt-9">
            <Link to="/app">
              Enter Platform
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}

/** Cinematic horizon: a huge dark disc rising from below with a violet rim. */
function Horizon() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* ambient wash */}
      <div
        className="absolute -top-1/4 left-1/2 h-[90vh] w-[140vw] -translate-x-1/2 rounded-full blur-3xl animate-ambient"
        style={{
          background: "radial-gradient(closest-side, oklch(0.45 0.15 300 / 30%), transparent 70%)",
        }}
      />
      {/* rim */}
      <div
        className="absolute left-1/2 top-[62%] h-[160vw] w-[160vw] -translate-x-1/2 rounded-full sm:top-[58%] sm:h-[130vw] sm:w-[130vw] lg:top-[56%]"
        style={{
          background: "oklch(0.115 0.02 282)",
          boxShadow:
            "0 -2px 0 0 oklch(0.85 0.12 320 / 55%), 0 -30px 90px -10px oklch(0.7 0.2 320 / 55%), 0 -120px 260px -40px oklch(0.6 0.2 300 / 45%), 0 -260px 500px -80px oklch(0.55 0.15 260 / 30%)",
        }}
      />
      <div className="absolute inset-0 grid-fade opacity-50" />
    </div>
  );
}
