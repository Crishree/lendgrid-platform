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
      <h1 className="section-title mt-4">A calmer, clearer borrowing journey from first click to application.</h1>
      <p className="section-subtitle">
        LendGrid is built to make borrowing feel more understandable. Customers can explore the right category, check fit, prepare
        documents, and move ahead without repeating the same story across multiple lenders.
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
            <h2 className="text-2xl font-semibold">Check fit and start your application</h2>
            <p className="mt-3 text-muted-foreground">
              This form gathers the information needed to understand where a customer fits and what the next best lending path looks
              like. It is designed to be practical, not overwhelming.
            </p>
            <div className="mt-6">
              <BorrowerIntakeForm />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">What customers get</p>
              <div className="mt-5 space-y-3">
                {[
                  "A clearer sense of which loan path makes the most sense",
                  "Share your profile and documents only once",
                  "Support when the journey needs a human hand",
                  "Less noise, fewer dead ends, and better routing"
                ].map((field) => (
                  <div key={field} className="feature-row">{field}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Design principle</p>
              <h2 className="mt-3 text-2xl font-semibold">Lead with clarity, then ask for detail.</h2>
              <p className="mt-4 text-muted-foreground">
                Strong lending UX does not feel like paperwork on the first screen. It earns trust by helping the customer understand
                the process before moving into deeper financial detail.
              </p>
              <div className="mt-6 rounded-[1.5rem] border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
                Show the likely product fit and the next document step first. Complexity belongs under the hood, not in the first
                impression.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
