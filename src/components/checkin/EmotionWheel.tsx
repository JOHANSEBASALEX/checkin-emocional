"use client"

import { useState } from "react"
import { EMOCIONES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"

const IMAGENES_EMOCION: Record<string, string> = {
  "Alegria":   "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=120&h=120&fit=crop&crop=face",
  "Tristeza":  "https://images.unsplash.com/photo-1542992015-4a0b729b1385?w=120&h=120&fit=crop&crop=face",
  "Ansiedad":  "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=120&h=120&fit=crop&crop=face",
  "Enojo":     "https://images.unsplash.com/photo-1595956553066-fe24a8c33395?w=120&h=120&fit=crop&crop=face",
  "Miedo":     "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face",
  "Calma":     "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
  "Amor":      "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=120&h=120&fit=crop&crop=face",
  "Confusion": "https://images.unsplash.com/photo-1546961342-ea5f60b193b7?w=120&h=120&fit=crop&crop=face",
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
                  src={IMAGENES_EMOCION[categoria] ?? IMAGENES_EMOCION["Calma"]}
                  alt={categoria}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  unoptimized
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