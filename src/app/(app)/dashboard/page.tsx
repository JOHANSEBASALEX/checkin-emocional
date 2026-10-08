import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { CheckinCard } from "@/components/dashboard/CheckinCard"
import { MoodChart } from "@/components/dashboard/MoodChart"
import { Button } from "@/components/ui/button"
import { PlusCircle, TrendingUp, Calendar, Sparkles } from "lucide-react"
import { EMOCIONES } from "@/lib/constants"
import Image from "next/image"

const IMAGENES_EMOCION: Record<string, string> = {
  "Alegria":   "/emociones/ALEGRIA.jpeg",
  "Tristeza":  "/emociones/TRISTEZA.jpeg",
  "Ansiedad":  "/emociones/ANSIEDAD.jpeg",
  "Enojo":     "/emociones/ENOJO.jpeg",
  "Miedo":     "/emociones/MIEDO.jpeg",
  "Calma":     "/emociones/CALMA.jpeg",
  "Amor":      "/emociones/AMOR.jpeg",
  "Confusion": "/emociones/CONFUSION.jpeg",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: checkins } = await supabase
    .from("checkins")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(300)

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, subscription_status")
    .eq("id", user.id)
    .single()

  const nombre = profile?.full_name?.split(" ")[0] ?? "tu"
  const isPro = profile?.subscription_status === "active"
  const total = checkins?.length ?? 0
  const conReflexion = checkins?.filter(c => c.reflexion_ia).length ?? 0

  const frecuencia: Record<string, number> = {}
  checkins?.forEach(c => { frecuencia[c.emocion] = (frecuencia[c.emocion] ?? 0) + 1 })
  const emocionTop = Object.entries(frecuencia).sort((a, b) => b[1] - a[1])[0]?.[0]
  const categoriaTop = EMOCIONES.find(e => (e.emociones as readonly string[]).includes(emocionTop ?? ""))
  const imagenTop = IMAGENES_EMOCION[categoriaTop?.categoria ?? ""] ?? "/emociones/CALMA.jpeg"

    const ZONA = "America/Bogota"
  const diaLocal = (fecha: string | Date) => new Date(fecha).toLocaleDateString("en-CA", { timeZone: ZONA })
  const hoy = diaLocal(new Date())
  const diasConCheckin = new Set((checkins ?? []).map(c => diaLocal(c.created_at)))

  const semana = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000)
    return { fecha: diaLocal(d), letra: d.toLocaleDateString("es", { weekday: "narrow", timeZone: ZONA }) }
  })

  let racha = 0
  for (let i = diasConCheckin.has(hoy) ? 0 : 1; i < 60; i++) {
    if (diasConCheckin.has(diaLocal(new Date(Date.now() - i * 86400000)))) racha++
    else break
  }

  const construirDatos = (dias: number) => {
    const desde = diaLocal(new Date(Date.now() - (dias - 1) * 86400000))
    const porDia = new Map<string, { suma: number; n: number; emocion: string }>()
    ;(checkins ?? []).forEach(c => {
      const dia = diaLocal(c.created_at)
      if (dia < desde) return
      const prev = porDia.get(dia)
      porDia.set(dia, {
        suma: (prev?.suma ?? 0) + c.intensidad,
        n: (prev?.n ?? 0) + 1,
        emocion: prev?.emocion ?? c.emocion,
      })
    })
    return Array.from(porDia.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([fecha, v]) => ({
        fecha,
        intensidad: Math.round((v.suma / v.n) * 10) / 10,
        emocion: v.emocion,
      }))
  }
  const chartData = construirDatos(7)
  const chartData30 = construirDatos(30)

  const desde7 = diaLocal(new Date(Date.now() - 6 * 86400000))
  const ultimos7 = (checkins ?? []).filter(c => diaLocal(c.created_at) >= desde7)
  const promedioIntensidad = ultimos7.length
    ? Math.round(ultimos7.reduce((s, c) => s + c.intensidad, 0) / ultimos7.length * 10) / 10
    : null
  return (
    <div className="max-w-3xl mx-auto">

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#3D3030", fontFamily: "'Playfair Display', serif" }}>
            Hola, {nombre} 🌸
          </h1>
          <p className="text-sm" style={{ color: "#9A7080" }}>Aquí está tu panorama emocional</p>
        </div>
        <Link href="/checkin">
          <Button className="text-white gap-2 rounded-xl h-10" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
            <PlusCircle className="w-4 h-4" />
            Nuevo check-in
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl p-5 border shadow-sm" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: "#F5EDE4" }}>
            <Calendar className="w-4 h-4" style={{ color: "#B07060" }} />
          </div>
          <p className="text-2xl font-bold mb-0.5" style={{ color: "#B07060" }}>{total}</p>
          <p className="text-xs" style={{ color: "#9A7080" }}>Check-ins totales</p>
        </div>

        <div className="rounded-2xl p-5 border shadow-sm" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: "#FAF8F5" }}>
            <TrendingUp className="w-4 h-4" style={{ color: "#C9A84C" }} />
          </div>
          <p className="text-2xl font-bold mb-0.5" style={{ color: "#C9A84C" }}>{promedioIntensidad ?? "-"}</p>
          <p className="text-xs" style={{ color: "#9A7080" }}>Intensidad media (7 días)</p>
        </div>

        <div className="rounded-2xl p-5 border shadow-sm" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
          {emocionTop ? (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 flex-shrink-0" style={{ borderColor: "#D4A898" }}>
                <Image src={imagenTop} alt={emocionTop} width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#3D3030" }}>{emocionTop}</p>
                <p className="text-xs" style={{ color: "#9A7080" }}>emoción frecuente</p>
              </div>
            </div>
          ) : (
            <p className="text-xs" style={{ color: "#9A7080" }}>Sin datos</p>
          )}
        </div>
      </div>

               <div className="rounded-3xl p-6 border shadow-sm mb-8" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
           <div className="flex items-center justify-between mb-5">
             <div>
               <h2 className="font-bold" style={{ color: "#3D3030" }}>Tu semana</h2>
               <p className="text-xs" style={{ color: "#9A7080" }}>
                 {racha > 0 ? `${racha} ${racha === 1 ? "día seguido" : "días seguidos"} cuidándote` : "Haz un check-in hoy y empieza tu racha"}
               </p>
             </div>
             <div className="text-2xl font-bold" style={{ color: "#B07060" }}>{racha}</div>
           </div>
           <div className="flex justify-between">
             {semana.map(d => {
               const hecho = diasConCheckin.has(d.fecha)
               return (
                 <div key={d.fecha} className="flex flex-col items-center gap-2">
                   <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                     style={{ background: hecho ? "linear-gradient(135deg,#D4A898,#B07060)" : "#F5EDE4", color: hecho ? "#FFFFFF" : "#C9B0A0", outline: d.fecha === hoy ? "2px solid #C9A84C" : "none", outlineOffset: "2px" }}>
                     {hecho ? "✓" : ""}
                   </div>
                   <span className="text-xs uppercase" style={{ color: "#9A7080" }}>{d.letra}</span>
                 </div>
               )
             })}
           </div>
         </div>
      {chartData.length > 0 && (
        <div className="rounded-3xl p-6 border shadow-sm mb-8" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold" style={{ color: "#3D3030" }}>Intensidad emocional</h2>
              <p className="text-xs" style={{ color: "#9A7080" }}>Últimos 7 días · Mientras más baja la línea, más calma sentiste</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#B07060" }} />
          </div>
          {chartData30.length > 0 && (
        </div>
      )}

      {!isPro && conReflexion === 0 && total > 0 && (
        <div className="rounded-3xl p-6 mb-8 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
          <div>
            <p className="font-bold mb-1 flex items-center gap-1.5 text-white">
              <Sparkles className="w-4 h-4" style={{ color: "#F5EDE4" }} /> Recibe reflexiones hechas para ti
            </p>
            <p className="text-sm" style={{ color: "#F5EDE4" }}>Descubre insights personalizados por $4.97/mes</p>
          </div>
          <Link href="/cuenta" className="flex-shrink-0">
            <Button className="ml-4 font-bold text-sm" style={{ background: "#EDE0D4", color: "#B07060" }}>Ver Pro</Button>
          </Link>
        </div>
      )}

      <h2 className="font-bold mb-4" style={{ color: "#3D3030" }}>Historial reciente</h2>

      {(!checkins || checkins.length === 0) ? (
        <div className="text-center py-16 rounded-3xl border-2 border-dashed" style={{ background: "#FAF8F5", borderColor: "#D4A898" }}>
          <p className="text-4xl mb-3">🌸</p>
          <p className="font-bold mb-1" style={{ color: "#3D3030" }}>Aun no tienes check-ins</p>
          <p className="text-sm mb-5" style={{ color: "#9A7080" }}>Haz tu primer registro y empieza a conocerte mejor</p>
          <Link href="/checkin">
            <Button className="text-white rounded-xl" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
              Hacer mi primer check-in
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {checkins.slice(0, 15).map(c => <CheckinCard key={c.id} checkin={c} />)}
        </div>
      )}
    </div>
  )
}