import { ArrowDownRight, ArrowUpRight, BarChart3, Building2, CircleDollarSign, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { label: "Applications profiled", value: "12,480", delta: "+18.2%", positive: true, icon: Users },
  { label: "Match-to-submit rate", value: "64%", delta: "+6.1%", positive: true, icon: BarChart3 },
  { label: "Disbursal volume", value: "₹42.8Cr", delta: "+11.4%", positive: true, icon: CircleDollarSign },
  { label: "Active providers", value: "38", delta: "-2.0%", positive: false, icon: Building2 }
];

const insights = [
  "Home loans produce the highest approval rate when bureau score is above 750 and FOIR is under 35%.",
  "LAP files sourced through trained DSA partners convert better than direct cold leads in commercial collateral cases.",
  "Business loans below ₹25L are seeing the fastest provider response times in Karnataka and Maharashtra.",
  "Reject reasons are clustering around document gaps and geography-policy mismatch, indicating where workflow nudges matter most."
];

const funnel = [
  ["New", "12,480"],
  ["Profiled", "10,920"],
  ["Matched", "8,040"],
  ["Submitted", "5,180"],
  ["Approved", "2,960"],
  ["Disbursed", "1,840"]
];

export default function AnalyticsPage() {
  return (
    <main className="container-shell py-20">
      <Badge>Analytics & Insights</Badge>
      <h1 className="section-title mt-4">Measure sourcing quality, lender responsiveness, and disbursal efficiency in one dashboard.</h1>
      <p className="section-subtitle">
        This module turns the aggregation platform into an operating system, not just a lead router. Teams can understand what is
        converting, where cases stall, and which partners or products need intervention.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="panel-hover">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <metric.icon className="icon" />
                <span className={`inline-flex items-center gap-1 text-sm font-semibold ${metric.positive ? "text-emerald-600" : "text-rose-600"}`}>
                  {metric.positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                  {metric.delta}
                </span>
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardContent className="p-8">
            <p className="field-label">Lifecycle funnel</p>
            <div className="mt-5 space-y-3">
              {funnel.map(([stage, count]) => (
                <div key={stage} className="flex items-center justify-between rounded-[1rem] border border-border bg-background/70 px-4 py-3">
                  <span className="font-semibold">{stage}</span>
                  <span className="text-lg font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <p className="field-label">Key insights</p>
            <div className="mt-5 space-y-3">
              {insights.map((item) => (
                <div key={item} className="feature-row">{item}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Partner performance",
            body: "Compare DSA lanes on profile quality, approval ratio, and disbursal consistency."
          },
          {
            title: "Reject intelligence",
            body: "Cluster reject reasons by lender, product, city, and missing-doc pattern."
          },
          {
            title: "Lender responsiveness",
            body: "Track TAT, acceptance appetite, and fallback utility across institutions."
          }
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="p-7">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
