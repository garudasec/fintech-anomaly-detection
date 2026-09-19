import React from "react";
import { Eye, ShieldAlert, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Cinematic Hero Visual — FinTech Anomaly Detection
 * Recreates the exact reference composition:
 * - Upper purple/magenta atmospheric glowing arc
 * - Lower blue/violet atmospheric glowing arc
 * - Subtle background financial UI panels
 * - Central floating financial card with 4-phase collapse & reveal expansion loop
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-5xl py-8 overflow-hidden select-none", className)}>
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC ARCS (PURPLE UPPER ARC + BLUE LOWER ARC)                  */}
      {/* ========================================================================= */}

      {/* Upper Magenta / Purple Atmospheric Arc */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[110%] -translate-x-1/2 rounded-[100%] blur-xl opacity-90 [animation:arc-glow-pulse_8s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 10%, rgba(217, 70, 239, 0.45) 0%, rgba(168, 85, 247, 0.25) 45%, rgba(147, 51, 234, 0.08) 70%, transparent 100%)",
          boxShadow:
            "inset 0 -2px 40px rgba(236, 72, 153, 0.4), 0 30px 100px rgba(217, 70, 239, 0.35)",
        }}
      />
      {/* Upper Glowing Arc Rim Line */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[320px] w-[95%] -translate-x-1/2 rounded-[100%] border-b border-magenta/40 opacity-75 blur-[1px]"
        style={{
          boxShadow: "0 4px 30px rgba(236, 72, 153, 0.6)",
        }}
      />

      {/* Lower Blue / Violet Atmospheric Arc */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[110%] -translate-x-1/2 rounded-[100%] blur-xl opacity-90 [animation:arc-glow-pulse_8s_ease-in-out_infinite_4s]"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 90%, rgba(59, 130, 246, 0.45) 0%, rgba(99, 102, 241, 0.28) 45%, rgba(139, 92, 246, 0.1) 70%, transparent 100%)",
          boxShadow:
            "inset 0 2px 40px rgba(99, 102, 241, 0.4), 0 -30px 100px rgba(59, 130, 246, 0.35)",
        }}
      />
      {/* Lower Glowing Arc Rim Line */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-[320px] w-[95%] -translate-x-1/2 rounded-[100%] border-t border-blue/40 opacity-75 blur-[1px]"
        style={{
          boxShadow: "0 -4px 30px rgba(59, 130, 246, 0.6)",
        }}
      />

      {/* ========================================================================= */}
      {/* 2. SUBTLE BACKGROUND FINANCIAL UI PANELS                                  */}
      {/* ========================================================================= */}

      <div className="relative min-h-[460px] sm:min-h-[500px] w-full flex items-center justify-center px-4">
        {/* Left Side Background UI Cards */}
        <div className="absolute left-0 sm:left-4 top-4 hidden md:flex flex-col gap-4 opacity-30 blur-[0.6px] pointer-events-none max-w-[220px] [animation:float-subtle-left_10s_ease-in-out_infinite]">
          {/* Expenses Donut Card */}
          <div className="glass rounded-2xl p-4 border border-white/10 space-y-2 bg-slate-950/60 shadow-2xl">
            <div className="text-[0.68rem] uppercase font-mono tracking-wider text-muted-foreground">
              Expenses Report
            </div>
            <div className="flex items-center gap-3">
              <div className="relative size-12 rounded-full border-2 border-magenta/40 border-t-purple-400 grid place-items-center">
                <span className="text-[0.6rem] font-mono text-foreground font-bold">$2.2k</span>
              </div>
              <div>
                <div className="font-mono text-sm font-bold text-foreground">$2,252.22</div>
                <div className="text-[0.65rem] text-muted-foreground">Total expenses</div>
              </div>
            </div>
          </div>

          {/* Saving Budget Card */}
          <div className="glass rounded-xl p-3 border border-white/10 space-y-1 bg-slate-950/50">
            <div className="text-[0.65rem] font-mono text-muted-foreground flex justify-between">
              <span>Emergency Fund</span>
              <span className="text-lime font-bold">100%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
              <div className="h-full bg-lime w-full" />
            </div>
          </div>
        </div>

        {/* Right Side Background UI Cards */}
        <div className="absolute right-0 sm:right-4 top-4 hidden md:flex flex-col gap-4 opacity-30 blur-[0.6px] pointer-events-none max-w-[220px] [animation:float-subtle-right_12s_ease-in-out_infinite]">
          {/* Budgets List Card */}
          <div className="glass rounded-2xl p-4 border border-white/10 space-y-2 bg-slate-950/60 shadow-2xl">
            <div className="text-[0.68rem] uppercase font-mono tracking-wider text-muted-foreground">
              Monitored Assets
            </div>
            <div className="space-y-1.5 font-mono text-[0.7rem]">
              <div className="flex justify-between items-center text-foreground">
                <span>Save for a Car</span>
                <span className="font-semibold">$3,200</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Save for Education</span>
                <span>$2,500</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Vacation Fund</span>
                <span>$1,900</span>
              </div>
            </div>
          </div>

          {/* Goals Card */}
          <div className="glass rounded-xl p-3 border border-white/10 space-y-1 bg-slate-950/50">
            <div className="text-[0.65rem] font-mono text-muted-foreground flex justify-between">
              <span>Target Reserve</span>
              <span className="text-purple-400 font-bold">$5,352.22</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CENTRAL FLOATING FINANCIAL CARD (WITH COLLAPSE -> REVEAL CYCLE)         */}
        {/* ========================================================================= */}

        <div className="relative z-20 w-full max-w-md mx-auto">
          <div
            className={cn(
              "glass rounded-3xl p-6 sm:p-8 border border-purple-400/40",
              "bg-gradient-to-br from-indigo-950/90 via-purple-950/80 to-slate-950/95",
              "shadow-[0_0_60px_rgba(168,85,247,0.35)] backdrop-blur-2xl",
              "transition-all duration-300",
              "[animation:cinematic-card-cycle_8s_cubic-bezier(0.4,0,0.2,1)_infinite]"
            )}
          >
            {/* Card Glow Rim Effect */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-purple-500/20 via-magenta/30 to-blue-500/20 pointer-events-none opacity-50 blur-sm" />

            {/* Header: Total Balance & Eye Icon */}
            <div className="relative flex items-center justify-between">
              <span className="font-sans text-xs sm:text-sm font-medium text-slate-300">
                Total Balance
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-lime" />
                </span>
                <Eye className="size-4 text-slate-400 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>

            {/* Primary Amount */}
            <div className="relative mt-3 flex items-baseline gap-2">
              <span className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md">
                $5,237.34
              </span>
            </div>

            {/* Sub-metrics: Income & Expense */}
            <div className="relative mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
              <div>
                <div className="flex items-center gap-1 text-[0.68rem] font-sans text-slate-400">
                  <TrendingUp className="size-3 text-lime" />
                  <span>Income</span>
                </div>
                <div className="mt-1 font-sans text-base sm:text-lg font-semibold text-white">
                  $2,252.22
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-[0.68rem] font-sans text-slate-400">
                  <TrendingDown className="size-3 text-magenta" />
                  <span>Expence</span>
                </div>
                <div className="mt-1 font-sans text-base sm:text-lg font-semibold text-white">
                  $2,252.22
                </div>
              </div>
            </div>

            {/* Anomaly Detection Status Bar inside Card */}
            <div className="relative mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Zap className="size-3.5 text-magenta animate-pulse" />
                <span className="text-[0.68rem] text-slate-300">Risk Score: 0.19</span>
              </div>
              <span className="rounded bg-magenta/20 px-1.5 py-0.5 text-[0.62rem] uppercase font-bold tracking-wider text-magenta border border-magenta/30">
                1 Outlier Flagged
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
