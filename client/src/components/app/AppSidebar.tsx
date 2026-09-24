import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Database,
  LayoutDashboard,
  Radar,
  Settings,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  exact?: boolean;
}

const APP_NAV_ITEMS: NavItem[] = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/app/anomalies", label: "Anomalies", icon: Radar, badge: "12" },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/investigation", label: "Investigation", icon: ShieldAlert },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate?: () => void;
  className?: string;
}

export function AppSidebar({
  collapsed,
  onToggleCollapse,
  onNavigate,
  className,
}: AppSidebarProps) {
  const location = useLocation();
  const { profile } = useProfile();

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-out select-none",
        collapsed ? "w-18" : "w-64",
        className,
      )}
    >
      {/* Brand Header */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-sidebar-border px-4",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 overflow-hidden focus:outline-none"
          title="Return to Marketing Landing"
        >
          {collapsed ? <LogoMark /> : <Logo />}
        </Link>
      </div>

      {/* Navigation List */}
      <TooltipProvider delayDuration={150}>
        <nav
          aria-label="Application"
          className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4 scrollbar-thin"
        >
          {APP_NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

            const linkContent = (
              <Link
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={cn(
                  "group relative flex h-10 items-center rounded-xl font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  collapsed ? "justify-center px-0 w-11 mx-auto" : "gap-3.5 px-3.5",
                  isActive
                    ? "bg-[oklch(0.22_0.038_255)] text-foreground border border-[oklch(0.7_0.14_250/35%)] shadow-[0_0_24px_-6px_oklch(0.7_0.14_250/45%)] font-semibold"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                )}
              >
                {/* Active cyan pill accent bar */}
                {isActive && (
                  <span
                    className={cn(
                      "absolute rounded-full bg-blue transition-all",
                      collapsed
                        ? "left-0.5 top-2 bottom-2 w-1 shadow-[0_0_8px_var(--color-blue)]"
                        : "left-1 top-2 bottom-2 w-1 shadow-[0_0_8px_var(--color-blue)]",
                    )}
                  />
                )}

                <item.icon
                  className={cn(
                    "size-4.5 shrink-0 transition-colors",
                    isActive ? "text-blue" : "text-muted-foreground group-hover:text-foreground",
                  )}
                />

                {!collapsed && <span className="truncate flex-1 tracking-tight">{item.label}</span>}

                {!collapsed && item.badge && (
                  <span
                    className={cn(
                      "ml-auto rounded-full px-2 py-0.5 font-mono text-[0.65rem] font-semibold tabular",
                      isActive
                        ? "bg-magenta/20 text-magenta border border-magenta/30"
                        : "bg-surface-raised text-muted-foreground border border-border",
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.to}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" sideOffset={12} className="font-medium text-xs">
                    {item.label}
                    {item.badge && ` (${item.badge})`}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return linkContent;
          })}
        </nav>
      </TooltipProvider>



      {/* Analyst Profile & Collapse Toggle */}
      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed ? "flex-col justify-center" : "justify-between",
          )}
        >
          <div className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
            <Avatar className="size-8 border border-border-strong bg-surface-raised">
              <AvatarFallback className="bg-[oklch(0.24_0.03_282)] font-mono text-xs font-semibold text-primary-glow">
                {profile.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col text-left leading-none">
                <span className="text-xs font-medium text-foreground">{profile.name}</span>
                <span className="mt-1 text-[0.65rem] text-muted-foreground font-mono truncate max-w-[120px]">
                  {profile.role}
                </span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        </div>
      </div>
    </aside>
  );
}
