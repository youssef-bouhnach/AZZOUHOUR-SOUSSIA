import { Leaf } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const milestones = [
  { year: "2009", label: "Founded in Hudson Valley" },
  { year: "2014", label: "Expanded to 12 acres" },
  { year: "2019", label: "10,000 gardens planted" },
  { year: "2024", label: "Certified organic growers" },
];

export const Story = () => {
  const leftRef = useScrollReveal<HTMLDivElement>();
  const rightRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="story" className="py-24 overflow-hidden">
      <div className="container">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          {/* Left — text */}
          <div ref={leftRef} className="reveal">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Our story</span>
            <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl text-balance leading-tight">
              Three generations of growers, one quiet philosophy.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              AZZOUHOUR-SOUSSIA began as a single greenhouse in the Souss Valley. Today we tend twelve acres of
              heirloom trees, cottage flowers, and living soils — grown without shortcuts, sold without pretense.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every plant we ship has been raised by name. Every garden we plant is one we'd happily sit in.
            </p>

            {/* Timeline */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {milestones.map(({ year, label }) => (
                <div
                  key={year}
                  className="rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-soft transition-shadow"
                >
                  <p className="font-display text-2xl font-semibold text-primary">{year}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — quote card */}
          <div ref={rightRef} className="reveal reveal-delay-2 relative">
            {/* Glow blob */}
            <div className="absolute -inset-8 rounded-3xl bg-gradient-leaf opacity-10 blur-3xl pointer-events-none" />

            {/* Decorative leaf icon */}
            <div className="absolute -top-4 -right-4 grid h-14 w-14 place-items-center rounded-full bg-gradient-leaf shadow-soft z-10">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>

            <blockquote className="relative rounded-3xl bg-card p-10 shadow-soft border border-border/60">
              {/* Opening quote mark */}
              <span className="font-display text-8xl leading-none text-accent/20 select-none absolute top-4 left-8" aria-hidden>
                "
              </span>
              <p className="relative font-display text-2xl leading-snug text-primary pt-6">
                A garden is the slowest art. We just try to plant the first brushstroke well.
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <cite className="not-italic text-sm text-muted-foreground">Mira Holloway, Head Grower</cite>
              </footer>
            </blockquote>

            {/* Small decorative card */}
            <div className="mt-4 ml-8 rounded-2xl bg-secondary/80 border border-border/60 px-5 py-4 flex items-center gap-3 shadow-card">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-warm text-accent-foreground">
                <Leaf className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">Certified Organic</p>
                <p className="text-xs text-muted-foreground">No pesticides, ever.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
