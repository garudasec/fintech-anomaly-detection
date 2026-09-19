import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "FinTech Anomaly Detection — Application Workspace" },
      {
        name: "description",
        content:
          "Real-time financial intelligence, transaction baseline monitoring, and anomaly detection platform.",
      },
    ],
  }),
  component: AppLayout,
});

function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
