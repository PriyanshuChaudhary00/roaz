import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        variants: true,
        category: true,
      }
    })

    // Map database models to the frontend interface
    const mappedProducts = products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category.name,
      price: p.price,
      image: p.images[0]?.imageUrl || "",
      images: p.images.map(img => img.imageUrl),
      description: p.description || "",
      brand: p.brand || "ROAZ",
      sizes: [...new Set(p.variants.map(v => v.size))],
      colors: [...new Set(p.variants.map(v => v.color))],
      inStock: p.variants.some(v => v.stock > 0),
      rating: 4.5, // Default for now
      reviews: 0,
      gender: "Unisex", // Default for now
    }))

    return NextResponse.json(mappedProducts)
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
