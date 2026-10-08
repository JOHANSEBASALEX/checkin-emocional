import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

const TOTAL = 100

export async function GET() {
  const serviceClient = await createServiceClient()
  const { count } = await serviceClient
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("subscription_status", "active")

  const usados = count ?? 0
  return NextResponse.json({ total: TOTAL, quedan: Math.max(TOTAL - usados, 0) })
}