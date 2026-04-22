import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Banknote,
  Building2,
  BriefcaseBusiness,
  CreditCard,
  GraduationCap,
  HandCoins,
  Landmark,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    title: "Home Loans",
    body: "Purchase, construction, extension, top-up, and transfer journeys with lender matching built in.",
    icon: Landmark
  },
  {
    title: "Loan Against Property",
    body: "Residential and commercial collateral-based borrowing for business, liquidity, and growth needs.",
    icon: Building2
  },
  {
    title: "Business Loans",
    body: "Working capital and growth financing for MSMEs, founders, and established operating businesses.",
    icon: BriefcaseBusiness
  },
  {
    title: "Personal Loans",
    body: "Fast unsecured credit with a cleaner digital journey and lighter documentation flow.",
    icon: Wallet
  },
  {
    title: "Credit Cards",
    body: "Card-fit journeys that help customers move into the right offer instead of generic lead capture.",
    icon: CreditCard
  },
  {
    title: "Education Loans",
    body: "Structured guidance for domestic and overseas study financing with co-applicant readiness.",
    icon: GraduationCap
  }
];

const customerPoints = [
  "A simple way to discover the right loan without bouncing between lenders",
  "One profile, one document path, and a clearer sense of what comes next",
  "Human support when needed, without losing the speed of a digital flow"
];

const partnerPoints = [
  "A modern home for DSAs, sourcing partners, and finance providers",
  "Structured case movement instead of ad hoc follow-ups and spreadsheets",
  "Better visibility into approvals, fallbacks, rejects, and disbursals"
];

const capabilities = [
  {
    title: "Digital onboarding",
    body: "Borrowers, DSAs, and institutions all enter through structured flows that create cleaner data from day one.",
    icon: Sparkles
  },
  {
    title: "Intelligent distribution",
    body: "The platform routes cases toward providers whose policy and appetite are most aligned with the borrower profile.",
    icon: BadgeCheck
  },
  {
    title: "Automation and control",
    body: "Teams can automate routing, lifecycle movement, and exception handling while keeping a full audit trail.",
    icon: ShieldCheck
  },
  {
    title: "Performance visibility",
    body: "Analytics help teams understand where quality is improving, where rejection is rising, and where disbursals are strongest.",
    icon: BarChart3
  }
];

export function HomeSections() {
  return (
    <div>
      <section className="container-shell py-20 md:py-28">
        <div className="hero-grid">
          <div className="hero-copy animate-fadeUp">
            <Badge className="bg-accent/12 text-accent">Modern credit marketplace for borrowers, DSAs, and lenders</Badge>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-tight md:text-7xl">
              A better digital experience for finding, distributing, and funding retail loans.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              LendGrid brings customer acquisition, partner onboarding, and lender routing into a single credit platform designed for
              speed, trust, and scale. It combines the breadth of a marketplace with the discipline of a modern operating system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/borrowers" className="primary-button">
                Explore borrowing journey
              </Link>
              <Link href="/partners" className="secondary-button">
                See partner network <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {["275+ provider relationships", "Multi-product sourcing", "Digital onboarding", "Faster lender matching"].map((item) => (
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
                  <p className="text-sm font-semibold text-muted-foreground">At a glance</p>
                  <h2 className="mt-2 text-2xl font-semibold">One platform, three audiences</h2>
                </div>
                <span className="status-pill">Investor view</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Products", value: "6+" },
                  { label: "Provider lanes", value: "275+" },
                  { label: "Partner model", value: "DSA-enabled" },
                  { label: "Average first response", value: "< 10 hrs" }
                ].map((metric) => (
                  <div key={metric.label} className="data-card">
                    <p className="data-label">{metric.label}</p>
                    <p className="data-value">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 rounded-[1.5rem] border border-border bg-background/80 p-5">
                {[
                  ["Borrowers", "Discover products, check fit, submit once, and move into the right lending path."],
                  ["Partners", "Source cases, onboard digitally, and track outcomes with more discipline."],
                  ["Lenders", "Receive cleaner demand with more context and stronger routing logic."]
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
          {["Home Loans", "LAP", "Personal Loans", "Business Loans", "Education Loans", "Credit Cards"].map((item) => (
            <span key={item} className="dashboard-chip">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="section-heading">
          <Badge>Loan categories</Badge>
          <h2 className="section-title mt-4">Built for the full lending journey, not a single product line.</h2>
          <p className="section-subtitle">
            Customers can move from discovery to eligibility to assisted application inside one environment, while the platform keeps
            the underwriting and routing layers structured behind the scenes.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <Card key={product.title} className="panel-hover product-card">
              <CardContent className="p-7">
                <product.icon className="icon" />
                <h3 className="mt-5 text-2xl font-semibold">{product.title}</h3>
                <p className="mt-3 text-muted-foreground">{product.body}</p>
                <Link href="/loans" className="inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                  View category <ArrowRight size={15} />
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
                <h3 className="text-3xl font-semibold">For borrowers</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                The front-end experience is designed to feel calm, trustworthy, and useful. Customers understand where they fit, what
                they need, and how to move forward without getting dropped into a generic form wall.
              </p>
              <div className="mt-6 space-y-3">
                {customerPoints.map((item) => (
                  <div key={item} className="feature-row">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/borrowers" className="primary-button mt-8">
                Start borrower journey
              </Link>
            </CardContent>
          </Card>

          <Card className="journey-panel">
            <CardContent className="p-8">
              <div className="flex items-center gap-3">
                <Users className="icon" />
                <h3 className="text-3xl font-semibold">For partners</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                DSAs and distribution partners get a cleaner operating layer for sourcing and tracking cases, while lenders receive a
                more thoughtful stream of demand.
              </p>
              <div className="mt-6 space-y-3">
                {partnerPoints.map((item) => (
                  <div key={item} className="feature-row">
                    <BadgeCheck className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/partners" className="primary-button mt-8">
                Explore partner side
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="section-heading">
          <Badge>How it works</Badge>
          <h2 className="section-title mt-4">A smoother customer surface with a disciplined operating layer underneath.</h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            {
              icon: Banknote,
              title: "Discover",
              body: "Customers browse the right category instead of being forced into a one-size-fits-all lead form."
            },
            {
              icon: ShieldCheck,
              title: "Qualify",
              body: "The platform gathers the profile, documents, and context needed to move confidently into the next step."
            },
            {
              icon: Users,
              title: "Assist",
              body: "DSAs and in-house teams can step in where advice, follow-up, or packaging support adds value."
            },
            {
              icon: Building2,
              title: "Route",
              body: "Each case is directed toward lenders with the strongest product and credit fit."
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
          <Badge>Platform strengths</Badge>
          <h2 className="section-title mt-4">Designed to scale beyond a single funnel or distribution team.</h2>
          <p className="section-subtitle">
            LendGrid combines the outward simplicity of a consumer fintech brand with the control layer a serious lending marketplace
            needs to grow.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item) => (
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
                <Badge className="bg-card text-foreground">Investor-ready credit infrastructure with a stronger front end</Badge>
                <h2 className="mt-5 text-3xl font-semibold md:text-5xl">
                  A modern lending marketplace that can be experienced like a brand and evaluated like a platform.
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  The site now presents LendGrid as a credible lending business with product breadth, partner depth, and a scalable
                  operating model rather than a feature list disguised as a website.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/loans" className="secondary-button bg-white text-slate-900">
                  Browse loan categories
                </Link>
                <Link href="/partners" className="secondary-button bg-white text-slate-900">
                  View partner network
                </Link>
                <Link href="/analytics" className="secondary-button bg-white text-slate-900">
                  See platform metrics
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
