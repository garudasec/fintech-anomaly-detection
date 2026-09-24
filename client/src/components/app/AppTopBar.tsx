import { Bell, Command, Download, Menu, Radio, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AppTopBarProps {
  onOpenMobileNav: () => void;
  title?: string | undefined;
  subtitle?: string | undefined;
}

export function AppTopBar({
  onOpenMobileNav,
  title = "Overview",
  subtitle = "Financial Anomaly Monitoring",
}: AppTopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl sm:px-8">
      {/* Left: Mobile trigger & Page Context */}
      <div className="flex items-center gap-3.5">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onOpenMobileNav}
          className="md:hidden text-muted-foreground hover:text-foreground"
          aria-label="Open mobile navigation"
        >
          <Menu className="size-5" />
        </Button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-sm tracking-tight text-foreground sm:text-base">
              {title}
            </h1>
            <span className="hidden text-muted-foreground/40 sm:inline">·</span>
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              Saturday, 19 Sep 2026
            </span>
          </div>
          <p className="hidden text-[0.72rem] text-muted-foreground lg:block">{subtitle}</p>
        </div>
      </div>

      {/* Center: Search pill affordance */}
      <div className="hidden max-w-md flex-1 px-6 md:block">
        <button
          type="button"
          onClick={() => {
            /* Quick search affordance modal hook */
          }}
          className="flex h-9 w-full items-center justify-between rounded-xl border border-input bg-surface/40 px-3.5 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:bg-surface hover:text-foreground"
        >
          <span className="flex items-center gap-2.5">
            <Search className="size-3.5 text-muted-foreground" />
            <span>Search transactions, accounts, merchants...</span>
          </span>
          <kbd className="pointer-events-none hidden items-center gap-0.5 rounded border border-border bg-surface-raised px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground lg:inline-flex">
            <Command className="size-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right: Stream Indicator, Notifications, Export */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Stream Ingestion Badge */}
        <div className="hidden items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground sm:flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-lime" />
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
            Ingestion Active
          </span>
        </div>

        {/* Notifications with anomaly badge */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="relative text-muted-foreground hover:bg-surface hover:text-foreground"
          aria-label="3 Unresolved critical alerts"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-magenta opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-magenta" />
          </span>
        </Button>

        {/* Export / Report button */}
        <Button
          variant="outline"
          size="sm"
          className="hidden items-center gap-2 rounded-lg text-xs font-medium sm:inline-flex"
        >
          <Download className="size-3.5" />
          Export
        </Button>
      </div>
    </header>
  );
}
