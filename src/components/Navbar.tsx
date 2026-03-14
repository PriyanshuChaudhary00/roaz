"use client";

import { ShoppingBag, Search, Menu } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 flex items-center justify-between px-10 py-4 bg-background/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-foreground/10 dark:border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center gap-12">
        <Link href="/" className="text-2xl font-black tracking-[0.2em] text-foreground hover:opacity-70 transition-all duration-300">
          ROAZ
        </Link>
        <div className="hidden lg:flex items-center gap-8">
          {["Shop", "Collections", "Our Story"].map((item) => (
            <Link 
              key={item}
              href={`/#${item.toLowerCase().replace(" ", "")}`} 
              className="text-xs font-bold tracking-[0.1em] uppercase text-foreground/50 hover:text-foreground transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="h-4 w-[1px] bg-foreground/10 mx-2" />
        <button className="p-2.5 hover:bg-foreground/5 rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground">
          <Search size={18} />
        </button>
        <button className="p-2.5 hover:bg-foreground/5 rounded-full transition-all duration-300 relative text-foreground/70 hover:text-foreground">
          <ShoppingBag size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-foreground rounded-full" />
        </button>
        <button className="lg:hidden p-2.5 hover:bg-foreground/5 rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground">
          <Menu size={18} />
        </button>
      </div>
    </motion.nav>
  );
};
