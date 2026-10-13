import { NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"
import { generarCarta, inicioSemana, type CheckinSemana } from "@/lib/carta"

async function cargar(userId: string) {
  const sc = await createServiceClient()
  const semana = inicioSemana()
  const desde = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString()

  const [perfil, carta, checkins, muestras] = await Promise.all([
    sc.from("profiles").select("full_name, subscription_status").eq("id", userId).single(),
    sc.from("cartas").select("contenido, es_muestra").eq("user_id", userId).eq("semana", semana).maybeSingle(),
    sc.from("checkins").select("emocion, intensidad, respuestas, journal, created_at").eq("user_id", userId).gte("created_at", desde).order("created_at", { ascending: true }),
    sc.from("cartas").select("id").eq("user_id", userId).eq("es_muestra", true).limit(1),
  ])

  const isPro = perfil.data?.subscription_status === "active"
  const lista = (checkins.data ?? []) as CheckinSemana[]
  const minimo = isPro ? 2 : 3
  const muestraUsada = (muestras.data ?? []).length > 0

  let puedeGenerar = false
  let motivo: "ok" | "faltan_checkins" | "muestra_usada" | "ya_existe" = "ok"
  if (carta.data) motivo = "ya_existe"
  else if (!isPro && muestraUsada) motivo = "muestra_usada"
  else if (lista.length < minimo) motivo = "faltan_checkins"
  else puedeGenerar = true

  const primero = (perfil.data?.full_name ?? "").split(" ")[0]
  const nombre = primero ? primero.charAt(0).toUpperCase() + primero.slice(1).toLowerCase() : "tú"

  return { sc, semana, isPro, lista, minimo, nombre, carta: carta.data, puedeGenerar, motivo }
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const e = await cargar(user.id)
  return NextResponse.json({
    isPro: e.isPro,
    carta: e.carta?.contenido ?? null,
    esMuestra: e.carta?.es_muestra ?? false,
    total: e.lista.length,
    minimo: e.minimo,
    puedeGenerar: e.puedeGenerar,
    motivo: e.motivo,
  })
}

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const e = await cargar(user.id)
  if (e.carta) return NextResponse.json({ carta: e.carta.contenido, esMuestra: e.carta.es_muestra })
  if (!e.puedeGenerar) return NextResponse.json({ error: "No cumple las condiciones", motivo: e.motivo }, { status: 403 })

  try {
    const contenido = await generarCarta(e.nombre, e.lista)
    const esMuestra = !e.isPro
    const { error } = await e.sc.from("cartas").insert({
      user_id: user.id,
      semana: e.semana,
      contenido,
      es_muestra: esMuestra,
    })
    if (error) {
      console.error("Error guardando carta:", error)
      // Si hizo doble clic, devolvemos la que ya se guardó
      const { data: existente } = await e.sc.from("cartas").select("contenido, es_muestra").eq("user_id", user.id).eq("semana", e.semana).maybeSingle()
      if (existente) return NextResponse.json({ carta: existente.contenido, esMuestra: existente.es_muestra })
      return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 })
    }
    return NextResponse.json({ carta: contenido, esMuestra })
  } catch (err) {
    console.error("Error generando carta:", err)
    return NextResponse.json({ error: "No pudimos escribir tu carta ahora. Intenta en unos minutos." }, { status: 502 })
  }
}

