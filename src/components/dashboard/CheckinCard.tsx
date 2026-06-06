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
    <div className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all" style={{ borderColor: "#d6f5e3" }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "#f0faf4" }}>
            {categoriaObj?.emoji ?? "💭"}
          </div>
          <div>
            <p className="font-bold text-gray-800">{checkin.emocion}</p>
            <p className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(checkin.created_at), { addSuffix: true, locale: es })}
            </p>
          </div>
        </div>
        {/* Intensidad badge */}
        <div className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold flex-shrink-0" style={{ background: "#f0faf4", color: "#2d6e4e" }}>
          {checkin.intensidad}/10
        </div>
      </div>

      {/* Barra de intensidad */}
      <div className="h-1.5 rounded-full mb-3 overflow-hidden" style={{ background: "#f0faf4" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${checkin.intensidad * 10}%`, background: `linear-gradient(90deg, #3aA876, #D4AF37)` }} />
      </div>

      {checkin.journal && (
        <p className="text-sm text-gray-500 mb-3 italic line-clamp-2">"{checkin.journal}"</p>
      )}

      {checkin.reflexion_ia && (
        <div className="rounded-xl p-3.5 border text-xs text-gray-600" style={{ background: "#f0faf4", borderColor: "#a8e8c4" }}>
          <div className="flex items-center gap-1.5 mb-1.5 font-semibold" style={{ color: "#3aA876" }}>
            <Sparkles className="w-3 h-3" style={{ color: "#D4AF37" }} />
            Reflexión IA
          </div>
          <p className="line-clamp-3 leading-relaxed">{checkin.reflexion_ia}</p>
        </div>
      )}
    </div>
  )
}
