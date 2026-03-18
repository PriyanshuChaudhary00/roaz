import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool as any)
const prisma = new PrismaClient({ adapter })

const PRODUCTS_DATA = [
  {
    name: "Overcast Wool Bomber",
    category: "Outerwear",
    price: 12499,
    description: "A premium wool-blend bomber crafted for the urban explorer.",
    brand: "ROAZ",
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop"],
    variants: [
      { size: "M", color: "Charcoal", stock: 10, sku: "BM-CH-M" },
      { size: "L", color: "Black", stock: 5, sku: "BM-BK-L" }
    ]
  },
  {
    name: "Zenith Oversized Hoodie",
    category: "Apparel",
    price: 6499,
    description: "A garment-dyed, 400gsm heavyweight French terry hoodie.",
    brand: "ROAZ",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"],
    variants: [
      { size: "L", color: "Sage", stock: 15, sku: "HD-SG-L" }
    ]
  },
  {
    name: "Architect Monogram Cap",
    category: "Accessories",
    price: 1899,
    description: "A 6-panel structured cap with a tonal embroidered ROAZ Architect logo.",
    brand: "ROAZ",
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop"],
    variants: [
      { size: "One Size", color: "Black", stock: 50, sku: "CP-BK-OS" }
    ]
  }
]

async function main() {
  console.log('Seeding database...')

  for (const item of PRODUCTS_DATA) {
    // 1. Ensure category exists
    const category = await prisma.category.upsert({
      where: { id: item.category.toLowerCase() },
      update: {},
      create: { id: item.category.toLowerCase(), name: item.category }
    })

    // 2. Create product
    const product = await prisma.product.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        brand: item.brand,
        categoryId: category.id,
        images: {
          create: item.images.map(url => ({ imageUrl: url }))
        },
        variants: {
          create: item.variants.map(v => ({
            size: v.size,
            color: v.color,
            stock: v.stock,
            sku: v.sku
          }))
        }
      }
    })
    console.log(`Created product: ${product.name}`)
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
