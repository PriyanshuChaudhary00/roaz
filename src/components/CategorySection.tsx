"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  {
    label: "Men",
    href: "/shop?gender=Men",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
    color: "from-zinc-900/60",
  },
  {
    label: "Women",
    href: "/shop?gender=Women",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=800&auto=format&fit=crop",
    color: "from-stone-800/60",
  },
  {
    label: "Kids",
    href: "/shop?gender=Kids",
    image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?q=80&w=800&auto=format&fit=crop",
    color: "from-zinc-700/60",
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    color: "from-neutral-800/60",
  },
];

export const CategorySection = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-3">Shop by Category</h2>
          <p className="text-foreground/40 font-medium">Find exactly what you're looking for.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={cat.href} className="group block relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-transparent to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-black text-2xl tracking-tight">{cat.label}</p>
                  <p className="text-white/60 text-xs font-medium mt-0.5 group-hover:text-white/80 transition-colors">
                    Shop Now →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
