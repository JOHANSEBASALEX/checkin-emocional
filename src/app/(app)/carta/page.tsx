"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Mail, Sparkles } from "lucide-react"

interface Estado {
  isPro: boolean
  carta: string | null
  esMuestra: boolean; creada?: string | null
  total: number
  minimo: number
  puedeGenerar: boolean
  motivo: "ok" | "faltan_checkins" | "muestra_usada" | "ya_existe"
}

export default function CartaPage() {
  const [estado, setEstado] = useState<Estado | null>(null)
  const [generando, setGenerando] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/carta")
      .then((r) => r.json())
      .then(setEstado)
      .catch(() => setError("No pudimos cargar tu carta. Recarga la página."))
  }, [])

  async function pedirCarta() {
    setGenerando(true)
    setError("")
    try {
      const r = await fetch("/api/carta", { method: "POST" })
      const d = await r.json()
      if (!r.ok) {
        setError(d.error ?? "Algo salió mal. Intenta de nuevo.")
      } else {
        setEstado((prev) => (prev ? { ...prev, carta: d.carta, esMuestra: d.esMuestra, creada: d.creada ?? null, motivo: "ya_existe", puedeGenerar: false } : prev))
      }
    } catch {
      setError("No pudimos escribir tu carta. Intenta de nuevo.")
    }
    setGenerando(false)
  }

  const falta = estado ? Math.max(0, estado.minimo - estado.total) : 0

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#3D3030", fontFamily: "'Playfair Display', serif" }}>
          Tu carta de la semana
        </h1>
        <p className="text-sm" style={{ color: "#9A7080" }}>Una carta escrita para ti, con lo que viviste estos días. Hay una carta por semana: la semana empieza el lunes y, desde ese día, puedes pedir la nueva con tus check-ins (con al menos 2). La escribe una inteligencia artificial para que sientas que alguien miró tu semana con cuidado: es un mensaje de ánimo y compañía, no un diagnóstico.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border p-5 sm:p-8" style={{ borderColor: "#D4A898" }}>
        {!estado && !error && <p className="text-sm text-center py-10" style={{ color: "#9A7080" }}>Cargando...</p>}

        {estado?.carta && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Mail className="w-5 h-5" style={{ color: "#B07060" }} />
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#C9A84C" }}>
                {estado.esMuestra ? "Tu carta de muestra" : "Esta semana"}
              </p>
            </div>
            {estado.creada && <p className="text-xs mb-3" style={{ color: "#9A7080" }}>Escrita el {new Date(estado.creada).toLocaleString("es-CO", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })}</p>}<div className="rounded-2xl p-5 sm:p-6" style={{ background: "#FAF8F5", borderLeft: "3px solid #C9A84C" }}>
              <img src="/carta.jpg" alt="" className="float-right ml-4 mb-2 w-24 sm:w-28 rounded-full" /><p className="whitespace-pre-line leading-relaxed" style={{ color: "#3D3030", fontFamily: "'Playfair Display', serif", fontSize: "1.02rem" }}>
                {estado.carta}
              </p>
            </div>

            {estado.esMuestra && !estado.isPro && (
              <div className="rounded-2xl p-5 mt-5 text-center" style={{ background: "linear-gradient(135deg,#FAF8F5,#F5EDE4)", border: "1px solid #D4A898" }}>
                <p className="text-sm font-medium mb-1" style={{ color: "#3D3030" }}>¿Te gustó recibirla?</p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "#9A7080" }}>
                  Con el Plan Pro recibes una carta nueva cada semana, hecha con tus propios check-ins.
                </p>
                <Link href="/cuenta" className="inline-block text-white text-sm font-semibold px-5 py-2 rounded-xl" style={{ background: "linear-gradient(135deg,#1B2A4A,#2A3F6F)" }}>
                  Conocer el Plan Pro
                </Link>
              </div>
            )}
          </div>
        )}

        {estado && !estado.carta && estado.puedeGenerar && (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#F5EDE4" }}>
              <Sparkles className="w-6 h-6" style={{ color: "#C9A84C" }} />
            </div>
            <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>
              {estado.isPro ? "Tu carta de esta semana está lista para escribirse" : "Tienes una carta de muestra esperándote"}
            </p>
            <p className="text-sm mb-5" style={{ color: "#9A7080" }}>
              Llevas {estado.total} check-ins en los últimos 7 días.
            </p>
            <button
              type="button"
              onClick={pedirCarta}
              disabled={generando}
              className="text-white font-semibold px-6 h-11 rounded-xl disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}
            >
              {generando ? "Escribiendo tu carta con cariño..." : "Escribir mi carta"}
            </button>
          </div>
        )}

        {estado && !estado.carta && estado.motivo === "faltan_checkins" && (
          <div className="text-center py-4">
            <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>Tu carta se escribe con tus check-ins</p>
            <p className="text-sm mb-5" style={{ color: "#9A7080" }}>
              Te {falta === 1 ? "falta 1 check-in" : `faltan ${falta} check-ins`} esta semana para recibirla
              {estado.isPro ? "." : " (tu primera carta es un regalo)."}
            </p>
            <Link href="/checkin" className="inline-block text-white font-semibold px-6 py-2.5 rounded-xl" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
              Hacer un check-in
            </Link>
          </div>
        )}

        {estado && !estado.carta && estado.motivo === "muestra_usada" && (
          <div className="text-center py-4">
            <p className="font-semibold mb-1" style={{ color: "#3D3030" }}>Ya recibiste tu carta de muestra</p>
            <p className="text-sm mb-5" style={{ color: "#9A7080" }}>
              Con el Plan Pro recibes una carta nueva cada semana, escrita con tus propios check-ins.
            </p>
            <Link href="/cuenta" className="inline-block text-white font-semibold px-6 py-2.5 rounded-xl" style={{ background: "linear-gradient(135deg,#1B2A4A,#2A3F6F)" }}>
              Conocer el Plan Pro
            </Link>
          </div>
        )}

        {error && <p className="text-sm text-center mt-4" style={{ color: "#B07060" }}>{error}</p>}
      </div>

      <p className="text-xs text-center mt-5 leading-relaxed" style={{ color: "#9A7080" }}>
        Esta carta la escribe una inteligencia artificial a partir de tus check-ins. No reemplaza a un profesional de la salud mental ni a un servicio de salud. Tus check-ins son solo tuyos.
      </p>
    </div>
  )
}




