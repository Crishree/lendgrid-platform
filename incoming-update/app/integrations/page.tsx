import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const integrations = [
  {
    title: "Bureau / CIBIL APIs",
    body: "Pull bureau data to enrich borrower profiles and improve lender matching before manual review begins."
  },
  {
    title: "KYC APIs",
    body: "Verify borrower identity through Aadhaar, PAN, and related KYC workflows inside the application journey."
  },
  {
    title: "Document APIs",
    body: "Collect, validate, and classify supporting documents so missing data can be flagged early."
  },
  {
    title: "Lender connectivity",
    body: "Push approved or matched cases into lender-specific systems, queues, or review workflows."
  }
];

export default function IntegrationsPage() {
  return (
    <main className="container-shell py-20">
      <Badge>API & trust integrations</Badge>
      <h1 className="section-title mt-4">Identity, credit, and document integrations that make matching more reliable.</h1>
      <p className="section-subtitle">
        LendGrid is designed to plug into external verification and bureau services so borrower profiles can be enriched before they
        are routed to lenders. The result is cleaner decisioning and less wasted manual effort.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {integrations.map((item) => (
          <Card key={item.title} className="panel-hover">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardContent className="p-8">
            <p className="field-label">Working sequence</p>
            <div className="mt-5 space-y-3">
              {[
                "Capture borrower profile",
                "Verify identity through Aadhaar and PAN layers",
                "Pull bureau data such as CIBIL score",
                "Apply lender parameters and match",
                "Initiate lender process and track the case"
              ].map((item) => (
                <div key={item} className="feature-row">{item}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <p className="field-label">Why this matters</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                ["Cleaner profiles", "Better lender confidence before underwriting"],
                ["Faster review", "Less manual back-and-forth on basic checks"],
                ["Safer routing", "Better borrower-lender fit from the start"],
                ["Stronger trust", "A more credible digital borrowing experience"]
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
