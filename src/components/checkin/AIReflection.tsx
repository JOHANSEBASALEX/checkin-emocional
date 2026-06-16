import { Sparkles } from "lucide-react"
import Image from "next/image"

const IMAGENES_REFLEXION: Record<string, string> = {
  "Alegría":   "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
  "Tristeza":  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
  "Ansiedad":  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face",
  "Enojo":     "https://images.unsplash.com/photo-1502767089025-6572583495f9?w=200&h=200&fit=crop&crop=face",
  "Miedo":     "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop&crop=face",
  "Calma":     "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=200&h=200&fit=crop&crop=face",
  "Amor":      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=face",
  "Confusión": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
}

interface Props {
  reflexion: string
  emocion: string
  categoria?: string
}

export function AIReflection({ reflexion, emocion, categoria }: Props) {
  const imagenUrl = IMAGENES_REFLEXION[categoria ?? ""] ?? IMAGENES_REFLEXION["Calma"]

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
            Tu reflexión de hoy
          </p>
          <p className="text-xs" style={{ color: "#9A7080" }}>✦ Reflexión personalizada para ti</p>
        </div>
      </div>

      {/* Decoración */}
      <div className="text-center mb-4" style={{ color: "#D4A898", letterSpacing: "8px", opacity: 0.5, fontSize: "12px" }}>
        ✦ ❀ ✦
      </div>

      {/* Contenido: foto + reflexión lado a lad