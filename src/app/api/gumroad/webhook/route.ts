import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const ACTIVAR = ["PURCHASE_APPROVED", "PURCHASE_COMPLETE"]
const CANCELAR = ["SUBSCRIPTION_CANCELLATION", "PURCHASE_CANCELED", "PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK", "PURCHASE_EXPIRED"]
const ATRASADO = ["PURCHASE_DELAYED"]

async function buscarUsuario(supabase: ReturnType<typeof getSupabaseAdmin>, email: string) {
  const buscado = email.trim().toLowerCase()
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 })
    if (error) throw error
    const u = data.users.find((x) => x.email?.toLowerCase() === buscado)
    if (u) return u
    if (data.users.length < 1000) return null
  }
  return null
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-hotmart-hottok")
  if (!token || token !== process.env.HOTMART_HOTTOK) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const body = await req.json()
  const email = (body?.data?.buyer?.email ?? body?.data?.subscriber?.email ?? null) as string | null
  const event = (body?.event ?? "") as string
  const subscriptionId = (body?.data?.subscription?.subscriber?.code ?? null) as string | null

  let newStatus: string | null = null
  if (ACTIVAR.includes(event)) newStatus = "active"
  else if (CANCELAR.includes(event)) newStatus = "canceled"
  else if (ATRASADO.includes(event)) newStatus = "past_due"

  if (!newStatus) {
    return NextResponse.json({ received: true, skipped: "evento ignorado: " + event })
  }

  if (!email) {
    return NextResponse.json({ error: "Email requerido" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  let authUser
  try {
    authUser = await buscarUsuario(supabase, email)
  } catch (err) {
    console.error("Error buscando usuario:", err)
    return NextResponse.json({ error: "Error buscando usuario" }, { status: 500 })
  }

  if (!authUser) {
    console.warn("Hotmart webhook: no se encontró usuario con email " + email + " (evento " + event + ")")
    return NextResponse.json({ received: true, warning: "usuario no encontrado" })
  }

  const update: Record<string, string> = { subscription_status: newStatus }
  if (subscriptionId) update.subscription_id = subscriptionId

  const { error } = await supabase.from("profiles").update(update).eq("id", authUser.id)

  if (error) {
    console.error("Error actualizando perfil:", error)
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 })
  }

  return NextResponse.json({ received: true, status: newStatus, email })
}
