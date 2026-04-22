import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ruleSets = [
  {
    name: "Auto-profile escalation",
    trigger: "Credit score missing or documents below minimum threshold",
    action: "Move case to `profiled` with review flag and request borrower follow-up"
  },
  {
    name: "Primary provider routing",
    trigger: "Hard filters pass and score is 75 or above",
    action: "Mark as `match`, assign primary provider lane, and notify ops reviewer"
  },
  {
    name: "Fallback path routing",
    trigger: "Score is between 50 and 74",
    action: "Keep lender visible as fallback and show specific improvement actions"
  },
  {
    name: "Reject reason automation",
    trigger: "Hard filters fail or score drops below threshold",
    action: "Create explicit reject reason and feed it into analytics"
  }
];

const automationSurfaces = [
  "Lifecycle stage transitions",
  "Case assignment to ops teams",
  "Document reminder workflows",
  "Partner and provider notifications",
  "Fallback lender suggestions",
  "Reject-reason classification"
];

export default function AutomationPage() {
  return (
    <main className="container-shell py-20">
      <Badge>Workflow Automation</Badge>
      <h1 className="section-title mt-4">Turn match logic and case rules into actual operating automation.</h1>
      <p className="section-subtitle">
        The platform brief called for decisioning and workflow automation. This module shows how the system can move beyond manual ops
        clicks and begin orchestrating case movement based on policy, risk, and document state.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {ruleSets.map((rule) => (
          <Card key={rule.name} className="panel-hover">
            <CardContent className="p-8">
              <p className="field-label">{rule.name}</p>
              <h2 className="mt-3 text-2xl font-semibold">{rule.trigger}</h2>
              <p className="mt-4 text-muted-foreground">{rule.action}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardContent className="p-8">
            <p className="field-label">Automation scope</p>
            <div className="mt-5 space-y-3">
              {automationSurfaces.map((item) => (
                <div key={item} className="feature-row">{item}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <p className="field-label">Why it matters</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ["Speed", "Shorter cycle time from intake to lender submission"],
                ["Consistency", "Same case logic applied across agents and partners"],
                ["Transparency", "Every decision leaves an audit trail"],
                ["Scalability", "Higher case volume without proportional ops headcount"]
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
