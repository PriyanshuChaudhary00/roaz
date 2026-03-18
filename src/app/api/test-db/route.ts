import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Try to count users as a simple query
    const userCount = await prisma.user.count()
    return NextResponse.json({ success: true, userCount })
  } catch (error: any) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        code: error.code
      }, 
      { status: 500 }
    )
  }
}
