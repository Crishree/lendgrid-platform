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
      <h1 className="section-title mt-4">A more modern way to onboard DSAs, advisors, and finance providers.</h1>
      <p className="section-subtitle">
        The partner side should reflect what works in the Ruloans model: multi-product distribution, easy onboarding, and enough
        structure to help individuals and teams build a serious sourcing business.
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
              Use this onboarding flow for DSAs, aggregators, and institutions that want to distribute or receive multiple types of
              retail loan traffic through the same platform.
            </p>
            <div className="mt-6">
              <ProviderOnboardingForm />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card>
            <CardContent className="p-8">
              <p className="field-label">Partner proposition</p>
              <h2 className="mt-3 text-2xl font-semibold">Built for scale, training, and repeat sourcing.</h2>
              <div className="mt-5 space-y-3">
                {[
                  "Pan-network lead capture for multiple product lines",
                  "Product education and assisted onboarding playbooks",
                  "Policy-aware routing instead of blind lead sharing",
                  "Clearer outcomes for match, fallback, and rejection"
                ].map((item) => (
                  <div key={item} className="feature-row">{item}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <p className="field-label">What partners see</p>
              <div className="mt-4 grid gap-3">
                {[
                  ["Product access", "Home, LAP, business, personal, cards, education"],
                  ["Partner role", "DSA, advisor, institution, provider user"],
                  ["Core outcome", "Source, track, and monetize quality credit journeys"],
                  ["Operating support", "Docs, training, case movement, feedback loop"]
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
