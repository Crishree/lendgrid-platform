import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const borrowerFeed = [
  {
    name: "Priya Sharma",
    product: "Home Loan",
    city: "Mumbai",
    score: "782",
    fit: "Prime salaried profile, high probability match"
  },
  {
    name: "Rakesh Jain",
    product: "LAP",
    city: "Pune",
    score: "724",
    fit: "Commercial collateral case, strong NBFC fit"
  },
  {
    name: "Neha Verma",
    product: "Business Loan",
    city: "Bengaluru",
    score: "706",
    fit: "Working capital need with viable fintech NBFC routing"
  }
];

export default function DsaPortalPage() {
  return (
    <main className="container-shell py-20">
      <Badge>DSA partner panel</Badge>
      <h1 className="section-title mt-4">A sourcing panel for DSAs to see borrower opportunities and move cases forward.</h1>
      <p className="section-subtitle">
        This is the partner-side working view. DSAs can onboard, review borrower leads, understand likely-fit lender lanes, and track
        outcomes across their pipeline.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Borrower opportunities", "See potential retail borrowers and prioritise by fit and readiness."],
          ["Case packaging", "Prepare documents and improve the file before submission."],
          ["Outcome tracking", "Monitor which providers approve, reject, or disburse each sourced case."]
        ].map(([title, body]) => (
          <Card key={title} className="panel-hover">
            <CardContent className="p-7">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-muted-foreground">{body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <Card>
          <CardContent className="p-8">
            <p className="field-label">Potential borrower list</p>
            <div className="mt-5 space-y-3">
              {borrowerFeed.map((item) => (
                <div key={item.name} className="rounded-[1rem] border border-border bg-background/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{item.name}</p>
                    <span className="dashboard-chip">{item.product}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.city} · Bureau {item.score}
                  </p>
                  <p className="mt-3 text-sm">{item.fit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-8">
              <p className="field-label">What DSAs can do</p>
              <div className="mt-5 space-y-3">
                {[
                  "Review new potential borrower profiles",
                  "Complete missing documents and identity checks",
                  "Submit cases to the most suitable provider lane",
                  "Track movement from match to disbursal"
                ].map((item) => (
                  <div key={item} className="feature-row">{item}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <p className="field-label">Performance snapshot</p>
              <div className="mt-4 grid gap-3">
                {[
                  ["Active borrower leads", "186"],
                  ["Submitted this week", "42"],
                  ["Approved", "14"],
                  ["Disbursed value", "₹1.86Cr"]
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
