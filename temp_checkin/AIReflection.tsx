import { Sparkles, Leaf } from "lucide-react"

interface Props {
  reflexion: string
  emocion: string
}

export function AIReflection({ reflexion, emocion }: Props) {
  return (
    <div className="rounded-2xl p-6 border" style={{ background: "linear-gradient(135deg,#f0faf4 0%,#fffbeb 100%)", borderColor: "#a8e8c4" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3aA876,#2d6e4e)" }}>
          <Leaf className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold" style={{ color: "#3aA876" }}>Sana y Florece IA</p>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" style={{ color: "#D4AF37" }} />
            <p className="text-xs text-gray-400">Reflexión personalizada</p>
          </div>
        </div>
      </div>

      {/* Reflexión */}
      <blockquote className="text-gray-700 leading-relaxed text-[15px] italic mb-4">
        "{reflexion}"
      </blockquote>

      <p className="text-xs text-gray-400 border-t pt-3" style={{ borderColor: "#d6f5e3" }}>
        Generado por IA basado en tu check-in de <strong style={{ color: "#3aA876" }}>{emocion}</strong>
      </p>
    </div>
  )
}
