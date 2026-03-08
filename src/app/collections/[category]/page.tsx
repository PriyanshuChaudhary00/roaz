"use client";

import { useParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/constants/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  
  // Find matching category
  const categoryTitle = CATEGORIES.find(
    (cat) => cat.toLowerCase() === categorySlug.toLowerCase()
  ) || categorySlug;

  const filteredProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === categorySlug.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-48 pb-32 px-8">
        <div className="container mx-auto max-w-7xl">
          <Link 
            href="/#shop" 
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Collections
          </Link>

          <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 gap-8">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-7xl md:text-9xl font-black tracking-tighter uppercase"
            >
              {categoryTitle}.
            </motion.h1>
            <p className="text-xl font-medium text-foreground/40 uppercase tracking-widest">
              {filteredProducts.length} Items Found
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col gap-6"
              >
                <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-lg group-hover:shadow-2xl transition-all duration-700">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="p-4 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-transform">
                      <ShoppingCart size={24} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1 px-2">
                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:translate-x-1 transition-transform">{product.name}</h3>
                  <p className="text-lg font-medium text-foreground/40">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-32 text-center text-zinc-500 italic">
              No archival pieces found in this collection yet.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
