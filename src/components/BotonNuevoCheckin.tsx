"use client"

import { useRouter, usePathname } from "next/navigation"
import { PlusCircle } from "lucide-react"

export function BotonNuevoCheckin() {
  const router = useRouter()
  const pathname = usePathname()

  function irANuevo() {
    if (pathname === "/checkin") {
      router.push("/checkin?nuevo=" + Date.now())
    } else {
      router.push("/checkin")
    }
  }

  return (
    <button
      type="button"
      onClick={irANuevo}
      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-sm text-white mb-1 text-left"
      style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}
    >
      <PlusCircle className="w-4 h-4" />
      Nuevo check-in
    </button>
  )
}
