import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Sparkles } from "lucide-react"
import { EMOCIONES } from "@/lib/constants"

interface Checkin {
  id: string
  emocion: string
  intensidad: number
  journal: string | null
  reflexion_ia: string | null
  created_at: string
}

export function CheckinCard({ checkin }: { checkin: Checkin }) {
  const categoriaObj = EMOCIONES.find(e =>
    (e.emociones as readonly string[]).includes(checkin.emocion)
  )

  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all" 
      style={{ borderColor: "#E8D4C4", boxShadow: "0 2px 12px rgba(212,168,152,0.15)" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" 
            style={{ background: "#F5EDE4" }}>
            {categoriaObj?.emoji ?? "🌸"}
          </div>
          <div>
            <p className="font-bold" style={{ color: "#3D3030" }}>{checkin.emocion}</p>
            <p className="text-xs" style={{ color: "#9A7080" }}>
              {formatDistanceToNow(new Date(checkin.created_at), { addSuffix: true, locale: es })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold flex-shrink-0" 
          style={{ background: "#F5EDE4", color: "#B07060" }}>
          {checkin.intensidad}/10
        </div>
      </div>

      {/* Barra de intensidad */}
      <div className="h-1.5 rounded-full mb-3 overflow-hidden" style={{ background: "#F5EDE4" }}>
        <div className="h-full rounded-full transition-all" 
          style={{ width: `${checkin.intensidad * 10}%`, background: "linear-gradient(90deg, #D4A898, #B07060)" }} />
      </div>

      {checkin.journal && (
        <p className="text-sm mb-3 italic line-clamp-2" style={{ color: "#806860" }}>"{checkin.journal}"</p>
      )}

      {checkin.reflexion_ia && (
        <div className="rounded-xl p-3.5 border text-xs" style={{ background: "#FAF8F5", borderColor: "#E8D4C4", color: "#5A4848" }}>
          <div className="flex items-center gap-1.5 mb-1.5 font-semibold" style={{ color: "#B07060" }}>
            <Sparkles className="w-3 h-3" style={{ color: "#C9A84C" }} />
            Tu reflexión de hoy
          </div>
          <p className="line-clamp-3 leading-relaxed">{checkin.reflexion_ia}</p>
        </div>
      )}
    </div>
  )
}