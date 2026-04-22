import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProviderOnboardingForm } from "@/components/forms/provider-onboarding-form";

const partnerBenefits = [
  "Be your own boss with a flexible DSA-led sourcing model",
  "Offer multiple financial products from one operating surface",
  "Run guided onboarding with clearer training and documentation",
  "Track approvals, rejects, and disbursals by case and partner lane"
];

export default function PartnersPage() {
  return (
    <main className="container-shell py-20">
      <Badge>Partner & DSA network</Badge>
      <h1 className="section-title mt-4">A stronger digital home for DSAs, advisors, and lending partners.</h1>
      <p className="section-subtitle">
        LendGrid gives partners a more modern way to grow distribution. Onboarding is simpler, product access is broader, and every
        case moves through a more visible and disciplined workflow.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {partnerBenefits.map((benefit) => (
          <Card key={benefit} className="panel-hover">
            <CardContent className="p-6">
              <p className="text-base font-semibold">{benefit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold">Become a lending partner</h2>
            <p className="mt-3 text-muted-foreground">
              This onboarding flow is built for DSAs, aggregators, and institutions that want to originate or receive multiple types of
              retail loan demand through one platform.
            </p>
            <div className="mt-6">
              <ProviderOnboardingForm />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-8">
              <p className="field-label">Why partners stay</p>
              <h2 className="mt-3 text-2xl font-semibold">Built for repeat business, not one-off lead passing.</h2>
              <div className="mt-5 space-y-3">
                {[
                  "Pan-network lead capture for multiple product lines",
                  "Simpler onboarding and sharper product understanding",
                  "Smarter routing instead of blind lead sharing",
                  "A clearer picture of what is converting and why"
                ].map((item) => (
                  <div key={item} className="feature-row">{item}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <p className="field-label">Inside the platform</p>
              <div className="mt-4 grid gap-3">
                {[
                  ["Product access", "Home, LAP, business, personal, cards, education"],
                  ["Partner role", "DSA, advisor, institution, provider user"],
                  ["Core outcome", "Source, track, and grow quality credit journeys"],
                  ["Operating support", "Documents, onboarding, case movement, feedback"]
                ].map(([label, value]) => (
                  <div key={label} className="data-card">
                    <p className="data-label">{label}</p>
                    <p className="data-value text-lg">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <p className="field-label">Commercial model</p>
              <div className="mt-4 space-y-3">
                {[
                  "Cloud-hosted delivery",
                  "Flexible modules for client and partner needs",
                  "Integration-ready architecture",
                  "White-label options for enterprise distribution networks"
                ].map((item) => (
                  <div key={item} className="feature-row">{item}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
