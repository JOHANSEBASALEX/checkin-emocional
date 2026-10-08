import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { checkinId, cambio, practica } = await req.json()
  const valor = Number(cambio)

  if (!checkinId || !Number.isFinite(valor) || valor < -2 || valor > 2) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
  }

  const serviceClient = await createServiceClient()
  const { data: checkin } = await serviceClient
    .from("checkins")
    .select("respuestas")
    .eq("id", checkinId)
    .eq("user_id", user.id)
    .single()

  if (!checkin) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  }

  const respuestas = { ...(checkin.respuestas ?? {}), cambio: valor, practica: practica ?? null }

  const { error } = await serviceClient
    .from("checkins")
    .update({ respuestas })
    .eq("id", checkinId)
    .eq("user_id", user.id)

  if (error) {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}