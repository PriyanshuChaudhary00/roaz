"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PRODUCTS, formatPrice } from "@/constants/products";
import { ProductCard } from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart, Share2, Star, Minus, Plus, ShoppingCart, Zap,
  ChevronLeft, ChevronRight, Shield, Truck, RotateCcw, Check,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  const product = PRODUCTS.find((p) => p.id === productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "sizing" | "shipping">("description");

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl font-black text-foreground/10 mb-4">404</p>
          <p className="text-foreground/50 mb-6">Product not found.</p>
          <Link href="/shop" className="px-6 py-3 bg-foreground text-background rounded-full font-bold text-sm">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const images = product.images || [product.image];
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-28 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-foreground/40 font-medium mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground/70">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-3 w-20 shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-foreground" : "border-transparent opacity-50 hover:opacity-75"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <Image src={images[selectedImage]} alt={product.name} fill className="object-cover" priority />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button onClick={() => setSelectedImage((s) => (s - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur rounded-full shadow hover:scale-110 transition-transform">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={() => setSelectedImage((s) => (s + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur rounded-full shadow hover:scale-110 transition-transform">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest rounded-full">NEW</span>}
                {product.originalPrice && (
                  <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold tracking-widest rounded-full">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-foreground/40 mb-1">{product.brand} · {product.category}</p>
                <h1 className="text-3xl font-bold tracking-tight leading-tight">{product.name}</h1>
              </div>
              <div className="flex gap-2">
                <button
                  id="wishlist-toggle-btn"
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`p-2.5 rounded-full border transition-all ${wishlisted ? "bg-foreground text-background border-foreground" : "border-foreground/15 hover:border-foreground/40"}`}
                >
                  <Heart size={18} className={wishlisted ? "fill-current" : ""} />
                </button>
                <button className="p-2.5 rounded-full border border-foreground/15 hover:border-foreground/40 transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-foreground/20 fill-foreground/20"} />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-foreground/40">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-foreground/40 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Color */}
            <div className="mb-6">
              <p className="text-sm font-bold mb-3 uppercase tracking-widest">
                Color {selectedColor && <span className="normal-case tracking-normal font-medium text-foreground/60">— {selectedColor}</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    id={`color-${color.replace(" ", "-")}`}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedColor === color
                        ? "bg-foreground text-background border-foreground"
                        : "border-foreground/15 hover:border-foreground/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold uppercase tracking-widest">
                  Size {selectedSize && <span className="normal-case tracking-normal font-medium text-foreground/60">— {selectedSize}</span>}
                </p>
                <button className="text-xs text-foreground/40 underline hover:text-foreground transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    id={`size-${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-11 px-3 rounded-xl text-sm font-bold border transition-all ${
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "border-foreground/15 hover:border-foreground/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm font-bold mb-3 uppercase tracking-widest">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 border border-foreground/15 rounded-full p-1">
                  <button
                    id="qty-minus"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                  <button
                    id="qty-plus"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                {!product.inStock && (
                  <span className="text-sm text-red-500 font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                id="add-to-cart-btn"
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={!product.inStock || !selectedSize || !selectedColor}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-foreground text-background hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
                }`}
              >
                {addedToCart ? <><Check size={18} /> Added to Cart</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </motion.button>

              <motion.button
                id="order-now-btn"
                whileTap={{ scale: 0.97 }}
                onClick={() => { if (selectedSize && selectedColor && product.inStock) router.push("/order"); }}
                disabled={!product.inStock || !selectedSize || !selectedColor}
                className="flex-1 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Zap size={18} /> Order Now
              </motion.button>
            </div>

            {!selectedSize || !selectedColor ? (
              <p className="text-xs text-amber-500 font-medium mb-4">
                {!selectedColor && !selectedSize ? "Select a color and size to continue" : !selectedColor ? "Select a color" : "Select a size"}
              </p>
            ) : null}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-foreground/10">
              {[
                { icon: <Truck size={18} />, label: "Free Delivery", sub: "On orders ₹999+" },
                { icon: <RotateCcw size={18} />, label: "Easy Returns", sub: "30-day policy" },
                { icon: <Shield size={18} />, label: "Secure Pay", sub: "100% safe" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-1">
                  <div className="text-foreground/50">{item.icon}</div>
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="text-[10px] text-foreground/40">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <div className="flex gap-6 border-b border-foreground/10 mb-4">
                {(["description", "sizing", "shipping"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-bold capitalize transition-colors ${
                      activeTab === tab ? "text-foreground border-b-2 border-foreground" : "text-foreground/40 hover:text-foreground/70"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm text-foreground/60 leading-relaxed">
                {activeTab === "description" && <p>{product.description}</p>}
                {activeTab === "sizing" && (
                  <div className="space-y-3">
                    <p>Our garments follow a relaxed/oversized fit. If between sizes, size down for a more fitted look.</p>
                    <table className="w-full text-xs border-collapse">
                      <thead><tr className="bg-foreground/5"><th className="text-left p-2">Size</th><th className="p-2">Chest (in)</th><th className="p-2">Length (in)</th></tr></thead>
                      <tbody>
                        {[["XS","34-36","27"],["S","36-38","28"],["M","38-40","29"],["L","40-42","30"],["XL","42-44","31"],["XXL","44-46","32"]].map(([s,c,l]) => (
                          <tr key={s} className="border-b border-foreground/5"><td className="p-2 font-semibold">{s}</td><td className="p-2 text-center">{c}</td><td className="p-2 text-center">{l}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === "shipping" && (
                  <ul className="space-y-2">
                    <li>• Standard Delivery: 5-7 business days (₹99)</li>
                    <li>• Express Delivery: 2-3 business days (₹199)</li>
                    <li>• Free shipping on orders above ₹999</li>
                    <li>• Cash on Delivery available across India</li>
                    <li>• Easy 30-day returns on unworn, unwashed items</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl font-black tracking-tight mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
