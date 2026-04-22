import Link from "next/link";
import { Building2, HandCoins, Layers3, Palette, Sparkles, Workflow, BarChart3, LayoutDashboard, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/loans", label: "Loan Products", icon: Layers3 },
  { href: "/borrowers", label: "For Customers", icon: HandCoins },
  { href: "/partners", label: "For Partners", icon: Building2 },
  { href: "/portals", label: "Platform Views", icon: LayoutDashboard }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-2xl">
      <div className="container-shell flex h-18 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <span className="brand-mark">LG</span>
          <span className="flex flex-col leading-none">
            <span>LendGrid</span>
            <span className="text-xs font-medium text-muted-foreground">Modern lending platform</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} className="nav-link" href={item.href}>
              <item.icon size={15} />
              {item.label}
            </Link>
          ))}
          <Link href="/analytics" className="nav-link">
            <BarChart3 size={15} />
            Analytics
          </Link>
          <Link href="/automation" className="nav-link">
            <Workflow size={15} />
            Automation
          </Link>
          <Link href="/whitelabel" className="nav-link">
            <Palette size={15} />
            White-label
          </Link>
          <Link href="/integrations" className="nav-link">
            <ShieldCheck size={15} />
            Integrations
          </Link>
          <Link href="/ops" className="nav-link">
            <Sparkles size={15} />
            Match Engine
          </Link>
          <Link href="/borrowers" className="primary-button ml-3">
            Check eligibility
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Link href="/borrowers" className="primary-button">
            Apply
          </Link>
        </div>
      </div>
    </header>
  );
}
