import Link from "next/link"
import Image from "next/image"

const GUMROAD_URL = "https://pay.hotmart.com/G106279170B"

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "#EDE0D4", color: "#3D3030", minHeight: "100vh" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", background: "#1B2A4A", borderBottom: "1px solid #2A3F6F" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image src="/logo.png" alt="Sana y Florece" width={44} height={44} style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #C9A84C" }} />
          <div>
            <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, color: "#FAF8F5", fontSize: "0.95rem", display: "block", lineHeight: "1.2" }}>Sana y Florece</span>
            <span style={{ fontSize: "0.72rem", color: "#C9A84C" }}>Check-in Emocional</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/login" style={{ fontSize: "0.85rem", color: "#D4A898", textDecoration: "none", padding: "0.4rem 0.75rem" }}>Iniciar sesion</Link>
          <Link href="/registro" style={{ fontSize: "0.85rem", background: "#B07060", color: "white", textDecoration: "none", padding: "0.4rem 1rem", borderRadius: "20px", fontWeight: 700 }}>Empezar gratis</Link>
        </div>
      </nav>
      <div style={{ background: "linear-gradient(160deg,#EDE0D4 0%,#E8D4C4 100%)", padding: "3rem 1.5rem 2.5rem", textAlign: "center", borderBottom: "1px solid #E8D4C4" }}>
        <Image src="/logo.png" alt="Sana y Florece" width={90} height={90} style={{ borderRadius: "50%", objectFit: "cover", margin: "0 auto 1.25rem", display: "block", border: "3px solid #C9A84C" }} />
        <div style={{ display: "inline-block", background: "#F5EDE4", color: "#B07060", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "5px 14px", borderRadius: "20px", marginBottom: "1rem", border: "1px solid #D4A898" }}>Sana y Florece</div>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.2rem", lineHeight: "1.2", color: "#3D3030", margin: "0 0 0.75rem" }}>
          Tu check-in emocional<br /><em style={{ color: "#B07060" }}>cada dia</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "#9A7080", lineHeight: "1.75", maxWidth: "320px", margin: "0 auto 2rem", fontWeight: 300 }}>
          Conecta con como te sientes, responde preguntas guiadas y recibe una reflexion calida que te ayuda a crecer emocionalmente.
        </p>
        <Link href="/registro" style={{ display: "block", background: "#B07060", color: "white", fontSize: "1rem", fontWeight: 700, padding: "0.9rem 2rem", borderRadius: "50px", textDecoration: "none", maxWidth: "270px", margin: "0 auto 0.75rem" }}>Comenzar gratis</Link>
        <a href={GUMROAD_URL} target="_blank" style={{ display: "block", background: "transparent", color: "#1B2A4A", fontSize: "0.88rem", padding: "0.7rem 2rem", borderRadius: "50px", textDecoration: "none", maxWidth: "270px", margin: "0 auto", border: "1.5px solid #1B2A4A", fontWeight: 600 }}>Ver Plan Pro - $4.97/mes</a>
        <p style={{ fontSize: "0.75rem", color: "#B09888", marginTop: "0.75rem" }}>Sin tarjeta de credito para el plan gratuito</p>
      </div>
      <div style={{ padding: "2.5rem 1.5rem", background: "#1B2A4A" }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", textAlign: "center", color: "#FAF8F5", marginBottom: "1.5rem" }}>Como funciona</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "360px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "16px", border: "1px solid #2A3F6F" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#B07060", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>1</div>
            <div><p style={{ fontWeight: 700, color: "#FAF8F5", margin: "0 0 0.25rem", fontSize: "0.9rem" }}>Elige tu emocion</p><p style={{ fontSize: "0.82rem", color: "#D4A898", margin: 0 }}>Selecciona como te sientes hoy entre 8 categorias emocionales</p></div>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "16px", border: "1px solid #2A3F6F" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#B07060", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>2</div>
            <div><p style={{ fontWeight: 700, color: "#FAF8F5", margin: "0 0 0.25rem", fontSize: "0.9rem" }}>Responde preguntas guiadas</p><p style={{ fontSize: "0.82rem", color: "#D4A898", margin: 0 }}>3 preguntas personalizadas segun tu estado emocional</p></div>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "16px", border: "1px solid #2A3F6F" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#B07060", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>3</div>
            <div><p style={{ fontWeight: 700, color: "#FAF8F5", margin: "0 0 0.25rem", fontSize: "0.9rem" }}>Recibe tu reflexion</p><p style={{ fontSize: "0.82rem", color: "#D4A898", margin: 0 }}>Una reflexion calida generada por IA especialmente para ti</p></div>
          </div>
        </div>
      </div>
      <div style={{ padding: "2.5rem 1.5rem", textAlign: "center", background: "linear-gradient(160deg,#E8D4C4,#EDE0D4)", borderTop: "1px solid #E8D4C4" }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", color: "#3D3030", marginBottom: "0.5rem" }}>Lista para empezar?</h2>
        <p style={{ fontSize: "0.9rem", color: "#9A7080", marginBottom: "1.5rem" }}>Unete a mujeres que ya cuidan su mundo interior cada dia</p>
        <Link href="/registro" style={{ display: "inline-block", background: "#1B2A4A", color: "white", fontSize: "1rem", fontWeight: 700, padding: "0.9rem 2.5rem", borderRadius: "50px", textDecoration: "none" }}>Comenzar gratis</Link>
      </div>
      <div style={{ padding: "1.5rem", textAlign: "center", background: "#1B2A4A", borderTop: "1px solid #2A3F6F" }}>
        <p style={{ fontSize: "0.75rem", color: "#9A7080" }}>Sana y Florece - Check-in Emocional Diario</p>
      </div>
    </div>
  )
}