import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Leaf, LayoutDashboard, PlusCircle, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/LogoutButton"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, subscription_status")
    .eq("id", user.id)
    .single()

  const isPro = profile?.subscription_status === "active"
  const nombre = profile?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "tú"

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(160deg,#f0faf4 0%,#ffffff 60%,#fffbeb 100%)" }}>

      {/* Sidebar */}
      <aside className="w-64 flex flex-col py-7 px-5 fixed h-full border-r" style={{ background: "rgba(255,255,255,0.92)", borderColor: "#d6f5e3", backdropFilter: "blur(8px)" }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 px-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3aA876,#2d6e4e)" }}>
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-gray-800 text-sm leading-none block">Sana y Florece</span>
            <span className="text-xs text-gray-400">Check-in Emocional</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          <Link href="/checkin">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all text-white mb-1" style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}>
              <PlusCircle className="w-4 h-4" />
              Nuevo check-in
            </div>
          </Link>
          <Link href="/dashboard">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all">
              <LayoutDashboard className="w-4 h-4" />
              Mi historial
            </div>
          </Link>
          <Link href="/cuenta">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all">
              <User className="w-4 h-4" />
              Mi cuenta
            </div>
          </Link>
        </nav>

        <Separator className="my-4" style={{ background: "#d6f5e3" }} />

        {/* Upsell Pro */}
        {!isPro && (
          <div className="rounded-2xl p-4 mb-4 text-white" style={{ background: "linear-gradient(145deg,#2d6e4e,#3aA876)" }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#F0C040" }} />
              <p className="font-semibold text-xs">Activa reflexiones IA</p>
            </div>
            <p className="text-xs text-green-100 mb-3">Recibe guía personalizada por $4.97/mes</p>
            <Link href="/cuenta">
              <div className="rounded-xl py-1.5 text-center text-xs font-bold" style={{ background: "#D4AF37", color: "#3a2a00" }}>
                Ver Plan Pro ✨
              </div>
            </Link>
          </div>
        )}

        {/* Usuario */}
        <div className="px-1 space-y-1">
          <p className="text-xs text-gray-500 px-2">
            Hola, <strong className="text-gray-700">{nombre}</strong>
            {isPro && <span className="ml-1.5 font-semibold" style={{ color: "#D4AF37" }}>· Pro ✨</span>}
          </p>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
