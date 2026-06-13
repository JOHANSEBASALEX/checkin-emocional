import { Sparkles } from "lucide-react"
import Image from "next/image"

interface Props {
  reflexion: string
  emocion: string
}

export function AIReflection({ reflexion, emocion }: Props) {
  return (
    <div className="rounded-3xl p-6 border-2" style={{ 
      background: "linear-gradient(145deg, #FAF8F5 0%, #F5EDE4 50%, #EDE0D4 100%)", 
      borderColor: "#D4A898",
      boxShadow: "0 8px 32px rgba(212,168,152,0.2)"
    }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <Image 
            src="/logo.png" 
            alt="Sana y Florece" 
            width={44} 
            height={44} 
            style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #D4A898" }} 
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" 
            style={{ background: "#B07060" }}>
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: "#3D3030", fontFamily: "'Playfair Display', serif" }}>
            Sana y Florece IA
          </p>
          <p className="text-xs" style={{ color: "#9A7080" }}>✦ Reflexión personalizada para ti</p>
        </div>
      </div>

      {/* Decoración */}
      <div className="text-center mb-4" style={{ color: "#D4A898", letterSpacing: "8px", opacity: 0.5, fontSize: "12px" }}>
        ✦ ❀ ✦
      </div>

      {/* Reflexión */}
      <blockquote className="leading-relaxed text-[15px] italic mb-5 px-2" 
        style={{ color: "#3D3030", fontFamily: "'Playfair Display', serif", lineHeight: "1.8" }}>
        "{reflexion}"
      </blockquote>

      {/* Decoración bottom */}
      <div className="text-center mb-4" style={{ color: "#D4A898", letterSpacing: "8px", opacity: 0.5, fontSize: "12px" }}>
        ✦ ❀ ✦
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 pt-3 border-t" style={{ borderColor: "#E8D4C4" }}>
        <span className="text-xs" style={{ color: "#B09888" }}>
          Reflexión generada con amor para tu emoción de hoy:
        </span>
        <span className="text-xs font-bold px-2 py-1 rounded-full" 
          style={{ background: "#F5EDE4", color: "#B07060", border: "1px solid #D4A898" }}>
          {emocion}
        </span>
      </div>
    </div>
  )
}