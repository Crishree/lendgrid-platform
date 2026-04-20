import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 py-12">
      <div className="container-shell grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">LendGrid</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Separate provider onboarding, borrower qualification, and matching operations into one auditable retail credit workflow.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Product</p>
          <div className="mt-3 space-y-2">
            <Link href="/providers" className="block">Provider console</Link>
            <Link href="/borrowers" className="block">Borrower intake</Link>
            <Link href="/ops" className="block">Match studio</Link>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Model</p>
          <div className="mt-3 space-y-2">
            <p>Role-based case workflows</p>
            <p>Risk-profile routing logic</p>
            <p>Provider-level policy overlays</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
