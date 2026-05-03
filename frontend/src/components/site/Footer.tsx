import { Leaf, Instagram, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "#shop", label: "Shop" },
  { href: "#services", label: "Services" },
  { href: "#story", label: "Our Story" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "Pinterest", icon: ArrowUpRight },
  { href: "#", label: "Journal", icon: ArrowUpRight },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <a href="#" className="inline-flex items-center gap-2 font-display text-lg font-semibold text-primary">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-leaf text-primary-foreground shadow-soft">
                <Leaf className="h-4 w-4" />
              </span>
              AZZOUHOUR-SOUSSIA
            </a>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Heirloom plants, expert gardeners, and a love for the slow art of growing things.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Follow along</p>
            <ul className="space-y-2.5">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AZZOUHOUR-SOUSSIA — Grown with care.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
