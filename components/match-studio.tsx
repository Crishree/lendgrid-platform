"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck, CircleAlert, Filter, Radar, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type BorrowerKey = "salaried-prime" | "self-employed-lap" | "msme-growth";

type BorrowerProfile = {
  label: string;
  product: string;
  score: number;
  foir: string;
  incomeMode: string;
  ticket: string;
  summary: string;
  flags: string[];
};

type MatchResult = {
  lender: string;
  fit: "High" | "Medium" | "Conditional";
  tat: string;
  reason: string;
};

const borrowers: Record<BorrowerKey, BorrowerProfile> = {
  "salaried-prime": {
    label: "Prime salaried buyer",
    product: "Home loan",
    score: 782,
    foir: "29%",
    incomeMode: "Salary credits",
    ticket: "₹62L",
    summary: "Metro salaried applicant with stable salary credits, low EMI load, and clean bureau.",
    flags: ["Strong bureau", "Property-backed", "Metro pin code"]
  },
  "self-employed-lap": {
    label: "Self-employed LAP case",
    product: "LAP",
    score: 724,
    foir: "41%",
    incomeMode: "ITR + bank statement",
    ticket: "₹38L",
    summary: "Business owner with collateral, moderate leverage, and lender sensitivity to vintage and documentation.",
    flags: ["Collateral available", "Doc-heavy", "Policy nuance required"]
  },
  "msme-growth": {
    label: "Emerging MSME borrower",
    product: "Business loan",
    score: 701,
    foir: "37%",
    incomeMode: "GST + bank statement",
    ticket: "₹24L",
    summary: "Growing business with decent turnover trajectory and working-capital demand across specialist lenders.",
    flags: ["Cash-flow underwriting", "Sector appetite varies", "Fast working-capital need"]
  }
};

const matches: Record<BorrowerKey, MatchResult[]> = {
  "salaried-prime": [
    { lender: "Axis Housing", fit: "High", tat: "8 hrs", reason: "Prime bureau, metro property, salary-backed repayment strength." },
    { lender: "HDFC Retail", fit: "High", tat: "12 hrs", reason: "Strong policy alignment on score, FOIR, and ticket size." },
    { lender: "ICICI Home", fit: "Medium", tat: "16 hrs", reason: "Good fit with slightly tighter property valuation review." }
  ],
  "self-employed-lap": [
    { lender: "Aditya LAP", fit: "High", tat: "18 hrs", reason: "Comfortable with self-employed income backed by collateral and banking." },
    { lender: "Bajaj Property", fit: "Medium", tat: "14 hrs", reason: "Acceptable score but requires stronger vintage validation." },
    { lender: "Indifi Secured", fit: "Conditional", tat: "10 hrs", reason: "Fast path possible if GST trend and collateral grade hold." }
  ],
  "msme-growth": [
    { lender: "FlexiCapital", fit: "High", tat: "6 hrs", reason: "Sector appetite and bank statement underwriting align well." },
    { lender: "NeoBiz Finance", fit: "Medium", tat: "9 hrs", reason: "Good turnover fit but tighter exposure limits on this ticket size." },
    { lender: "SME Bridge", fit: "Conditional", tat: "12 hrs", reason: "Needs additional validation on receivables concentration." }
  ]
};

const fitClass: Record<MatchResult["fit"], string> = {
  High: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
  Medium: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
  Conditional: "bg-rose-500/12 text-rose-700 dark:text-rose-300"
};

export function MatchStudio() {
  const [selected, setSelected] = useState<BorrowerKey>("salaried-prime");
  const borrower = borrowers[selected];
  const results = matches[selected];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="border-b border-border/80 bg-muted/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge>Borrower cohorts</Badge>
                <h3 className="mt-3 text-2xl font-semibold">Switch profile inputs</h3>
              </div>
              <Radar className="text-accent" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              This is the core operator workflow: choose a borrower shape, review risk signals, and inspect the ranked lender list.
            </p>
          </div>
          <div className="space-y-3 p-6">
            {(Object.entries(borrowers) as [BorrowerKey, BorrowerProfile][]).map(([key, profile]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={`w-full rounded-[1.25rem] border p-4 text-left transition ${
                  selected === key ? "border-accent bg-accent/8" : "border-border bg-background"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{profile.label}</p>
                  {selected === key ? <BadgeCheck className="h-4 w-4 text-accent" /> : <Filter className="h-4 w-4 text-muted-foreground" />}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{profile.product} · {profile.ticket} · Score {profile.score}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Badge className="bg-accent/12 text-accent">Selected case</Badge>
                <h3 className="mt-3 text-3xl font-semibold">{borrower.label}</h3>
                <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{borrower.summary}</p>
              </div>
              <div className="dashboard-chip">
                {borrower.product}
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {[
                ["Bureau score", String(borrower.score)],
                ["FOIR", borrower.foir],
                ["Income mode", borrower.incomeMode],
                ["Ticket size", borrower.ticket]
              ].map(([label, value]) => (
                <div key={label} className="data-card">
                  <p className="data-label">{label}</p>
                  <p className="data-value">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {borrower.flags.map((flag) => (
                <span key={flag} className="signal-pill">{flag}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {results.map((result) => (
            <Card key={result.lender} className="h-full">
              <CardContent className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{result.lender}</p>
                    <p className="mt-1 text-sm text-muted-foreground">Indicative TAT {result.tat}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${fitClass[result.fit]}`}>
                    {result.fit} fit
                  </span>
                </div>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">{result.reason}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    Policy-aware routing
                  </span>
                  <ArrowRight className="h-4 w-4 text-accent" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="flex items-start gap-4">
            <CircleAlert className="mt-1 h-5 w-5 text-accent" />
            <div>
              <p className="font-semibold">What this MVP proves</p>
              <p className="mt-2 text-sm text-muted-foreground">
                The product should be able to separate borrower capture from lender policy logic, then rank providers with reasons the
                ops team can actually act on. This keeps the underwriting conversation transparent and the sourcing funnel cleaner.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
