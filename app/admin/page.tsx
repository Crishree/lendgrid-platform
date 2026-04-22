import { ArrowUpRight, BarChart3, Building2, CircleDollarSign, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const topline = [
  { label: "Monthly applications", value: "12,480", delta: "+18.2%", icon: Users },
  { label: "Disbursals", value: "₹42.8Cr", delta: "+11.4%", icon: CircleDollarSign },
  { label: "Live providers", value: "38", delta: "+4.0%", icon: Building2 },
  { label: "Match-to-submit", value: "64%", delta: "+6.1%", icon: BarChart3 }
];

const businessCards = [
  ["Customer acquisition", "Track lead inflow by channel, city, DSA lane, and product."],
  ["Provider performance", "See which lenders are responding fastest and converting best."],
  ["Reject intelligence", "Understand why applications are dropping and which process fixes matter most."],
  ["Disbursal quality", "Measure value created, not just leads collected."]
];

export default function AdminPage() {
  return (
    <main className="container-shell py-20">
      <Badge>LendGrid admin panel</Badge>
      <h1 className="section-title mt-4">A leadership dashboard for the LendGrid CTO and management team.</h1>
      <p className="section-subtitle">
        This is the internal control room for the business: acquisition, matching quality, partner performance, lender responsiveness,
        and disbursal value all in one place.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topline.map((metric) => (
          <Card key={metric.label} className="panel-hover">
            <CardContent className="p-7">
              <div className="flex items-center justify-between">
                <metric.icon className="icon" />
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                  <ArrowUpRight size={15} />
                  {metric.delta}
                </span>
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {businessCards.map(([title, body]) => (
          <Card key={title}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-muted-foreground">{body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardContent className="p-8">
            <p className="field-label">Operational KPIs</p>
            <div className="mt-5 space-y-3">
              {[
                "Lead-to-profile conversion by product",
                "Match-to-submit conversion by lender lane",
                "Average TAT from profile to provider review",
                "Approval and disbursal ratio by DSA cohort",
                "Revenue and volume concentration by lender"
              ].map((item) => (
                <div key={item} className="feature-row">{item}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <p className="field-label">Executive view</p>
            <p className="mt-3 text-muted-foreground">
              The admin panel is where LendGrid’s leadership can understand whether the business is scaling efficiently: more quality
              cases, better lender fit, healthier disbursal rates, and stronger DSA productivity.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                ["Revenue concentration", "Top 5 lenders drive 61% of volume"],
                ["DSA productivity", "Top quartile partners outperform by 2.4x"],
                ["Case leakage", "Highest drop-offs happen before docs are complete"],
                ["Approval strength", "Home loan prime files remain the strongest segment"]
              ].map(([label, value]) => (
                <div key={label} className="data-card">
                  <p className="data-label">{label}</p>
                  <p className="data-value text-lg">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
