import { Check, Shovel, Sprout, Scissors, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/context/AdminContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const icons = [Sprout, Shovel, Scissors];

export const Services = () => {
  const { services } = useAdmin();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="services" className="relative bg-primary text-primary-foreground py-24 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(40 33% 96%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative">
        {/* Header */}
        <div ref={headerRef} className="reveal max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Services</span>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl leading-tight">
            Hands in the soil,<br className="hidden sm:block" /> so yours don't have to be.
          </h2>
          <p className="mt-4 text-primary-foreground/75 leading-relaxed max-w-lg">
            From the first sketch to the final prune, our growers and gardeners shape spaces that get better every season.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i] ?? Sprout;
            return (
              <div
                key={s.id}
                className="group relative flex flex-col rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-7 backdrop-blur transition-all duration-300 hover:bg-primary-foreground/10 hover:-translate-y-1.5 hover:border-primary-foreground/25"
              >
                {/* Number */}
                <span className="absolute top-7 right-7 font-display text-5xl font-semibold text-primary-foreground/8 select-none group-hover:text-primary-foreground/12 transition-colors">
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-warm text-accent-foreground shadow-glow/30">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{s.price}</p>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">{s.description}</p>

                <ul className="mt-6 space-y-2.5 text-sm flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-primary-foreground/75">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/20">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant="outline"
                  className="mt-8 rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground gap-2 group/btn"
                >
                  <a href="#contact">
                    Request a quote
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
