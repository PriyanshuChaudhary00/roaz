"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-zinc-100 dark:bg-zinc-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop"
          alt="ROAZ Luxury Streetwear"
          fill
          className="object-cover object-center opacity-85 dark:opacity-60 scale-105 transition-opacity duration-700"
          priority
        />
        {/* Light mode: very subtle white-based gradients, Dark mode: black gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/20 to-transparent dark:from-black dark:via-black/40 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent" />
      </div>

      <div className="container mx-auto px-8 relative z-10 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-md text-foreground/70 text-xs font-bold tracking-[0.3em] uppercase mb-8">
              New Collection 2026
            </span>
            
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.9] mb-8">
              ROAZ <br />
              <span className="text-outline text-foreground/20">STUDIOS.</span>
            </h1>

            <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground/60 dark:text-zinc-300 mb-12 max-w-2xl">
              Engineered garments for the urban vanguard. Blending technical performance with architectural silhouettes to define the next era of premium streetwear.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="#shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-foreground text-background font-black rounded-full shadow-[0_0_40px_rgba(0,0,0,0.15)] dark:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all"
                >
                  EXPLORE DROP 01
                </motion.button>
              </Link>
              <Link href="#about">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="px-12 py-5 border border-foreground/20 text-foreground font-bold rounded-full backdrop-blur-md hover:bg-foreground/5 transition-all"
                >
                  OUR MANIFESTO
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 right-12 z-10 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <div className="absolute inset-0 border border-foreground/10 rounded-full" />
          <p className="text-[10px] font-black tracking-widest text-foreground/40 absolute w-full text-center">
            ROAZ • ARCHITECTURAL • PREMIUM • STREETWEAR • 
          </p>
        </motion.div>
      </div>

      {/* Edge Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-black to-transparent z-10" />
    </section>
  );
};
