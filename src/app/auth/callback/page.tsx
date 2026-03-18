"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        router.push("/dashboard");
      } else {
        router.push("/login?error=Could not authenticate user");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="mx-auto animate-spin mb-4" size={32} />
        <p className="text-sm font-medium text-foreground/60 tracking-widest uppercase">Completing Sign In...</p>
      </div>
    </div>
  );
}
