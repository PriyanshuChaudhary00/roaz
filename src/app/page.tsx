"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductPreview } from "@/components/ProductPreview";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-foreground">
      <Navbar />
      <Hero />
      <ProductPreview />
      
      {/* Brand Story Section */}
      <section id="about" className="py-48 bg-zinc-100 dark:bg-zinc-950 text-foreground relative overflow-hidden">
        {/* Subtle Background Gradients */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 opacity-30" />
        
        <div className="container mx-auto px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl group border border-foreground/10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
                alt="ROAZ Craftsmanship"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-16 left-16 right-16">
                <p className="text-4xl font-black tracking-widest text-white/90 leading-tight">CRAFTED FOR THE VANGUARD.</p>
                <div className="w-16 h-1.5 bg-white mt-6 rounded-full" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-col gap-16"
            >
              <h2 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
                EST. <br />
                <span className="text-outline text-foreground/40">MMXXVI.</span>
              </h2>
              <div className="space-y-8">
                <p className="text-2xl font-light leading-relaxed text-foreground/50">
                  ROAZ was born at the intersection of architectural precision and urban fluidity. We don&apos;t just create garments; we engineer silhouettes for those who define the future.
                </p>
                <p className="text-lg font-medium tracking-wide text-foreground/40 uppercase">
                  Signature Drop 01: Available Worldwide.
                </p>
              </div>
              <motion.button 
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 text-2xl font-black tracking-widest hover:text-primary transition-colors group"
              >
                READ OUR MANIFESTO <span className="w-12 h-[2px] bg-foreground group-hover:w-20 transition-all" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
