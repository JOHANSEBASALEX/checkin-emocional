import Link from "next/link"
import { Leaf, Sparkles, BarChart3, Lock, Star, CheckCircle, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const GUMROAD_URL = "https://johansebas0.gumroad.com/l/kpwmex"

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg,#f0faf4 0%,#ffffff 55%,#fffbeb 100%)" }}>

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3aA876,#2d6e4e)" }}>
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-gray-800 text-sm leading-none block">Sana y Florece</span>
            <span className="text-xs text-gray-400 leading-none">Check-in Emocional</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">Iniciar sesión</Button>
          </Link>
          <Link href="/registro">
            <Button size="sm" className="text-white gap-1.5" style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}>
              Empezar gratis <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center px-6 pt-16 pb-20 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-7 border" style={{ background: "#fffbeb", borderColor: "#F0C040", color: "#8B6F00" }}>
          <Sparkles className="w-3.5 h-3.5" style={{ color: "#D4AF37" }} />
          Reflexiones personalizadas con Inteligencia Artificial
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
          Tu check-in emocional<br />
          <span style={{ color: "#3aA876" }}>cada día</span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Conecta con cómo te sientes, responde preguntas guiadas y recibe una reflexión cálida que te ayuda a crecer emocionalmente.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/registro">
            <Button size="lg" className="text-white px-8 py-3 text-base h-12 gap-2 shadow-lg" style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}>
              Comenzar gratis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2 border-2" style={{ borderColor: "#D4AF37", color: "#8B6F00" }}>
              <Sparkles className="w-4 h-4" style={{ color: "#D4AF37" }} />
              Ver Plan Pro — $4.97/mes
            </Button>
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">Sin tarjeta de crédito para el plan gratuito</p>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-10" style={{ color: "#3aA876" }}>Cómo funciona</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              icon: <Heart className="w-7 h-7" style={{ color: "#3aA876" }} />,
              title: "Elige tu emoción",
              desc: "Selecciona entre 40+ emociones organizadas por categorías. Preguntas guiadas adaptadas a lo que sientes.",
            },
            {
              num: "02",
              icon: <BarChart3 className="w-7 h-7" style={{ color: "#D4AF37" }} />,
              title: "Registra tu semana",
              desc: "Visualiza tus patrones emocionales en una gráfica semanal. Conoce tus tendencias y ciclos.",
            },
            {
              num: "03",
              icon: <Sparkles className="w-7 h-7" style={{ color: "#3aA876" }} />,
              title: "Reflexión con IA ✨",
              desc: "Claude, una IA empática, analiza tu check-in y te da una reflexión personalizada con guía de acción.",
            },
          ].map(f => (
            <div key={f.num} className="bg-white rounded-3xl p-7 border shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: "#e8f5ee" }}>
              <div className="text-xs font-bold mb-4" style={{ color: "#a8e8c4" }}>{f.num}</div>
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-10" style={{ color: "#3aA876" }}>Elige tu plan</p>
        <div className="grid md:grid-cols-2 gap-6">

          {/* Free */}
          <div className="bg-white rounded-3xl p-8 border shadow-sm" style={{ borderColor: "#e8f5ee" }}>
            <div className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-5" style={{ background: "#f0faf4", color: "#3aA876" }}>Gratis</div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-400 mb-1">/mes</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">Para siempre, sin límites</p>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              {["Check-ins ilimitados", "Historial semanal con gráfica", "40+ emociones y preguntas guiadas", "Seguimiento de patrones"].map(i => (
                <li key={i} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#3aA876" }} /> {i}
                </li>
              ))}
            </ul>
            <Link href="/registro">
              <Button variant="outline" className="w-full border-2 font-semibold" style={{ borderColor: "#3aA876", color: "#3aA876" }}>
                Empezar gratis
              </Button>
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-3xl p-8 text-white shadow-xl relative overflow-hidden" style={{ background: "linear-gradient(145deg,#2d6e4e 0%,#3aA876 60%,#4CC78F 100%)" }}>
            {/* Gold badge */}
            <div className="absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1" style={{ background: "#D4AF37", color: "#5a3d00" }}>
              <Star className="w-3 h-3 fill-current" /> Más popular
            </div>
            <div className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-5" style={{ background: "rgba(255,255,255,0.2)" }}>Plan Pro</div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-bold">$4.97</span>
              <span className="text-green-200 mb-1">/mes</span>
            </div>
            <p className="text-sm text-green-200 mb-6">Todo lo gratuito, más:</p>
            <ul className="space-y-3 text-sm mb-8">
              {[
                "✨ Reflexión personalizada con IA",
                "✨ Insights de tus patrones emocionales",
                "✨ Guía de acción concreta cada día",
                "✨ Soporte prioritario",
              ].map(i => (
                <li key={i} className="flex items-center gap-2.5 text-green-100">{i}</li>
              ))}
            </ul>
            <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer">
              <Button className="w-full font-bold text-base h-11 shadow-lg" style={{ background: "#D4AF37", color: "#3a2a00" }}>
                Activar Plan Pro →
              </Button>
            </a>
            <p className="text-xs text-center text-green-200 mt-3">Pago seguro con Gumroad · Cancela cuando quieras</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-10" style={{ color: "#3aA876" }}>Lo que dicen nuestras usuarias</p>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { texto: "Llevar mi check-in diario cambió cómo me relaciono con mis emociones. La reflexión de IA es increíblemente precisa.", nombre: "María G.", emoji: "🌿" },
            { texto: "Por fin una app de bienestar que se siente humana. Las preguntas guiadas me ayudan a procesar lo que siento.", nombre: "Sofía R.", emoji: "🌸" },
            { texto: "El historial semanal me muestra patrones que no veía. $4.97 es una inversión pequeñísima para lo que recibo.", nombre: "Ana L.", emoji: "🌻" },
          ].map(t => (
            <div key={t.nombre} className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: "#e8f5ee" }}>
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" style={{ color: "#D4AF37" }} />)}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">"{t.texto}"</p>
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.emoji}</span>
                <span className="text-sm font-medium text-gray-800">{t.nombre}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center px-6 pb-24">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 border shadow-sm" style={{ borderColor: "#a8e8c4" }}>
          <div className="text-4xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Empieza tu camino hoy</h2>
          <p className="text-gray-500 mb-7 text-sm">Unos minutos al día de autoconocimiento pueden cambiarlo todo.</p>
          <Link href="/registro">
            <Button size="lg" className="text-white px-10 shadow-lg" style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}>
              Crear mi cuenta gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center pb-10 text-sm text-gray-400 flex items-center justify-center gap-2">
        <Lock className="w-3 h-3" />
        <span>Pago seguro con Gumroad · © 2025 Sana y Florece · Todos los derechos reservados</span>
      </footer>
    </div>
  )
}
