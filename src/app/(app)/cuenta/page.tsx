"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, User, Sparkles, ExternalLink, Star, Leaf } from "lucide-react"

interface Profile { full_name: string; subscription_status: string }

const GUMROAD_URL = "https://johansebas0.gumroad.com/l/kpwmex"

export default function CuentaPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success")
  const canceled = searchParams.get("canceled")
  const [profile, setProfile] = useState<Profile | null>(null)
  const [email, setEmail] = useState("")

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setEmail(user.email ?? "")
      const { data } = await supabase.from("profiles").select("full_name, subscription_status").eq("id", user.id).single()
      setProfile(data)
    }
    load()
  }, [])

  const gumroadUrl = email ? `${GUMROAD_URL}?email=${encodeURIComponent(email)}` : GUMROAD_URL
  const isPro = profile?.subscription_status === "active"
  const isPastDue = profile?.subscription_status === "past_due"

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Mi cuenta</h1>
        <p className="text-gray-500 text-sm">Gestiona tu perfil y suscripción</p>
      </div>

      {success && (
        <div className="flex items-start gap-3 rounded-2xl p-4 border" style={{ background: "#f0faf4", borderColor: "#a8e8c4" }}>
          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#3aA876" }} />
          <div>
            <p className="font-semibold text-gray-800 text-sm">¡Gracias por suscribirte!</p>
            <p className="text-xs text-gray-500 mt-0.5">Tu acceso Pro se activará en los próximos minutos. Si no se refleja, recarga la página.</p>
          </div>
        </div>
      )}

      {canceled && (
        <div className="flex items-center gap-3 rounded-2xl p-4 border" style={{ background: "#fafafa", borderColor: "#e5e7eb" }}>
          <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <p className="text-sm text-gray-500">Pago cancelado. Puedes intentarlo de nuevo cuando quieras.</p>
        </div>
      )}

      {/* Perfil */}
      <div className="bg-white rounded-3xl p-6 border shadow-sm" style={{ borderColor: "#d6f5e3" }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#f0faf4" }}>
            <User className="w-3.5 h-3.5" style={{ color: "#3aA876" }} />
          </div>
          <p className="font-bold text-gray-800">Perfil</p>
        </div>
        <div className="space-y-3">
          {[
            { label: "Nombre", value: profile?.full_name ?? "—" },
            { label: "Correo", value: email },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center py-2.5 border-b text-sm" style={{ borderColor: "#f0faf4" }}>
              <span className="text-gray-500">{row.label}</span>
              <span className="font-medium text-gray-800">{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center py-2.5 text-sm">
            <span className="text-gray-500">Plan</span>
            {isPro ? (
              <span className="font-bold flex items-center gap-1" style={{ color: "#3aA876" }}>
                <Leaf className="w-3.5 h-3.5" /> Pro Activo ✨
              </span>
            ) : isPastDue ? (
              <span className="font-semibold text-red-500">Pago pendiente</span>
            ) : (
              <span className="font-semibold text-gray-400">Gratis</span>
            )}
          </div>
        </div>
      </div>

      {/* Suscripción */}
      <div className="bg-white rounded-3xl p-6 border shadow-sm" style={{ borderColor: "#d6f5e3" }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#fffbeb" }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: "#D4AF37" }} />
          </div>
          <p className="font-bold text-gray-800">Suscripción</p>
        </div>

        {isPro ? (
          <div className="rounded-2xl p-5 border" style={{ background: "linear-gradient(135deg,#f0faf4,#fffbeb)", borderColor: "#a8e8c4" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3aA876,#2d6e4e)" }}>
                <Leaf className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800">Plan Pro Activo</p>
                <p className="text-xs" style={{ color: "#3aA876" }}>Tienes acceso a reflexiones con IA</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Reflexiones personalizadas con IA", "Insights de patrones emocionales", "Guía de acción concreta"].map(i => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#3aA876" }} /> {i}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-4 pt-4 border-t" style={{ borderColor: "#d6f5e3" }}>
              Para cancelar, visita tu cuenta en <a href="https://gumroad.com" target="_blank" rel="noopener noreferrer" className="underline">Gumroad.com</a>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Card Pro */}
            <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(145deg,#2d6e4e 0%,#3aA876 100%)" }}>
              <div className="absolute top-4 right-4 rounded-full px-2.5 py-1 text-xs font-bold flex items-center gap-1" style={{ background: "#D4AF37", color: "#3a2a00" }}>
                <Star className="w-3 h-3 fill-current" /> Más popular
              </div>
              <p className="font-bold text-lg mb-0.5">Plan Pro</p>
              <p className="text-green-200 text-sm mb-4">Reflexión IA personalizada cada día</p>
              <div className="flex items-end gap-1 mb-5">
                <span className="text-4xl font-bold">$4.97</span>
                <span className="text-green-200 mb-1">/mes</span>
              </div>
              <ul className="space-y-2 text-sm mb-5">
                {[
                  "✨ Reflexión personalizada con IA",
                  "✨ Insights de tus patrones emocionales",
                  "✨ Guía de acción concreta",
                  "✨ Todo lo del plan gratuito",
                ].map(i => (
                  <li key={i} className="text-green-100">{i}</li>
                ))}
              </ul>
              <a href={gumroadUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full font-bold h-11 gap-2 text-sm" style={{ background: "#D4AF37", color: "#3a2a00" }}>
                  Activar Plan Pro — $4.97/mes
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
            <p className="text-xs text-center text-gray-400">
              Pago seguro con Gumroad · Sin contratos · Cancela cuando quieras
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
