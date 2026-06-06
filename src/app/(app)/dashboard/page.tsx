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

  const nombre = profile?.full_name?.split(" ")[0] ?? "tú"
  const isPro = profile?.subscription_status === "active"
  const total = checkins?.length ?? 0
  const conReflexion = checkins?.filter(c => c.reflexion_ia).length ?? 0

  // Emoción más frecuente
  const frecuencia: Record<string, number> = {}
  checkins?.forEach(c => { frecuencia[c.emocion] = (frecuencia[c.emocion] ?? 0) + 1 })
  const emocionTop = Object.entries(frecuencia).sort((a, b) => b[1] - a[1])[0]?.[0]
  const categoriaTop = EMOCIONES.find(e => (e.emociones as readonly string[]).includes(emocionTop ?? ""))

  // Datos para gráfica — últimos 7 días (1 punto por día, el último check-in del día)
  const hace7Dias = startOfDay(subDays(new Date(), 6))
  const ultimos7 = (checkins ?? [])
    .filter(c => new Date(c.created_at) >= hace7Dias)
    .reverse()

  // Agrupar por día — tomar el último del día
  const porDia = new Map<string, typeof ultimos7[0]>()
  ultimos7.forEach(c => {
    const dia = c.created_at.slice(0, 10)
    porDia.set(dia, c)
  })
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Hola, {nombre} 👋</h1>
          <p className="text-gray-500 text-sm">Aquí está tu panorama emocional</p>
        </div>
        <Link href="/checkin">
          <Button className="text-white gap-2 rounded-xl h-10" style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}>
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
            icon: <Calendar className="w-4 h-4" style={{ color: "#3aA876" }} />,
            bg: "#f0faf4",
            color: "#3aA876",
          },
          {
            valor: promedioIntensidad ?? "—",
            label: "Intensidad media (7d)",
            icon: <TrendingUp className="w-4 h-4" style={{ color: "#D4AF37" }} />,
            bg: "#fffbeb",
            color: "#D4AF37",
          },
          {
            valor: categoriaTop?.emoji ?? "—",
            label: emocionTop ?? "Sin datos",
            sublabel: "emoción frecuente",
            icon: null,
            bg: "#f9f0ff",
            color: "#7c3aed",
          },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border shadow-sm" style={{ borderColor: "#d6f5e3" }}>
            <div className="flex items-center justify-between mb-2">
              {s.icon && <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>{s.icon}</div>}
              {!s.icon && <span className="text-2xl">{s.valor}</span>}
            </div>
            {s.icon && <p className="text-2xl font-bold mb-0.5" style={{ color: s.color }}>{s.valor}</p>}
            <p className="text-xs text-gray-500">{s.label}</p>
            {s.sublabel && <p className="text-xs text-gray-400">{s.sublabel}</p>}
          </div>
        ))}
      </div>

      {/* Gráfica semanal */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border shadow-sm mb-8" style={{ borderColor: "#d6f5e3" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-gray-800">Intensidad emocional</h2>
              <p className="text-xs text-gray-400">Últimos 7 días</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#3aA876" }} />
          </div>
          <MoodChart data={chartData} />
        </div>
      )}

      {/* Upsell Pro si no tiene */}
      {!isPro && conReflexion === 0 && total > 0 && (
        <div className="rounded-3xl p-6 mb-8 text-white flex items-center justify-between" style={{ background: "linear-gradient(135deg,#2d6e4e,#3aA876)" }}>
          <div>
            <p className="font-bold mb-1 flex items-center gap-1.5"><Sparkles className="w-4 h-4" style={{ color: "#F0C040" }} /> Activa reflexiones con IA</p>
            <p className="text-sm text-green-100">Descubre insights personalizados de tus emociones por $4.97/mes</p>
          </div>
          <Link href="/cuenta" className="flex-shrink-0">
            <Button className="ml-4 font-bold text-sm" style={{ background: "#D4AF37", color: "#3a2a00" }}>Ver Pro →</Button>
          </Link>
        </div>
      )}

      {/* Historial */}
      <h2 className="font-bold text-gray-700 mb-4">Historial reciente</h2>

      {(!checkins || checkins.length === 0) ? (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed" style={{ borderColor: "#a8e8c4" }}>
          <p className="text-4xl mb-3">🌱</p>
          <p className="font-bold text-gray-700 mb-1">Aún no tienes check-ins</p>
          <p className="text-sm text-gray-400 mb-5">Haz tu primer registro y empieza a conocerte mejor</p>
          <Link href="/checkin">
            <Button className="text-white rounded-xl" style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}>
              Hacer mi primer check-in 🌿
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
