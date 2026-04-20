import Link from "next/link";
import { Building2, Network, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/providers", label: "Providers", icon: Building2 },
  { href: "/borrowers", label: "Borrowers", icon: ShieldCheck },
  { href: "/ops", label: "Ops", icon: Network }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <span className="brand-mark">LG</span>
          <span>LendGrid</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((item) => (
            <Link key={item.href} className="nav-link" href={item.href}>
              <item.icon size={15} />
              {item.label}
            </Link>
          ))}
          <Link href="/ops" className="primary-button ml-3">
            Open match studio
          </Link>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Link href="/ops" className="primary-button">
            Studio
          </Link>
        </div>
      </div>
    </header>
  );
}
