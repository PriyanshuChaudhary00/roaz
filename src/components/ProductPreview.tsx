"use client";

import { motion } from "framer-motion";
import { ChevronRight, ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, CATEGORIES, Product } from "@/constants/products";

const CategoryRow = ({ title, categoryProducts }: { title: string; categoryProducts: Product[] }) => {
  const categorySlug = title.toLowerCase();

  return (
    <div className="mb-32">
      <div className="flex items-center justify-between mb-12 px-8">
        <div>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">{title}</h3>
          <div className="w-16 h-1 bg-foreground rounded-full" />
        </div>
        <Link 
          href={`/collections/${categorySlug}`}
          className="flex items-center gap-2 text-sm font-black tracking-widest uppercase hover:opacity-50 transition-opacity"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto gap-8 px-8 pb-12 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {categoryProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="flex-none w-[300px] md:w-[400px] snap-start"
            >
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-xl group border border-foreground/5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="p-5 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform">
                    <ShoppingCart size={24} />
                  </button>
                </div>

                <div className="absolute bottom-8 left-8">
                  <p className="text-2xl font-black text-white leading-tight mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    {product.name}
                  </p>
                  <p className="text-lg font-bold text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                    {product.price}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 md:hidden">
                <h4 className="text-xl font-bold tracking-tight">{product.name}</h4>
                <p className="text-lg text-foreground/40 font-medium">{product.price}</p>
              </div>
            </motion.div>
          ))}
          
          {/* View All Card */}
          <Link href={`/collections/${categorySlug}`} className="flex-none w-[300px] md:w-[400px] snap-start">
            <div className="aspect-[4/5] rounded-[40px] border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center gap-6 group hover:border-foreground/30 transition-colors cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight size={32} className="text-foreground/40" />
              </div>
              <p className="text-xl font-black tracking-widest uppercase text-foreground/40 group-hover:text-foreground transition-colors text-center">
                Explore Full <br /> {title} Drop
              </p>
            </div>
          </Link>
        </div>
        
        {/* Shadow Indicators for scroll */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 opacity-30" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 opacity-30" />
      </div>
    </div>
  );
};

export const ProductPreview = () => {
  return (
    <section id="shop" className="py-48 bg-background selection:bg-black selection:text-white overflow-hidden">
      <div className="container mx-auto">
        <div className="px-8 mb-32 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12"
          >
            THE <br />
            COLLECTIONS.
          </motion.h2>
          <p className="text-2xl font-light text-foreground/50 leading-relaxed border-l-4 border-foreground/10 pl-12">
            Engineering the future of urban silhouettes. Four distinct drops, one singular vision of architectural elegance.
          </p>
        </div>

        {CATEGORIES.map((cat) => (
          <CategoryRow 
            key={cat} 
            title={cat} 
            categoryProducts={PRODUCTS.filter(p => p.category === cat)} 
          />
        ))}

        <div className="px-8 mt-48">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-16 md:p-24 rounded-[80px] bg-zinc-950 text-white flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden relative shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h3 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9]">VANGUARD <br /> ACCESS.</h3>
              <p className="text-zinc-400 text-xl font-medium max-w-md leading-relaxed">
                Join our exclusive membership for early access to limited drops, archival pieces, and secret collection launches.
              </p>
            </div>
            
            <button className="relative z-10 px-16 py-8 bg-white text-black font-black text-xl rounded-full hover:scale-105 transition-transform flex items-center gap-6 group shadow-white/20 shadow-2xl">
              ENROLL NOW <ChevronRight size={28} className="group-hover:translate-x-2 transition-all" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
