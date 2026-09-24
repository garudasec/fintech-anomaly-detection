import React, { useState, useEffect } from "react";
import { Bell, Clock, Command, Download, Menu, Radio, Search, Plus, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useQueryClient } from "@tanstack/react-query";
import { recentAnomaliesQuery, useQuery } from "@/data/queries";
import { useNavigate } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fmtMoney, fmtDate, RISK_LABEL } from "@/lib/format";
import { cn } from "@/lib/utils";
import { createTransaction, bulkCreateTransactions, analyzeTransaction } from "@/data/repository";
import { useProfile } from "@/contexts/ProfileContext";


interface AppTopBarProps {
  onOpenMobileNav: () => void;
  title?: string | undefined;
  subtitle?: string | undefined;
}

function AddTransactionModal({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: "USER-101",
    amount: "800",
    currency: "USD",
    locationCity: "New York",
    locationCountryCode: "US",
    channel: "card",
    merchant: "Test Merchant",
    transactionTime: new Date().toISOString().slice(0, 16),
  });

  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvRows, setCsvRows] = useState<any[]>([]);
  const [bulkResult, setBulkResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);
    setBulkResult(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim() !== '');
      if (lines.length > 1) {
        const headers = lines[0]!.split(',').map(h => h.trim());
        const parsed = lines.slice(1).map(line => {
          const vals = line.split(',').map(v => v.trim());
          const obj: any = {};
          headers.forEach((h, i) => {
            obj[h] = vals[i];
          });
          return obj;
        });
        setCsvRows(parsed);
      } else {
        setCsvRows([]);
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadTemplate = () => {
    const template = `userId,amount,currency,transactionTime,city,countryCode,channel,merchant\nUSER-101,500,INR,2026-09-24T10:00:00,Delhi,IN,mobile,Normal Store\nUSER-101,700,INR,2026-09-24T11:00:00,Delhi,IN,mobile,Normal Store`;
    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkSubmit = async () => {
    if (csvRows.length === 0) return;
    setLoading(true);
    setBulkResult(null);
    try {
      const payload = csvRows.map(row => ({
        ...row,
        amount: parseFloat(row.amount)
      }));
      const json = await bulkCreateTransactions(payload);
      setBulkResult(json);
      onSuccess();
    } catch (err: any) {
      alert("Error in bulk import: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Create Transaction
      const tx = await createTransaction({
        userId: formData.userId,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        transactionTime: new Date(formData.transactionTime).toISOString(),
        location: { city: formData.locationCity, countryCode: formData.locationCountryCode },
        channel: formData.channel,
        merchant: formData.merchant,
      });

      // 2. Trigger ML Analysis
      await analyzeTransaction(tx.transactionId);

      setOpen(false);
      onSuccess();
    } catch (err: any) {
      alert("Error adding transaction: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if(!v) { setCsvFile(null); setCsvRows([]); setBulkResult(null); } }}>
      <DialogTrigger asChild>
        <Button size="sm" className="hidden sm:flex gap-2">
          <Plus className="size-3.5" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Transactions</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="single" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single Transaction</TabsTrigger>
            <TabsTrigger value="bulk">Import CSV</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>User ID</Label>
                  <Input value={formData.userId} onChange={e => setFormData({...formData, userId: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" step="0.01" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Merchant</Label>
                  <Input value={formData.merchant} onChange={e => setFormData({...formData, merchant: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Channel</Label>
                  <Select value={formData.channel} onValueChange={v => setFormData({...formData, channel: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="wire">Wire</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="atm">ATM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={formData.locationCity} onChange={e => setFormData({...formData, locationCity: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Country Code</Label>
                  <Input value={formData.locationCountryCode} onChange={e => setFormData({...formData, locationCountryCode: e.target.value})} required />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Transaction Time</Label>
                  <Input type="datetime-local" value={formData.transactionTime} onChange={e => setFormData({...formData, transactionTime: e.target.value})} required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? "Processing..." : "Submit"}</Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="bulk" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
               <Label>Upload CSV File</Label>
               <Button type="button" variant="outline" size="sm" onClick={handleDownloadTemplate}>Download CSV Template</Button>
            </div>
            <Input type="file" accept=".csv" onChange={handleFileChange} disabled={loading} className="cursor-pointer" />

            {csvFile && !bulkResult && (
              <div className="text-sm">
                <p className="font-medium text-foreground">Selected: {csvFile.name}</p>
                <p className="text-muted-foreground mt-1">Rows detected: {csvRows.length}</p>

                {csvRows.length > 0 && (
                  <div className="mt-4 border border-border rounded-md p-2 max-h-48 overflow-y-auto bg-surface/30">
                     <table className="w-full text-xs text-left">
                       <thead>
                         <tr className="border-b border-border">
                           <th className="py-1.5 px-2 text-muted-foreground font-medium">User ID</th>
                           <th className="py-1.5 px-2 text-muted-foreground font-medium">Amount</th>
                           <th className="py-1.5 px-2 text-muted-foreground font-medium">Time</th>
                           <th className="py-1.5 px-2 text-muted-foreground font-medium">Merchant</th>
                         </tr>
                       </thead>
                       <tbody>
                         {csvRows.slice(0, 5).map((r, i) => (
                           <tr key={i} className="border-b border-border/50">
                             <td className="py-1 px-2 font-mono">{r.userId}</td>
                             <td className="py-1 px-2">{r.amount} {r.currency}</td>
                             <td className="py-1 px-2 text-muted-foreground">{r.transactionTime}</td>
                             <td className="py-1 px-2">{r.merchant}</td>
                           </tr>
                         ))}
                         {csvRows.length > 5 && (
                           <tr>
                             <td colSpan={4} className="py-2 px-2 text-center text-muted-foreground italic">... and {csvRows.length - 5} more rows</td>
                           </tr>
                         )}
                       </tbody>
                     </table>
                  </div>
                )}
              </div>
            )}

            {bulkResult && (
              <div className="bg-surface border border-border rounded-md p-4 space-y-2 mt-4 text-sm">
                <h4 className="font-semibold text-foreground">Import Complete</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-muted-foreground">
                  <div className="flex justify-between"><span>Transactions imported:</span> <span className="font-mono text-foreground">{bulkResult.imported}</span></div>
                  <div className="flex justify-between"><span>Successfully analyzed:</span> <span className="font-mono text-foreground">{bulkResult.analyzed}</span></div>
                  <div className="flex justify-between"><span>Flagged:</span> <span className="font-mono text-destructive">{bulkResult.flagged}</span></div>
                  <div className="flex justify-between"><span>Failed:</span> <span className="font-mono text-foreground">{bulkResult.failed}</span></div>
                </div>
                {bulkResult.errors && bulkResult.errors.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="font-medium text-destructive text-xs mb-2">Errors:</p>
                    <ul className="text-xs text-destructive max-h-24 overflow-y-auto list-disc pl-4 space-y-1">
                      {bulkResult.errors.map((err: any, idx: number) => (
                        <li key={idx}>Row {err.row}: {err.error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <DialogFooter className="mt-6">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Close</Button>
              <Button type="button" onClick={handleBulkSubmit} disabled={loading || !csvFile || csvRows.length === 0 || !!bulkResult}>
                {loading ? "Processing..." : "Import & Analyze"}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}


function HeaderClock({ timezone }: { timezone: string }) {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const datePart = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: timezone,
      });
      const timePart = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: timezone,
      });
      setTimeStr(`${datePart}  ${timePart}`);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [timezone]);

  return (
    <div className="hidden items-center gap-2 font-mono text-xs text-foreground bg-surface/50 border border-border/80 rounded-xl px-3.5 py-1.5 md:flex">
      <Clock className="size-3.5 text-primary" />
      <span className="font-semibold tracking-tight tabular-nums">
        {timeStr || "-- --- ---- --:--:--"}
      </span>
    </div>
  );
}

export function AppTopBar({
  onOpenMobileNav,
  title = "Overview",
  subtitle = "Financial Anomaly Monitoring",
}: AppTopBarProps) {
  const queryClient = useQueryClient();
  const { data: anomalies } = useQuery(recentAnomaliesQuery);
  const navigate = useNavigate();
  const { profile } = useProfile();

  const handleExport = () => {
    const queries = queryClient.getQueriesData<any>({ queryKey: ["transactions"] });
    let allTx: any[] = [];
    queries.forEach(([key, data]) => {
      if (data && data.items) {
        allTx = allTx.concat(data.items);
      }
    });

    const uniqueTx = Array.from(new Map(allTx.map(tx => [tx.transactionId, tx])).values());

    if (uniqueTx.length === 0) {
      alert("No transaction data loaded to export.");
      return;
    }

    const headers = [
      "transactionId", "userId", "amount", "currency", "transactionTime",
      "location", "channel", "merchant", "status", "anomalyScore", "riskLevel", "analysisState"
    ];

    const csvLines = [headers.join(",")];
    for (const tx of uniqueTx) {
      const row = [
        tx.transactionId,
        tx.userId,
        tx.amount,
        tx.currency,
        tx.transactionTime,
        `"${tx.location?.city || ''}, ${tx.location?.countryCode || ''}"`,
        tx.channel,
        `"${tx.merchant || ''}"`,
        tx.status,
        tx.anomalyScore ?? '',
        tx.riskLevel ?? '',
        tx.analysisState
      ];
      csvLines.push(row.join(","));
    }

    const blob = new Blob([csvLines.join("\n")], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

          </div>
          <p className="hidden text-[0.72rem] text-muted-foreground lg:block">{subtitle}</p>
        </div>
      </div>

      {/* Center: Search pill affordance */}
      <HeaderClock timezone={profile.timezone} />

      {/* Right: Stream Indicator, Notifications, Export */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* API Connected Indicator */}
        <div className="hidden items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground sm:flex">
          <span className="relative flex size-2">
            <span className="relative inline-flex size-2 rounded-full bg-lime" />
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
            API: Connected
          </span>
        </div>

        {/* Add Transaction Modal */}
        <AddTransactionModal onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["transactions"] });
          queryClient.invalidateQueries({ queryKey: ["recentAnomalies"] });
          queryClient.invalidateQueries({ queryKey: ["overview"] });
        }} />

        {/* Notifications with anomaly badge */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="relative text-muted-foreground hover:bg-surface hover:text-foreground"
              aria-label={`${anomalies?.length || 0} Unresolved critical alerts`}
            >
              <Bell className="size-4" />
              {anomalies && anomalies.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-magenta opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-magenta" />
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h4 className="font-semibold text-sm">Recent Anomalies</h4>
              <Badge variant="outline">{anomalies?.length || 0}</Badge>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {!anomalies || anomalies.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No recent anomalies.
                </div>
              ) : (
                anomalies.map((anomaly) => (
                  <div key={anomaly.anomalyId} className="flex flex-col gap-1 p-4 border-b border-border/50 hover:bg-surface/50 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm">{anomaly.transaction.merchant}</span>
                      <span className="font-semibold text-sm tabular-nums">{fmtMoney(anomaly.transaction.amount)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">{fmtDate(anomaly.detectedAt, profile.timezone)}</span>
                      <span className={cn("text-xs font-medium uppercase",
                        anomaly.transaction.riskLevel === 'critical' ? 'text-destructive' :
                        anomaly.transaction.riskLevel === 'high' ? 'text-magenta' : 'text-amber'
                      )}>
                        {anomaly.transaction.riskLevel ? RISK_LABEL[anomaly.transaction.riskLevel] : 'Unknown Risk'}
                      </span>
                    </div>
                    <div className="text-[0.65rem] text-muted-foreground/80 mt-1 font-mono truncate">
                      TX: {anomaly.transaction.transactionId}
                    </div>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Export / Report button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="hidden items-center gap-2 rounded-lg text-xs font-medium sm:inline-flex"
        >
          <Download className="size-3.5" />
          Export
        </Button>
      </div>
    </header>
  );
}
