"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PRODUCTS, formatPrice } from "@/constants/products";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, User, ChevronDown, CheckCircle2, Package } from "lucide-react";

const ORDER_ITEMS = [
  { ...PRODUCTS[0], selectedSize: "M", selectedColor: "Charcoal", quantity: 1 },
  { ...PRODUCTS[7], selectedSize: "L", selectedColor: "Washed Black", quantity: 2 },
];

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir",
];

export default function OrderPage() {
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", state: "", pincode: "",
  });

  const handleChange = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const subtotal = ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const isValid = Object.values(form).every((v) => v.trim() !== "");

  if (placed) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 size={48} className="text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-black mb-3">Order Placed!</h1>
            <p className="text-foreground/50 mb-2">
              Thank you, <span className="font-semibold text-foreground">{form.name || "there"}</span>! Your order has been confirmed.
            </p>
            <p className="text-sm text-foreground/40 mb-8">Order #ROAZ{Math.floor(100000 + Math.random() * 900000)} · Cash on Delivery</p>
            <div className="p-5 rounded-2xl bg-foreground/[0.03] border border-foreground/8 mb-8">
              <div className="flex items-center gap-3 text-sm text-foreground/60">
                <Package size={18} className="text-foreground/40" />
                Expected delivery in 5–7 business days to <span className="font-semibold text-foreground">{form.city}, {form.state}</span>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <a href="/" className="px-6 py-3 bg-foreground text-background rounded-full font-bold text-sm">Back to Home</a>
              <a href="/dashboard" className="px-6 py-3 border border-foreground/20 rounded-full font-bold text-sm">My Orders</a>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-28 px-6 lg:px-12 max-w-6xl mx-auto pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black tracking-tight mb-10"
        >
          Checkout
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form */}
          <div className="flex-1">
            <div className="rounded-2xl border border-foreground/10 overflow-hidden">
              <div className="px-6 py-4 bg-foreground/[0.03] border-b border-foreground/10">
                <h2 className="font-black text-base flex items-center gap-2"><MapPin size={16} /> Shipping Address</h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Full Name *</label>
                  <div className="flex items-center gap-3 border border-foreground/15 rounded-xl px-4 py-3 focus-within:border-foreground/50 transition-colors">
                    <User size={15} className="text-foreground/30 shrink-0" />
                    <input
                      id="order-name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Phone Number *</label>
                  <div className="flex items-center gap-3 border border-foreground/15 rounded-xl px-4 py-3 focus-within:border-foreground/50 transition-colors">
                    <Phone size={15} className="text-foreground/30 shrink-0" />
                    <span className="text-sm text-foreground/50 font-medium">+91</span>
                    <input
                      id="order-phone"
                      type="tel"
                      placeholder="9876543210"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Email *</label>
                  <input
                    id="order-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full border border-foreground/15 rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Street Address *</label>
                  <input
                    id="order-address"
                    type="text"
                    placeholder="House/Flat No., Street, Area"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full border border-foreground/15 rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">City *</label>
                  <input
                    id="order-city"
                    type="text"
                    placeholder="Mumbai"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="w-full border border-foreground/15 rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">State *</label>
                  <div className="relative">
                    <select
                      id="order-state"
                      value={form.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="w-full border border-foreground/15 rounded-xl px-4 py-3 text-sm bg-background appearance-none focus:outline-none focus:border-foreground/50 transition-colors"
                    >
                      <option value="">Select State</option>
                      {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
                  </div>
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Pincode *</label>
                  <input
                    id="order-pincode"
                    type="text"
                    maxLength={6}
                    placeholder="400001"
                    value={form.pincode}
                    onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/g, ""))}
                    className="w-full border border-foreground/15 rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6 rounded-2xl border border-foreground/10 overflow-hidden">
              <div className="px-6 py-4 bg-foreground/[0.03] border-b border-foreground/10">
                <h2 className="font-black text-base">Payment Method</h2>
              </div>
              <div className="p-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Cash on Delivery (COD)</p>
                    <p className="text-xs text-foreground/40">Pay when your order arrives</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-88 shrink-0 w-full">
            <div className="sticky top-28 rounded-2xl bg-foreground/[0.03] border border-foreground/8 p-6">
              <h2 className="text-base font-black tracking-tight mb-5">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] font-black rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold leading-tight">{item.name}</p>
                      <p className="text-xs text-foreground/40">{item.selectedSize} · {item.selectedColor}</p>
                      <p className="text-sm font-black mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-foreground/10 pt-4 space-y-2.5 text-sm mb-6">
                <div className="flex justify-between"><span className="text-foreground/60">Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Shipping</span>
                  <span className={shipping === 0 ? "text-green-500 font-medium" : "font-semibold"}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-foreground/10 pt-2.5 flex justify-between text-base font-black">
                  <span>Total (COD)</span><span>{formatPrice(total)}</span>
                </div>
              </div>

              <motion.button
                id="place-order-btn"
                whileTap={{ scale: 0.98 }}
                onClick={() => { if (isValid) setPlaced(true); }}
                disabled={!isValid}
                className="w-full py-4 bg-foreground text-background font-black rounded-xl hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Place Order (COD)
              </motion.button>
              {!isValid && (
                <p className="text-xs text-foreground/40 text-center mt-2">Please fill all fields to place order</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
