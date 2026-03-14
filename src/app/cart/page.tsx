"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PRODUCTS, formatPrice } from "@/constants/products";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, Tag, ShoppingBag } from "lucide-react";

// Mock cart data
const INITIAL_CART = [
  { ...PRODUCTS[0], cartId: 1, selectedSize: "M", selectedColor: "Charcoal", quantity: 1 },
  { ...PRODUCTS[7], cartId: 2, selectedSize: "L", selectedColor: "Washed Black", quantity: 2 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (cartId: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (cartId: number) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-28 px-6 lg:px-12 max-w-7xl mx-auto pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black tracking-tight mb-2"
        >
          Your Cart
        </motion.h1>
        <p className="text-foreground/40 mb-10 font-medium">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </p>

        {cartItems.length === 0 ? (
          <div className="py-32 text-center">
            <ShoppingBag size={48} className="mx-auto text-foreground/20 mb-4" />
            <p className="text-xl font-bold text-foreground/30 mb-6">Your cart is empty</p>
            <Link href="/shop" className="px-8 py-3 bg-foreground text-background rounded-full font-bold text-sm">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1">
              <AnimatePresence>
                {cartItems.map((item, i) => (
                  <motion.div
                    key={item.cartId}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-5 py-6 border-b border-foreground/8"
                  >
                    {/* Image */}
                    <Link href={`/product/${item.id}`} className="relative w-28 h-36 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-bold text-base hover:opacity-60 transition-opacity">{item.name}</h3>
                          </Link>
                          <p className="text-xs text-foreground/40 mt-1">
                            Size: {item.selectedSize} · Color: {item.selectedColor}
                          </p>
                        </div>
                        <button
                          id={`remove-${item.cartId}`}
                          onClick={() => removeItem(item.cartId)}
                          className="p-2 rounded-full hover:bg-red-500/10 text-foreground/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Qty */}
                        <div className="flex items-center gap-1 border border-foreground/15 rounded-full p-0.5">
                          <button
                            id={`minus-${item.cartId}`}
                            onClick={() => updateQty(item.cartId, -1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-foreground/5"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            id={`plus-${item.cartId}`}
                            onClick={() => updateQty(item.cartId, 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-foreground/5"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-black text-base">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="mt-6">
                <Link href="/shop" className="text-sm font-bold text-foreground/40 hover:text-foreground transition-colors underline underline-offset-4">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 shrink-0">
              <div className="sticky top-28 rounded-2xl bg-foreground/[0.03] border border-foreground/8 p-6">
                <h2 className="text-lg font-black tracking-tight mb-6">Order Summary</h2>

                {/* Coupon */}
                <div className="flex gap-2 mb-6">
                  <div className="flex-1 flex items-center gap-2 border border-foreground/15 rounded-xl px-4 py-2.5 focus-within:border-foreground/40 transition-colors">
                    <Tag size={14} className="text-foreground/40" />
                    <input
                      id="coupon-input"
                      type="text"
                      placeholder="Coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                  <button
                    id="apply-coupon-btn"
                    onClick={() => { if (coupon.toUpperCase() === "ROAZ10") setCouponApplied(true); }}
                    className="px-4 py-2.5 bg-foreground text-background rounded-xl text-sm font-bold hover:opacity-80 transition-opacity"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-green-500 font-medium mb-4">🎉 10% discount applied!</p>
                )}

                {/* Breakdown */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount (10%)</span>
                      <span>- {formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Shipping</span>
                    <span className={shipping === 0 ? "text-green-500 font-medium" : "font-semibold"}>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-foreground/40">Add {formatPrice(999 - subtotal)} more for free shipping</p>
                  )}
                  <div className="border-t border-foreground/10 pt-3 flex justify-between text-base font-black">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/order" id="checkout-btn" className="block">
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-foreground text-background font-black rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Proceed to Order <ArrowRight size={18} />
                  </motion.button>
                </Link>

                <p className="text-center text-xs text-foreground/30 mt-4">Secure checkout · Cash on Delivery available</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
