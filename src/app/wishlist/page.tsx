"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PRODUCTS } from "@/constants/products";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";

const WISHLIST_ITEMS = [PRODUCTS[2], PRODUCTS[8], PRODUCTS[11], PRODUCTS[15]];

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-28 px-6 lg:px-12 max-w-7xl mx-auto pb-32">
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black tracking-tight">
              Wishlist
            </motion.h1>
            <p className="text-foreground/40 font-medium mt-1">{WISHLIST_ITEMS.length} saved items</p>
          </div>
          <Link href="/shop" className="text-sm font-bold underline text-foreground/50 hover:text-foreground transition-colors">
            Continue Shopping
          </Link>
        </div>

        {WISHLIST_ITEMS.length === 0 ? (
          <div className="py-32 text-center">
            <Heart size={48} className="mx-auto text-foreground/20 mb-4" />
            <p className="text-xl font-bold text-foreground/30 mb-6">Your wishlist is empty</p>
            <Link href="/shop" className="px-8 py-3 bg-foreground text-background rounded-full font-bold text-sm">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {WISHLIST_ITEMS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
