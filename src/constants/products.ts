export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description?: string;
}

export const PRODUCTS: Product[] = [
  // OUTERWEAR
  { id: 1, name: "Overcast Wool Bomber", category: "Outerwear", price: "₹12,499", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "Crimson Suede Trucker", category: "Outerwear", price: "₹14,999", image: "https://images.unsplash.com/photo-1617114917202-abc239b7923e?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "Shadow Peacoat Hoodie", category: "Outerwear", price: "₹16,999", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "Oatmeal Suede Jacket", category: "Outerwear", price: "₹13,499", image: "https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=1000&auto=format&fit=crop" },
  { id: 13, name: "Strata Quilted Vest", category: "Outerwear", price: "₹9,499", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop" },
  
  // APPAREL
  { id: 7, name: "Tribal Graphic Knit", category: "Apparel", price: "₹8,999", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop" },
  { id: 8, name: "Zenith Oversized Hoodie", category: "Apparel", price: "₹6,499", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop" },
  { id: 10, name: "Monolith Relaxed Tee", category: "Apparel", price: "₹2,999", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop" },
  { id: 14, name: "Flow Linen Shirt", category: "Apparel", price: "₹4,899", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop" },
  { id: 16, name: "Vanguard Tech Layer", category: "Apparel", price: "₹5,499", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop" },

  // BOTTOMS
  { id: 5, name: "Core Sweatpants - Black", category: "Bottoms", price: "₹4,899", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop" },
  { id: 6, name: "Core Sweatpants - Moss", category: "Bottoms", price: "₹4,899", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop" },
  { id: 9, name: "Utility Cargo Trousers", category: "Bottoms", price: "₹7,299", image: "https://images.unsplash.com/photo-1473966968600-fa804b86d9a4?q=80&w=1000&auto=format&fit=crop" },
  { id: 15, name: "Traction Tech Shorts", category: "Bottoms", price: "₹3,999", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop" },
  { id: 17, name: "Arid Desert Cargo", category: "Bottoms", price: "₹6,499", image: "https://images.unsplash.com/photo-1473966968600-fa804b86d9a4?q=80&w=1000&auto=format&fit=crop" },

  // ACCESSORIES
  { id: 11, name: "Draft Canvas Tote", category: "Accessories", price: "₹2,199", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop" },
  { id: 12, name: "Vector Beanie - Slate", category: "Accessories", price: "₹1,499", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop" },
  { id: 18, name: "Architect Monogram Cap", category: "Accessories", price: "₹1,899", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop" },
  { id: 19, name: "Nexus Utility Belt", category: "Accessories", price: "₹3,299", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop" },
];

export const CATEGORIES = ["Outerwear", "Apparel", "Bottoms", "Accessories"];
