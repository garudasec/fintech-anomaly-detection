import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/platform", label: "Platform" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link to="/" aria-label="Fintech Anomaly Detection — home" className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="glass flex items-center gap-1 rounded-full p-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: "exact" in item && item.exact }}
                  className="block rounded-full px-4 py-1.5 text-[0.8rem] font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  activeProps={{ className: "bg-foreground/8 text-foreground" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="pill" size="pill" className="hidden sm:inline-flex">
            <Link to="/app">
              Enter Platform
              <ArrowUpRight />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 border-border bg-background/95 backdrop-blur-xl"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: "exact" in item && item.exact }}
                    className="rounded-lg px-3 py-3 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                    activeProps={{ className: "text-foreground" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild variant="pill" size="pill" className="mt-6">
                  <Link to="/app" onClick={() => setOpen(false)}>
                    Enter Platform
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
