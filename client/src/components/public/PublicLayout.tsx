import type { ReactNode } from "react";

import { PublicFooter } from "./PublicFooter";
import { PublicNav } from "./PublicNav";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <PublicNav />
      <main id="main">{children}</main>
      <PublicFooter />
    </div>
  );
}

/** Ambient background used on secondary public pages. */
export function Ambient({ intensity = "soft" }: { intensity?: "soft" | "strong" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-1/3 left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 rounded-full blur-3xl animate-ambient"
        style={{
          background:
            intensity === "strong"
              ? "radial-gradient(closest-side, oklch(0.55 0.18 305 / 45%), transparent 70%)"
              : "radial-gradient(closest-side, oklch(0.5 0.16 300 / 22%), transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-1/4 h-[60vh] w-[60vw] rounded-full blur-3xl animate-ambient-slow"
        style={{
          background: "radial-gradient(closest-side, oklch(0.5 0.13 255 / 18%), transparent 70%)",
        }}
      />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-primary-glow">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{body}</p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
}) {
  return (
    <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-24">
      <Ambient />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="animate-rise text-xs font-medium uppercase tracking-[0.22em] text-primary-glow">
            {eyebrow}
          </p>
          <h1
            className="mt-5 text-4xl font-light leading-[1.05] tracking-tight text-balance animate-rise-blur sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {title}
          </h1>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground animate-rise"
            style={{ animationDelay: "200ms" }}
          >
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
