import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  // Verificar token secreto en la URL
  const token = req.headers.get("x-hotmart-hottok")
  if (!token || token !== process.env.HOTMART_HOTTOK) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  // Gumroad envía form-urlencoded
  const body = await req.json()
  const email = (body?.data?.buyer?.email ?? body?.data?.subscriber?.email ?? null) as string | null
  const event = (body?.event ?? "") as string
  const subscriptionId = (body?.data?.subscription?.subscriber?.code ?? null) as string | null
  const isTest = false

  if (!email) {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 })
  }

  // Ignorar eventos de prueba en producción
  if (isTest && process.env.NODE_ENV === "production") {
    return NextResponse.json({ received: true, skipped: "test event" })
  }

  const supabase = getSupabaseAdmin()

  // Buscar el usuario por email en auth.users via service role
  const { data: authUsers } = await supabase.auth.admin.listUsers()
  const authUser = authUsers?.users?.find(u => u.email === email)

  if (!authUser) {
    // El comprador no tiene cuenta — guardamos para conciliación manual
    console.warn(`Gumroad webhook: no se encontró usuario con email ${email}`)
    return NextResponse.json({ received: true, warning: "usuario no encontrado" })
  }

  const isCancelled = ["SUBSCRIPTION_CANCELLATION", "PURCHASE_CANCELED", "PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK"].includes(event)
  const newStatus = isCancelled ? "canceled" : "active"
  const update: Record<string, string> = { subscription_status: newStatus }
  if (subscriptionId) update.subscription_id = subscriptionId

  const { error } = await supabase
    .from("profiles")
    .update(update)
    .eq("id", authUser.id)

  if (error) {
    console.error("Error actualizando perfil:", error)
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 })
  }

  return NextResponse.json({ received: true, status: newStatus, email })
}
