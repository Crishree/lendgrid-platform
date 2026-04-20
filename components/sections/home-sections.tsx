import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileSearch,
  LayoutDashboard,
  Network,
  UserRoundSearch,
  WalletCards
} from "lucide-react";
import { MatchStudio } from "@/components/match-studio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const providerPolicies = [
  "Product and geography coverage",
  "Bureau score bands and fallback tiers",
  "Income type and documentation model",
  "EMI load / FOIR thresholds",
  "Collateral and ticket-size appetite"
];

export function HomeSections() {
  return (
    <div>
      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="animate-fadeUp">
            <Badge className="bg-accent/12 text-accent">Retail credit operating system</Badge>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Build the DSA network around policy-fit matching, not blind lead distribution.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              LendGrid is a separate product for onboarding finance providers, capturing retail borrower profiles, and routing each case
              toward lenders most likely to convert based on risk and policy alignment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ops" className="primary-button">
                Explore match studio
              </Link>
              <Link href="/providers" className="secondary-button">
                See lender onboarding <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {["Home loans", "LAP", "Business loans", "Personal loans", "Credit cards"].map((item) => (
                <span key={item} className="dashboard-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Card className="hero-panel overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Network snapshot</p>
                  <h2 className="mt-2 text-2xl font-semibold">Three-sided workflow</h2>
                </div>
                <span className="status-pill">MVP</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Onboarded lenders", value: "24" },
                  { label: "Borrower cohorts", value: "11" },
                  { label: "Rule groups", value: "86" },
                  { label: "Median first response", value: "10 hrs" }
                ].map((metric) => (
                  <div key={metric.label} className="data-card">
                    <p className="data-label">{metric.label}</p>
                    <p className="data-value">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-border bg-background/80 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Policy overlay examples</p>
                  <LayoutDashboard className="h-5 w-5 text-accent" />
                </div>
                <div className="mt-4 grid gap-3">
                  {providerPolicies.map((policy) => (
                    <div key={policy} className="feature-row">
                      <BadgeCheck className="h-4 w-4 text-accent" />
                      <span>{policy}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-shell py-8">
        <div className="logo-row">
          {["Banks", "NBFCs", "Housing finance", "DSA teams", "Credit ops"].map((item) => (
            <span key={item} className="dashboard-chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="mb-10">
          <Badge>Core workflow</Badge>
          <h2 className="section-title mt-4">Separate acquisition, qualification, and routing.</h2>
          <p className="section-subtitle">
            The product becomes much more defensible when borrower intake, provider policy setup, and matching operations are distinct
            modules instead of one overloaded CRM screen.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: UserRoundSearch,
              title: "Borrower intake",
              body: "Collect occupation, income, liabilities, collateral, and loan intent in a structured onboarding journey."
            },
            {
              icon: Building2,
              title: "Provider onboarding",
              body: "Register finance partners with product lines, underwriting comfort zones, and document expectations."
            },
            {
              icon: Network,
              title: "Match operations",
              body: "Rank lenders by fit score, expected TAT, and exception risk before the file is handed off."
            }
          ].map((item) => (
            <Card key={item.title} className="panel-hover">
              <CardContent className="p-7">
                <item.icon className="icon" />
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge>Interactive module</Badge>
            <h2 className="section-title mt-4">Match studio prototype</h2>
            <p className="section-subtitle">
              This client-side module demonstrates the shape of the core product: select a borrower cohort and inspect ranked lender
              suggestions with explicit reasons.
            </p>
          </div>
          <Link href="/ops" className="secondary-button">
            Open full ops view
          </Link>
        </div>
        <MatchStudio />
      </section>

      <section className="container-shell py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardContent className="p-7">
              <div className="flex items-center gap-3">
                <FileSearch className="icon" />
                <h3 className="text-2xl font-semibold">Why providers join</h3>
              </div>
              <ul className="mt-5 space-y-3 text-muted-foreground">
                <li>Cleaner inbound cases with profile context before underwriting starts.</li>
                <li>Product-level visibility into where the DSA network is producing fit or mismatch.</li>
                <li>Less wasted effort from leads that were never inside policy in the first place.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-7">
              <div className="flex items-center gap-3">
                <WalletCards className="icon" />
                <h3 className="text-2xl font-semibold">Why borrowers stay</h3>
              </div>
              <ul className="mt-5 space-y-3 text-muted-foreground">
                <li>One structured application instead of repeated intake across multiple lenders.</li>
                <li>Early visibility into likely-fit products and document expectations.</li>
                <li>A route that feels guided rather than opaque.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-shell pb-20">
        <Card className="cta-panel">
          <CardContent className="p-10 text-center">
            <Badge className="bg-card text-foreground">Next build phase</Badge>
            <h2 className="mt-5 text-3xl font-semibold md:text-5xl">Move from product shell to workflows and data model.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The next logical step is to add actual borrower forms, provider policy configuration, and a rule engine that scores real
              inputs instead of static example cohorts.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/borrowers" className="primary-button">Borrower flow</Link>
              <Link href="/providers" className="secondary-button">Provider console</Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
