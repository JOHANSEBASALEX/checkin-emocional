"use client"

import { useEffect, useRef, useState } from "react"

export function BotonEscuchar({ archivo, onTiempo, onFin }: { archivo: string; onTiempo?: (t: number | null) => void; onFin?: () => void }) {
  const ref = useRef<HTMLAudioElement | null>(null)
  const [sonando, setSonando] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    const a = ref.current
    return () => { a?.pause() }
  }, [])

  function alternar() {
    const a = ref.current
    if (!a) return
    if (sonando) { a.pause(); return }
    setError(false)
    a.play().catch(() => setError(true))
  }

  return (
    <div>
      <audio
        ref={ref}
        src={"/audios/" + archivo}
        preload="none"
        onPlay={() => setSonando(true)}
        onPause={() => setSonando(false)}
        onEnded={() => { setSonando(false); setProgreso(0); onTiempo?.(null); onFin?.() }}
        onTimeUpdate={(e) => {
          const a = e.currentTarget
          setProgreso(a.duration ? (a.currentTime / a.duration) * 100 : 0)
          onTiempo?.(a.currentTime)
        }}
        onError={() => setError(true)}
      />
      <button
        type="button"
        onClick={alternar}
        style={{ padding: "0.5rem 1.2rem", borderRadius: "999px", background: "#B07060", color: "#FFFFFF", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}
      >
        {sonando ? "❚❚ Pausar" : "▶ Escuchar"}
      </button>
      {(sonando || progreso > 0) && (
        <div style={{ marginTop: "0.6rem", height: "4px", borderRadius: "999px", background: "#E8D4C4", overflow: "hidden" }}>
          <div style={{ width: progreso + "%", height: "100%", background: "#C9A84C" }} />
        </div>
      )}
      {error && (
        <p className="text-xs mt-2" style={{ color: "#9A7080" }}>No se pudo cargar el audio. Inténtalo de nuevo.</p>
      )}
    </div>
  )
}