import { useQuery } from "@tanstack/react-query";
import { riskDistributionQuery } from "@/data/queries";
import { fmtNumber } from "@/lib/format";

export function RiskDistributionCard() {
  const { data: distribution, isLoading } = useQuery(riskDistributionQuery);

  const total = distribution?.reduce((acc, item) => acc + item.value, 0) ?? 1;

  return (
    <div className="panel-raised p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            Risk Classification Ratio
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Distribution across analyzed transactions
          </p>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{fmtNumber(total)} Scored</span>
      </div>

      {/* Segmented Distribution Bar */}
      <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-surface-raised">
        {isLoading || !distribution
          ? null
          : distribution.map((item) => {
              const pct = (item.value / total) * 100;
              return (
                <div
                  key={item.key}
                  style={{ width: `${pct}%`, backgroundColor: item.color }}
                  className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                  title={`${item.name}: ${item.value} (${pct.toFixed(1)}%)`}
                />
              );
            })}
      </div>

      {/* Legend & Values */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/70 pt-4">
        {isLoading || !distribution
          ? null
          : distribution.map((item) => {
              const pct = ((item.value / total) * 100).toFixed(1);
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="font-mono text-sm font-semibold text-foreground">{pct}%</div>
                  <div className="font-mono text-[0.68rem] text-muted-foreground">
                    {fmtNumber(item.value)} txns
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
