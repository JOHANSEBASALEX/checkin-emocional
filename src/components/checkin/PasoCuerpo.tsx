"use client"

import { useState, type ReactNode } from "react"

export interface DatosCuerpo {
  cuerpo: string[]
  sistema: string
  detonantes: string[]
}

const CUERPO = ["Mandíbula o cuello tenso", "Presión en el pecho", "Manos o pies fríos", "Nudo en el estómago", "Cuerpo pesado o sin energía", "No siento nada en particular"]
const SISTEMA = [
  { v: "Acelerada", d: "Inquieta, en alerta, con la mente a mil" },
  { v: "Dentro de mi ventana", d: "Presente y estable, puedo sentir sin desbordarme" },
  { v: "Apagada", d: "Cansada, desconectada, como en piloto automático" },
]
const DETONANTES = ["Un conflicto", "Presión de tiempo", "Cansancio o hambre", "Un recuerdo", "Mucha gente o ruido", "No sé qué fue"]

function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      style={{ padding: "0.55rem 1rem", borderRadius: "999px", fontSize: "0.9rem", cursor: "pointer",
        border: "1.5px solid " + (activo ? "#B07060" : "#E8D4C4"),
        background: activo ? "#B07060" : "#FFFFFF", color: activo ? "#FFFFFF" : "#3D3030" }}>
      {children}
    </button>
  )
}

export function PasoCuerpo({ onContinue }: { onContinue: (d: DatosCuerpo) => void }) {
  const [cuerpo, setCuerpo] = useState<string[]>([])
  const [sistema, setSistema] = useState("")
  const [detonantes, setDetonantes] = useState<string[]>([])

  function alternar(lista: string[], valor: string, set: (v: string[]) => void) {
    set(lista.includes(valor) ? lista.filter(x => x !== valor) : [...lista, valor])
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>¿Dónde lo sientes en el cuerpo?</p>
        <p className="text-xs mb-3" style={{ color: "#9A7080" }}>Elige las que quieras, o salta esta parte.</p>
        <div className="flex flex-wrap gap-2">
          {CUERPO.map(c => <Chip key={c} activo={cuerpo.includes(c)} onClick={() => alternar(cuerpo, c, setCuerpo)}>{c}</Chip>)}
        </div>
      </div>
      <div>
        <p className="font-semibold mb-3" style={{ color: "#3D3030" }}>¿Cómo está tu sistema hoy?</p>
        <div className="space-y-2">
          {SISTEMA.map(s => (
            <button key={s.v} type="button" onClick={() => setSistema(s.v)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "0.75rem 1rem", borderRadius: "16px", cursor: "pointer",
                border: "1.5px solid " + (sistema === s.v ? "#B07060" : "#E8D4C4"),
                background: sistema === s.v ? "#F5EDE4" : "#FFFFFF" }}>
              <span style={{ color: "#3D3030", fontWeight: 600 }}>{s.v}</span>
              <span style={{ color: "#9A7080", fontSize: "0.8rem", display: "block" }}>{s.d}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-semibold mb-3" style={{ color: "#3D3030" }}>¿Qué crees que lo detonó hoy?</p>
        <div className="flex flex-wrap gap-2">
          {DETONANTES.map(d => <Chip key={d} activo={detonantes.includes(d)} onClick={() => alternar(detonantes, d, setDetonantes)}>{d}</Chip>)}
        </div>
      </div>
      <button type="button" onClick={() => onContinue({ cuerpo, sistema, detonantes })}
        style={{ width: "100%", padding: "0.9rem", borderRadius: "999px", background: "#1B2A4A", color: "#FFFFFF", fontWeight: 700, cursor: "pointer" }}>
        Continuar
      </button>
    </div>
  )
}

export function respuestasCuerpo(d: DatosCuerpo): Record<string, string> {
  const r: Record<string, string> = {}
  if (d.cuerpo.length) r["¿Dónde lo siente en el cuerpo?"] = d.cuerpo.join(", ")
  if (d.sistema) r["¿Cómo está su sistema nervioso hoy?"] = d.sistema
  if (d.detonantes.length) r["¿Qué lo detonó hoy?"] = d.detonantes.join(", ")
  return r
}
