"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PRODUCTS, formatPrice } from "@/constants/products";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User, Package, Heart, MapPin, ChevronRight, Star, LogOut,
  ShoppingBag, Edit2, Camera,
} from "lucide-react";

type Tab = "profile" | "orders" | "wishlist" | "addresses";

const MOCK_ORDERS = [
  {
    id: "ROAZ789012",
    date: "12 Mar 2026",
    status: "Delivered",
    statusColor: "text-green-500 bg-green-500/10",
    items: [{ ...PRODUCTS[0], selectedSize: "M", selectedColor: "Charcoal", quantity: 1 }],
    total: PRODUCTS[0].price,
  },
  {
    id: "ROAZ654321",
    date: "01 Mar 2026",
    status: "In Transit",
    statusColor: "text-blue-500 bg-blue-500/10",
    items: [{ ...PRODUCTS[7], selectedSize: "L", selectedColor: "Washed Black", quantity: 2 }],
    total: PRODUCTS[7].price * 2,
  },
  {
    id: "ROAZ111222",
    date: "14 Feb 2026",
    status: "Cancelled",
    statusColor: "text-red-500 bg-red-500/10",
    items: [{ ...PRODUCTS[4], selectedSize: "S", selectedColor: "Black", quantity: 1 }],
    total: PRODUCTS[4].price,
  },
];

const WISHLIST_ITEMS = [PRODUCTS[2], PRODUCTS[8], PRODUCTS[11], PRODUCTS[15]];

const ADDRESSES = [
  { id: 1, label: "Home", name: "Priyanshu Chaudhary", address: "42, Green Park, Near Metro Station", city: "New Delhi", state: "Delhi", pincode: "110016", default: true },
  { id: 2, label: "Office", name: "Priyanshu Chaudhary", address: "Unit 5, Cyber Hub, Gurugram", city: "Gurugram", state: "Haryana", pincode: "122002", default: false },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [editingProfile, setEditingProfile] = useState(false);
  const [user, setUser] = useState({ name: "Priyanshu Chaudhary", email: "priyanshu@example.com", phone: "+91 98765 43210" });

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "orders", label: "Orders", icon: <Package size={18} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={18} /> },
    { id: "addresses", label: "Addresses", icon: <MapPin size={18} /> },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-28 px-6 lg:px-12 max-w-6xl mx-auto pb-32">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black tracking-tight mb-8">
          My Account
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            {/* User Card */}
            <div className="rounded-2xl bg-foreground/[0.03] border border-foreground/8 p-6 mb-4 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 flex items-center justify-center text-2xl font-black">
                  {user.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Camera size={11} />
                </button>
              </div>
              <p className="font-black text-base">{user.name}</p>
              <p className="text-xs text-foreground/40 mt-1">{user.email}</p>
            </div>

            {/* Nav */}
            <div className="rounded-2xl bg-foreground/[0.03] border border-foreground/8 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold transition-all border-b border-foreground/5 last:border-0 ${
                    activeTab === tab.id
                      ? "bg-foreground text-background"
                      : "hover:bg-foreground/5 text-foreground/60"
                  }`}
                >
                  {tab.icon} {tab.label}
                  <ChevronRight size={14} className="ml-auto opacity-40" />
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold text-red-500 hover:bg-red-500/5 transition-colors">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Profile */}
                {activeTab === "profile" && (
                  <div className="rounded-2xl border border-foreground/10 overflow-hidden">
                    <div className="px-6 py-4 bg-foreground/[0.03] border-b border-foreground/10 flex items-center justify-between">
                      <h2 className="font-black">Personal Information</h2>
                      <button
                        id="edit-profile-btn"
                        onClick={() => setEditingProfile(!editingProfile)}
                        className="flex items-center gap-2 text-xs font-bold text-foreground/50 hover:text-foreground transition-colors"
                      >
                        <Edit2 size={13} /> {editingProfile ? "Cancel" : "Edit"}
                      </button>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { label: "Full Name", key: "name", value: user.name, type: "text" },
                        { label: "Email Address", key: "email", value: user.email, type: "email" },
                        { label: "Phone Number", key: "phone", value: user.phone, type: "tel" },
                      ].map(({ label, key, value, type }) => (
                        <div key={key} className={key === "email" ? "sm:col-span-2" : ""}>
                          <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">{label}</label>
                          {editingProfile ? (
                            <input
                              type={type}
                              value={(user as any)[key]}
                              onChange={(e) => setUser((u) => ({ ...u, [key]: e.target.value }))}
                              className="w-full border border-foreground/15 rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
                            />
                          ) : (
                            <p className="text-sm font-medium py-3 border-b border-foreground/5">{value}</p>
                          )}
                        </div>
                      ))}
                      {editingProfile && (
                        <div className="sm:col-span-2">
                          <button
                            id="save-profile-btn"
                            onClick={() => setEditingProfile(false)}
                            className="px-8 py-3 bg-foreground text-background rounded-full font-bold text-sm hover:opacity-80 transition-opacity"
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Orders */}
                {activeTab === "orders" && (
                  <div className="space-y-4">
                    <h2 className="font-black text-xl mb-6">My Orders</h2>
                    {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="rounded-2xl border border-foreground/10 overflow-hidden">
                        <div className="px-5 py-4 bg-foreground/[0.02] border-b border-foreground/8 flex items-center justify-between gap-4 flex-wrap">
                          <div>
                            <p className="text-xs text-foreground/40 font-medium">Order</p>
                            <p className="font-black text-sm">#{order.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/40 font-medium">Date</p>
                            <p className="font-semibold text-sm">{order.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/40 font-medium">Total</p>
                            <p className="font-black text-sm">{formatPrice(order.total)}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="p-5">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                              <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{item.name}</p>
                                <p className="text-xs text-foreground/40">{item.selectedSize} · {item.selectedColor} · Qty {item.quantity}</p>
                              </div>
                              <div className="ml-auto flex gap-2">
                                {order.status === "Delivered" && (
                                  <button className="flex items-center gap-1 text-xs font-bold text-amber-500 border border-amber-500/30 px-3 py-1.5 rounded-full hover:bg-amber-500/10 transition-colors">
                                    <Star size={11} /> Review
                                  </button>
                                )}
                                <button className="text-xs font-bold text-foreground/50 border border-foreground/15 px-3 py-1.5 rounded-full hover:bg-foreground/5 transition-colors">
                                  <ShoppingBag size={11} className="inline mr-1" />Buy Again
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Wishlist */}
                {activeTab === "wishlist" && (
                  <div>
                    <h2 className="font-black text-xl mb-6">My Wishlist ({WISHLIST_ITEMS.length})</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                      {WISHLIST_ITEMS.map((product, i) => (
                        <div key={product.id} className="group relative">
                          <Link href={`/product/${product.id}`}>
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-3">
                              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <p className="font-semibold text-sm">{product.name}</p>
                            <p className="text-sm font-black mt-0.5">{formatPrice(product.price)}</p>
                          </Link>
                          <button className="mt-2 w-full py-2 text-xs font-bold border border-foreground/15 rounded-full hover:bg-foreground hover:text-background transition-all">
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Addresses */}
                {activeTab === "addresses" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-black text-xl">Saved Addresses</h2>
                      <button
                        id="add-address-btn"
                        className="px-5 py-2.5 bg-foreground text-background rounded-full font-bold text-xs hover:opacity-80 transition-opacity"
                      >
                        + Add New
                      </button>
                    </div>
                    <div className="space-y-4">
                      {ADDRESSES.map((addr) => (
                        <div key={addr.id} className={`rounded-2xl border-2 p-5 transition-all ${addr.default ? "border-foreground" : "border-foreground/10"}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-black text-sm">{addr.label}</span>
                                {addr.default && <span className="px-2 py-0.5 bg-foreground text-background text-[10px] font-bold rounded-full">DEFAULT</span>}
                              </div>
                              <p className="font-semibold text-sm">{addr.name}</p>
                              <p className="text-sm text-foreground/60 mt-1">{addr.address}</p>
                              <p className="text-sm text-foreground/60">{addr.city}, {addr.state} — {addr.pincode}</p>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0">
                              <button className="text-xs font-bold text-foreground/50 hover:text-foreground transition-colors underline">Edit</button>
                              {!addr.default && <button className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors underline">Remove</button>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
