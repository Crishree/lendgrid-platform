import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-14">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
        <div>
          <p className="text-lg font-semibold">LendGrid</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A modern lending platform that helps borrowers discover the right credit path, partners grow distribution, and lenders
            receive better-qualified demand.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Home Loans", "LAP", "Business Loans", "Personal Loans", "Credit Cards"].map((item) => (
              <span key={item} className="dashboard-chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Borrow</p>
          <div className="mt-3 space-y-2">
            <Link href="/loans" className="block">Loan catalogue</Link>
            <Link href="/borrowers" className="block">Check eligibility</Link>
            <Link href="/borrowers" className="block">Apply online</Link>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Partner</p>
          <div className="mt-3 space-y-2">
            <Link href="/partners" className="block">Become a DSA</Link>
            <Link href="/partners" className="block">Provider onboarding</Link>
            <Link href="/ops" className="block">Ops workspace</Link>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Platform</p>
          <div className="mt-3 space-y-2">
            <Link href="/analytics" className="block">Analytics dashboard</Link>
            <Link href="/automation" className="block">Workflow automation</Link>
            <Link href="/whitelabel" className="block">White-label settings</Link>
            <Link href="/ops" className="block">Matching workspace</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
