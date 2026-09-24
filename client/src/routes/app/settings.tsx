import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CheckCircle2,
  Copy,
  Key,
  KeyRound,
  RefreshCw,
  Save,
  Shield,
  Sliders,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [{ title: "Settings — FinTech Anomaly Detection" }],
  }),
  component: SettingsPage,
});


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProfile } from "@/contexts/ProfileContext";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Context state
  const { profile: savedProfile, setProfile: setSavedProfile } = useProfile();

  // Profile local state for editing
  const [profile, setProfile] = useState({
    name: savedProfile.name,
    email: savedProfile.email,
    role: savedProfile.role,
    timezone: savedProfile.timezone,
  });

  useEffect(() => {
    setProfile({
      name: savedProfile.name,
      email: savedProfile.email,
      role: savedProfile.role,
      timezone: savedProfile.timezone,
    });
  }, [savedProfile]);

  // Detection thresholds state
  const [detection, setDetection] = useState({
    criticalScore: "0.85",
    highRiskScore: "0.65",
    mediumRiskScore: "0.40",
    autoFlagCritical: true,
    velocityCheckEnabled: true,
    modelSensitivity: "standard",
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    slackEnabled: true,
    slackWebhook: "https://hooks.slack.com/services/T00000/B00000/XXXXXX",
    smsAlerts: false,
    smsPhone: "+1 (555) 019-2834",
    dailyDigest: true,
  });

  // Security state
  const [security, setSecurity] = useState({
    sessionTimeout: "30m",
    enforce2FA: true,
    apiKey: "sk_live_9948271a_fintech_anom_7741",
    copiedKey: false,
  });

  const showSaveSuccess = (sectionName: string) => {
    setToastMessage(`${sectionName} saved successfully ✓`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleProfileSave = async () => {
    try {
      await setSavedProfile({
        name: profile.name,
        email: profile.email,
        role: profile.role,
        timezone: profile.timezone,
      });
      showSaveSuccess("Profile settings");
    } catch (err: any) {
      alert("Error saving profile: " + err.message);
    }
  };

  const copyApiKey = () => {
    navigator.clipboard?.writeText(security.apiKey);
    setSecurity((prev) => ({ ...prev, copiedKey: true }));
    setTimeout(() => setSecurity((prev) => ({ ...prev, copiedKey: false })), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Platform & Detection Settings
            </h1>
            <span className="rounded-full border border-border bg-surface-raised px-2.5 py-0.5 font-mono text-[0.68rem] text-muted-foreground font-medium">
              System Config
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Configure risk thresholds, scoring parameters, alert webhooks, and security authentication parameters.
          </p>
        </div>

        {toastMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/10 px-3.5 py-2 font-mono text-xs text-lime shadow-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="size-4" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Tabs Layout */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-surface p-1 border border-border rounded-xl font-mono text-xs">
          <TabsTrigger value="profile" className="gap-2 font-mono text-xs">
            <User className="size-3.5" />
            <span>Profile & Account</span>
          </TabsTrigger>
          <TabsTrigger value="detection" className="gap-2 font-mono text-xs">
            <Sliders className="size-3.5" />
            <span>Risk Thresholds</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 font-mono text-xs">
            <Bell className="size-3.5" />
            <span>Alert Channels</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 font-mono text-xs">
            <Shield className="size-3.5" />
            <span>Security & API Keys</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Profile */}
        <TabsContent value="profile" className="space-y-6">
          <div className="panel-raised p-6 space-y-6 max-w-3xl">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">Analyst Profile</h3>
              <p className="text-xs text-muted-foreground">
                Your operator identity used across investigation audit trails and disposition logs.
              </p>
            </div>

            <Separator className="bg-border/60" />

            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs">
                    Full Display Name
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-xs">
                    Assigned Role
                  </Label>
                  <Select value={profile.role} onValueChange={(val) => setProfile({ ...profile, role: val })}>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                      <SelectItem value="Senior Risk Analyst">Senior Risk Analyst</SelectItem>
                      <SelectItem value="Lead Risk Analyst">Lead Risk Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tz" className="text-xs">
                    Default Timezone
                  </Label>
                  <Select value={profile.timezone} onValueChange={(val) => setProfile({ ...profile, timezone: val })}>
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC &mdash; Coordinated Universal Time</SelectItem>
                      <SelectItem value="Asia/Kolkata">IST &mdash; India Standard Time</SelectItem>
                      <SelectItem value="America/New_York">ET &mdash; Eastern Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                size="sm"
                onClick={handleProfileSave}
                className="gap-2 font-mono text-xs"
              >
                <Save className="size-3.5" />
                <span>Save Profile Changes</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Detection */}
        <TabsContent value="detection" className="space-y-6">
          <div className="panel-raised p-6 space-y-6 max-w-3xl">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">Scoring & Threshold Parameters</h3>
              <p className="text-xs text-muted-foreground">
                Set sensitivity cutoffs for automated risk tagging and alerting triggers.
              </p>
            </div>

            <Separator className="bg-border/60" />

            <div className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="crit" className="text-xs text-destructive">
                    Critical Severity Cutoff (0–1)
                  </Label>
                  <Input
                    id="crit"
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={detection.criticalScore}
                    onChange={(e) => setDetection({ ...detection, criticalScore: e.target.value })}
                    className="text-xs border-destructive/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="high" className="text-xs text-amber">
                    High Risk Cutoff (0–1)
                  </Label>
                  <Input
                    id="high"
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={detection.highRiskScore}
                    onChange={(e) => setDetection({ ...detection, highRiskScore: e.target.value })}
                    className="text-xs border-amber/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="med" className="text-xs text-blue">
                    Medium Risk Cutoff (0–1)
                  </Label>
                  <Input
                    id="med"
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={detection.mediumRiskScore}
                    onChange={(e) => setDetection({ ...detection, mediumRiskScore: e.target.value })}
                    className="text-xs border-blue/30"
                  />
                </div>
              </div>

              <Separator className="bg-border/40" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">Auto-Flag Critical Anomalies</div>
                    <div className="text-[0.72rem] text-muted-foreground">
                      Automatically mark transactions with score &ge; {detection.criticalScore} as Flagged.
                    </div>
                  </div>
                  <Switch
                    checked={detection.autoFlagCritical}
                    onCheckedChange={(checked) =>
                      setDetection({ ...detection, autoFlagCritical: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">Velocity Limit Rate Checks</div>
                    <div className="text-[0.72rem] text-muted-foreground">
                      Evaluate 5-minute transaction frequency windows per card/user.
                    </div>
                  </div>
                  <Switch
                    checked={detection.velocityCheckEnabled}
                    onCheckedChange={(checked) =>
                      setDetection({ ...detection, velocityCheckEnabled: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                size="sm"
                onClick={() => showSaveSuccess("Threshold settings")}
                className="gap-2 font-mono text-xs"
              >
                <Save className="size-3.5" />
                <span>Save Risk Parameters</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="panel-raised p-6 space-y-6 max-w-3xl">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">Notification Channels & Webhooks</h3>
              <p className="text-xs text-muted-foreground">
                Manage automated incident alerts delivered to security operations channels.
              </p>
            </div>

            <Separator className="bg-border/60" />

            <div className="space-y-6 font-mono text-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">Email Notifications</div>
                    <div className="text-[0.72rem] text-muted-foreground">
                      Receive immediate emails for critical severity anomaly triggers.
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailAlerts: checked })
                    }
                  />
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">Slack Security Webhook</div>
                      <div className="text-[0.72rem] text-muted-foreground">
                        Post real-time triage cards to your team's Slack incident channel.
                      </div>
                    </div>
                    <Switch
                      checked={notifications.slackEnabled}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, slackEnabled: checked })
                      }
                    />
                  </div>

                  {notifications.slackEnabled && (
                    <div className="space-y-1 pl-2">
                      <Label htmlFor="slackUrl" className="text-[0.72rem] text-muted-foreground">
                        Slack Webhook Endpoint URL
                      </Label>
                      <Input
                        id="slackUrl"
                        value={notifications.slackWebhook}
                        onChange={(e) =>
                          setNotifications({ ...notifications, slackWebhook: e.target.value })
                        }
                        className="text-xs"
                      />
                    </div>
                  )}
                </div>

                <Separator className="bg-border/40" />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">Daily Digest Email</div>
                    <div className="text-[0.72rem] text-muted-foreground">
                      Summary report of total processed volume and anomaly counts sent every 24h.
                    </div>
                  </div>
                  <Switch
                    checked={notifications.dailyDigest}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, dailyDigest: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                size="sm"
                onClick={() => showSaveSuccess("Alert notification settings")}
                className="gap-2 font-mono text-xs"
              >
                <Save className="size-3.5" />
                <span>Save Alert Preferences</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Security */}
        <TabsContent value="security" className="space-y-6">
          <div className="panel-raised p-6 space-y-6 max-w-3xl">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">Security & API Access Keys</h3>
              <p className="text-xs text-muted-foreground">
                Session controls, multi-factor authentication, and API credentials for backend ingestion.
              </p>
            </div>

            <Separator className="bg-border/60" />

            <div className="space-y-6 font-mono text-xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">Enforce Multi-Factor Auth (2FA)</div>
                    <div className="text-[0.72rem] text-muted-foreground">
                      Require hardware key or TOTP authenticator code for analyst access.
                    </div>
                  </div>
                  <Switch
                    checked={security.enforce2FA}
                    onCheckedChange={(checked) => setSecurity({ ...security, enforce2FA: checked })}
                  />
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-2">
                  <div className="font-semibold text-foreground">Active Ingestion API Key</div>
                  <div className="text-[0.72rem] text-muted-foreground">
                    Used by event stream producers to send raw transactions to the detection pipeline.
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Input
                      readOnly
                      value={security.apiKey}
                      type="password"
                      className="font-mono text-xs bg-surface/50"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyApiKey}
                      className="h-9 gap-1.5 font-mono text-xs"
                    >
                      <Copy className="size-3.5" />
                      <span>{security.copiedKey ? "Copied!" : "Copy"}</span>
                    </Button>
                  </div>
                </div>

                <Separator className="bg-border/40" />

                <div className="rounded-lg border border-border/70 bg-surface/30 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <KeyRound className="size-4 text-primary" />
                    <span className="font-semibold text-foreground">Backend Service Connection</span>
                  </div>
                  <p className="text-[0.72rem] text-muted-foreground leading-relaxed">
                    Production ingestion pipeline connects to MongoDB cluster <code className="text-foreground">mongodb+srv://prod-anomaly-db</code>. ML scoring server listening on port 8000.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                size="sm"
                onClick={() => showSaveSuccess("Security settings")}
                className="gap-2 font-mono text-xs"
              >
                <Save className="size-3.5" />
                <span>Save Security Configuration</span>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
