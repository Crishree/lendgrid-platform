import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProviderOnboardingForm } from "@/components/forms/provider-onboarding-form";

const lenderPanels = [
  ["Product rules", "Define loan products, ticket sizes, geographies, and collateral appetite."],
  ["Credit policy", "Set bureau thresholds, FOIR bands, income types, and business vintage rules."],
  ["Case review", "Review matched borrowers, see reasons for fit, and move files into underwriting."],
  ["Feedback loop", "Send approval, rejection, and disbursal outcomes back into the platform."]
];

export default function LenderPortalPage() {
  return (
    <main className="container-shell py-20">
      <Badge>Loan provider panel</Badge>
      <h1 className="section-title mt-4">A lender workspace for underwriting appetite, routing rules, and case intake.</h1>
      <p className="section-subtitle">
        This panel is where banks and NBFCs tell LendGrid what they want to fund. Their parameters shape which borrower profiles are
        matched, which are shown as fallback, and which are rejected before manual effort is wasted.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {lenderPanels.map(([title, body]) => (
          <Card key={title} className="panel-hover">
            <CardContent className="p-7">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-muted-foreground">{body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold">Set lender parameters</h2>
            <p className="mt-3 text-muted-foreground">
              This is the working admin surface for the loan provider. It controls who gets matched into the lender lane and how those
              cases should be prioritised.
            </p>
            <div className="mt-6">
              <ProviderOnboardingForm />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-8">
              <p className="field-label">Parameter examples</p>
              <div className="mt-5 space-y-3">
                {[
                  "Home loan prime segment above 750 bureau and metro geographies",
                  "LAP cases with commercial or residential collateral and business proof",
                  "Business loans under ₹50L with minimum turnover and vintage thresholds",
                  "Turnaround SLAs and documentation readiness requirements"
                ].map((item) => (
                  <div key={item} className="feature-row">{item}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <p className="field-label">What lenders see</p>
              <div className="mt-4 grid gap-3">
                {[
                  ["Primary queue", "Best-fit borrower files ready for action"],
                  ["Fallback queue", "Borderline but usable profiles"],
                  ["Reject reasons", "Why a profile should not enter manual review"],
                  ["Channel quality", "Which DSA lanes are sending the cleanest demand"]
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
