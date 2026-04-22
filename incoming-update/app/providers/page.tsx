import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProviderOnboardingForm } from "@/components/forms/provider-onboarding-form";

const providerSegments = [
  {
    title: "Profile setup",
    items: ["Institution type", "Products offered", "Target geographies", "Priority turnaround expectations"]
  },
  {
    title: "Credit policy fit",
    items: ["Minimum bureau bands", "Income categories", "FOIR or leverage thresholds", "Collateral appetite"]
  },
  {
    title: "Operational handoff",
    items: ["Required documents", "Exception handling", "Assigned relationship teams", "API or assisted login flow"]
  }
];

export default function ProvidersPage() {
  return (
    <main className="container-shell py-20">
      <Badge>Provider console</Badge>
      <h1 className="section-title mt-4">Provider onboarding should feel premium, structured, and globally credible.</h1>
      <p className="section-subtitle">
        This remains the internal provider-policy screen: who the institution is, which products it funds, and how the marketplace
        should route credit demand into its lane.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {providerSegments.map((segment) => (
          <Card key={segment.title}>
            <CardContent className="p-7">
              <h2 className="text-xl font-semibold">{segment.title}</h2>
              <ul className="mt-5 space-y-3 text-muted-foreground">
                {segment.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardContent className="p-7">
            <h2 className="text-2xl font-semibold">Provider onboarding form</h2>
            <p className="mt-3 text-muted-foreground">
              This writes into `providers` and `provider_policies`, keeping the lender side policy-first even while the public site
              becomes more customer and partner focused.
            </p>
            <div className="mt-6">
              <ProviderOnboardingForm />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Suggested lender attributes</p>
              <div className="mt-5 space-y-3">
                {[
                  "Product line: home, LAP, unsecured, SME, cards",
                  "Risk appetite: prime, near-prime, doc-lite, collateral-backed",
                  "Geography: national, region-first, city whitelist",
                  "Turnaround mode: express, standard, manual review"
                ].map((item) => (
                  <div key={item} className="feature-row">{item}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Onboarding outcome</p>
              <h2 className="mt-3 text-2xl font-semibold">Each provider becomes a trusted route inside the marketplace.</h2>
              <p className="mt-4 text-muted-foreground">
                The point is not just to display logos. The platform should turn lender appetite into routing logic the ops team can
                act on, while preserving a polished borrower and partner experience on the surface.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  ["Rule groups", "Product, geography, risk, docs"],
                  ["Case views", "Matched, fallback, exception, hold"],
                  ["Ownership", "Assigned RM, partner, internal reviewer"],
                  ["Feedback loop", "Approval, reject reason, disbursal status"]
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
      </div>
    </main>
  );
}
