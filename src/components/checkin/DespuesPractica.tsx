"use client"

import { useState } from "react"

const OPCIONES = [
  { valor: -2, texto: "Mucho más suave", mensaje: "Qué bien. Tu cuerpo soltó bastante. Guarda esta sensación para cuando la necesites." },
  { valor: -1, texto: "Algo más suave", mensaje: "Un pequeño alivio también cuenta. Tu cuerpo ya está respondiendo." },
  { valor: 0, texto: "Igual", mensaje: "Sigue igual, y eso también es información valiosa. No tiene que cambiar hoy." },
  { valor: 1, texto: "Algo más fuerte", mensaje: "A veces pasa al notar lo que se siente. No estás haciendo nada mal. Sé amable contigo." },
  { valor: 2, texto: "Mucho más fuerte", mensaje: "Gracias por ser honesta con lo que sientes. Si es mucho, pausa y busca a alguien de confianza." },
]

export function DespuesPractica({ checkinId, practica }: { checkinId?: string; antes?: number; practica: string }) {
  const [elegida, setElegida] = useState<number | null>(null)
  const [error, setError] = useState(false)

  if (!checkinId) return null

  async function elegir(valor: number) {
    setError(false)
    setElegida(valor)
    try {
      const res = await fetch("/api/checkin/despues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkinId, cambio: valor, practica }),
      })
      if (!res.ok) setError(true)
    } catch {
      setError(true)
    }
  }

  const opcion = OPCIONES.find((o) => o.valor === elegida)

  if (opcion) {
    return (
      <div className="rounded-xl p-4 text-center" style={{ background: "#FAF8F5", border: "1px solid #E8D4C4" }}>
        <p className="text-sm" style={{ color: "#3D3030" }}>{opcion.mensaje}</p>
        {error && <p className="text-xs mt-2" style={{ color: "#9A7080" }}>No se pudo guardar esta vez.</p>}
        <button type="button" onClick={() => setElegida(null)} style={{ color: "#9A7080", fontSize: "0.8rem", textDecoration: "underline", cursor: "pointer", marginTop: "0.6rem" }}>Cambiar mi respuesta</button>
      </div>
    )
  }

  return (
    <div className="rounded-xl p-4 text-center" style={{ background: "#FAF8F5", border: "1px solid #E8D4C4" }}>
      <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>¿Cómo te sientes ahora?</p>
      <p className="text-xs mb-3" style={{ color: "#9A7080" }}>Comparado con antes de la práctica, la emoción se siente:</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {OPCIONES.map((o) => (
          <button
            key={o.valor}
            type="button"
            onClick={() => elegir(o.valor)}
            style={{ padding: "0.5rem 1rem", borderRadius: "999px", background: "#F5EDE4", color: "#3D3030", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
          >
            {o.texto}
          </button>
        ))}
      </div>
    </div>
  )
}