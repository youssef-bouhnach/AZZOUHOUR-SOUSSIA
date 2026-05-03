import hero from "@/assets/hero-garden.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout, Leaf, TreePine } from "lucide-react";

const stats = [
  { value: "12k+", label: "Gardens grown" },
  { value: "98%", label: "Plants thrive" },
  { value: "7-day", label: "Healthy guarantee" },
];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <img
        src={hero}
        alt="Sunlit garden with wildflowers and tall trees"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlay — richer, multi-stop */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Decorative floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
        <Leaf className="absolute top-[18%] right-[12%] h-8 w-8 text-primary-foreground/10 animate-float" style={{ animationDelay: "0s" }} />
        <TreePine className="absolute top-[55%] right-[6%] h-12 w-12 text-primary-foreground/8 animate-float" style={{ animationDelay: "2s" }} />
        <Sprout className="absolute bottom-[20%] right-[22%] h-6 w-6 text-accent/30 animate-float" style={{ animationDelay: "4s" }} />
        {/* Soft orb */}
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="container relative grid min-h-[90vh] items-center py-20">
        <div className="max-w-2xl text-primary-foreground">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs uppercase tracking-[0.2em] backdrop-blur animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <Sprout className="h-3.5 w-3.5 text-accent" /> Rooted since 2009
          </span>

          {/* Headline */}
          <h1
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-balance md:text-7xl animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            Grow a garden that{" "}
            <em className="not-italic text-accent relative">
              breathes
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent/50 rounded-full" />
            </em>
            .
          </h1>

          {/* Subheading */}
          <p
            className="mt-6 max-w-xl text-lg text-primary-foreground/85 leading-relaxed animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            Heirloom trees, wild flowers, lush turf, and living soil — delivered to your door, planted by hands that know.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow gap-2 group"
            >
              <a href="#shop">
                Shop the nursery
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="#services">Explore services</a>
            </Button>
          </div>

          {/* Stats */}
          <dl
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-primary-foreground/20 pt-6 animate-fade-up"
            style={{ animationDelay: "480ms" }}
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="group">
                <dt className="font-display text-3xl font-semibold group-hover:text-accent transition-colors duration-300">
                  {value}
                </dt>
                <dd className="mt-1 text-sm text-primary-foreground/70">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" aria-hidden>
        <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 64 C360 0 1080 0 1440 64 L1440 64 L0 64 Z" fill="hsl(40 33% 96%)" />
        </svg>
      </div>
    </section>
  );
};
