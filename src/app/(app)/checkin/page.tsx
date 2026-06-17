"use client"

import { useState } from "react"
import { EmotionWheel } from "@/components/checkin/EmotionWheel"
import { GuidedQuestions } from "@/components/checkin/GuidedQuestions"
import { AIReflection } from "@/components/checkin/AIReflection"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Paso = "emocion" | "intensidad" | "preguntas" | "resultado"

const PASOS = ["Emocion", "Intensidad", "Reflexion"]

const IMAGENES_EMOCION: Record<string, string> = {
  "Alegria":   "/emociones/ALEGRIA.jpeg",
  "Tristeza":  "/emociones/TRISTEZA.jpeg",
  "Ansiedad":  "/emociones/ANSIEDAD.jpeg",
  "Enojo":     "/emociones/ENOJO.jpeg",
  "Miedo":     "/emociones/MIEDO.jpeg",
  "Calma":     "/emociones/CALMA.jpeg",
  "Amor":      "/emociones/AMOR.jpeg",
  "Confusion": "/emociones/CONFUSION.jpeg",
}

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
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#3D3030", fontFamily: "'Playfair Display', serif" }}>
          Check-in de hoy
        </h1>
        <p className="text-sm" style={{ color: "#9A7080" }}>Tomate un momento para conectar con como estas</p>
      </div>

      {paso !== "resultado" && (
        <div className="flex items-center gap-2 mb-8">
          {PASOS.map((p, i) => (
            <div key={p} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${i < pasoIndex ? "text-white" : i === pasoIndex ? "text-white" : "text-gray-400 border-2 border-gray-200"}`}
                  style={i <= pasoIndex ? { background: "linear-gradient(135deg,#B07060,#9A5848)" } : {}}
                >
                  {i < pasoIndex ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className="text-xs font-medium hidden sm:block"
                  style={{ color: i === pasoIndex ? "#B07060" : i < pasoIndex ? "#C9A84C" : "#9ca3af" }}>
                  {p}
                </span>
              </div>
              {i < 2 && <div className="h-0.5 flex-1 rounded-full" style={{ background: i < pasoIndex ? "#B07060" : "#e5e7eb" }} />}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border p-8" style={{ borderColor: "#D4A898" }}>

        {paso === "emocion" && <EmotionWheel onSelect={handleEmocionSelect} />}

        {paso === "intensidad" && (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: "#9A7080" }}>Seleccionaste</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2" style={{ borderColor: "#D4A898" }}>
                  <Image
                    src={IMAGENES_EMOCION[categoria] ?? "/emociones/CALMA.jpeg"}
                    alt={categoria}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold" style={{ color: "#B07060" }}>{emocion}</p>
                  <p className="text-sm" style={{ color: "#9A7080" }}>{categoria}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold" style={{ color: "#3D3030" }}>Que tan intensa es esta emocion?</p>
                <span className="text-2xl font-bold" style={{ color: "#B07060" }}>
                  {intensidad}<span className="text-sm" style={{ color: "#9A7080" }}>/10</span>
                </span>
              </div>
              <Slider min={1} max={10} step={1} value={[intensidad]}
                onValueChange={(vals) => setIntensidad(Array.isArray(vals) ? vals[0] : vals)}
                className="w-full" />
              <div className="flex justify-between text-xs" style={{ color: "#9A7080" }}>
                <span>Muy leve</span>
                <span>Muy intensa</span>
              </div>
              <div className="rounded-2xl p-4 text-center text-sm" style={{ background: "#F5EDE4" }}>
                <span className="font-medium" style={{ color: "#B07060" }}>
                  {intensidad <= 3 ? "Apenas perceptible, es un susurro" :
                   intensidad <= 5 ? "Presente y notoria, la sientes claramente" :
                   intensidad <= 7 ? "Bastante intensa, esta en primer plano" :
                   "Muy intensa, ocupa toda tu atencion"}
                </span>
              </div>
            </div>
            <Button onClick={() => setPaso("preguntas")}
              className="w-full h-11 text-white font-semibold rounded-xl"
              style={{ background: "linear-gradient(135deg,#1B2A4A,#2A3F6F)" }}>
              Continuar
            </Button>
          </div>
        )}

        {paso === "preguntas" && (
          <GuidedQuestions emocion={emocion} intensidad={intensidad} onComplete={handleComplete} />
        )}

        {paso === "resultado" && (
          <div className="space-y-6">
            {cargando ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#F5EDE4" }}>
                  <Sparkles className="w-8 h-8 animate-pulse" style={{ color: "#C9A84C" }} />
                </div>
                <p className="font-medium" style={{ color: "#3D3030" }}>Guardando tu check-in...</p>
                <p className="text-sm mt-1" style={{ color: "#9A7080" }}>Preparando tu reflexion personalizada</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2.5 p-4 rounded-2xl" style={{ background: "#F5EDE4" }}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#B07060" }} />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#3D3030" }}>Check-in guardado!</p>
                    <p className="text-xs" style={{ color: "#9A7080" }}>Tu registro de hoy esta en tu historial</p>
                  </div>
                </div>

                <div className="text-center py-5 rounded-2xl border"
                  style={{ borderColor: "#D4A898", background: "linear-gradient(135deg,#FAF8F5,#F5EDE4)" }}>
                  <p className="text-sm mb-1" style={{ color: "#9A7080" }}>Tu emocion de hoy</p>
                  <p className="text-3xl font-bold mb-1" style={{ color: "#B07060", fontFamily: "'Playfair Display', serif" }}>{emocion}</p>
                  <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                    style={{ background: "#FAF8F5", color: "#C9A84C", border: "1px solid #D4A898" }}>
                    Intensidad: {intensidad}/10
                  </div>
                </div>

                {resultado?.reflexion ? (
                  <AIReflection reflexion={resultado.reflexion} emocion={emocion} categoria={categoria} />
                ) : (
                  <div className="rounded-2xl p-6 border-2 border-dashed text-center"
                    style={{ borderColor: "#D4A898", background: "#FAF8F5" }}>
                    <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: "#C9A84C" }} />
                    <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>Reflexion con IA - Plan Pro</p>
                    <p className="text-xs mb-4" style={{ color: "#9A7080" }}>Recibe una guia emocional personalizada por solo $4.97/mes</p>
                    <Link href="/cuenta">
                      <Button className="text-white text-sm h-9 px-5 rounded-xl"
                        style={{ background: "linear-gradient(135deg,#1B2A4A,#2A3F6F)" }}>
                        Activar Plan Pro
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" onClick={resetCheckin} className="flex-1 rounded-xl border-2"
                    style={{ borderColor: "#D4A898", color: "#B07060" }}>
                    Nuevo check-in
                  </Button>
                  <Link href="/dashboard" className="flex-1">
                    <Button className="w-full rounded-xl text-white"
                      style={{ background: "linear-gradient(135deg,#1B2A4A,#2A3F6F)" }}>
                      Ver historial
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