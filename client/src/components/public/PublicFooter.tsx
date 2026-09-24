import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";

export function PublicFooter() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Intelligent monitoring for unusual transaction behaviour. Built for financial teams who
            need to see risk early.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link
            to="/platform"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Platform
          </Link>
          <Link
            to="/how-it-works"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          <Link to="/app" className="text-foreground transition-colors hover:text-primary-glow">
            Enter Platform →
          </Link>
        </nav>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-8 text-xs text-muted-foreground/70 sm:px-8">
        <span>© 2026 Fintech Anomaly Detection</span>
        <span className="font-mono">v0.1 · frontend preview</span>
      </div>
    </footer>
  );
}
