import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { CheckinCard } from "@/components/dashboard/CheckinCard"
import { MoodChart } from "@/components/dashboard/MoodChart"
import { Button } from "@/components/ui/button"
import { PlusCircle, TrendingUp, Calendar, Sparkles } from "lucide-react"
import { EMOCIONES, emocionFemenina } from "@/lib/constants"
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

  const { data: checkinsraw } = await supabase
    .from("checkins")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(300)

  const checkins = checkinsraw?.map(c => ({ ...c, emocion: emocionFemenina(c.emocion) }))

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, subscription_status")
    .eq("id", user.id)
    .single()

  const nombrebase = profile?.full_name?.split(" ")[0] ?? "tu"
  const nombre = nombrebase.charAt(0).toUpperCase() + nombrebase.slice(1).toLowerCase()
  const isPro = profile?.subscription_status === "active"
  const total = checkins?.length ?? 0
  const conReflexion = checkins?.filter(c => c.reflexion_ia).length ?? 0

  const frecuencia: Record<string, number> = {}
  checkins?.forEach(c => { const e = emocionFemenina(c.emocion); frecuencia[e] = (frecuencia[e] ?? 0) + 1 })
  const emocionTop = Object.entries(frecuencia).sort((a, b) => b[1] - a[1])[0]?.[0]
  const categoriaTop = EMOCIONES.find(e => (e.emociones as readonly string[]).includes(emocionTop ?? ""))
  const imagenTop = IMAGENES_EMOCION[categoriaTop?.categoria ?? ""] ?? "/emociones/CALMA.jpeg"

  const ZONA = "America/Bogota"
  const diaLocal = (fecha: string | Date) => new Date(fecha).toLocaleDateString("en-CA", { timeZone: ZONA })
  const hoy = diaLocal(new Date())
  const diasConCheckin = new Set((checkins ?? []).map(c => diaLocal(c.created_at)))

    const diaSemanaHoy = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    new Date().toLocaleDateString("en-US", { weekday: "short", timeZone: ZONA })
  )
  const semana = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() + (i - diaSemanaHoy) * 86400000)
    return { fecha: diaLocal(d), letra: d.toLocaleDateString("es", { weekday: "short", timeZone: ZONA }).replace(".", "") }
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
       const enRango = (c: { created_at: string }, desde: number, hasta: number) => {
       const t = new Date(c.created_at).getTime()
       return t >= Date.now() - hasta * 86400000 && t < Date.now() - desde * 86400000
     }
     const media = (lista: { intensidad: number }[]) =>
       lista.length ? lista.reduce((s, c) => s + c.intensidad, 0) / lista.length : null
     const mediaEsta = media((checkins ?? []).filter(c => enRango(c, 0, 7)))
     const mediaPasada = media((checkins ?? []).filter(c => enRango(c, 7, 14)))
     const diferencia = mediaEsta !== null && mediaPasada !== null
       ? Math.round((mediaEsta - mediaPasada) * 10) / 10
       : null
    const efectoPracticas: Record<string, { veces: number; suaves: number }> = {}
  for (const c of checkins ?? []) {
    const r = (c.respuestas ?? {}) as Record<string, unknown>
    if (typeof r.practica === "string" && typeof r.cambio === "number") {
      const e = efectoPracticas[r.practica] ?? { veces: 0, suaves: 0 }
      e.veces++
      if (r.cambio < 0) e.suaves++
      efectoPracticas[r.practica] = e
    }
  }
  const nombresPractica: Record<string, string> = { "respiracion-alivio": "la respiración del alivio", "orientacion-seguridad": "la orientación hacia la seguridad", "abrazo-mariposa": "el abrazo de la mariposa" }
  const mejorPractica = Object.entries(efectoPracticas).filter(([, e]) => e.veces >= 2).sort((a, b) => b[1].suaves / b[1].veces - a[1].suaves / a[1].veces)[0]

    const ayer = diaLocal(new Date(Date.now() - 86400000))
     const limite7 = Date.now() - 7 * 86400000
     const visiblesTodos = (checkins ?? []).filter(c => isPro || new Date(c.created_at).getTime() >= limite7)
     const ocultos = (checkins ?? []).length - visiblesTodos.length
     const visibles = visiblesTodos.slice(0, 30)
     const grupos: { dia: string; items: typeof visibles }[] = []
     for (const c of visibles) {
       const d = diaLocal(c.created_at)
       const g = grupos[grupos.length - 1]
       if (g && g.dia === d) g.items.push(c)
       else grupos.push({ dia: d, items: [c] })
     }
     const etiquetaDia = (d: string) => {
       if (d === hoy) return "Hoy"
       if (d === ayer) return "Ayer"
       const s = new Date(d + "T12:00:00").toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" })
       return s.charAt(0).toUpperCase() + s.slice(1)
     }

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
                                    <div className="flex flex-col items-center text-center gap-1.5 w-full overflow-hidden">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 flex-shrink-0" style={{ borderColor: "#D4A898" }}>
                <Image src={imagenTop} alt={emocionTop} width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <p className="text-[10px] sm:text-sm font-bold leading-tight w-full break-words hyphens-auto" style={{ color: "#3D3030" }} lang="es">{emocionTop}</p>
              <p className="text-[10px] sm:text-xs leading-tight" style={{ color: "#9A7080" }}>emoción frecuente</p>
            </div>
                      ) : (
            <p className="text-xs" style={{ color: "#9A7080" }}>Sin datos</p>
          )}
        </div>
      </div>

               <div className="rounded-3xl p-5 border shadow-sm mb-8 flex items-center gap-4" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
           <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "#F5EDE4", color: "#B07060" }}>
             {diferencia === null ? "🌱" : diferencia < 0 ? "↓" : diferencia > 0 ? "↑" : "="}
           </div>
           <div>
             <p className="font-bold text-sm" style={{ color: "#3D3030" }}>Esta semana vs la anterior</p>
             <p className="text-xs" style={{ color: "#9A7080" }}>
               {diferencia === null
                 ? "Con dos semanas de check-ins vas a poder ver cómo cambia tu intensidad."
                 : diferencia < 0
                 ? `Tus check-ins fueron más suaves: bajaste ${Math.abs(diferencia)} puntos de intensidad en promedio.`
                 : diferencia > 0
                 ? `Esta semana fue más intensa (+${diferencia} puntos). Notarlo ya es parte de cuidarte.`
                 : "Tu intensidad se mantuvo igual que la semana pasada."}
             </p>
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

      {chartData30.length > 0 && (
        <div className="rounded-3xl p-6 border shadow-sm mb-8" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold" style={{ color: "#3D3030" }}>Intensidad emocional</h2>
              <p className="text-xs" style={{ color: "#9A7080" }}>Mientras más baja la línea, más calma sentiste</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#B07060" }} />
          </div>
          <MoodChart data7={chartData} data30={chartData30} />
        </div>
      )}

      {!isPro && conReflexion === 0 && total > 0 && (
        <div className="rounded-3xl p-6 mb-8 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
          <div>
            <p className="font-bold mb-1 flex items-center gap-1.5 text-white">
              <Sparkles className="w-4 h-4" style={{ color: "#F5EDE4" }} /> Recibe reflexiones hechas para ti
            </p>
            <p className="text-sm" style={{ color: "#F5EDE4" }}>Descubre insights personalizados por USD $4.97/mes</p>
          </div>
          <Link href="/cuenta" className="flex-shrink-0">
            <Button className="ml-4 font-bold text-sm" style={{ background: "#EDE0D4", color: "#B07060" }}>Ver Pro</Button>
          </Link>
        </div>
      )}

            {mejorPractica && mejorPractica[1].suaves > 0 && (
        <div className="rounded-3xl p-5 border shadow-sm mb-8 flex items-center gap-4" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "#F5EDE4" }}>🌿</div>
          <div>
            <p className="font-bold text-sm" style={{ color: "#3D3030" }}>Qué te ayuda</p>
            <p className="text-xs" style={{ color: "#9A7080" }}>Después de {nombresPractica[mejorPractica[0]] ?? "tu práctica"}, tu emoción se sintió más suave {mejorPractica[1].suaves} de {mejorPractica[1].veces} veces.</p>
          </div>
        </div>
      )}

      <h2 className="font-bold mb-4" style={{ color: "#3D3030" }}>Historial reciente</h2><p className="text-xs mb-4 -mt-2 leading-relaxed" style={{ color: "#9A7080" }}>Aquí queda guardado cada check-in, agrupado por día, para que veas cómo cambia lo que sientes con el tiempo. En el plan gratis ves tus últimos 7 días; con el Plan Pro, todo tu historial.</p>

      {(!checkins || checkins.length === 0) ? (
        <div className="text-center py-16 rounded-3xl border-2 border-dashed" style={{ background: "#FAF8F5", borderColor: "#D4A898" }}>
          <p className="text-4xl mb-3">🌸</p>
          <p className="font-bold mb-1" style={{ color: "#3D3030" }}>Aún no tienes check-ins</p>
          <p className="text-sm mb-5" style={{ color: "#9A7080" }}>Haz tu primer registro y empieza a conocerte mejor</p>
          <Link href="/checkin">
            <Button className="text-white rounded-xl" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
              Hacer mi primer check-in
            </Button>
          </Link>
        </div>
      ) : (
                <div className="space-y-4">
          {grupos.map(g => (
             <div key={g.dia} className="space-y-3">
               <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#9A7080" }}>{etiquetaDia(g.dia)}</p>
               {g.items.map(c => <CheckinCard key={c.id} checkin={c} />)}
             </div>
           ))}
           {!isPro && ocultos > 0 && (
             <p className="text-xs text-center" style={{ color: "#9A7080" }}>Estás viendo tus últimos 7 días. Tus registros anteriores siguen guardados y los ves con el Plan Pro.</p>
           )}
        </div>
      )}

      <p className="text-center text-xs mt-10 mb-4" style={{ color: "#9A7080" }}>
        Sana y Florece es un espacio de autocuidado y no reemplaza la atención de un profesional de la salud mental.
        Si estás en crisis, busca ayuda profesional de inmediato.
      </p>
    </div>
  )
}