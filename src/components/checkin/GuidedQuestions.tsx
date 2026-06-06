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
      {/* Header emoción */}
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "#f0faf4" }}>
        <Leaf className="w-4 h-4 flex-shrink-0" style={{ color: "#3aA876" }} />
        <div>
          <span className="font-bold" style={{ color: "#2d6e4e" }}>{emocion}</span>
          <span className="text-xs text-gray-400 ml-2">· Intensidad {intensidad}/10</span>
        </div>
      </div>

      {/* Progreso */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>{esFaseJournal ? "Nota libre (opcional)" : `Pregunta ${paso + 1} de ${preguntas.length}`}</span>
          <span>{progreso}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f0faf4" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progreso}%`, background: "linear-gradient(90deg,#3aA876,#D4AF37)" }}
          />
        </div>
      </div>

      {/* Pregunta o journal */}
      {!esFaseJournal ? (
        <div className="space-y-3">
          <p className="font-semibold text-gray-800 leading-snug">{preguntas[paso]}</p>
          <Textarea
            value={respuestaActual}
            onChange={e => setRespuestaActual(e.target.value)}
            placeholder="Escribe lo que sientas, no hay respuestas incorrectas..."
            className="min-h-28 resize-none rounded-xl border-2 focus:border-green-400 text-gray-700"
            style={{ borderColor: "#d6f5e3" }}
            autoFocus
          />
        </div>
      ) : (
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">¿Algo más que quieras expresar? (opcional)</p>
          <Textarea
            value={journal}
            onChange={e => setJournal(e.target.value)}
            placeholder="Un pensamiento, una imagen, una sensación, lo que sea..."
            className="min-h-28 resize-none rounded-xl border-2 focus:border-green-400 text-gray-700"
            style={{ borderColor: "#d6f5e3" }}
            autoFocus
          />
        </div>
      )}

      <Button
        onClick={avanzar}
        disabled={!esFaseJournal && !respuestaActual.trim()}
        className="w-full h-11 text-white font-semibold rounded-xl gap-2"
        style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}
      >
        {esFaseJournal ? "Finalizar check-in 🌿" : "Siguiente pregunta"}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
