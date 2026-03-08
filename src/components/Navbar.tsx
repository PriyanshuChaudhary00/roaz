"use client";

import { ShoppingBag, Search, Menu } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-background/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold tracking-widest text-foreground hover:opacity-80 transition-opacity">
          ROAZ
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/#shop" className="text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors">Shop</Link>
          <Link href="/#shop" className="text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors">Collections</Link>
          <Link href="/#about" className="text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors">Our Story</Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
          <Search size={20} />
        </button>
        <button className="p-2 hover:bg-foreground/5 rounded-full transition-colors relative">
          <ShoppingBag size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="md:hidden p-2 hover:bg-foreground/5 rounded-full transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </motion.nav>
  );
};
