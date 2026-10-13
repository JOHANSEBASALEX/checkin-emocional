"use client"

import { useRouter, usePathname } from "next/navigation"
import { PlusCircle, LayoutDashboard, User, LogOut, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function NavInferior() {
  const router = useRouter()
  const pathname = usePathname()

  function nuevo() {
    router.push(pathname === "/checkin" ? "/checkin?nuevo=" + Date.now() : "/checkin")
  }

  async function salir() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const base = "flex flex-col items-center justify-center gap-1 flex-1 py-2 mx-0.5 rounded-xl text-[11px] font-medium"
  const fondoActivo = { background: "linear-gradient(135deg,#B07060,#9A5848)", color: "#FFFFFF" }
  const fondoNormal = { color: "#D4A898" }

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 flex px-2 pt-2 border-t"
      style={{ background: "rgba(27,42,74,0.98)", borderColor: "#2A3F6F", paddingBottom: "calc(env(safe-area-inset-bottom) + 8px)" }}
    >
      <button type="button" onClick={nuevo} className={base} style={pathname.startsWith("/checkin") ? fondoActivo : fondoNormal}>
        <PlusCircle className="w-5 h-5" /> Nuevo
      </button>
      <button type="button" onClick={() => router.push("/carta")} className={base} style={pathname.startsWith("/carta") ? fondoActivo : fondoNormal}>
        <Mail className="w-5 h-5" /> Carta
      </button>
      <button type="button" onClick={() => router.push("/dashboard")} className={base} style={pathname.startsWith("/dashboard") ? fondoActivo : fondoNormal}>
        <LayoutDashboard className="w-5 h-5" /> Historial
      </button>
      <button type="button" onClick={() => router.push("/cuenta")} className={base} style={pathname.startsWith("/cuenta") ? fondoActivo : fondoNormal}>
        <User className="w-5 h-5" /> Cuenta
      </button>
      <button type="button" onClick={salir} className={base} style={fondoNormal}>
        <LogOut className="w-5 h-5" /> Salir
      </button>
    </nav>
  )
}

