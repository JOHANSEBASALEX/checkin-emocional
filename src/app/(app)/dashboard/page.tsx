import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { CheckinCard } from "@/components/dashboard/CheckinCard"
import { MoodChart } from "@/components/dashboard/MoodChart"
import { Button } from "@/components/ui/button"
import { PlusCircle, TrendingUp, Calendar, Sparkles } from "lucide-react"
import { EMOCIONES } from "@/lib/constants"
import { subDays, startOfDay } from "date-fns"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: checkins } = await supabase
    .from("checkins")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, subscription_status")
    .eq("id", user.id)
    .single()

  const nombre = profile?.full_name?.split(" ")[0] ?? "tÃº"
  const isPro = profile?.subscription_status === "active"
  const total = checkins?.length ?? 0
  const conReflexion = checkins?.filter(c => c.reflexion_ia).length ?? 0

  const frecuencia: Record<string, number> = {}
  checkins?.forEach(c => { frecuencia[c.emocion] = (frecuencia[c.emocion] ?? 0) + 1 })
  const emocionTop = Object.entries(frecuencia).sort((a, b) => b[1] - a[1])[0]?.[0]
  const categoriaTop = EMOCIONES.find(e => (e.emociones as readonly string[]).includes(emocionTop ?? ""))

  const hace7Dias = startOfDay(subDays(new Date(), 6))
  const ultimos7 = (checkins ?? []).filter(c => new Date(c.created_at) >= hace7Dias).reverse()
  const porDia = new Map<string, typeof ultimos7[0]>()
  ultimos7.forEach(c => { const dia = c.created_at.slice(0, 10); porDia.set(dia, c) })
  const chartData = Array.from(porDia.values()).map(c => ({
    fecha: c.created_at.slice(0, 10),
    intensidad: c.intensidad,
    emocion: c.emocion,
  }))

  const promedioIntensidad = ultimos7.length
    ? Math.round(ultimos7.reduce((s, c) => s + c.intensidad, 0) / ultimos7.length * 10) / 10
    : null

  return (
    <div className="max-w-3xl mx-auto">

      {/* Saludo */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#3D3030", fontFamily: "'Playfair Display', serif" }}>
            Hola, {nombre} ðŸŒ¸
          </h1>
          <p className="text-sm" style={{ color: "#9A7080" }}>AquÃ­ estÃ¡ tu panorama emocional</p>
        </div>
        <Link href="/checkin">
          <Button className="text-white gap-2 rounded-xl h-10" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
            <PlusCircle className="w-4 h-4" />
            Nuevo check-in
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            valor: total,
            label: "Check-ins totales",
            icon: <Calendar className="w-4 h-4" style={{ color: "#B07060" }} />,
            bg: "#F5EDE4",
            color: "#B07060",
          },
          {
            valor: promedioIntensidad ?? "â€”",
            label: "Intensidad media (7d)",
            icon: <TrendingUp className="w-4 h-4" style={{ color: "#C9A84C" }} />,
            bg: "#FAF8F5",
            color: "#C9A84C",
          },
          {
            valor: categoriaTop?.categoria ?? "-",
            label: emocionTop ?? "Sin datos",
            sublabel: "emociÃ³n frecuente",
            icon: null,
            bg: "#F5EDE4",
            color: "#9A7080",
          },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl p-5 border shadow-sm" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
            <div className="flex items-center justify-between mb-2">
              {s.icon && <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>{s.icon}</div>}
              {!s.icon && <span className="text-2xl">{s.valor}</span>}
            </div>
            {s.icon && <p className="text-2xl font-bold mb-0.5" style={{ color: s.color }}>{s.valor}</p>}
            <p className="text-xs" style={{ color: "#9A7080" }}>{s.label}</p>
            {s.sublabel && <p className="text-xs" style={{ color: "#B09888" }}>{s.sublabel}</p>}
          </div>
        ))}
      </div>

      {/* GrÃ¡fica semanal */}
      {chartData.length > 0 && (
        <div className="rounded-3xl p-6 border shadow-sm mb-8" style={{ background: "#FFFFFF", borderColor: "#E8D4C4" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold" style={{ color: "#3D3030" }}>Intensidad emocional</h2>
              <p className="text-xs" style={{ color: "#9A7080" }}>Ãšltimos 7 dÃ­as</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#B07060" }} />
          </div>
          <MoodChart data={chartData} />
        </div>
      )}

      {/* Upsell Pro */}
      {!isPro && conReflexion === 0 && total > 0 && (
        <div className="rounded-3xl p-6 mb-8 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
          <div>
            <p className="font-bold mb-1 flex items-center gap-1.5 text-white">
              <Sparkles className="w-4 h-4" style={{ color: "#F5EDE4" }} /> Activa reflexiones con IA
            </p>
            <p className="text-sm" style={{ color: "#F5EDE4" }}>Descubre insights personalizados por $4.97/mes</p>
          </div>
          <Link href="/cuenta" className="flex-shrink-0">
            <Button className="ml-4 font-bold text-sm" style={{ background: "#EDE0D4", color: "#B07060" }}>Ver Pro â†’</Button>
          </Link>
        </div>
      )}

      {/* Historial */}
      <h2 className="font-bold mb-4" style={{ color: "#3D3030" }}>Historial reciente</h2>

      {(!checkins || checkins.length === 0) ? (
        <div className="text-center py-16 rounded-3xl border-2 border-dashed" style={{ background: "#FAF8F5", borderColor: "#D4A898" }}>
          <p className="text-4xl mb-3">ðŸŒ¸</p>
          <p className="font-bold mb-1" style={{ color: "#3D3030" }}>AÃºn no tienes check-ins</p>
          <p className="text-sm mb-5" style={{ color: "#9A7080" }}>Haz tu primer registro y empieza a conocerte mejor</p>
          <Link href="/checkin">
            <Button className="text-white rounded-xl" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
              Hacer mi primer check-in ðŸŒ¸
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