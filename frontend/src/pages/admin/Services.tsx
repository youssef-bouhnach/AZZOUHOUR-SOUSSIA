import { useState } from "react";
import { Plus, Pencil, Trash2, Wrench, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdmin, type Service } from "@/context/AdminContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type FormData = Omit<Service, "id">;
const emptyForm = (): FormData => ({
  title: "", price: "", description: "", features: [""],
});

interface FormErrors {
  title?: string;
  price?: string;
  description?: string;
}

export const Services = () => {
  const { services, addService, updateService, deleteService } = useAdmin();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ── Dialog helpers ─────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setErrors({});
    setDialogOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditingId(s.id);
    setForm({ title: s.title, price: s.price, description: s.description, features: [...s.features] });
    setErrors({});
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyForm());
    setErrors({});
  };

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.price.trim()) e.price = "Price is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Features helpers ───────────────────────────────────────────────────────
  const setFeature = (i: number, val: string) => {
    setForm((prev) => {
      const features = [...prev.features];
      features[i] = val;
      return { ...prev, features };
    });
  };

  const addFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (i: number) => {
    setForm((prev) => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!validate()) return;
    const cleanedFeatures = form.features.filter((f) => f.trim() !== "");
    const data = { ...form, features: cleanedFeatures };
    if (editingId) {
      updateService(editingId, data);
      toast.success("Service updated");
    } else {
      addService(data);
      toast.success("Service added");
    }
    closeDialog();
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteService(deleteId);
    toast.success("Service deleted");
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Services</h1>
          <p className="mt-1 text-muted-foreground">{services.length} service{services.length !== 1 ? "s" : ""} offered</p>
        </div>
        <Button onClick={openAdd} className="rounded-full gap-2 shadow-soft">
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      </div>

      {/* Cards */}
      {services.length === 0 ? (
        <div className="rounded-2xl border border-border bg-background p-16 text-center">
          <Wrench className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="font-display text-xl text-foreground">No services yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Add your first service offering</p>
          <Button onClick={openAdd} className="mt-4 rounded-full gap-2" variant="outline">
            <Plus className="h-4 w-4" /> Add Service
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="group relative rounded-2xl border border-border bg-background p-6 shadow-card hover:shadow-soft transition-all hover:-translate-y-0.5"
            >
              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(s)}
                  className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                  aria-label="Edit service"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(s.id)}
                  className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label="Delete service"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Icon */}
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-warm text-accent-foreground shadow-glow/20 mb-4">
                <Wrench className="h-5 w-5" />
              </div>

              <h3 className="font-display text-xl font-semibold pr-16">{s.title}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{s.price}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>

              {s.features.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={(v) => !v && closeDialog()}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editingId ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Title <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g. Garden Design"
                value={form.title}
                onChange={(e) => {
                  setForm((p) => ({ ...p, title: e.target.value }));
                  if (errors.title) setErrors((p) => ({ ...p, title: undefined }));
                }}
                className={cn("rounded-xl", errors.title && "border-destructive")}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Price / Rate <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g. from $480 or $95 / visit"
                value={form.price}
                onChange={(e) => {
                  setForm((p) => ({ ...p, price: e.target.value }));
                  if (errors.price) setErrors((p) => ({ ...p, price: undefined }));
                }}
                className={cn("rounded-xl", errors.price && "border-destructive")}
              />
              {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Description <span className="text-destructive">*</span>
              </label>
              <Textarea
                placeholder="Describe what this service includes…"
                value={form.description}
                rows={3}
                onChange={(e) => {
                  setForm((p) => ({ ...p, description: e.target.value }));
                  if (errors.description) setErrors((p) => ({ ...p, description: undefined }));
                }}
                className={cn("rounded-xl resize-none", errors.description && "border-destructive")}
              />
              {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
            </div>

            {/* Features */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Features / Inclusions</label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" /> Add feature
                </button>
              </div>
              <div className="space-y-2">
                {form.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                    <Input
                      placeholder={`Feature ${i + 1}`}
                      value={f}
                      onChange={(e) => setFeature(i, e.target.value)}
                      className="rounded-xl flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label="Remove feature"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="rounded-full gap-2">
              <Plus className="h-4 w-4" />
              {editingId ? "Save Changes" : "Add Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm ── */}
      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this service?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the service. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
