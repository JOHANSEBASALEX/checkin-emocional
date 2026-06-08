import Link from "next/link"
import Image from "next/image"

const GUMROAD_URL = "https://johansebas0.gumroad.com/l/kpwmex"

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FAF8F5", color: "#3D3030", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", background: "#FAF8F5", borderBottom: "1px solid #EDE0D4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image src="/logo.png" alt="Sana y Florece" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#3D3030", fontSize: "0.95rem", display: "block", lineHeight: 1.2 }}>Sana y Florece</span>
            <span style={{ fontSize: "0.72rem", color: "#9A7080" }}>Check-in Emocional</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/login" style={{ fontSize: "0.85rem", color: "#806860", textDecoration: "none", padding: "0.4rem 0.75rem" }}>Iniciar sesión</Link>
          <Link href="/registro" style={{ fontSize: "0.85rem", background: "#B07060", color: "white", textDecoration: "none", padding: "0.4rem 1rem", borderRadius: "20px", fontWeight: 700 }}>Empezar gratis</Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: "#FAF8F5", padding: "3rem 1.5rem 2.5rem", textAlign: "center", borderBottom: "1px solid #EDE0D4" }}>
        <Image src="/logo.png" alt="Sana y Florece" width={90} height={90} style={{ borderRadius: "50%", objectFit: "cover", margin: "0 auto 1.25rem", display: "block", boxShadow: "0 4px 20px #D4A89840" }} />
        <div style={{ display: "inline-block", background: "#F5ECE4", color: "#9A6050", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "5px 14px", borderRadius: "20px", marginBottom: "1rem", border: "1px solid #E8D4C4" }}>✦ Sana y Florece</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", lineHeight: 1.2, color: "#3D3030", margin: "0 0 0.75rem" }}>
          Tu check-in emocional<br /><em style={{ color: "#B07060" }}>cada día</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "#806860", lineHeight: 1.75, maxWidth: "320px", margin: "0 auto 2rem", fontWeight: 300 }}>
          Conecta con cómo te sientes, responde preguntas guiadas y recibe una reflexión cálida que te ayuda a crecer emocionalmente.
        </p>
        <Link href="/registro" style={{ display: "block", background: "#B07060", color: "white", fontSize: "1rem", fontWeight: 700, padding: "0.9rem 2rem", borderRadius: "50px", textDecoration: "none", maxWidth: "270px", margin: "0 auto 0.75rem" }}>Comenzar gratis →</Link>
        <a href={GUMROAD_URL} target="_blank" style={{ display: "block", background: "transparent", color: "#9A6050", fontSize: "0.88rem", padding: "0.7rem 2rem", borderRadius: "50px", textDecoration: "none", maxWidth: "270px", margin: "0 auto", border: "1.5px solid #D4A898", fontWeight: 600 }}>✨ Ver Plan Pro — $4.97/mes</a>
        <p style={{ fontSize: "0.75rem", color: "#B09888", marginTop: "0.75rem" }}>Sin tarjeta de crédito para el plan gratuito</p>
        <div style={{ color: "#D4A898", letterSpacing: "8px", fontSize: "1rem", marginTop: "1.5rem", opacity: 0.6 }}>✦ ❀ ✦ ❀ ✦</div>
      </div>

      {/* COMO FUNCIONA */}
      <div style={{ padding: "2.5rem 1.5rem", background: "#F5EDE4" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#3D3030", textAlign: "center", margin: "0 0 0.4rem" }}>Cómo funciona</h2>
        <p style={{ textAlign: "center", color: "#806860", fontSize: "0.9rem", margin: "0 0 2rem", fontWeight: 300 }}>Unos minutos al día pueden cambiarlo todo</p>
        {[
          { n: "1", title: "Elige tu emoción 🌸", desc: "Selecciona entre 40+ emociones organizadas por categorías. Preguntas guiadas adaptadas a lo que sientes." },
          { n: "2", title: "Registra tu semana 🌿", desc: "Visualiza tus patrones emocionales en una gráfica semanal. Conoce tus tendencias y ciclos." },
          { n: "3", title: "Reflexión con IA ✨", desc: "Una IA empática analiza tu check-in y te da una reflexión personalizada con guía de acción concreta." },
        ].map((s) => (
          <div key={s.n} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.4rem" }}>
            <div style={{ width: "40px", height: "40px", minWidth: "40px", background: "#FAF8F5", border: "1px solid #D4A898", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#B07060" }}>{s.n}</div>
            <div>
              <p style={{ fontWeight: 700, color: "#3D3030", margin: "0 0 3px", fontSize: "0.95rem" }}>{s.title}</p>
              <p style={{ color: "#806860", fontSize: "0.88rem", margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PLANES */}
      <div style={{ padding: "2.5rem 1.5rem" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#3D3030", textAlign: "center", margin: "0 0 0.4rem" }}>Elige tu plan</h2>
        <p style={{ textAlign: "center", color: "#806860", fontSize: "0.9rem", margin: "0 0 1.5rem", fontWeight: 300 }}>Para siempre gratuito, o desbloquea todo con Pro</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ background: "white", border: "1px solid #E8D4C4", borderRadius: "14px", padding: "1.2rem" }}>
            <div style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#9A6050", fontWeight: 700, marginBottom: "6px" }}>Gratis</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", color: "#3D3030" }}>$0</div>
            <div style={{ fontSize: "0.75rem", color: "#B09888" }}>/mes · para siempre</div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9A6050", margin: "4px 0 10px", textTransform: "uppercase", letterSpacing: "1px" }}>Básico</div>
            {["Check-ins ilimitados", "Historial semanal", "40+ emociones", "Seguimiento patrones"].map(f => (
              <p key={f} style={{ fontSize: "0.8rem", color: "#5A4848", margin: "4px 0", display: "flex", gap: "6px", alignItems: "center" }}><span style={{ color: "#D4A898", fontSize: "0.65rem" }}>✦</span>{f}</p>
            ))}
          </div>
          <div style={{ background: "#F5EDE4", border: "1px solid #D4A898", borderRadius: "14px", padding: "1.2rem" }}>
            <div style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#9A6050", fontWeight: 700, marginBottom: "6px" }}>★ Más popular</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", color: "#3D3030" }}>$4.97</div>
            <div style={{ fontSize: "0.75rem", color: "#B09888" }}>/mes · cancela cuando quieras</div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9A6050", margin: "4px 0 10px", textTransform: "uppercase", letterSpacing: "1px" }}>Plan Pro</div>
            {["Todo lo gratuito", "Reflexión con IA", "Insights de patrones", "Guía de acción diaria", "Soporte prioritario"].map(f => (
              <p key={f} style={{ fontSize: "0.8rem", color: "#5A4848", margin: "4px 0", display: "flex", gap: "6px", alignItems: "center" }}><span style={{ color: "#D4A898", fontSize: "0.65rem" }}>✦</span>{f}</p>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIOS */}
      <div style={{ padding: "2.5rem 1.5rem", background: "#F5EDE4" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#3D3030", textAlign: "center", margin: "0 0 0.4rem" }}>Lo que dicen nuestras usuarias</h2>
        <p style={{ textAlign: "center", color: "#806860", fontSize: "0.9rem", margin: "0 0 1.5rem", fontWeight: 300 }}>Mujeres reales, cambios reales</p>
        {[
          { q: '"Llevar mi check-in diario cambió cómo me relaciono con mis emociones. La reflexión de IA es increíblemente precisa."', n: "— María G." },
          { q: '"El historial semanal me muestra patrones que no veía. $4.97 es una inversión pequeñísima para lo que recibo."', n: "— Ana L." },
        ].map((t) => (
          <div key={t.n} style={{ background: "white", borderLeft: "2px solid #D4A898", borderRadius: "0 10px 10px 0", padding: "1.1rem 1.1rem 1.1rem 1.3rem", marginBottom: "0.9rem" }}>
            <div style={{ color: "#D4A898", fontSize: "0.72rem", letterSpacing: "2px", marginBottom: "5px" }}>★★★★★</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#3D3030", fontSize: "0.92rem", lineHeight: 1.7, margin: "0 0 0.6rem" }}>{t.q}</p>
            <p style={{ fontSize: "0.78rem", color: "#B09888", fontWeight: 700, margin: 0 }}>{t.n}</p>
          </div>
        ))}
      </div>

      {/* CTA FINAL */}
      <div style={{ background: "#EDE0D4", padding: "3rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#3D3030", fontSize: "1.7rem", margin: "0 0 0.5rem" }}>Empieza tu camino hoy 🌸</h2>
        <p style={{ color: "#806860", fontSize: "0.92rem", margin: "0 0 1.5rem", lineHeight: 1.7, fontWeight: 300 }}>Para las mujeres que lo cargan todo en silencio.<br />Sanar también es valentía.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", margin: "1rem 0 1.5rem", flexWrap: "wrap" }}>
          <a href="https://www.youtube.com/@sanayfloreceoficial" target="_blank" style={{ background: "white", color: "#9A6050", fontSize: "0.78rem", fontWeight: 700, padding: "7px 14px", borderRadius: "20px", textDecoration: "none", border: "1px solid #E8D4C4" }}>▶ YouTube</a>
          <a href="https://www.instagram.com/sana__y__florece/" target="_blank" style={{ background: "white", color: "#9A6050", fontSize: "0.78rem", fontWeight: 700, padding: "7px 14px", borderRadius: "20px", textDecoration: "none", border: "1px solid #E8D4C4" }}>◎ Instagram</a>
        </div>
        <Link href="/registro" style={{ display: "block", background: "#B07060", color: "white", fontSize: "1rem", fontWeight: 700, padding: "0.9rem 2rem", borderRadius: "50px", textDecoration: "none", maxWidth: "270px", margin: "0 auto" }}>Crear mi cuenta gratis →</Link>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#3D3030", padding: "1.75rem 1.5rem", textAlign: "center" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          {[{ label: "Términos", href: "#" }, { label: "Privacidad", href: "#" }, { label: "YouTube", href: "https://www.youtube.com/@sanayfloreceoficial" }, { label: "Instagram", href: "https://www.instagram.com/sana__y__florece/" }].map(l => (
            <a key={l.label} href={l.href} target="_blank" style={{ color: "#D4A898", textDecoration: "none", fontSize: "0.82rem", margin: "0 0.75rem" }}>{l.label}</a>
          ))}
        </div>
        <p style={{ color: "#806860", fontSize: "0.72rem", margin: 0 }}>© 2025 Sana y Florece · Pago seguro con Gumroad</p>
      </div>
    </div>
  )
}