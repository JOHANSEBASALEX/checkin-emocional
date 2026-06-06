"use client"

import { useState } from "react"
import { EMOCIONES } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface Props {
  onSelect: (categoria: string, emocion: string) => void
}

export function EmotionWheel({ onSelect }: Props) {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)
  const categoriaObj = EMOCIONES.find(e => e.categoria === categoriaActiva)

  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#3aA876" }}>
          1. ¿En qué categoría está tu emoción?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {EMOCIONES.map(({ categoria, emoji }) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={cn(
                "flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all text-sm font-medium focus:outline-none",
                categoriaActiva === categoria
                  ? "scale-105 shadow-md"
                  : "border-gray-100 bg-white hover:border-green-200 hover:bg-green-50"
              )}
              style={categoriaActiva === categoria
                ? { borderColor: "#3aA876", background: "#f0faf4", color: "#2d6e4e" }
                : { color: "#6b7280" }}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs font-semibold">{categoria}</span>
            </button>
          ))}
        </div>
      </div>

      {categoriaObj && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#3aA876" }}>
            2. ¿Cuál describe mejor lo que sientes?
          </p>
          <div className="flex flex-wrap gap-2.5">
            {categoriaObj.emociones.map(emocion => (
              <button
                key={emocion}
                onClick={() => onSelect(categoriaObj.categoria, emocion)}
                className="px-4 py-2 rounded-full border-2 text-sm font-medium transition-all hover:scale-105 focus:outline-none"
                style={{ borderColor: "#a8e8c4", color: "#2d6e4e", background: "#f9fdfb" }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = "#3aA876"
                  ;(e.currentTarget as HTMLButtonElement).style.color = "white"
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = "#3aA876"
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.background = "#f9fdfb"
                  ;(e.currentTarget as HTMLButtonElement).style.color = "#2d6e4e"
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = "#a8e8c4"
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
