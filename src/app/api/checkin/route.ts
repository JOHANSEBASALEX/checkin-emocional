import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { generarReflexion } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { emocion, categoria, intensidad, respuestas, journal } = await req.json()

  if (!emocion || !intensidad) {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 })
  }

  // Verificar suscripción con service role (bypasa RLS)
  const serviceClient = await createServiceClient()
  const { data: profile } = await serviceClient
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single()

  const isPro = profile?.subscription_status === "active"

  // Guardar check-in siempre
  const { data: checkin, error: insertError } = await serviceClient
    .from("checkins")
    .insert({
      user_id: user.id,
      emocion,
      categoria,
      intensidad,
      respuestas: respuestas ?? {},
      journal: journal || null,
    })
    .select()
    .single()

  if (insertError) {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 })
  }

  // Generar reflexión con Gemini solo para Pro
  const previos = isPro ? (await serviceClient.from("checkins").select("emocion, intensidad, created_at").eq("user_id", user.id).neq("id", checkin.id).gte("created_at", new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()).order("created_at", { ascending: true })).data ?? [] : []; if (isPro) {
    try {
      const reflexion = await generarReflexion(
        emocion,
        intensidad,
        respuestas ?? {},
        journal ?? "", previos
      )

      if (reflexion) {
        await serviceClient
          .from("checkins")
          .update({ reflexion_ia: reflexion })
          .eq("id", checkin.id)

        return NextResponse.json({ reflexion, isPro: true, checkinId: checkin.id })
      }
    } catch (err) {
      console.error("Error generando reflexión con Gemini:", err)
    }
  }

  return NextResponse.json({ reflexion: null, isPro, checkinId: checkin.id })
}

export const maxDuration = 60
