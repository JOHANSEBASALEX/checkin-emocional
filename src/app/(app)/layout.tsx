import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Sparkles } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/LogoutButton"
import Image from "next/image"
import { NavLateral } from "@/components/NavLateral"
import { NavInferior } from "@/components/NavInferior"

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
  const nombrebase = profile?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "tu"
  const nombre = nombrebase.charAt(0).toUpperCase() + nombrebase.slice(1).toLowerCase()

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(160deg,#EDE0D4 0%,#FAF8F5 50%,#E8D4C4 100%)" }}>

      {/* Barra superior (solo celular) */}
      <header
        className="md:hidden fixed top-0 inset-x-0 z-40 h-14 px-4 flex items-center justify-between border-b"
        style={{ background: "rgba(27,42,74,0.98)", borderColor: "#2A3F6F" }}
      >
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Sana y Florece"
            width={32}
            height={32}
            style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #C9A84C" }}
          />
          <span className="font-bold text-sm" style={{ color: "#FAF8F5" }}>Sana y Florece</span>
        </div>
        <p className="text-xs" style={{ color: "#D4A898" }}>
          Hola, <strong style={{ color: "#FAF8F5" }}>{nombre}</strong>
          {isPro && <span className="ml-1 font-semibold" style={{ color: "#C9A84C" }}>· Pro</span>}
        </p>
      </header>

      {/* Menú lateral (solo computador) */}
      <aside className="hidden md:flex w-64 flex-col py-7 px-5 fixed h-full border-r"
        style={{ background: "rgba(27,42,74,0.97)", borderColor: "#2A3F6F", backdropFilter: "blur(8px)" }}>

        <div className="flex items-center gap-2.5 mb-8 px-1">
          <Image
            src="/logo.png"
            alt="Sana y Florece"
            width={36}
            height={36}
            style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #C9A84C" }}
          />
          <div>
            <span className="font-bold text-sm leading-none block" style={{ color: "#FAF8F5" }}>Sana y Florece</span>
            <span className="text-xs" style={{ color: "#C9A84C" }}>Check-in Emocional</span>
          </div>
        </div>

        <NavLateral isPro={isPro} />

        <Separator className="my-4" style={{ background: "#2A3F6F" }} />

        {!isPro && (
          <div className="rounded-2xl p-4 mb-4" style={{ background: "linear-gradient(145deg,#B07060,#9A5848)" }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <p className="font-semibold text-xs text-white">Recibe reflexiones para ti</p>
            </div>
            <p className="text-xs mb-3" style={{ color: "#F5EDE4" }}>Recibe guía personalizada por $4.97/mes</p>
            <Link href="/cuenta">
              <div className="rounded-xl py-1.5 text-center text-xs font-bold" style={{ background: "#EDE0D4", color: "#B07060" }}>
                Ver Plan Pro
              </div>
            </Link>
          </div>
        )}

        <div className="px-1 space-y-1">
          <p className="text-xs px-2" style={{ color: "#D4A898" }}>
            Hola, <strong style={{ color: "#FAF8F5" }}>{nombre}</strong>
            {isPro && <span className="ml-1.5 font-semibold" style={{ color: "#C9A84C" }}>· Pro</span>}
          </p>
          <LogoutButton />
        </div>
      </aside>

      <main className="md:ml-64 flex-1 min-w-0 p-4 sm:p-6 md:p-8 pt-20 pb-28 md:pt-8 md:pb-8 min-h-screen">
        {children}
      </main>

      {/* Barra inferior (solo celular) */}
      <NavInferior />
    </div>
  )
}


