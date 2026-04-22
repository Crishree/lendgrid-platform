import Link from "next/link";
import {
  ArrowRightLeft,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  GraduationCap,
  HandCoins,
  Landmark,
  Wallet
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const loanGroups = [
  {
    title: "Home Loans",
    icon: Landmark,
    items: ["Purchase", "Construction", "Extension", "Improvement", "Top-up", "NRI Home Loan"]
  },
  {
    title: "Loan Against Property",
    icon: Building2,
    items: ["Residential collateral", "Commercial collateral", "Expansion capital", "Business liquidity"]
  },
  {
    title: "Business Loans",
    icon: BriefcaseBusiness,
    items: ["Working capital", "MSME growth", "Term loans", "Cash-flow lending"]
  },
  {
    title: "Personal Loans",
    icon: Wallet,
    items: ["Salaried use cases", "Debt consolidation", "Emergency liquidity", "Flexible tenure"]
  },
  {
    title: "Credit Cards",
    icon: CreditCard,
    items: ["New card sourcing", "Card comparison", "Reward categories", "Card-fit routing"]
  },
  {
    title: "Education Loans",
    icon: GraduationCap,
    items: ["Domestic study", "Overseas study", "Co-applicant flows", "Documentation support"]
  },
  {
    title: "Balance Transfer",
    icon: ArrowRightLeft,
    items: ["Home loan transfer", "Personal loan transfer", "Lower EMI discovery", "Top-up during switch"]
  },
  {
    title: "Assisted Comparison",
    icon: HandCoins,
    items: ["Eligibility support", "Document checklist", "EMI guidance", "Advisor-led handoff"]
  }
];

export default function LoansPage() {
  return (
    <main className="container-shell py-20">
      <Badge>Loan catalogue</Badge>
      <h1 className="section-title mt-4">A broad loan marketplace with clear pathways for every major borrowing need.</h1>
      <p className="section-subtitle">
        From housing and property-backed borrowing to business credit, cards, and education finance, LendGrid brings the most common
        loan journeys into one polished interface.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loanGroups.map((group) => (
          <Card key={group.title} className="panel-hover h-full">
            <CardContent className="p-7">
              <group.icon className="icon" />
              <h2 className="mt-5 text-2xl font-semibold">{group.title}</h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardContent className="p-8">
            <p className="field-label">For borrowers</p>
            <h2 className="mt-3 text-2xl font-semibold">Explore first. Apply when you are ready.</h2>
            <p className="mt-4 text-muted-foreground">
              The experience is designed to help customers understand which product makes sense for them before moving into a single,
              guided application flow.
            </p>
            <Link href="/borrowers" className="primary-button mt-8">
              Start eligibility check
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8">
            <p className="field-label">For partners</p>
            <h2 className="mt-3 text-2xl font-semibold">Built to support both digital and assisted distribution.</h2>
            <p className="mt-4 text-muted-foreground">
              DSAs, advisors, and provider teams can all operate from the same environment, each with a view tailored to how they work.
            </p>
            <Link href="/partners" className="secondary-button mt-8">
              See DSA partner journey
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
