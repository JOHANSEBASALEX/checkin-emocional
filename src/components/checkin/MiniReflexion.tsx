"use client"

import { useEffect, useState } from "react"
import type { DatosCuerpo } from "./PasoCuerpo"

const RONDAS = 5
const INHALA = 4
const EXHALA = 8

function textoSistema(s: string): string {
  if (s === "Acelerada") return "Tu sistema está acelerado, en modo alerta. Cuando pasa eso, no hace falta pensar más: lo primero es darle al cuerpo una señal de seguridad."
  if (s === "Apagada") return "Tu sistema está apagado, con cansancio y desconexión. No es pereza: es una forma de protegerte. Empieza muy suave, con una sola cosa pequeña."
  if (s === "Dentro de mi ventana") return "Hoy estás dentro de tu ventana: puedes sentir sin desbordarte. Fíjate en qué te ayudó, porque es información valiosa."
  return ""
}

export function MiniReflexion({ datos }: { datos: DatosCuerpo | null }) {
  const [activa, setActiva] = useState(false)
  const [lista, setLista] = useState(false)
  const [ronda, setRonda] = useState(1)
  const [fase, setFase] = useState<"inhala" | "exhala">("inhala")
  const [seg, setSeg] = useState(INHALA)

  useEffect(() => {
    if (!activa) return
    const t = setTimeout(() => {
      if (seg > 1) { setSeg(seg - 1); return }
      if (fase === "inhala") { setFase("exhala"); setSeg(EXHALA); return }
      if (ronda < RONDAS) { setRonda(ronda + 1); setFase("inhala"); setSeg(INHALA); return }
      setActiva(false)
      setLista(true)
    }, 1000)
    return () => clearTimeout(t)
  }, [activa, seg, fase, ronda])

  function empezar() {
    setLista(false); setRonda(1); setFase("inhala"); setSeg(INHALA); setActiva(true)
  }

  const zonas = (datos?.cuerpo ?? []).filter(c => !c.startsWith("No siento"))
  const detonantes = (datos?.detonantes ?? []).filter(d => !d.startsWith("No sé"))
  const partes: string[] = []
  if (zonas.length) partes.push("Hoy tu cuerpo te habló: " + zonas.join(", ").toLowerCase() + ".")
  const s = textoSistema(datos?.sistema ?? "")
  if (s) partes.push(s)
  if (detonantes.length) partes.push("Notaste que algo lo detonó (" + detonantes.join(", ").toLowerCase() + "). Ponerle nombre ya le quita parte de su fuerza.")

  return (
    <div className="rounded-2xl p-5 space-y-4" style={{ background: "#FFFFFF", border: "1px solid #E8D4C4" }}>
      {partes.length > 0 && (
        <p className="text-sm leading-relaxed" style={{ color: "#3D3030" }}>{partes.join(" ")}</p>
      )}
      <div className="rounded-xl p-4 text-center" style={{ background: "#F5EDE4" }}>
        <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>Respiración del alivio</p>
        <p className="text-xs mb-3" style={{ color: "#9A7080" }}>Inhala 4 segundos, exhala 8. Cinco rondas, cerca de un minuto.</p>
        {activa ? (
          <div>
            <p className="text-3xl font-bold" style={{ color: "#B07060", fontFamily: "'Playfair Display', serif" }}>{fase === "inhala" ? "Inhala" : "Exhala"}</p>
            <p className="text-5xl font-bold my-2" style={{ color: "#C9A84C" }}>{seg}</p>
            <p className="text-xs mb-3" style={{ color: "#9A7080" }}>Ronda {ronda} de {RONDAS}</p>
            <button type="button" onClick={() => setActiva(false)} style={{ color: "#9A7080", fontSize: "0.8rem", textDecoration: "underline", cursor: "pointer" }}>Detener</button>
          </div>
        ) : (
          <div>
            {lista && <p className="text-sm mb-3" style={{ color: "#3D3030" }}>Bien hecho. Fíjate si algo en tu cuerpo cambió, aunque sea un poquito.</p>}
            <button type="button" onClick={empezar} style={{ padding: "0.6rem 1.4rem", borderRadius: "999px", background: "#1B2A4A", color: "#FFFFFF", fontWeight: 600, cursor: "pointer" }}>
              {lista ? "Hacerla otra vez" : "Empezar"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
