"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

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
    <div className="min-h-screen flex" style={{ background: "#FAF8F5" }}>

      {/* Panel izquierdo */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-16 relative" 
        style={{ background: "linear-gradient(145deg,#1B2A4A 0%,#2A3F6B 100%)" }}>
        <div className="text-center max-w-sm">
          <Image 
            src="/logo.png" 
            alt="Sana y Florece" 
            width={200} 
            height={200} 
            style={{ borderRadius: "50%", objectFit: "cover", margin: "0 auto 2rem", border: "4px solid #C9A84C", boxShadow: "0 8px 40px rgba(201,168,76,0.3)" }} 
          />
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#C9A84C", fontFamily: "'Playfair Display', serif" }}>
            Bienvenida de vuelta
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: "#E8D4C4" }}>
            Tu espacio de bienestar emocional te espera. Cada día es una nueva oportunidad de conectar contigo.
          </p>
          <div className="mt-6" style={{ color: "#C9A84C", opacity: 0.5, letterSpacing: "8px" }}>✦ ❀ ✦ ❀ ✦</div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 text-center" style={{ color: "#C9A84C", opacity: 0.3, fontSize: "12px", letterSpacing: "3px" }}>
          REGULACIÓN EMOCIONAL · AMOR PROPIO · BIENESTAR REAL
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: "#FAF8F5" }}>
        <div className="w-full max-w-md">
          {/* Logo pequeño */}
          <div className="flex items-center gap-2.5 mb-10">
            <Image 
              src="/logo.png" 
              alt="Sana y Florece" 
              width={40} 
              height={40} 
              style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #C9A84C" }} 
            />
            <div>
              <span className="font-bold block leading-none" style={{ color: "#1B2A4A", fontFamily: "'Playfair Display', serif" }}>Sana y Florece</span>
              <span className="text-xs" style={{ color: "#9A7080" }}>Check-in Emocional</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ color: "#1B2A4A", fontFamily: "'Playfair Display', serif" }}>Iniciar sesión</h1>
          <p className="text-sm mb-8" style={{ color: "#9A7080" }}>Ingresa a tu espacio de bienestar</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-medium" style={{ color: "#3D3030" }}>Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="h-11 border-2 rounded-xl"
                style={{ borderColor: "#E8D4C4", background: "#FFFFFF" }}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="font-medium" style={{ color: "#3D3030" }}>Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 border-2 rounded-xl"
                style={{ borderColor: "#E8D4C4", background: "#FFFFFF" }}
                required
              />
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "#fef2f2", color: "#991b1b" }}>
                {e