import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BorrowerIntakeForm } from "@/components/forms/borrower-intake-form";

const borrowerSteps = [
  {
    title: "Identity and intent",
    body: "Capture borrower type, employment category, city, product sought, ticket size, and intended use."
  },
  {
    title: "Financial profile",
    body: "Collect income mode, monthly obligations, business turnover, collateral value, and repayment comfort."
  },
  {
    title: "Eligibility preparation",
    body: "Show likely-fit lenders, document checklist, and quality warnings before the case enters the ops queue."
  }
];

export default function BorrowersPage() {
  return (
    <main className="container-shell py-20">
      <Badge>Borrower intake</Badge>
      <h1 className="section-title mt-4">The borrower flow should collect underwriting signals without feeling like underwriting.</h1>
      <p className="section-subtitle">
        This page defines the intake side of the MVP: enough structured information to score risk and provider fit, but still simple
        enough for an assisted sales team or direct applicant to complete.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {borrowerSteps.map((step, index) => (
          <Card key={step.title}>
            <CardContent className="p-7">
              <div className="step-badge">0{index + 1}</div>
              <h2 className="mt-5 text-xl font-semibold">{step.title}</h2>
              <p className="mt-3 text-muted-foreground">{step.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardContent className="p-7">
            <h2 className="text-2xl font-semibold">Borrower intake form</h2>
            <p className="mt-3 text-muted-foreground">
              This form maps directly into `borrowers` and `applications`, then creates a `profiled` case for ops.
            </p>
            <div className="mt-6">
              <BorrowerIntakeForm />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Suggested fields</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                "Occupation type",
                "Monthly income or turnover",
                "Existing EMI obligations",
                "Bureau band or consent checkpoint",
                "Property / collateral details",
                "Preferred loan amount and tenure",
                "Residence and work geography",
                "Document availability"
              ].map((field) => (
                <div key={field} className="feature-row">{field}</div>
              ))}
            </div>
          </CardContent>
          </Card>

          <Card>
            <CardContent className="p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Design rule</p>
            <h2 className="mt-3 text-2xl font-semibold">Ask only what improves routing quality.</h2>
            <p className="mt-4 text-muted-foreground">
              Every form field should map to a decision in the system: match confidence, document requirement, exception review, or
              provider ranking. If a field does not change any of those outcomes, it should not slow down the borrower.
            </p>
            <div className="mt-6 rounded-[1.5rem] border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
              Example: bureau score may be unknown at first capture, so the workflow should support a provisional band and upgrade the
              match ranking when verified credit data becomes available.
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
