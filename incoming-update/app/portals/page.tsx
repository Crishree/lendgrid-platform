import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Building2, ShieldCheck, Users, ArrowRight } from "lucide-react";

const portals = [
  {
    title: "LendGrid Admin Panel",
    href: "/admin",
    icon: BarChart3,
    body: "A business command center for the LendGrid leadership team to monitor acquisition, approval, disbursal, and partner performance."
  },
  {
    title: "Loan Provider Panel",
    href: "/lender-portal",
    icon: Building2,
    body: "A lender workspace for setting product parameters, managing underwriting appetite, and reviewing matched borrower cases."
  },
  {
    title: "DSA Partner Panel",
    href: "/dsa-portal",
    icon: Users,
    body: "A sourcing workspace for DSAs to discover borrower opportunities, submit cases, and track progress across lenders."
  },
  {
    title: "Trust & Integration Layer",
    href: "/integrations",
    icon: ShieldCheck,
    body: "An integration surface for KYC, PAN, Aadhaar, bureau pulls, and the decision engine that powers borrower-lender matching."
  }
];

export default function PortalsPage() {
  return (
    <main className="container-shell py-20">
      <Badge>Platform surfaces</Badge>
      <h1 className="section-title mt-4">Four clear surfaces: one public website, three working operator panels.</h1>
      <p className="section-subtitle">
        This is how the business should be understood in an investor conversation: a polished customer-facing marketplace on the
        outside, backed by dedicated panels for LendGrid, lending institutions, and DSA partners.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {portals.map((portal) => (
          <Card key={portal.title} className="panel-hover">
            <CardContent className="p-8">
              <portal.icon className="icon" />
              <h2 className="mt-5 text-2xl font-semibold">{portal.title}</h2>
              <p className="mt-3 text-muted-foreground">{portal.body}</p>
              <Link href={portal.href} className="inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
                Open view <ArrowRight size={15} />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
