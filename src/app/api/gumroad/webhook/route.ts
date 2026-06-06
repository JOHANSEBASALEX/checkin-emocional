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
  const token = req.nextUrl.searchParams.get("token")
  if (!token || token !== process.env.GUMROAD_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  // Gumroad envía form-urlencoded
  const formData = await req.formData()
  const email = formData.get("email") as string | null
  const cancelled = formData.get("cancelled") as string | null
  const subscriptionId = formData.get("subscription_id") as string | null
  const isTest = formData.get("test") === "true"

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

  const isCancelled = cancelled === "true"
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
