import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Save, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { useAuth } from "@/context/authContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
import { toast } from "sonner";

const AccountContent = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }

    const payload: Record<string, string> = {};
    if (name !== user.name) payload.name = name;
    if (email !== user.email) payload.email = email;
    if (password) {
      payload.password = password;
      payload.password_confirmation = passwordConfirmation;
    }

    if (Object.keys(payload).length === 0) {
      toast("Nothing to update");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put("/api/user/profile", payload);
      setUser(res.data.user);
      setPassword("");
      setPasswordConfirmation("");
      setSaved(true);
      toast.success("Profile updated successfully!");
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors) {
        Object.values(errors).flat().forEach((msg: any) => toast.error(msg));
      } else {
        toast.error(err.response?.data?.message || "Failed to update profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-12 max-w-2xl">

          {/* Back */}
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 gap-2 hover:bg-white">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-500 text-sm mt-0.5">Update your personal information</p>
            </div>
          </div>

          {/* Form card */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6">

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4 text-green-600" />
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-11 rounded-xl border-gray-200 focus:border-green-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-11 rounded-xl border-gray-200 focus:border-green-500"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-2">
              <p className="text-xs text-gray-400 mb-4">Leave password fields empty to keep your current password</p>

              {/* New password */}
              <div className="space-y-2 mb-4">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  New Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 rounded-xl border-gray-200 focus:border-green-500"
                />
              </div>

              {/* Confirm password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 rounded-xl border-gray-200 focus:border-green-500"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : saved ? (
                <><CheckCircle className="h-5 w-5 mr-2" /> Saved!</>
              ) : (
                <><Save className="h-5 w-5 mr-2" /> Save Changes</>
              )}
            </Button>
          </form>
        </div>
      </div>
      <CartDrawer />
      <Footer />
    </>
  );
};

export default function AccountPage() {
  return (
    <CartProvider>
      <AccountContent />
    </CartProvider>
  );
}
