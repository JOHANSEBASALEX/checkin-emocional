"use client"

import { useEffect, useState } from "react"
import type { DatosCuerpo } from "./PasoCuerpo"
import { BotonEscuchar } from "./BotonEscuchar";
import { PracticaAudio } from "./PracticaAudio";

const RONDAS = 3
const INHALA = 4
const EXHALA = 8

const RONDAS_AUDIO = [
  { inicio: 25.8, inhala: [29.2, 30.4, 31.7, 32.9], exhala: 34.2, nums: [36.2, 37.3, 38.5, 39.6, 40.6, 41.8, 43.0, 44.3] },
  { inicio: 45.6, inhala: [48.2, 49.3, 50.4, 51.5], exhala: 52.8, nums: [54.1, 55.0, 56.2, 57.3, 58.3, 59.4, 60.5, 61.8] },
  { inicio: 63.0, inhala: [65.6, 66.5, 67.7, 68.8], exhala: 70.1, nums: [71.4, 72.3, 73.5, 74.6, 75.6, 76.7, 77.8, 79.1] },
]
const FIN_CONTEO = 80.4

function estadoAudio(t: number) {
  if (t < RONDAS_AUDIO[0].inicio) return { tipo: "intro" as const }
  if (t >= FIN_CONTEO) return { tipo: "libre" as const }
  for (let i = 0; i < RONDAS_AUDIO.length; i++) {
    const r = RONDAS_AUDIO[i]
    const sig = i + 1 < RONDAS_AUDIO.length ? RONDAS_AUDIO[i + 1].inicio : FIN_CONTEO
    if (t >= r.inicio && t < sig) {
      if (t < r.exhala) return { tipo: "conteo" as const, ronda: i + 1, fase: "inhala" as const, n: r.inhala.filter(x => t >= x).length }
      return { tipo: "conteo" as const, ronda: i + 1, fase: "exhala" as const, n: r.nums.filter(x => t >= x).length }
    }
  }
  return { tipo: "libre" as const }
}

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
  const [tAudio, setTAudio] = useState<number | null>(null)

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
      {datos?.sistema === "Acelerada" && (
        <PracticaAudio titulo="Orientación hacia la seguridad" descripcion="Mira a tu alrededor con calma y avísale a tu cuerpo que estás a salvo." archivo="orientacion-seguridad.mp3" />
      )}
      {datos?.sistema === "Apagada" && (
        <PracticaAudio titulo="Abrazo de la mariposa" descripcion="Un abrazo suave con tus propias manos, sin esfuerzo." archivo="abrazo-mariposa.mp3" />
      )}
      <div className="rounded-xl p-4 text-center" style={{ background: "#F5EDE4" }}>
        <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>Respiración del alivio</p>
        <p className="text-xs mb-3" style={{ color: "#9A7080" }}>Inhala 4 segundos, exhala 8. Tres rondas, menos de un minuto.</p>
        <div className="mb-3"><BotonEscuchar archivo="respiracion-alivio.mp3" onTiempo={(t) => { if (t !== null) setActiva(false); setTAudio(t) }} onFin={() => setLista(true)} /></div>
        {tAudio !== null && (() => {
          const e = estadoAudio(tAudio)
          if (e.tipo === "intro") return <p className="text-sm my-3" style={{ color: "#9A7080" }}>Escucha y prepárate…</p>
          if (e.tipo === "libre") return <p className="text-sm my-3" style={{ color: "#9A7080" }}>Sigue a tu ritmo, sin contar.</p>
          return (
            <div>
              <p className="text-3xl font-bold" style={{ color: "#B07060", fontFamily: "'Playfair Display', serif" }}>{e.fase === "inhala" ? "Inhala" : "Exhala"}</p>
              <p className="text-5xl font-bold my-2" style={{ color: "#C9A84C" }}>{e.n > 0 ? e.n : "·"}</p>
              <p className="text-xs mb-3" style={{ color: "#9A7080" }}>Ronda {e.ronda} de {RONDAS}</p>
            </div>
          )
        })()}
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
