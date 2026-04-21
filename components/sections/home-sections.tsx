import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Banknote,
  BookOpenCheck,
  Building2,
  BriefcaseBusiness,
  CloudCog,
  CreditCard,
  GraduationCap,
  HandCoins,
  Landmark,
  Network,
  PanelsTopLeft,
  ShieldCheck,
  Users,
  Wallet
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    title: "Home Loans",
    body: "Compare purchase, construction, extension, improvement, top-up, and NRI housing journeys in one place.",
    icon: Landmark
  },
  {
    title: "Loan Against Property",
    body: "Unlock residential or commercial collateral for business, expansion, or liquidity needs.",
    icon: Building2
  },
  {
    title: "Business Loans",
    body: "Working capital and growth financing for MSMEs, proprietors, partnerships, and companies.",
    icon: BriefcaseBusiness
  },
  {
    title: "Personal Loans",
    body: "Fast unsecured credit for salaried and self-employed borrowers with lighter documentation paths.",
    icon: Wallet
  },
  {
    title: "Credit Cards",
    body: "Route customers into card offers and balance transfer journeys through a single assisted flow.",
    icon: CreditCard
  },
  {
    title: "Education Loans",
    body: "Capture family/student use cases alongside documents, co-applicants, and lender fit signals.",
    icon: GraduationCap
  }
];

const borrowerAdvantages = [
  "One place to check eligibility across multiple products",
  "Guided documents, EMI readiness, and fit checks before submission",
  "Cleaner handoff into lender or advisor conversations"
];

const partnerAdvantages = [
  "DSA onboarding, training logic, and structured case submissions",
  "Product coverage across secured and unsecured retail loans",
  "Better visibility into match, fallback, and reject outcomes"
];

const platformCapabilities = [
  {
    title: "Unified borrower onboarding",
    body: "Customizable digital application forms that standardize intake across products, channels, and partners.",
    icon: PanelsTopLeft
  },
  {
    title: "Multi-lender integration",
    body: "Banks and NBFCs operate as structured provider lanes instead of disconnected spreadsheets and email loops.",
    icon: Network
  },
  {
    title: "Workflow automation",
    body: "Decisioning, routing, exceptions, and lifecycle progression can be automated around lender policy and case state.",
    icon: CloudCog
  },
  {
    title: "Analytics and insights",
    body: "Track sourcing quality, approval ratios, reject reasons, disbursals, and partner performance from one surface.",
    icon: BarChart3
  }
];

export function HomeSections() {
  return (
    <div>
      <section className="container-shell py-20 md:py-28">
        <div className="hero-grid">
          <div className="animate-fadeUp">
            <Badge className="bg-accent/12 text-accent">Customer loans + DSA distribution in one modern platform</Badge>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-tight md:text-7xl">
              Discover the right loan, onboard the right partner, and route every case with more clarity.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Inspired by the marketplace model used by Ruloans, LendGrid brings borrowers, DSAs, and finance providers into one
              globally styled credit platform with a cleaner interface, sharper trust signals, and a more premium digital experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/borrowers" className="primary-button">
                Check eligibility
              </Link>
              <Link href="/partners" className="secondary-button">
                Become a partner <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {["275+ institution relationships", "1M+ customers served", "Pan-network sourcing", "Multiple product journeys"].map((item) => (
                <span key={item} className="dashboard-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Card className="hero-market-panel overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Marketplace snapshot</p>
                  <h2 className="mt-2 text-2xl font-semibold">Borrower + DSA + provider workflow</h2>
                </div>
                <span className="status-pill">Live model</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Loan categories", value: "6" },
                  { label: "Active provider lanes", value: "275+" },
                  { label: "DSA onboarding flow", value: "Digital" },
                  { label: "First response", value: "< 10 hrs" }
                ].map((metric) => (
                  <div key={metric.label} className="data-card">
                    <p className="data-label">{metric.label}</p>
                    <p className="data-value">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 rounded-[1.5rem] border border-border bg-background/80 p-5">
                {[
                  ["Borrower side", "Explore products, check eligibility, share docs, get matched"],
                  ["DSA side", "Onboard, source customers, track cases, grow income"],
                  ["Provider side", "Receive cleaner profiles and policy-fit submissions"]
                ].map(([label, text]) => (
                  <div key={label} className="feature-row">
                    <BadgeCheck className="h-4 w-4 text-accent" />
                    <div>
                      <p className="font-semibold">{label}</p>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-shell py-8">
        <div className="logo-row">
          {["Home Loans", "LAP", "Personal Loans", "Business Loans", "Education Loans", "Balance Transfer"].map((item) => (
            <span key={item} className="dashboard-chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="section-heading">
          <Badge>Product marketplace</Badge>
          <h2 className="section-title mt-4">A broader credit catalogue with a cleaner digital flow.</h2>
          <p className="section-subtitle">
            The customer side should feel like a global fintech marketplace: elegant product discovery, clear outcomes, and assisted
            progression instead of cluttered lead forms.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Card key={product.title} className="panel-hover">
              <CardContent className="p-7">
                <product.icon className="icon" />
                <h3 className="mt-5 text-2xl font-semibold">{product.title}</h3>
                <p className="mt-3 text-muted-foreground">{product.body}</p>
                <Link href="/loans" className="inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                  Explore product <ArrowRight size={15} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="journey-panel">
            <CardContent className="p-8">
              <div className="flex items-center gap-3">
                <HandCoins className="icon" />
                <h3 className="text-3xl font-semibold">For customers</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Mirror the best parts of Ruloans’ customer journey: broad product access, eligibility-led discovery, and one structured
                intake that helps borrowers understand what they qualify for before being pushed downstream.
              </p>
              <div className="mt-6 space-y-3">
                {borrowerAdvantages.map((item) => (
                  <div key={item} className="feature-row">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/borrowers" className="primary-button mt-8">
                Start customer onboarding
              </Link>
            </CardContent>
          </Card>

          <Card className="journey-panel">
            <CardContent className="p-8">
              <div className="flex items-center gap-3">
                <Users className="icon" />
                <h3 className="text-3xl font-semibold">For DSAs and partners</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Mirror the partner side too: easy onboarding, multi-product sourcing, training and business-building cues, and enough
                transparency to understand how cases convert across institutions.
              </p>
              <div className="mt-6 space-y-3">
                {partnerAdvantages.map((item) => (
                  <div key={item} className="feature-row">
                    <BookOpenCheck className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/partners" className="primary-button mt-8">
                Become a DSA partner
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="section-heading">
          <Badge>How it works</Badge>
          <h2 className="section-title mt-4">Modern marketplace on the front, matching engine underneath.</h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            {
              icon: Banknote,
              title: "Choose loan type",
              body: "Borrowers browse home loans, LAP, personal, business, education, and transfer-style products."
            },
            {
              icon: ShieldCheck,
              title: "Check eligibility",
              body: "The platform captures intent, profile, liabilities, and documentation in a guided experience."
            },
            {
              icon: Users,
              title: "Route to advisor / DSA",
              body: "Cases can be assisted by DSAs or internal teams depending on source and complexity."
            },
            {
              icon: Building2,
              title: "Match provider",
              body: "Behind the UI, policy-fit and risk-fit logic decide the primary, fallback, or reject outcome."
            }
          ].map((step, index) => (
            <Card key={step.title} className="panel-hover">
              <CardContent className="p-7">
                <div className="step-badge">0{index + 1}</div>
                <step.icon className="mt-5 icon" />
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-muted-foreground">{step.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="section-heading">
          <Badge>Aggregation engine</Badge>
          <h2 className="section-title mt-4">The platform now reflects the full Intelligent Loan Aggregation brief.</h2>
          <p className="section-subtitle">
            Beyond product discovery and partner onboarding, the proposition now explicitly includes digital borrower standardization,
            multi-lender connectivity, decision automation, and performance analytics.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {platformCapabilities.map((item) => (
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

      <section className="container-shell pb-20">
        <Card className="cta-panel">
          <CardContent className="p-10 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <Badge className="bg-card text-foreground">Built for the same broad lending motion, with better UX</Badge>
                <h2 className="mt-5 text-3xl font-semibold md:text-5xl">Give customers a more trusted way to borrow and partners a more serious platform to grow with.</h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  This app now positions itself as a full customer and partner marketplace, while preserving the borrower intake,
                  provider onboarding, match engine, and ops capabilities already built underneath.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/loans" className="secondary-button bg-white text-slate-900">
                  Browse all loan categories
                </Link>
                <Link href="/partners" className="secondary-button bg-white text-slate-900">
                  Join as DSA / partner
                </Link>
                <Link href="/ops" className="secondary-button bg-white text-slate-900">
                  See match engine workspace
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
