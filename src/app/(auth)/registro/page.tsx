"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Leaf, ArrowRight, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegistroPage() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleRegistro(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: nombre } },
    })
    if (error) { setError(error.message); setLoading(false); return }
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(160deg,#f0faf4 0%,#ffffff 60%,#fffbeb 100%)" }}>

      {/* Panel izquierdo decorativo */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative overflow-hidden" style={{ background: "linear-gradient(145deg,#2d6e4e 0%,#3aA876 100%)" }}>
        <div className="text-center text-white max-w-sm">
          <div className="text-7xl mb-8">🌱</div>
          <h2 className="text-3xl font-bold mb-4">Empieza tu camino</h2>
          <p className="text-green-100 text-lg leading-relaxed mb-8">
            Únete a miles de personas que cuidan su salud emocional cada día con Sana y Florece.
          </p>
          <div className="space-y-3 text-left">
            {["Check-ins ilimitados para siempre", "Historial semanal con gráfica", "Reflexiones con IA (Plan Pro)"].map(b => (
              <div key={b} className="flex items-center gap-3 text-sm text-green-100">
                <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                {b}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-8 -right-8 text-green-600 opacity-10 text-[180px] font-bold select-none leading-none">✦</div>
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3aA876,#2d6e4e)" }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-800 block leading-none">Sana y Florece</span>
              <span className="text-xs text-gray-400">Check-in Emocional</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Crear cuenta gratis</h1>
          <p className="text-gray-500 text-sm mb-8">Sin tarjeta de crédito requerida</p>

          <form onSubmit={handleRegistro} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="nombre" className="text-gray-700 font-medium">Tu nombre</Label>
              <Input
                id="nombre"
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="María"
                className="h-11 border-2 focus:border-green-400 rounded-xl"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-700 font-medium">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="h-11 border-2 focus:border-green-400 rounded-xl"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-700 font-medium">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                className="h-11 border-2 focus:border-green-400 rounded-xl"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "#fef2f2", color: "#991b1b" }}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 text-white font-semibold text-base gap-2 rounded-xl"
              style={{ background: loading ? "#6DBF9A" : "linear-gradient(135deg,#3aA876,#2d8a60)" }}
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : <>Crear cuenta gratis <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-semibold hover:underline" style={{ color: "#3aA876" }}>
                Inicia sesión
              </Link>
            </p>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Al registrarte aceptas nuestros términos de uso y política de privacidad.
          </p>
        </div>
      </div>
    </div>
  )
}
