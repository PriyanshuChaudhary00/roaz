"use client";

import { ShoppingBag, Search, Menu, Heart, User, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { CATEGORIES } from "@/constants/products";

export const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navLinks = [
    { label: "Shop", href: "/#shop" },
    { label: "Collections", href: "/shop" },
    { label: "Men", href: "/shop?gender=Men" },
    { label: "Women", href: "/shop?gender=Women" },
    { label: "Kids", href: "/shop?gender=Kids" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 flex items-center justify-between px-6 lg:px-10 py-4 transition-all duration-300 rounded-full ${
          isScrolled
            ? "bg-background/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-foreground/10 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-transparent shadow-none"
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black tracking-[0.2em] text-foreground hover:opacity-70 transition-all duration-300">
            ROAZ
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/#shop"
              className="text-xs font-bold tracking-[0.1em] uppercase text-foreground/50 hover:text-foreground transition-all duration-300 relative group"
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group/dropdown">
              <button className="flex items-center gap-1.5 text-xs font-bold tracking-[0.1em] uppercase text-foreground/50 hover:text-foreground transition-all duration-300">
                Categories <ChevronDown size={12} />
              </button>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300">
                <div className="bg-background dark:bg-zinc-900 border border-foreground/10 dark:border-white/10 rounded-2xl shadow-2xl p-4 w-48 backdrop-blur-xl">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      href={`/collections/${cat.toLowerCase()}`}
                      className="block px-3 py-2 text-[10px] font-black tracking-widest uppercase text-foreground/50 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-all"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-bold tracking-[0.1em] uppercase text-foreground/50 hover:text-foreground transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            id="navbar-search-btn"
            onClick={() => setSearchOpen(true)}
            className="p-2.5 hover:bg-foreground/5 rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground"
          >
            <Search size={18} />
          </button>

          <ThemeToggle />
          <div className="h-4 w-[1px] bg-foreground/10 mx-1 hidden sm:block" />

          {/* Wishlist */}
          <Link
            href="/wishlist"
            id="navbar-wishlist-btn"
            className="p-2.5 hover:bg-foreground/5 rounded-full transition-all duration-300 relative text-foreground/70 hover:text-foreground hidden sm:flex"
          >
            <Heart size={18} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            id="navbar-cart-btn"
            className="p-2.5 hover:bg-foreground/5 rounded-full transition-all duration-300 relative text-foreground/70 hover:text-foreground"
          >
            <ShoppingBag size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-foreground rounded-full text-[8px] flex items-center justify-center text-background font-black">
              2
            </span>
          </Link>

          {/* User */}
          <Link
            href="/dashboard"
            id="navbar-user-btn"
            className="p-2.5 hover:bg-foreground/5 rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground hidden sm:flex"
          >
            <User size={18} />
          </Link>

          {/* Login */}
          <Link
            href="/login"
            id="navbar-login-btn"
            className="hidden lg:flex px-5 py-2 bg-foreground text-background text-xs font-bold rounded-full hover:opacity-80 transition-opacity"
          >
            Sign In
          </Link>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2.5 hover:bg-foreground/5 rounded-full transition-all text-foreground/70 hover:text-foreground"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-32 px-6"
          >
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-8 right-8 p-3 hover:bg-foreground/5 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <div className="w-full max-w-2xl">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-foreground/30 mb-4">Search</p>
              <div className="flex items-center gap-4 border-b-2 border-foreground/20 pb-4 focus-within:border-foreground transition-colors">
                <Search size={24} className="text-foreground/40 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-3xl font-light bg-transparent outline-none placeholder:text-foreground/20"
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/collections/${cat.toLowerCase()}`}
                    onClick={() => setSearchOpen(false)}
                    className="px-4 py-2 rounded-full bg-foreground/5 text-sm font-medium hover:bg-foreground/10 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm z-[100] bg-background shadow-2xl flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-2xl font-black tracking-[0.2em]">ROAZ</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-foreground/5 rounded-full">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-black tracking-tight text-foreground/60 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-4 pt-8 border-t border-foreground/10">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 py-3 bg-foreground text-background font-bold text-center rounded-full text-sm">
                Sign In
              </Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)} className="flex-1 py-3 border border-foreground/20 font-bold text-center rounded-full text-sm">
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
