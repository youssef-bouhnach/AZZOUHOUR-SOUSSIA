import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const contactInfo = [
  { icon: MapPin, label: "Studio", value: "Souss Valley, Morocco" },
  { icon: Mail, label: "Email", value: "hello@azzouhour.ma" },
  { icon: Clock, label: "Hours", value: "Tue–Sat, 9am – 5pm" },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormState = { name: "", email: "", subject: "", message: "" };

export const Contact = () => {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const leftRef = useScrollReveal<HTMLDivElement>();
  const rightRef = useScrollReveal<HTMLDivElement>();

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    toast.success("Thanks — we'll be in touch soon.");
    setTimeout(() => {
      setForm(empty);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 bg-secondary/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative grid gap-12 md:grid-cols-2">
        {/* Left — info */}
        <div ref={leftRef} className="reveal">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-medium">Contact</span>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl text-balance leading-tight">
            Tell us about your patch of earth.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Whether it's a balcony or a back forty, we'd love to help it thrive. We respond within one working day.
          </p>

          <ul className="mt-10 space-y-5">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Trust badge */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm font-semibold text-primary">🌿 We reply within 24 hours</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Our team personally reads every message. No bots, no templates.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div ref={rightRef} className="reveal reveal-delay-2">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl bg-card p-8 shadow-soft border border-border/60 space-y-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                  Your name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-name"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Jane Smith"
                  className={cn("rounded-xl", errors.name && "border-destructive focus-visible:ring-destructive")}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="jane@example.com"
                  className={cn("rounded-xl", errors.email && "border-destructive focus-visible:ring-destructive")}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">
                What are you planting?
              </label>
              <Input
                id="contact-subject"
                value={form.subject}
                onChange={handleChange("subject")}
                placeholder="e.g. Backyard redesign, tree planting…"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                Message <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="contact-message"
                value={form.message}
                onChange={handleChange("message")}
                placeholder="Tell us a little about your space…"
                rows={5}
                className={cn("rounded-xl resize-none", errors.message && "border-destructive focus-visible:ring-destructive")}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full rounded-full gap-2 transition-all",
                submitted && "bg-emerald-600 hover:bg-emerald-600"
              )}
              size="lg"
              disabled={submitted}
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Message sent!
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
