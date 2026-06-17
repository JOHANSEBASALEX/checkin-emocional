"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

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
    <div className="min-h-screen flex" style={{ background: "#EDE0D4" }}>

      {/* Panel izquierdo */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg,#1B2A4A 0%,#2A3F6F 100%)" }}>
        <div className="text-center max-w-sm">
          <Image src="/logo.png" alt="Sana y Florece" width={100} height={100}
            style={{ borderRadius: "50%", objectFit: "cover", margin: "0 auto 2rem", border: "3px solid #C9A84C" }} />
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#FAF8F5", fontFamily: "'Playfair Display', serif" }}>
            Empieza tu camino
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "#D4A898" }}>
            Unete a mujeres que cuidan su mundo interior cada dia con Sana y Florece.
          </p>
          <div className="space-y-3 text-left">
            {["Check-ins ilimitados para siempre", "Historial semanal con grafica", "Reflexiones con IA (Plan Pro)"].map(b => (
              <div key={b} className="flex items-center gap-3 text-sm" style={{ color: "#D4A898" }}>
                <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A84C" }} />
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: "#EDE0D4" }}>
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2.5 mb-10">
            <Image src="/logo.png" alt="Sana y Florece" width={36} height={36}
              style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #C9A84C" }} />
            <div>
              <span className="font-bold block leading-none" style={{ color: "#3D3030" }}>Sana y Florece</span>
              <span className="text-xs" style={{ color: "#9A7080" }}>Check-in Emocional</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ color: "#3D3030", fontFamily: "'Playfair Display', serif" }}>
            Crear cuenta gratis
          </h1>
          <p className="text-sm mb-8" style={{ color: "#9A7080" }}>Sin tarjeta de credito requerida</p>

          <form onSubmit={handleRegistro} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="nombre" style={{ color: "#3D3030" }}>Tu nombre</Label>
              <Input id="nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)}
                placeholder="Maria" className="h-11 border-2 rounded-xl"
                style={{ borderColor: "#D4A898", background: "#FAF8F5" }} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" style={{ color: "#3D3030" }}>Correo electronico</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com" className="h-11 border-2 rounded-xl"
                style={{ borderColor: "#D4A898", background: "#FAF8F5" }} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" style={{ color: "#3D3030" }}>Contrasena</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Minimo 8 caracteres" minLength={8} className="h-11 border-2 rounded-xl"
                style={{ borderColor: "#D4A898", background: "#FAF8F5" }} required />
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "#fef2f2", color: "#991b1b" }}>
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-11 text-white font-semibold text-base gap-2 rounded-xl"
              style={{ background: loading ? "#2A3F6F" : "linear-gradient(135deg,#1B2A4A,#2A3F6F)" }}
              disabled={loading}>
              {loading ? "Creando cuenta..." : <><span>Crear cuenta gratis</span><ArrowRight className="w-4 h-4" /></>}
            </Button>
          </form>

          <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid #D4A898" }}>
            <p className="text-sm" style={{ color: "#9A7080" }}>
              Ya tienes cuenta?{" "}
              <Link href="/login" className="font-semibold hover:underline" style={{ color: "#B07060" }}>
                Inicia sesion
              </Link>
            </p>
          </div>

          <p className="text-xs text-center mt-4" style={{ color: "#B09888" }}>
            Al registrarte aceptas nuestros terminos de uso y politica de privacidad.
          </p>
        </div>
      </div>
    </div>
  )
}