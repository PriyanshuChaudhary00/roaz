"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (tab === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { full_name: form.name },
            emailRedirectTo: window.location.origin,
          },
        });
        if (signUpError) throw signUpError;
        alert("Check your email for confirmation!");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (signInError) throw signInError;
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + "/auth/callback",
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfbfb] dark:bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="block text-center text-2xl font-black tracking-[0.3em] mb-10 hover:opacity-60 transition-opacity">
            ROAZ
          </Link>

          {/* Tab Switcher */}
          <div className="flex rounded-2xl bg-foreground/[0.05] p-1 mb-8">
            {(["login", "signup"] as const).map((t) => (
              <button
                key={t}
                id={`auth-tab-${t}`}
                onClick={() => {
                  setTab(t);
                  setError(null);
                }}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl capitalize transition-all ${
                  tab === t ? "bg-background text-foreground shadow-sm" : "text-foreground/40"
                }`}
              >
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
                {error}
              </div>
            )}
            {tab === "signup" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Full Name</label>
                <input
                  id="auth-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full border border-foreground/15 rounded-xl px-4 py-3.5 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Email</label>
              <input
                id="auth-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full border border-foreground/15 rounded-xl px-4 py-3.5 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Password</label>
                {tab === "login" && (
                  <button className="text-xs font-medium text-foreground/40 hover:text-foreground transition-colors underline">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border border-foreground/15 rounded-xl px-4 py-3.5 pr-12 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {tab === "signup" && (
              <div className="flex items-start gap-3 pt-1">
                <input id="auth-terms" type="checkbox" className="mt-0.5 accent-foreground" />
                <label htmlFor="auth-terms" className="text-xs text-foreground/50">
                  I agree to the{" "}
                  <a href="#" className="underline text-foreground/70">Terms of Service</a> and{" "}
                  <a href="#" className="underline text-foreground/70">Privacy Policy</a>
                </label>
              </div>
            )}

            <motion.button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm hover:opacity-80 transition-opacity mt-2 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={16} />}
              {tab === "login" ? "Sign In" : "Create Account"}
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="text-xs font-medium text-foreground/30">or continue with</span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                id={`auth-${provider.toLowerCase()}-btn`}
                onClick={() => handleOAuth(provider.toLowerCase() as any)}
                className="py-3 border border-foreground/15 rounded-xl text-sm font-semibold hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {provider === "Google" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                )}
                {provider}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
