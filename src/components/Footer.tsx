"use client";

import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-32 px-8 bg-zinc-100 dark:bg-zinc-950 text-foreground rounded-t-[100px] mt-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
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

          {/* Company Links */}
          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-bold tracking-widest uppercase text-foreground/40">Company</h3>
            <ul className="flex flex-col gap-4 font-bold text-base">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Portal</Link></li>
              <li>
                <p className="text-xs text-foreground/40 mt-4 leading-relaxed tracking-wider">
                  123 Fashion Tower,<br />Mumbai, India 400001<br />
                  support@roaz.studio
                </p>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-bold tracking-widest uppercase text-foreground/40">Policies</h3>
            <ul className="flex flex-col gap-4 font-bold text-base">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Return Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-bold tracking-widest uppercase text-foreground/40">Newsletter</h3>
            <p className="text-foreground/50 font-medium text-sm leading-6">
              Subscribe to stay updated on our latest collections and exclusive drops.
            </p>
            <form className="relative flex items-center">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full bg-transparent border-b border-foreground/10 pb-2 text-sm font-bold focus:outline-none focus:border-foreground transition-colors placeholder:text-foreground/30"
              />
              <button className="absolute right-0 bottom-3 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">JOIN</button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-16 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-black tracking-[0.2em] text-foreground/40 uppercase">
          <p>© 2026 ROAZ. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-foreground transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Facebook</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
