"use client";

import { useState } from "react";
import { PRODUCTS, formatPrice } from "@/constants/products";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Plus, Search, Edit2, Trash2, X, ChevronDown, Check, 
  TrendingUp, DollarSign, ShoppingBag, Star, Eye, AlertCircle,
} from "lucide-react";

type AdminTab = "overview" | "products" | "orders" | "users" | "inventory";

const MOCK_ADMIN_ORDERS = [
  { id: "ROAZ789012", customer: "Priyanshu C.", date: "12 Mar 2026", total: 12499, status: "Delivered", items: 1 },
  { id: "ROAZ654321", customer: "Aryan S.", date: "10 Mar 2026", total: 12998, status: "In Transit", items: 2 },
  { id: "ROAZ333444", customer: "Mehak J.", date: "08 Mar 2026", total: 16999, status: "Processing", items: 1 },
  { id: "ROAZ222111", customer: "Rohan V.", date: "05 Mar 2026", total: 8999, status: "Cancelled", items: 1 },
  { id: "ROAZ555666", customer: "Kritika P.", date: "02 Mar 2026", total: 6499, status: "Delivered", items: 1 },
];

const MOCK_USERS = [
  { id: 1, name: "Priyanshu Chaudhary", email: "priyanshu@example.com", orders: 3, spent: 36496, joined: "Jan 2026", active: true },
  { id: 2, name: "Aryan Sharma", email: "aryan@example.com", orders: 1, spent: 12998, joined: "Feb 2026", active: true },
  { id: 3, name: "Mehak Joshi", email: "mehak@example.com", orders: 2, spent: 21898, joined: "Mar 2026", active: false },
  { id: 4, name: "Rohan Verma", email: "rohan@example.com", orders: 1, spent: 8999, joined: "Mar 2026", active: true },
];

const STATUS_COLORS: Record<string, string> = {
  "Delivered": "text-green-500 bg-green-500/10",
  "In Transit": "text-blue-500 bg-blue-500/10",
  "Processing": "text-amber-500 bg-amber-500/10",
  "Cancelled": "text-red-500 bg-red-500/10",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<(typeof PRODUCTS)[0] | null>(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", image: "", description: "" });

  const navItems = [
    { id: "overview" as AdminTab, label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "products" as AdminTab, label: "Products", icon: <Package size={16} /> },
    { id: "orders" as AdminTab, label: "Orders", icon: <ShoppingCart size={16} /> },
    { id: "users" as AdminTab, label: "Users", icon: <Users size={16} /> },
    { id: "inventory" as AdminTab, label: "Inventory", icon: <BarChart3 size={16} /> },
  ];

  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const deleteProduct = (id: number) => setProducts((p) => p.filter((product) => product.id !== id));

  const totalRevenue = MOCK_ADMIN_ORDERS.filter((o) => o.status === "Delivered").reduce((s, o) => s + o.total, 0);

  const StatCard = ({ icon, label, value, sub, color }: any) => (
    <div className="rounded-2xl bg-foreground/[0.03] border border-foreground/8 p-5">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>{icon}</div>
      <p className="text-2xl font-black mb-1">{value}</p>
      <p className="text-sm font-semibold text-foreground/60">{label}</p>
      {sub && <p className="text-xs text-foreground/30 mt-1">{sub}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-foreground/10 flex flex-col p-4">
        <div className="mb-8 px-2 pt-4">
          <p className="text-xl font-black tracking-widest">ROAZ</p>
          <p className="text-xs text-foreground/40 font-semibold">Admin Panel</p>
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`admin-tab-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold mb-1 transition-all ${
              activeTab === item.id ? "bg-foreground text-background" : "text-foreground/50 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-foreground/10 px-8 py-4 flex items-center justify-between">
          <h1 className="font-black text-lg capitalize">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-foreground/40 font-medium">Admin: Priyanshu</span>
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-background font-black text-xs">P</div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Overview */}
              {activeTab === "overview" && (
                <div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <StatCard icon={<DollarSign size={18} />} label="Revenue" value={`₹${(totalRevenue / 1000).toFixed(1)}K`} sub="Delivered orders" color="bg-green-500/10 text-green-500" />
                    <StatCard icon={<ShoppingBag size={18} />} label="Total Orders" value={MOCK_ADMIN_ORDERS.length} sub="All time" color="bg-blue-500/10 text-blue-500" />
                    <StatCard icon={<Users size={18} />} label="Users" value={MOCK_USERS.length} sub="Registered" color="bg-purple-500/10 text-purple-500" />
                    <StatCard icon={<Package size={18} />} label="Products" value={products.length} sub="In catalog" color="bg-amber-500/10 text-amber-500" />
                  </div>

                  <h2 className="font-black text-base mb-4">Recent Orders</h2>
                  <div className="rounded-2xl border border-foreground/10 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-foreground/[0.03] border-b border-foreground/10">
                        <tr>{["Order ID","Customer","Date","Items","Total","Status"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest text-foreground/40">{h}</th>
                        ))}</tr>
                      </thead>
                      <tbody>
                        {MOCK_ADMIN_ORDERS.map((order) => (
                          <tr key={order.id} className="border-b border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                            <td className="px-5 py-4 font-bold text-xs">#{order.id}</td>
                            <td className="px-5 py-4 font-medium">{order.customer}</td>
                            <td className="px-5 py-4 text-foreground/60">{order.date}</td>
                            <td className="px-5 py-4">{order.items}</td>
                            <td className="px-5 py-4 font-bold">{formatPrice(order.total)}</td>
                            <td className="px-5 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${STATUS_COLORS[order.status]}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Products */}
              {activeTab === "products" && (
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                    <div className="flex items-center gap-3 border border-foreground/15 rounded-xl px-4 py-2.5 focus-within:border-foreground/40 transition-colors">
                      <Search size={15} className="text-foreground/40" />
                      <input
                        id="admin-search"
                        type="text" placeholder="Search products..."
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        className="text-sm bg-transparent outline-none w-52"
                      />
                    </div>
                    <button
                      id="admin-add-product-btn"
                      onClick={() => setAddOpen(true)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl font-bold text-sm hover:opacity-80 transition-opacity"
                    >
                      <Plus size={16} /> Add Product
                    </button>
                  </div>

                  <div className="rounded-2xl border border-foreground/10 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-foreground/[0.03] border-b border-foreground/10">
                        <tr>{["Product","Category","Price","Stock","Rating","Actions"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest text-foreground/40">{h}</th>
                        ))}</tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                                </div>
                                <span className="font-semibold text-xs leading-tight max-w-[140px]">{product.name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-foreground/60 text-xs">{product.category}</td>
                            <td className="px-5 py-3 font-bold text-xs">{formatPrice(product.price)}</td>
                            <td className="px-5 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${product.inStock ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                                {product.inStock ? "In Stock" : "Out"}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-xs font-semibold flex items-center gap-1">
                              <Star size={10} className="fill-amber-400 text-amber-400" /> {product.rating}
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  id={`edit-product-${product.id}`}
                                  onClick={() => setEditProduct(product)}
                                  className="p-1.5 rounded-lg hover:bg-blue-500/10 text-foreground/40 hover:text-blue-500 transition-colors"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  id={`delete-product-${product.id}`}
                                  onClick={() => deleteProduct(product.id)}
                                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-foreground/40 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Orders */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="font-black text-base mb-6">All Orders ({MOCK_ADMIN_ORDERS.length})</h2>
                  <div className="space-y-3">
                    {MOCK_ADMIN_ORDERS.map((order) => (
                      <div key={order.id} className="rounded-2xl border border-foreground/10 p-5 flex items-center justify-between gap-4 flex-wrap hover:bg-foreground/[0.02] transition-colors">
                        <div>
                          <p className="font-black text-sm">#{order.id}</p>
                          <p className="text-xs text-foreground/40">{order.customer} · {order.date}</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-foreground/40">Total</p>
                            <p className="font-black text-sm">{formatPrice(order.total)}</p>
                          </div>
                          <div className="relative">
                            <select
                              className={`pr-8 pl-3 py-1.5 rounded-full text-xs font-bold appearance-none focus:outline-none ${STATUS_COLORS[order.status]}`}
                              defaultValue={order.status}
                            >
                              {Object.keys(STATUS_COLORS).map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Users */}
              {activeTab === "users" && (
                <div>
                  <h2 className="font-black text-base mb-6">All Users ({MOCK_USERS.length})</h2>
                  <div className="rounded-2xl border border-foreground/10 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-foreground/[0.03] border-b border-foreground/10">
                        <tr>{["User","Email","Orders","Spent","Joined","Status"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest text-foreground/40">{h}</th>
                        ))}</tr>
                      </thead>
                      <tbody>
                        {MOCK_USERS.map((user) => (
                          <tr key={user.id} className="border-b border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center font-black text-xs">
                                  {user.name.charAt(0)}
                                </div>
                                <span className="font-semibold">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-foreground/60 text-xs">{user.email}</td>
                            <td className="px-5 py-4 font-semibold">{user.orders}</td>
                            <td className="px-5 py-4 font-bold">{formatPrice(user.spent)}</td>
                            <td className="px-5 py-4 text-foreground/60 text-xs">{user.joined}</td>
                            <td className="px-5 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${user.active ? "bg-green-500/10 text-green-500" : "bg-foreground/10 text-foreground/40"}`}>
                                {user.active ? "Active" : "Inactive"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Inventory */}
              {activeTab === "inventory" && (
                <div>
                  <h2 className="font-black text-base mb-6">Inventory Management</h2>
                  <div className="rounded-2xl border border-foreground/10 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-foreground/[0.03] border-b border-foreground/10">
                        <tr>{["Product","SKU","Sizes Available","Status","Action"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-widest text-foreground/40">{h}</th>
                        ))}</tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-3">
                                <div className="relative w-8 h-10 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                                </div>
                                <span className="font-semibold text-xs">{product.name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-foreground/40 text-xs font-mono">ROAZ-{String(product.id).padStart(4, "0")}</td>
                            <td className="px-5 py-3 text-xs text-foreground/60">{product.sizes.join(", ")}</td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                {product.inStock ? (
                                  <><Check size={12} className="text-green-500" /><span className="text-green-500 font-bold text-xs">In Stock</span></>
                                ) : (
                                  <><AlertCircle size={12} className="text-red-500" /><span className="text-red-500 font-bold text-xs">Out of Stock</span></>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              <button
                                onClick={() => setProducts((prev) => prev.map((p) => p.id === product.id ? { ...p, inStock: !p.inStock } : p))}
                                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                                  product.inStock ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                }`}
                              >
                                Mark {product.inStock ? "Out of Stock" : "In Stock"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {(addOpen || editProduct) && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              onClick={() => { setAddOpen(false); setEditProduct(null); }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            >
              <div className="bg-background rounded-3xl border border-foreground/10 w-full max-w-lg p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-black text-lg">{editProduct ? "Edit Product" : "Add New Product"}</h2>
                  <button onClick={() => { setAddOpen(false); setEditProduct(null); }} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Product Name", key: "name", placeholder: "e.g. Overcast Wool Bomber" },
                    { label: "Category", key: "category", placeholder: "e.g. Outerwear" },
                    { label: "Price (₹)", key: "price", placeholder: "e.g. 12499" },
                    { label: "Image URL", key: "image", placeholder: "https://..." },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-1.5">{label}</label>
                      <input
                        id={`admin-form-${key}`}
                        type="text"
                        placeholder={placeholder}
                        defaultValue={editProduct ? (editProduct as any)[key] : ""}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full border border-foreground/15 rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-1.5">Description</label>
                    <textarea
                      id="admin-form-description"
                      placeholder="Product description..."
                      rows={3}
                      className="w-full border border-foreground/15 rounded-xl px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground/50 transition-colors resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    id="admin-save-product-btn"
                    onClick={() => { setAddOpen(false); setEditProduct(null); }}
                    className="flex-1 py-3 bg-foreground text-background font-bold rounded-xl text-sm hover:opacity-80 transition-opacity"
                  >
                    {editProduct ? "Save Changes" : "Add Product"}
                  </button>
                  <button
                    onClick={() => { setAddOpen(false); setEditProduct(null); }}
                    className="flex-1 py-3 border border-foreground/15 font-bold rounded-xl text-sm hover:bg-foreground/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
