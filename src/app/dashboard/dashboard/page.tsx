import { AppShell } from "@/components/layout/AppShell";
import { UpdatePromptPanel } from "@/modules/dashboard/components/UpdatePromptPanel";

export default function DashboardPage() {
  return (
    <AppShell>
      <UpdatePromptPanel />
    </AppShell>
  );
}
