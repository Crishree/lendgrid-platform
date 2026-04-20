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
      <Badge>For customers</Badge>
      <h1 className="section-title mt-4">Check eligibility across major loan categories in a cleaner borrower experience.</h1>
      <p className="section-subtitle">
        This is the customer-facing application hub. It is designed to feel less like a lead dump and more like a guided fintech flow:
        understand your need, share your profile once, and move into the best-fit lending path.
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
            <h2 className="text-2xl font-semibold">Eligibility and application form</h2>
            <p className="mt-3 text-muted-foreground">
              This intake supports the core digital products already implemented in the platform. It captures one profile and creates a
              structured case that can then be matched, assisted, and advanced.
            </p>
            <div className="mt-6">
              <BorrowerIntakeForm />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Borrower promise</p>
              <div className="mt-5 space-y-3">
                {[
                  "Understand which product path you should take first",
                  "Share your profile and documents only once",
                  "Move into assisted support where needed",
                  "Get cleaner routing rather than random callbacks"
                ].map((field) => (
                  <div key={field} className="feature-row">{field}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Modern UX rule</p>
              <h2 className="mt-3 text-2xl font-semibold">Borrower discovery first, underwriting detail second.</h2>
              <p className="mt-4 text-muted-foreground">
                The interface should guide customers through need, eligibility, and confidence-building before exposing deeper financial
                detail. That keeps the experience more premium and more globally legible.
              </p>
              <div className="mt-6 rounded-[1.5rem] border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
                Example: show “likely-fit loan category” or “documents you’ll need next” before asking the borrower to think about
                lender policy complexity.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
