"use client"

import { BotonEscuchar } from "./BotonEscuchar"

export function PracticaAudio({ titulo, descripcion, archivo }: { titulo: string; descripcion: string; archivo: string }) {
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: "#F5EDE4" }}>
      <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>{titulo}</p>
      <p className="text-xs mb-3" style={{ color: "#9A7080" }}>{descripcion}</p>
      <BotonEscuchar archivo={archivo} />
    </div>
  )
}