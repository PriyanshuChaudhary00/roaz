"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, GENDERS } from "@/constants/products";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

type SortOption = "popular" | "new" | "price-low" | "price-high";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
const COLORS = ["Black", "White", "Slate", "Oatmeal", "Moss", "Khaki", "Navy", "Rust", "Sage", "Crimson", "Sand"];
const MAX_PRICE = 20000;

const FilterChip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
      active
        ? "bg-foreground text-background border-foreground"
        : "border-foreground/15 text-foreground/60 hover:border-foreground/40"
    }`}
  >
    {label}
  </button>
);

const FilterSection = ({
  title, isExpanded, onToggle, children,
}: { title: string; isExpanded: boolean; onToggle: () => void; children: React.ReactNode }) => (
  <div className="border-b border-foreground/10 pb-5 mb-5">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full mb-4 text-sm font-bold uppercase tracking-widest"
    >
      {title} <ChevronDown size={14} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
    </button>
    <AnimatePresence>{isExpanded && (
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
        {children}
      </motion.div>
    )}</AnimatePresence>
  </div>
);

export default function ShopPage() {
  const searchParams = useSearchParams();
  const genderParam = searchParams.get("gender");

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>(genderParam ? [genderParam] : []);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    if (genderParam) {
      setSelectedGenders([genderParam]);
    }
  }, [genderParam]);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch products:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<SortOption>("popular");
  const [expandedSections, setExpandedSections] = useState({
    category: true, gender: true, price: true, size: true, color: true,
  });

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategories.length) list = list.filter((p) => selectedCategories.includes(p.category));
    if (selectedGenders.length) list = list.filter((p) => selectedGenders.includes(p.gender) || p.gender === "Unisex");
    if (selectedSizes.length) list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    if (selectedColors.length) list = list.filter((p) => p.colors.some((c) => selectedColors.includes(c)));
    list = list.filter((p) => p.price <= maxPrice);

    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    else if (sort === "new") list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [selectedCategories, selectedGenders, selectedSizes, selectedColors, maxPrice, sort]);

  const activeFilterCount =
    selectedCategories.length + selectedGenders.length + selectedSizes.length + selectedColors.length +
    (maxPrice < MAX_PRICE ? 1 : 0);

  const clearAll = () => {
    setSelectedCategories([]); setSelectedGenders([]); setSelectedSizes([]);
    setSelectedColors([]); setMaxPrice(MAX_PRICE);
  };

  const renderSidebarContent = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-black tracking-tight">Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</h2>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-xs text-foreground/50 hover:text-foreground underline transition-colors">
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Category" isExpanded={expandedSections.category} onToggle={() => toggleSection("category")}>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <FilterChip key={c} label={c} active={selectedCategories.includes(c)} onClick={() => toggle(selectedCategories, setSelectedCategories, c)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Gender" isExpanded={expandedSections.gender} onToggle={() => toggleSection("gender")}>
        <div className="flex flex-wrap gap-2">
          {GENDERS.map((g) => (
            <FilterChip key={g} label={g} active={selectedGenders.includes(g)} onClick={() => toggle(selectedGenders, setSelectedGenders, g)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price" isExpanded={expandedSections.price} onToggle={() => toggleSection("price")}>
        <div>
          <div className="flex justify-between text-xs text-foreground/50 mb-2">
            <span>₹0</span>
            <span>₹{maxPrice.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range" min={0} max={MAX_PRICE} step={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-foreground"
          />
        </div>
      </FilterSection>

      <FilterSection title="Size" isExpanded={expandedSections.size} onToggle={() => toggleSection("size")}>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <FilterChip key={s} label={s} active={selectedSizes.includes(s)} onClick={() => toggle(selectedSizes, setSelectedSizes, s)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color" isExpanded={expandedSections.color} onToggle={() => toggleSection("color")}>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <FilterChip key={c} label={c} active={selectedColors.includes(c)} onClick={() => toggle(selectedColors, setSelectedColors, c)} />
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-2"
          >
            All Products
          </motion.h1>
          <p className="text-foreground/40 font-medium">{filtered.length} items</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 rounded-2xl bg-foreground/[0.02] border border-foreground/8 overflow-hidden">
            {renderSidebarContent()}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Sort + Filter bar */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <button
              id="filters-toggle-btn"
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-foreground/15 text-sm font-semibold hover:bg-foreground/5 transition-colors"
            >
              <SlidersHorizontal size={15} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-sm text-foreground/40 hidden sm:block">Sort:</span>
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-sm font-semibold bg-transparent border border-foreground/15 rounded-full px-4 py-2 focus:outline-none focus:border-foreground/40 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="new">Newest</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-foreground/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-4xl font-black text-foreground/10 mb-4">No results</p>
              <p className="text-foreground/40">Try adjusting or clearing your filters.</p>
              <button onClick={clearAll} className="mt-6 px-6 py-2.5 bg-foreground text-background rounded-full text-sm font-bold">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 left-0 w-80 max-w-full bg-background z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-foreground/10">
                <span className="font-black text-lg">Filters</span>
                <button onClick={() => setFiltersOpen(false)}><X size={22} /></button>
              </div>
              {renderSidebarContent()}
              <div className="p-6">
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-full py-3.5 bg-foreground text-background font-bold rounded-full"
                >
                  Apply Filters ({filtered.length} items)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
