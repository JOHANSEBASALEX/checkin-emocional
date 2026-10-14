"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { PlusCircle, Mail, LayoutDashboard, User } from "lucide-react"

const ACTIVO = { background: "linear-gradient(135deg,#B07060,#9A5848)", color: "#FFFFFF" }
const NORMAL = { color: "#D4A898" }
const BASE = "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left cursor-pointer transition-colors"

export function NavLateral({ isPro }: { isPro: boolean }) {
  const router = useRouter()
  const pathname = usePathname()

  function nuevo() {
    router.push(pathname === "/checkin" ? "/checkin?nuevo=" + Date.now() : "/checkin")
  }

  const enCheckin = pathname.startsWith("/checkin")
  const enCarta = pathname.startsWith("/carta")
  const enHistorial = pathname.startsWith("/dashboard")
  const enCuenta = pathname.startsWith("/cuenta")

  return (
    <nav className="flex flex-col gap-1 flex-1">
      <button type="button" onClick={nuevo} className={BASE + (enCheckin ? " font-semibold" : "")} style={enCheckin ? ACTIVO : NORMAL}>
        <PlusCircle className="w-4 h-4" />
        Nuevo check-in
      </button>
      <Link href="/carta" className={BASE + (enCarta ? " font-semibold" : "")} style={enCarta ? ACTIVO : NORMAL}>
        <Mail className="w-4 h-4" />
        Mi carta semanal{!isPro && <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#D6F5E3", color: "#1F7A4D" }}>Pro</span>}
      </Link>
      <Link href="/dashboard" className={BASE + (enHistorial ? " font-semibold" : "")} style={enHistorial ? ACTIVO : NORMAL}>
        <LayoutDashboard className="w-4 h-4" />
        Mi historial
      </Link>
      <Link href="/cuenta" className={BASE + (enCuenta ? " font-semibold" : "")} style={enCuenta ? ACTIVO : NORMAL}>
        <User className="w-4 h-4" />
        Mi cuenta
      </Link>
    </nav>
  )
}




