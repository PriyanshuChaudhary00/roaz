"use client";

import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-32 px-8 bg-zinc-100 dark:bg-zinc-950 text-foreground rounded-t-[100px] mt-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-black tracking-widest mb-4">ROAZ</h2>
            <p className="text-foreground/50 font-medium max-w-xs leading-8">
              Empowering individuals through premium craftsmanship and contemporary design. Elevate your everyday wardrobe with our signature essentials.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors group">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors group">
                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="p-3 bg-foreground/5 hover:bg-foreground/10 rounded-full transition-colors group">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-bold tracking-widest uppercase text-foreground/40">Quick Links</h3>
            <ul className="flex flex-col gap-6 font-bold text-xl">
              <li><Link href="/" className="hover:text-primary flex items-center gap-2 group">Shop All <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/" className="hover:text-primary flex items-center gap-2 group">Collections <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/" className="hover:text-primary flex items-center gap-2 group">Our Story <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/" className="hover:text-primary flex items-center gap-2 group">Contact <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-2">
            <h3 className="text-lg font-bold tracking-widest uppercase text-foreground/40">Keep Up With ROAZ</h3>
            <p className="text-foreground/50 font-medium text-lg mb-4">Subscribe to our newsletter for exclusive drops and limited collection updates.</p>
            <form className="relative flex items-center">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="w-full bg-transparent border-b-2 border-foreground/10 pb-4 text-2xl font-black focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/30"
              />
              <button className="absolute right-0 bottom-6 text-lg font-bold hover:text-primary transition-colors">JOIN</button>
            </form>
          </div>
        </div>

        <div className="pt-16 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-8 text-foreground/40 font-medium">
          <p>© 2024 ROAZ. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-12">
            <Link href="#" className="hover:text-foreground transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="hover:text-foreground transition-colors">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
