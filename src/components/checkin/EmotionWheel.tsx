"use client"

import { useState } from "react"
import { EMOCIONES } from "@/lib/constants"
import { cn } from "@/lib/utils"
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

interface Props {
  onSelect: (categoria: string, emocion: string) => void
}

export function EmotionWheel({ onSelect }: Props) {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)
  const categoriaObj = EMOCIONES.find(e => e.categoria === categoriaActiva)

  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#B07060" }}>
          1. En que categoria esta tu emocion?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {EMOCIONES.map(({ categoria }) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={cn(
                "flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all text-sm font-medium focus:outline-none",
                categoriaActiva === categoria
                  ? "scale-105 shadow-md"
                  : "border-gray-100 bg-white hover:border-[#D4A898] hover:bg-[#FAF8F5]"
              )}
              style={
                categoriaActiva === categoria
                  ? { borderColor: "#B07060", background: "#F5EDE4", color: "#3D3030" }
                  : { color: "#6b7280" }
              }
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0"
                style={{ borderColor: categoriaActiva === categoria ? "#B07060" : "#E8D4C4" }}>
                <Image
                  src={IMAGENES_EMOCION[categoria] ?? "/emociones/CALMA.jpeg"}
                  alt={categoria}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold">{categoria}</span>
            </button>
          ))}
        </div>
      </div>

      {categoriaObj && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#B07060" }}>
            2. Cual describe mejor lo que sientes?
          </p>
          <div className="flex flex-wrap gap-2.5">
            {categoriaObj.emociones.map(emocion => (
              <button
                key={emocion}
                onClick={() => onSelect(categoriaObj.categoria, emocion)}
                className="px-4 py-2 rounded-full border-2 text-sm font-medium transition-all hover:scale-105 focus:outline-none"
                style={{ borderColor: "#D4A898", color: "#3D3030", background: "#FAF8F5" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#B07060"
                  ;(e.currentTarget as HTMLButtonElement).style.color = "white"
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = "#B07060"
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#FAF8F5"
                  ;(e.currentTarget as HTMLButtonElement).style.color = "#3D3030"
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = "#D4A898"
                }}
              >
                {emocion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}