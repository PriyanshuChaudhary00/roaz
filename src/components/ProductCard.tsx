"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product, formatPrice } from "@/constants/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      className="group flex flex-col"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold tracking-widest rounded-full uppercase">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="px-2.5 py-1 bg-amber-400 text-black text-[10px] font-bold tracking-widest rounded-full uppercase">
                Popular
              </span>
            )}
            {!product.inStock && (
              <span className="px-2.5 py-1 bg-foreground/80 text-background text-[10px] font-bold tracking-widest rounded-full uppercase">
                Sold Out
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold tracking-widest rounded-full uppercase">
                Sale
              </span>
            )}
          </div>

          {/* Hover actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <button
              id={`wishlist-${product.id}`}
              className="p-2.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-transform text-foreground"
              onClick={(e) => e.preventDefault()}
            >
              <Heart size={16} />
            </button>
            <button
              id={`cart-${product.id}`}
              className="p-2.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur rounded-full shadow-lg hover:scale-110 transition-transform text-foreground"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart size={16} />
            </button>
          </div>

          {/* Quick add on hover */}
          {product.inStock && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                id={`quick-add-${product.id}`}
                onClick={(e) => e.preventDefault()}
                className="w-full py-3 bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs font-bold tracking-widest uppercase backdrop-blur"
              >
                Quick Add
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 px-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-foreground leading-snug hover:opacity-60 transition-opacity">
              {product.name}
            </h3>
          </Link>
        </div>
        <div className="flex items-center gap-1.5 mt-1 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-foreground/20 fill-foreground/20"
                }
              />
            ))}
          </div>
          <span className="text-[11px] text-foreground/40">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-foreground/40 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
