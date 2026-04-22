import { MatchStudio } from "@/components/match-studio";
import { OpsQueue } from "@/components/ops/ops-queue";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function OpsPage() {
  return (
    <main className="container-shell py-20">
      <Badge>Match studio</Badge>
      <h1 className="section-title mt-4">Operations needs a reasoned ranking, not a flat lender list.</h1>
      <p className="section-subtitle">
        This is the most product-shaped part of the MVP so far. The studio demonstrates how an operator can inspect borrower context,
        review policy-fit indicators, and decide which lenders should receive the file first.
      </p>

      <div className="mt-10">
        <OpsQueue />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-7">
            <h2 className="text-xl font-semibold">Lifecycle</h2>
            <p className="mt-3 text-muted-foreground">
              `new -> profiled -> matched -> submitted -> provider_review -> approved/rejected -> disbursed`
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-7">
            <h2 className="text-xl font-semibold">Matching order</h2>
            <p className="mt-3 text-muted-foreground">
              Hard filters first, then risk filters, then soft scoring using TAT, documentation fit, and lender preference.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Decision automation",
            body: "Automate profiling, matching, lifecycle movement, and exception routing around credit-policy logic."
          },
          {
            title: "Analytics and insights",
            body: "Use the same workspace to understand rejects, lender responsiveness, disbursal quality, and partner performance."
          },
          {
            title: "API-ready model",
            body: "This architecture is positioned to connect lender systems, white-label clients, and downstream workflow integrations."
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

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Primary route",
            body: "Send the case to the top-ranked provider when policy and documentation are already aligned."
          },
          {
            title: "Fallback route",
            body: "Keep alternate providers visible when the first lender declines or asks for stricter conditions."
          },
          {
            title: "Exception review",
            body: "Escalate borderline profiles for manual assessment instead of auto-distributing them blindly."
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

      <div className="mt-10">
        <MatchStudio />
      </div>
    </main>
  );
}
