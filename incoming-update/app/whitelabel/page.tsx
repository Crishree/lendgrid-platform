import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const brandControls = [
  "Brand name, logo, colors, and font system",
  "Domain mapping and tenant-specific landing pages",
  "Product and geography visibility by client",
  "Custom onboarding copy and document instructions",
  "Partner-facing vs borrower-facing module exposure",
  "Role-based navigation and workflow controls"
];

const tenants = [
  {
    name: "DSA Enterprise Tenant",
    description: "A partner network wants the platform branded as its own distribution operating system for agents and borrowers."
  },
  {
    name: "Lender-Led Tenant",
    description: "A bank or NBFC wants borrower capture and routing flows branded to its own institution and product stack."
  },
  {
    name: "Aggregator Tenant",
    description: "A marketplace operator needs multiple partner lanes but a single external brand for customer trust."
  }
];

export default function WhiteLabelPage() {
  return (
    <main className="container-shell py-20">
      <Badge>White-label Platform</Badge>
      <h1 className="section-title mt-4">Support enterprise branding without rewriting the product each time.</h1>
      <p className="section-subtitle">
        The brief called for white-label options. This module frames LendGrid as a configurable SaaS platform that can be presented
        differently for DSAs, lenders, and enterprise clients while sharing the same core data and matching engine.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardContent className="p-8">
            <p className="field-label">Brand controls</p>
            <div className="mt-5 space-y-3">
              {brandControls.map((item) => (
                <div key={item} className="feature-row">{item}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <p className="field-label">Tenant examples</p>
            <div className="mt-5 space-y-3">
              {tenants.map((tenant) => (
                <div key={tenant.name} className="rounded-[1rem] border border-border bg-background/70 p-4">
                  <p className="font-semibold">{tenant.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{tenant.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "SaaS core",
            body: "One product foundation supports many branded clients without fragmenting the matching and workflow logic."
          },
          {
            title: "API-ready extensions",
            body: "White-label tenants can still connect internal CRMs, lender APIs, and analytics pipelines."
          },
          {
            title: "Enterprise readiness",
            body: "Role control, tenant-specific modules, and auditability make white-label deployment credible."
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
    </main>
  );
}
