"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Leaf, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError("Correo o contraseña incorrectos"); setLoading(false); return }
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(160deg,#f0faf4 0%,#ffffff 60%,#fffbeb 100%)" }}>

      {/* Panel izquierdo decorativo */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative" style={{ background: "linear-gradient(145deg,#2d6e4e 0%,#3aA876 100%)" }}>
        <div className="text-center text-white max-w-sm">
          <div className="text-7xl mb-8">🌿</div>
          <h2 className="text-3xl font-bold mb-4">Bienvenida de vuelta</h2>
          <p className="text-green-100 text-lg leading-relaxed">
            Tu espacio de bienestar emocional te espera. Cada día es una nueva oportunidad de conectar contigo.
          </p>
        </div>
        {/* decoración */}
        <div className="absolute bottom-10 left-10 text-green-600 opacity-30 text-6xl font-bold select-none">❋</div>
        <div className="absolute top-10 right-10 text-green-600 opacity-20 text-8xl font-bold select-none">◌</div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3aA876,#2d6e4e)" }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-800 block leading-none">Sana y Florece</span>
              <span className="text-xs text-gray-400">Check-in Emocional</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Iniciar sesión</h1>
          <p className="text-gray-500 text-sm mb-8">Ingresa a tu espacio de bienestar</p>

          <form onSubmit={handleLogin} className="space-y-5">
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
                placeholder="••••••••"
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
              {loading ? "Ingresando..." : <>Ingresar <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <Link href="/registro" className="font-semibold hover:underline" style={{ color: "#3aA876" }}>
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
