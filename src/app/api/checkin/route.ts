import { NextRequest, NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { anthropic, buildCheckinPrompt } from "@/lib/anthropic"

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

  // Verificar suscripción
  const serviceClient = await createServiceClient()
  const { data: profile } = await serviceClient
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single()

  const isPro = profile?.subscription_status === "active"

  // Guardar check-in
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

  // Generar reflexión IA solo para Pro
  if (isPro) {
    try {
      const prompt = buildCheckinPrompt(emocion, intensidad, respuestas ?? {}, journal ?? "")
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      })

      const reflexion = message.content[0].type === "text" ? message.content[0].text : null

      if (reflexion) {
        await serviceClient
          .from("checkins")
          .update({ reflexion_ia: reflexion })
          .eq("id", checkin.id)

        return NextResponse.json({ reflexion, isPro: true })
      }
    } catch (err) {
      console.error("Error generando reflexión IA:", err)
    }
  }

  return NextResponse.json({ reflexion: null, isPro })
}
