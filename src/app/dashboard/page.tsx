"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Welcome Back, {user.user_metadata?.full_name || user.email?.split('@')[0]}</h1>
          <p className="text-foreground/40 font-medium mb-10 italic">Account: {user.email}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-foreground/[0.03] border border-foreground/5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 mb-2">Recent Orders</h3>
              <p className="text-sm font-medium">No orders yet.</p>
            </div>
            <div className="p-8 rounded-3xl bg-foreground/[0.03] border border-foreground/5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 mb-2">Wishlist</h3>
              <p className="text-sm font-medium">0 items.</p>
            </div>
            <div className="p-8 rounded-3xl bg-foreground/[0.03] border border-foreground/5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40 mb-2">Coupons</h3>
              <p className="text-sm font-medium">None available.</p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="mt-20 px-10 py-4 bg-foreground text-background font-black rounded-2xl text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Logout session
          </button>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
