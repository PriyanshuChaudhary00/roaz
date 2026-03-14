"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-[#fbfbfb] dark:bg-zinc-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 flex justify-center lg:justify-end">
        <div className="relative w-full lg:w-[65%] h-full opacity-60 lg:opacity-100">
          {/* Light Mode Image */}
          <Image
            src="/man3.png"
            alt="ROAZ Fashion Light"
            fill
            className="object-contain object-[center_bottom] dark:hidden"
            priority
            quality={100}
            unoptimized
          />
          {/* Dark Mode Image */}
          <Image
            src="/man2.png"
            alt="ROAZ Fashion Dark"
            fill
            className="object-contain object-[center_bottom] hidden dark:block"
            priority
            quality={100}
            unoptimized
          />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10 w-full">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-black/40 dark:text-white/40 mb-6 block">
              Spring/Summer 2026 Collection
            </span>
            <h1 className="text-6xl md:text-[120px] lg:text-[160px] font-medium tracking-tight text-black dark:text-white leading-[0.9] mb-10 lg:mb-12 font-[family-name:var(--font-playfair)]">
              Clothing
            </h1>

            <Link href="/shop">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-black dark:bg-white text-white dark:text-black text-sm cursor-pointer font-medium rounded-lg transition-all"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
