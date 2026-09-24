import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Hide the wordmark and show only the mark. */
  compact?: boolean;
}

/** Brand mark: a signal line breaking out of a steady band — "the anomaly". */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-8 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface-raised shadow-glow-primary",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none">
        <path
          d="M3 14h4l2-6 3 10 2.5-8 1.5 4h5"
          stroke="url(#logo-g)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="18" r="1.4" fill="var(--magenta)" />
        <defs>
          <linearGradient id="logo-g" x1="3" y1="12" x2="21" y2="12">
            <stop stopColor="var(--primary-glow)" />
            <stop offset="1" stopColor="var(--blue)" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

export function Logo({ className, compact }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Fintech
          </span>
          <span className="mt-0.5 text-sm font-semibold tracking-tight text-foreground">
            Anomaly Detection
          </span>
        </span>
      )}
    </span>
  );
}
