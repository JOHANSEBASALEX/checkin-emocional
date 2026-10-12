"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Heart, Wind, Sprout } from "lucide-react"

function saludoSegunHora() {
  const h = new Date().getHours()
  if (h < 12) return "Buenos días"
  if (h < 19) return "Buenas tardes"
  return "Buenas noches"
}

const EXPERIENCIAS = [
  {
    icon: Heart,
    color: "#a05a48",
    bg: "#fdf1ed",
    titulo: "Ponerle nombre a lo que sientes",
    texto: "Sin juicios y sin prisa. Cuéntanos cómo estás hoy y te escuchamos de verdad.",
  },
  {
    icon: Wind,
    color: "#3aA876",
    bg: "#f0faf4",
    titulo: "Un momento para tu cuerpo",
    texto: "Audios cortos y guiados para respirar, sentirte a salvo y abrazarte con calma.",
  },
  {
    icon: Sprout,
    color: "#b8932a",
    bg: "#fffbeb",
    titulo: "Verte crecer con el tiempo",
    texto: "Tu historial guarda cada día, para que descubras cuánto has avanzado.",
  },
]

export default function BienvenidaPage() {
  const [nombre, setNombre] = useState("")
  const [saludo, setSaludo] = useState("Hola")

  useEffect(() => {
    setSaludo(saludoSegunHora())
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from("profiles").select("full_name").eq("id", user.id).single()
      const primero = data?.full_name?.split(" ")[0] ?? ""
      setNombre(primero.charAt(0).toUpperCase() + primero.slice(1))
    }
    load()
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="bg-white rounded-3xl p-8 sm:p-10 border shadow-sm text-center"
        style={{ borderColor: "#d6f5e3" }}
      >
        <img src="/logo.png" alt="Sana y Florece" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 shadow-md" style={{ border: "3px solid #D4AF37" }} />

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {saludo}{nombre ? `, ${nombre}` : ""} 🌿
        </h1>

        <p className="text-gray-600 leading-relaxed mb-2">
          Me alegra mucho que estés aquí. Detenerte un momento para mirar cómo te sientes
          es un acto de amor hacia ti.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Este es un espacio seguro y tuyo. No hay respuestas correctas ni incorrectas,
          solo tú, tal como llegas hoy.
        </p>

        <div className="h-px w-16 mx-auto mb-8" style={{ background: "#D4AF37", opacity: 0.6 }} />

        <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#3aA876" }}>
          Lo que vas a vivir aquí
        </p>

        <div className="space-y-4 text-left mb-9">
          {EXPERIENCIAS.map(e => {
            const Icono = e.icon
            return (
              <div key={e.titulo} className="flex items-start gap-4 rounded-2xl p-4" style={{ background: e.bg }}>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icono className="w-5 h-5" style={{ color: e.color }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-0.5">{e.titulo}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{e.texto}</p>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          Cuando estés lista o listo, toca <span className="font-semibold" style={{ color: "#a05a48" }}>Nuevo check-in</span> en
          el menú. Aquí estaremos contigo, sin prisa. 💛
        </p>
      </div>
    </div>
  )
}

