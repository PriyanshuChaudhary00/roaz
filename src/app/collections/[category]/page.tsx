"use client";

import { useParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/constants/products";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const categoryTitle =
    CATEGORIES.find((cat) => cat.toLowerCase() === categorySlug.toLowerCase()) || categorySlug;

  const filteredProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === categorySlug.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-36 pb-32 px-6 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> All Products
          </Link>

          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-6">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tighter uppercase"
            >
              {categoryTitle}.
            </motion.h1>
            <p className="text-lg font-medium text-foreground/40 uppercase tracking-widest">
              {filteredProducts.length} Items
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-12">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-32 text-center text-zinc-500 italic">
              No items found in this collection yet.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
