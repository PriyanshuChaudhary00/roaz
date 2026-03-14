"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [showPass, setShowPass] = useState(false);

  return (
    <main className="min-h-screen bg-[#fbfbfb] dark:bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="block text-center text-2xl font-black tracking-[0.3em] mb-10 hover:opacity-60 transition-opacity">
            ROAZ
          </Link>

          <h1 className="text-xl font-black text-center mb-8 uppercase tracking-widest">Create Account</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Full Name</label>
              <input
                id="signup-name"
                type="text"
                placeholder="John Doe"
                className="w-full border border-foreground/15 rounded-xl px-4 py-3.5 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-foreground/15 rounded-xl px-4 py-3.5 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPass ? "text" : "password"}
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

            <div className="flex items-start gap-3 pt-1">
              <input id="signup-terms" type="checkbox" className="mt-0.5 accent-foreground" />
              <label htmlFor="signup-terms" className="text-xs text-foreground/50">
                I agree to the{" "}
                <a href="#" className="underline text-foreground/70">Terms of Service</a> and{" "}
                <a href="#" className="underline text-foreground/70">Privacy Policy</a>
              </label>
            </div>

            <motion.button
              id="signup-submit-btn"
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm hover:opacity-80 transition-opacity mt-2"
            >
              Create Account
            </motion.button>
          </div>

          <p className="text-center text-xs text-foreground/40 mt-10">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-foreground hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
