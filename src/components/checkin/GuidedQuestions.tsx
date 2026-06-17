"use client"

import { useState } from "react"
import { PREGUNTAS_POR_EMOCION, PREGUNTAS_DEFAULT } from "@/lib/constants"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf } from "lucide-react"

interface Props {
  emocion: string
  intensidad: number
  onComplete: (respuestas: Record<string, string>, journal: string) => void
}

export function GuidedQuestions({ emocion, intensidad, onComplete }: Props) {
  const preguntas = PREGUNTAS_POR_EMOCION[emocion] ?? PREGUNTAS_DEFAULT
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [respuestaActual, setRespuestaActual] = useState("")
  const [journal, setJournal] = useState("")

  const esFaseJournal = paso === preguntas.length
  const progreso = Math.round((paso / (preguntas.length + 1)) * 100)

  function avanzar() {
    if (!esFaseJournal) {
      setRespuestas(prev => ({ ...prev, [preguntas[paso]]: respuestaActual }))
      setRespuestaActual("")
      setPaso(p => p + 1)
    } else {
      onComplete(respuestas, journal)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "#F5EDE4" }}>
        <Leaf className="w-4 h-4 flex-shrink-0" style={{ color: "#B07060" }} />
        <div>
          <span className="font-bold" style={{ color: "#3D3030" }}>{emocion}</span>
          <span className="text-xs ml-2" style={{ color: "#9A7080" }}>· Intensidad {intensidad}/10</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-2" style={{ color: "#9A7080" }}>
          <span>{esFaseJournal ? "Nota libre (opcional)" : `Pregunta ${paso + 1} de ${preguntas.length}`}</span>
          <span>{progreso}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F5EDE4" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progreso}%`, background: "linear-gradient(90deg,#B07060,#C9A84C)" }}
          />
        </div>
      </div>

      {!esFaseJournal ? (
        <div className="space-y-3">
          <p className="font-semibold leading-snug" style={{ color: "#3D3030" }}>{preguntas[paso]}</p>
          <Textarea
            value={respuestaActual}
            onChange={e => setRespuestaActual(e.target.value)}
            placeholder="Escribe lo que sientas, no hay respuestas incorrectas..."
            className="min-h-28 resize-none rounded-xl border-2 text-gray-700"
            style={{ borderColor: "#D4A898" }}
            autoFocus
          />
        </div>
      ) : (
        <div className="space-y-3">
          <p className="font-semibold" style={{ color: "#3D3030" }}>Algo mas que quieras expresar? (opcional)</p>
          <Textarea
            value={journal}
            onChange={e => setJournal(e.target.value)}
            placeholder="Un pensamiento, una imagen, una sensacion, lo que sea..."
            className="min-h-28 resize-none rounded-xl border-2 text-gray-700"
            style={{ borderColor: "#D4A898" }}
            autoFocus
          />
        </div>
      )}

      <Button
        onClick={avanzar}
        disabled={!esFaseJournal && !respuestaActual.trim()}
        className="w-full h-11 text-white font-semibold rounded-xl gap-2"
        style={{ background: "linear-gradient(135deg,#1B2A4A,#2A3F6F)" }}
      >
        {esFaseJournal ? "Finalizar check-in" : "Siguiente pregunta"}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  )
}