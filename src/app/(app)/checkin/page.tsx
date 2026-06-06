"use client"

import { useState } from "react"
import { EmotionWheel } from "@/components/checkin/EmotionWheel"
import { GuidedQuestions } from "@/components/checkin/GuidedQuestions"
import { AIReflection } from "@/components/checkin/AIReflection"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"

type Paso = "emocion" | "intensidad" | "preguntas" | "resultado"

const PASOS = ["Emoción", "Intensidad", "Reflexión", "Resultado"]

export default function CheckinPage() {
  const [paso, setPaso] = useState<Paso>("emocion")
  const [categoria, setCategoria] = useState("")
  const [emocion, setEmocion] = useState("")
  const [intensidad, setIntensidad] = useState(5)
  const [cargando, setCargando] = useState(false)
  const [resultado, setResultado] = useState<{ reflexion: string | null; isPro: boolean } | null>(null)

  const pasoIndex = { emocion: 0, intensidad: 1, preguntas: 2, resultado: 3 }[paso]

  function handleEmocionSelect(cat: string, em: string) {
    setCategoria(cat)
    setEmocion(em)
    setPaso("intensidad")
  }

  async function handleComplete(respuestas: Record<string, string>, journal: string) {
    setCargando(true)
    setPaso("resultado")
    const res = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emocion, categoria, intensidad, respuestas, journal }),
    })
    const data = await res.json()
    setResultado({ reflexion: data.reflexion ?? null, isPro: data.isPro })
    setCargando(false)
  }

  function resetCheckin() {
    setEmocion(""); setCategoria(""); setIntensidad(5); setPaso("emocion"); setResultado(null)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Check-in de hoy 🌿</h1>
        <p className="text-gray-500 text-sm">Tómate un momento para conectar con cómo estás</p>
      </div>

      {/* Barra de progreso de pasos */}
      {paso !== "resultado" && (
        <div className="flex items-center gap-2 mb-8">
          {PASOS.slice(0, 3).map((p, i) => (
            <div key={p} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${i < pasoIndex ? "text-white" : i === pasoIndex ? "text-white" : "text-gray-400 border-2 border-gray-200"}`}
                  style={i <= pasoIndex ? { background: "linear-gradient(135deg,#3aA876,#2d8a60)" } : {}}>
                  {i < pasoIndex ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === pasoIndex ? "text-green-700" : i < pasoIndex ? "text-green-500" : "text-gray-400"}`}>{p}</span>
              </div>
              {i < 2 && <div className="h-0.5 flex-1 rounded-full" style={{ background: i < pasoIndex ? "#3aA876" : "#e5e7eb" }} />}
            </div>
          ))}
        </div>
      )}

      {/* Card principal */}
      <div className="bg-white rounded-3xl shadow-sm border p-8" style={{ borderColor: "#d6f5e3" }}>

        {/* PASO 1: Emoción */}
        {paso === "emocion" && (
          <EmotionWheel onSelect={handleEmocionSelect} />
        )}

        {/* PASO 2: Intensidad */}
        {paso === "intensidad" && (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Seleccionaste</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "#f0faf4" }}>
                  {categoria === "Alegría" ? "😊" : categoria === "Tristeza" ? "😢" : categoria === "Ansiedad" ? "😰" : categoria === "Enojo" ? "😠" : categoria === "Miedo" ? "😨" : categoria === "Calma" ? "😌" : categoria === "Amor" ? "🥰" : "😵"}
                </div>
                <div>
                  <p className="text-xl font-bold" style={{ color: "#3aA876" }}>{emocion}</p>
                  <p className="text-sm text-gray-400">{categoria}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">¿Qué tan intensa es esta emoción?</p>
                <span className="text-2xl font-bold" style={{ color: "#3aA876" }}>{intensidad}<span className="text-sm text-gray-400">/10</span></span>
              </div>
              <Slider
                min={1} max={10} step={1}
                value={[intensidad]}
                onValueChange={(vals) => setIntensidad(Array.isArray(vals) ? vals[0] : vals)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>🌱 Muy leve</span>
                <span>🌊 Muy intensa</span>
              </div>

              {/* Descripción visual de intensidad */}
              <div className="rounded-2xl p-4 text-center text-sm" style={{ background: "#f0faf4" }}>
                <span className="font-medium" style={{ color: "#2d6e4e" }}>
                  {intensidad <= 3 ? "Apenas perceptible, es un susurro" :
                   intensidad <= 5 ? "Presente y notoria, la sientes claramente" :
                   intensidad <= 7 ? "Bastante intensa, está en primer plano" :
                   "Muy intensa, ocupa toda tu atención"}
                </span>
              </div>
            </div>

            <Button
              onClick={() => setPaso("preguntas")}
              className="w-full h-11 text-white font-semibold rounded-xl"
              style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}
            >
              Continuar →
            </Button>
          </div>
        )}

        {/* PASO 3: Preguntas guiadas */}
        {paso === "preguntas" && (
          <GuidedQuestions emocion={emocion} intensidad={intensidad} onComplete={handleComplete} />
        )}

        {/* PASO 4: Resultado */}
        {paso === "resultado" && (
          <div className="space-y-6">
            {cargando ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#f0faf4" }}>
                  <Sparkles className="w-8 h-8 animate-pulse" style={{ color: "#3aA876" }} />
                </div>
                <p className="font-medium text-gray-700">Guardando tu check-in...</p>
                <p className="text-sm text-gray-400 mt-1">Preparando tu reflexión personalizada</p>
              </div>
            ) : (
              <>
                {/* Confirmación */}
                <div className="flex items-center gap-2.5 p-4 rounded-2xl" style={{ background: "#f0faf4" }}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#3aA876" }} />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">¡Check-in guardado!</p>
                    <p className="text-xs text-gray-500">Tu registro de hoy está en tu historial</p>
                  </div>
                </div>

                {/* Emoción registrada */}
                <div className="text-center py-5 rounded-2xl border" style={{ borderColor: "#a8e8c4", background: "linear-gradient(135deg,#f0faf4,#fffbeb)" }}>
                  <p className="text-sm text-gray-500 mb-1">Tu emoción de hoy</p>
                  <p className="text-3xl font-bold mb-1" style={{ color: "#3aA876" }}>{emocion}</p>
                  <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium" style={{ background: "#fffbeb", color: "#8B6F00", border: "1px solid #F0C040" }}>
                    Intensidad: {intensidad}/10
                  </div>
                </div>

                {/* Reflexión IA o upsell */}
                {resultado?.reflexion ? (
                  <AIReflection reflexion={resultado.reflexion} emocion={emocion} />
                ) : (
                  <div className="rounded-2xl p-6 border-2 border-dashed text-center" style={{ borderColor: "#d6f5e3", background: "#f9fdfb" }}>
                    <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: "#D4AF37" }} />
                    <p className="font-semibold text-gray-700 mb-1">Reflexión con IA — Plan Pro</p>
                    <p className="text-xs text-gray-400 mb-4">Recibe una guía emocional personalizada por solo $4.97/mes</p>
                    <Link href="/cuenta">
                      <Button className="text-white text-sm h-9 px-5 rounded-xl" style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}>
                        Activar Plan Pro ✨
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={resetCheckin}
                    className="flex-1 rounded-xl border-2"
                    style={{ borderColor: "#a8e8c4", color: "#3aA876" }}
                  >
                    Nuevo check-in
                  </Button>
                  <Link href="/dashboard" className="flex-1">
                    <Button className="w-full rounded-xl text-white" style={{ background: "linear-gradient(135deg,#2d6e4e,#3aA876)" }}>
                      Ver historial →
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
