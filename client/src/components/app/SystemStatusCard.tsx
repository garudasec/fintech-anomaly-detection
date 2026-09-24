import { AlertTriangle, CheckCircle2, Database, Network, Server, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceStatus {
  name: string;
  status: "connected" | "disconnected" | "simulated";
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES: ServiceStatus[] = [
  {
    name: "Transaction API (REST)",
    status: "disconnected",
    detail: "POST/GET /api/transactions disconnected",
    icon: Network,
  },
  {
    name: "MongoDB Database",
    status: "disconnected",
    detail: "Not connected from frontend",
    icon: Database,
  },
  {
    name: "Python ML Service",
    status: "disconnected",
    detail: "Heuristic rule scoring active",
    icon: Shield,
  },
  {
    name: "Data Source",
    status: "simulated",
    detail: "Deterministic mock generator (260 txns)",
    icon: Server,
  },
];

export function SystemStatusCard() {
  return (
    <div className="panel-raised p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-border/70 pb-3.5">
        <div className="flex items-center gap-2">
          <Server className="size-4 text-amber" />
          <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            Infrastructure & Integration Status
          </h3>
        </div>
        <span className="rounded-full bg-amber/10 border border-amber/25 px-2.5 py-0.5 font-mono text-[0.68rem] text-amber font-medium">
          Frontend Mock Mode
        </span>
      </div>

      <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
        The user interface is fully interactive using procedural mock data. Backend services are not
        yet connected.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {SERVICES.map((srv) => {
          const Icon = srv.icon;
          const isDisconnected = srv.status === "disconnected";

          return (
            <div
              key={srv.name}
              className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-surface/50 p-3"
            >
              <div
                className={cn(
                  "mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border",
                  isDisconnected
                    ? "border-amber/30 bg-amber/10 text-amber"
                    : "border-blue/30 bg-blue/10 text-blue",
                )}
              >
                <Icon className="size-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-medium text-foreground text-xs truncate">{srv.name}</span>
                  <span
                    className={cn(
                      "font-mono text-[0.62rem] uppercase font-semibold shrink-0",
                      isDisconnected ? "text-amber" : "text-blue",
                    )}
                  >
                    {srv.status === "disconnected" ? "Not connected" : "Mock seed"}
                  </span>
                </div>
                <p className="mt-0.5 text-[0.68rem] text-muted-foreground truncate">{srv.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
