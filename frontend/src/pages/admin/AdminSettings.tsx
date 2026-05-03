import { useState, useEffect } from "react";
import { Save, RotateCcw, Store, Truck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin, type StoreSettings } from "@/context/AdminContext";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const Section = ({ title, description, icon: Icon, children }: SectionProps) => (
  <div className="rounded-2xl border border-border bg-background shadow-card overflow-hidden">
    <div className="flex items-start gap-4 border-b border-border bg-muted/30 px-6 py-5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ label, hint, error, children }: FieldProps) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-foreground">{label}</label>
    {children}
    {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

export const AdminSettings = () => {
  const { settings, updateSettings, resetToDefaults } = useAdmin();
  const [form, setForm] = useState<StoreSettings>(settings);
  const [errors, setErrors] = useState<Partial<Record<keyof StoreSettings, string>>>({});
  const [resetOpen, setResetOpen] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Sync form when settings change externally
  useEffect(() => {
    setForm(settings);
    setDirty(false);
  }, [settings]);

  const set = <K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof StoreSettings, string>> = {};
    if (!form.storeName.trim()) e.storeName = "Store name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.freeShippingThreshold < 0) e.freeShippingThreshold = "Must be 0 or more";
    if (form.shippingCost < 0) e.shippingCost = "Must be 0 or more";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateSettings(form);
    setDirty(false);
    toast.success("Settings saved");
  };

  const handleReset = () => {
    resetToDefaults();
    setResetOpen(false);
    toast.success("Reset to defaults");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Settings</h1>
          <p className="mt-1 text-muted-foreground">Manage your store information and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setResetOpen(true)}
            className="rounded-full gap-2 text-muted-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={!dirty}
            className={cn("rounded-full gap-2 shadow-soft transition-all", dirty && "animate-pulse-soft")}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {dirty && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          You have unsaved changes
        </div>
      )}

      {/* Store Info */}
      <Section
        title="Store Information"
        description="Basic details shown across your site"
        icon={Store}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Store Name" error={errors.storeName}>
              <Input
                value={form.storeName}
                onChange={(e) => set("storeName", e.target.value)}
                placeholder="AZZOUHOUR-SOUSSIA"
                className={cn("rounded-xl", errors.storeName && "border-destructive")}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Tagline" hint="Shown in the hero section">
              <Input
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                placeholder="Grow a garden that breathes."
                className="rounded-xl"
              />
            </Field>
          </div>
          <Field label="Contact Email" error={errors.email}>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="hello@azzouhour.ma"
              className={cn("rounded-xl", errors.email && "border-destructive")}
            />
          </Field>
          <Field label="Phone">
            <Input
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+1 (845) 555-0192"
              className="rounded-xl"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Studio Address">
              <Input
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="14 Old Mill Lane, Hudson Valley"
                className="rounded-xl"
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Opening Hours">
              <Input
                value={form.hours}
                onChange={(e) => set("hours", e.target.value)}
                placeholder="Tue–Sat, 9am – 5pm"
                className="rounded-xl"
              />
            </Field>
          </div>
        </div>
      </Section>

      {/* Shipping */}
      <Section
        title="Shipping"
        description="Configure shipping costs and free shipping threshold"
        icon={Truck}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Free Shipping Threshold ($)"
            hint="Orders above this amount get free shipping. Set to 0 to always charge."
            error={errors.freeShippingThreshold}
          >
            <Input
              type="number"
              min={0}
              step={1}
              value={form.freeShippingThreshold}
              onChange={(e) => set("freeShippingThreshold", parseFloat(e.target.value) || 0)}
              className={cn("rounded-xl", errors.freeShippingThreshold && "border-destructive")}
            />
          </Field>
          <Field
            label="Standard Shipping Cost ($)"
            hint="Charged when order is below the free shipping threshold."
            error={errors.shippingCost}
          >
            <Input
              type="number"
              min={0}
              step={0.5}
              value={form.shippingCost}
              onChange={(e) => set("shippingCost", parseFloat(e.target.value) || 0)}
              className={cn("rounded-xl", errors.shippingCost && "border-destructive")}
            />
          </Field>
        </div>

        {/* Preview */}
        <div className="mt-4 rounded-xl bg-muted/50 border border-border p-4 text-sm space-y-1">
          <p className="font-medium text-foreground text-xs uppercase tracking-wider mb-2">Preview</p>
          <p className="text-muted-foreground">
            Orders under <span className="font-semibold text-foreground">${form.freeShippingThreshold}</span> →{" "}
            <span className="font-semibold text-foreground">${form.shippingCost}</span> shipping
          </p>
          <p className="text-muted-foreground">
            Orders <span className="font-semibold text-foreground">${form.freeShippingThreshold}+</span> →{" "}
            <span className="font-semibold text-emerald-600">Free shipping</span>
          </p>
        </div>
      </Section>

      {/* Danger zone */}
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="font-display text-lg font-semibold text-destructive mb-1">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Reset all products, services, and settings back to the original defaults. This cannot be undone.
        </p>
        <Button
          variant="outline"
          onClick={() => setResetOpen(true)}
          className="rounded-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset everything to defaults
        </Button>
      </div>

      {/* Reset confirm */}
      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore all products, services, and settings to their original values. Any changes you've made will be lost permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, reset everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
