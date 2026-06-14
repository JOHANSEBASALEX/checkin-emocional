import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { LayoutDashboard, PlusCircle, User, Sparkles } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/LogoutButton"
import Image from "next/image"

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
    <div className="min-h-screen flex" style={{ background: "linear-gradient(160deg,#FAF8F5 0%,#ffffff 60%,#F5EDE4 100%)" }}>

      {/* Sidebar */}
      <aside className="w-64 flex flex-col py-7 px-5 fixed h-full border-r" 
        style={{ background: "rgba(255,255,255,0.95)", borderColor: "#E8D4C4", backdropFilter: "blur(8px)" }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8 px-1">
          <Image 
            src="/logo.png" 
            alt="Sana y Florece" 
            width={36} 
            height={36} 
            style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #D4A898" }} 
          />
          <div>
            <span className="font-bold text-sm leading-none block" style={{ color: "#3D3030", fontFamily: "'Playfair Display', serif" }}>Sana y Florece</span>
            <span className="text-xs" style={{ color: "#9A7080" }}>Check-in Emocional</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          <Link href="/checkin">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all text-white mb-1" 
              style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
              <PlusCircle className="w-4 h-4" />
              Nuevo check-in
            </div>
          </Link>
          <Link href="/dashboard">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all"
              style={{ color: "#806860" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5EDE4")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <LayoutDashboard className="w-4 h-4" />
              Mi historial
            </div>
          </Link>
          <Link href="/cuenta">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all"
              style={{ color: "#806860" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5EDE4")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <User className="w-4 h-4" />
              Mi cuenta
            </div>
          </Link>
        </nav>

        <Separator className="my-4" style={{ background: "#E8D4C4" }} />

        {/* Upsell Pro */}
        {!isPro && (
          <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(145deg,#B07060,#9A5848)" }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#F5EDE4" }} />
              <p className="font-semibold text-xs text-white">Activa reflexiones IA</p>
            </div>
            <p className="text-xs mb-3" style={{ color: "#F5EDE4" }}>Recibe guía personalizada por $4.97/mes</p>
            <Link href="/cuenta">
              <div className="rounded-xl py-1.5 text-center text-xs font-bold" style={{ background: "#EDE0D4", color: "#B07060" }}>
                Ver Plan Pro ✨
              </div>
            </Link>
          </div>
        )}

        {/* Usuario */}
        <div className="px-1 space-y-1">
          <p className="text-xs px-2" style={{ color: "#9A7080" }}>
            Hola, <strong style={{ color: "#3D3030" }}>{nombre}</strong>
            {isPro && <span className="ml-1.5 font-semibold" style={{ color: "#C9A84C" }}>· Pro ✨</span>}
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