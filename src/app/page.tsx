"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

const HOTMART_URL = "https://pay.hotmart.com/G106279170B"

function Contador() {
  const getTarget = () => {
    const now = new Date()
    const target = new Date()
    target.setHours(23, 59, 59, 0)
    if (now > target) target.setDate(target.getDate() + 1)
    return target
  }
  const [tiempo, setTiempo] = useState({ h: "00", m: "00", s: "00" })
  useEffect(() => {
    const tick = () => {
      const diff = getTarget().getTime() - Date.now()
      if (diff <= 0) return
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTiempo({ h: String(h).padStart(2,"0"), m: String(m).padStart(2,"0"), s: String(s).padStart(2,"0") })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{ display:"flex", gap:"8px", justifyContent:"center", alignItems:"center", margin:"0.75rem 0" }}>
      {[{val:tiempo.h,label:"horas"},{val:tiempo.m,label:"min"},{val:tiempo.s,label:"seg"}].map((t,i) => (
        <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ background:"#1B2A4A", color:"#C9A84C", fontFamily:"monospace", fontSize:"1.8rem", fontWeight:700, padding:"0.4rem 0.7rem", borderRadius:"10px", minWidth:"56px", textAlign:"center", border:"1px solid #2A3F6F" }}>{t.val}</div>
          <span style={{ fontSize:"0.65rem", color:"#9A7080", marginTop:"3px", textTransform:"uppercase", letterSpacing:"1px" }}>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div style={{ fontFamily:"Nunito, sans-serif", background:"#EDE0D4", color:"#3D3030", minHeight:"100vh" }}>
      <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1rem 1.5rem", background:"#1B2A4A", borderBottom:"1px solid #2A3F6F", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <Image src="/logo.png" alt="Sana y Florece" width={40} height={40} style={{ borderRadius:"50%", objectFit:"cover", border:"2px solid #C9A84C" }} />
          <div>
            <span style={{ fontFamily:"Playfair Display, serif", fontWeight:600, color:"#FAF8F5", fontSize:"0.9rem", display:"block", lineHeight:"1.2" }}>Sana y Florece</span>
            <span style={{ fontSize:"0.7rem", color:"#C9A84C" }}>Check-in Emocional</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
          <Link href="/login" style={{ fontSize:"0.82rem", color:"#D4A898", textDecoration:"none", padding:"0.35rem 0.7rem" }}>Iniciar sesión</Link>
          <Link href="/registro" style={{ fontSize:"0.82rem", background:"#B07060", color:"white", textDecoration:"none", padding:"0.4rem 1rem", borderRadius:"20px", fontWeight:700 }}>Empezar gratis</Link>
        </div>
      </nav>
      <div style={{ background:"linear-gradient(160deg,#FAF8F5 0%,#EDE0D4 100%)", padding:"3rem 1.5rem 2.5rem", textAlign:"center" }}>
        <Image src="/logo.png" alt="Sana y Florece" width={88} height={88} style={{ borderRadius:"50%", objectFit:"cover", margin:"0 auto 1rem", display:"block", border:"3px solid #C9A84C", boxShadow:"0 4px 20px rgba(176,112,96,0.25)" }} />
        <div style={{ display:"inline-block", background:"#F5EDE4", color:"#B07060", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", padding:"4px 14px", borderRadius:"20px", marginBottom:"1rem", border:"1px solid #D4A898" }}>Para las mujeres que lo cargan todo en silencio</div>
        <h1 style={{ fontFamily:"Playfair Display, serif", fontSize:"2.1rem", lineHeight:"1.25", color:"#3D3030", margin:"0 0 1rem" }}>
          ¿Cuándo fue la última vez<br />que te preguntaste<br /><em style={{ color:"#B07060" }}>cómo estás de verdad?</em>
        </h1>
        <p style={{ fontSize:"0.97rem", color:"#7A5060", lineHeight:"1.8", maxWidth:"320px", margin:"0 auto 0.5rem" }}>Cada día cargas con el peso de todos. Tu sistema nervioso lo resiente. Tu cuerpo lo muestra. Pero nadie te pregunta cómo estás tú.</p>
        <p style={{ fontSize:"0.97rem", color:"#3D3030", lineHeight:"1.8", maxWidth:"320px", margin:"0 auto 2rem", fontWeight:600 }}>El Check-in Emocional es ese espacio. Solo tuyo. Cada día.</p>
        <Link href="/registro" style={{ display:"block", background:"linear-gradient(135deg,#B07060,#9A5848)", color:"white", fontSize:"1rem", fontWeight:700, padding:"1rem 2rem", borderRadius:"50px", textDecoration:"none", maxWidth:"280px", margin:"0 auto 0.75rem", boxShadow:"0 4px 16px rgba(176,112,96,0.4)" }}>Quiero empezar — es gratis</Link>
        <p style={{ fontSize:"0.75rem", color:"#B09888", marginTop:"0.5rem" }}>Sin tarjeta de crédito · Solo 3 minutos al día</p>
      </div>
      <div style={{ padding:"2.5rem 1.5rem", background:"#F5EDE4", borderTop:"1px solid #E8D4C4", borderBottom:"1px solid #E8D4C4" }}>
        <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"1.3rem", textAlign:"center", color:"#3D3030", marginBottom:"1.25rem", lineHeight:"1.4" }}>¿Te suena familiar alguna de estas?</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", maxWidth:"360px", margin:"0 auto" }}>
          {["Te despiertas agotada aunque hayas dormido","Tu mente no para aunque tu cuerpo no se mueva","Sientes que nadie realmente te entiende","Das todo a los demás y no te queda nada para ti","Sabes que algo no está bien pero no sabes qué"].map((t,i) => (
            <div key={i} style={{ display:"flex", gap:"0.75rem", alignItems:"flex-start", padding:"0.85rem 1rem", background:"white", borderRadius:"12px", border:"1px solid #E8D4C4" }}>
              <span style={{ color:"#B07060", fontSize:"1rem", flexShrink:0 }}>✦</span>
              <p style={{ margin:0, fontSize:"0.9rem", color:"#3D3030", lineHeight:"1.5" }}>{t}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center", fontSize:"0.9rem", color:"#7A5060", marginTop:"1.25rem", fontStyle:"italic" }}>Tu sistema nervioso está hablando. Solo necesita que lo escuches.</p>
      </div>
      <div style={{ padding:"2rem 1.5rem", background:"linear-gradient(135deg,#1B2A4A,#2A3F6F)", textAlign:"center" }}>
        <div style={{ display:"inline-block", background:"#C9A84C", color:"#1B2A4A", fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", padding:"4px 14px", borderRadius:"20px", marginBottom:"0.75rem", fontWeight:700 }}>Acceso especial — solo hoy</div>
        <p style={{ color:"#FAF8F5", fontSize:"0.95rem", marginBottom:"0.25rem" }}>Plan Pro con reflexión profunda personalizada</p>
        <p style={{ color:"#D4A898", fontSize:"0.82rem", marginBottom:"0.5rem" }}>Este precio cierra en:</p>
        <Contador />
        <a href={HOTMART_URL} target="_blank" style={{ display:"inline-block", background:"#C9A84C", color:"#1B2A4A", fontSize:"1rem", fontWeight:700, padding:"0.9rem 2rem", borderRadius:"50px", textDecoration:"none", marginTop:"0.75rem", boxShadow:"0 4px 16px rgba(201,168,76,0.4)" }}>Activar Plan Pro — $4.97/mes</a>
        <p style={{ color:"#9A7080", fontSize:"0.72rem", marginTop:"0.6rem" }}>Cancela cuando quieras · Sin compromisos</p>
      </div>
      <div style={{ padding:"2.5rem 1.5rem", background:"#1B2A4A" }}>
        <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"1.4rem", textAlign:"center", color:"#FAF8F5", marginBottom:"0.5rem" }}>Cómo funciona</h2>
        <p style={{ textAlign:"center", color:"#D4A898", fontSize:"0.85rem", marginBottom:"1.5rem" }}>3 minutos al día. Sin complicaciones.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem", maxWidth:"360px", margin:"0 auto" }}>
          {[{n:"1",t:"Elige cómo te sientes hoy",d:"8 categorías emocionales con ilustraciones. Sin juicio. Solo honestidad."},{n:"2",t:"Responde 3 preguntas guiadas",d:"Preguntas pensadas para que te conozcas mejor cada día."},{n:"3",t:"Recibe tu reflexión del día",d:"Una guía cálida y profunda creada a partir de lo que escribiste, solo para ti."}].map((s,i) => (
            <div key={i} style={{ display:"flex", gap:"1rem", alignItems:"flex-start", background:"rgba(255,255,255,0.06)", padding:"1rem", borderRadius:"16px", border:"1px solid #2A3F6F" }}>
              <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:"linear-gradient(135deg,#B07060,#9A5848)", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, flexShrink:0, fontSize:"0.9rem" }}>{s.n}</div>
              <div><p style={{ fontWeight:700, color:"#FAF8F5", margin:"0 0 0.25rem", fontSize:"0.9rem" }}>{s.t}</p><p style={{ fontSize:"0.82rem", color:"#D4A898", margin:0, lineHeight:"1.5" }}>{s.d}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"2.5rem 1.5rem", background:"#FAF8F5" }}>
        <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"1.3rem", textAlign:"center", color:"#3D3030", marginBottom:"1.25rem" }}>Gratuito vs Plan Pro</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", maxWidth:"360px", margin:"0 auto" }}>
          {[{f:"Check-in emocional diario",g:true,p:true},{f:"8 categorías emocionales",g:true,p:true},{f:"Historial de emociones",g:true,p:true},{f:"Reflexión general del día",g:true,p:true},{f:"Reflexión profunda personalizada",g:false,p:true},{f:"Guía específica según lo que escribiste",g:false,p:true}].map((r,i) => (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:"0.5rem", alignItems:"center", padding:"0.7rem 1rem", background:"white", borderRadius:"10px", border:"1px solid #E8D4C4" }}>
              <p style={{ margin:0, fontSize:"0.85rem", color:"#3D3030" }}>{r.f}</p>
              <span style={{ fontSize:"1rem", textAlign:"center", width:"32px" }}>{r.g?"✅":"❌"}</span>
              <span style={{ fontSize:"1rem", textAlign:"center", width:"32px" }}>{r.p?"✅":"❌"}</span>
            </div>
          ))}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:"0.5rem", padding:"0.5rem 1rem" }}>
            <span></span>
            <span style={{ fontSize:"0.72rem", color:"#9A7080", textAlign:"center", width:"32px" }}>Gratis</span>
            <span style={{ fontSize:"0.72rem", color:"#C9A84C", textAlign:"center", width:"32px", fontWeight:700 }}>Pro</span>
          </div>
        </div>
      </div>
      <div style={{ padding:"2.5rem 1.5rem", background:"#EDE0D4" }}>
        <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"1.3rem", textAlign:"center", color:"#3D3030", marginBottom:"1.25rem" }}>Lo que dicen las mujeres que ya lo usan</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem", maxWidth:"360px", margin:"0 auto" }}>
          {[{t:"Por primera vez en mucho tiempo siento que alguien me pregunta cómo estoy de verdad. Y ese alguien soy yo misma.",n:"Valentina, 34 años"},{t:"Lo hago cada mañana antes de revisar el teléfono. Cambió completamente cómo empiezo el día.",n:"María José, 41 años"},{t:"La reflexión del Plan Pro me hizo ver algo que llevaba meses ignorando. Vale cada peso.",n:"Carolina, 29 años"}].map((r,i) => (
            <div key={i} style={{ background:"white", padding:"1.25rem", borderRadius:"16px", border:"1px solid #E8D4C4" }}>
              <p style={{ fontSize:"0.88rem", color:"#3D3030", lineHeight:"1.7", fontStyle:"italic", margin:"0 0 0.75rem" }}>"{r.t}"</p>
              <p style={{ fontSize:"0.78rem", color:"#B07060", margin:0, fontWeight:600 }}>— {r.n}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"3rem 1.5rem", textAlign:"center", background:"linear-gradient(160deg,#F5EDE4,#EDE0D4)" }}>
        <h2 style={{ fontFamily:"Playfair Display, serif", fontSize:"1.6rem", color:"#3D3030", marginBottom:"0.75rem", lineHeight:"1.3" }}>Hoy puede ser el día<br />que empieces a escucharte</h2>
        <p style={{ fontSize:"0.9rem", color:"#7A5060", marginBottom:"1.5rem", lineHeight:"1.7", maxWidth:"300px", margin:"0 auto 1.5rem" }}>Sin excusas. Sin tiempo. Solo 3 minutos al día para reconectar con lo que sientes.</p>
        <Link href="/registro" style={{ display:"block", background:"linear-gradient(135deg,#B07060,#9A5848)", color:"white", fontSize:"1rem", fontWeight:700, padding:"1rem 2rem", borderRadius:"50px", textDecoration:"none", maxWidth:"280px", margin:"0 auto 1rem", boxShadow:"0 4px 20px rgba(176,112,96,0.4)" }}>Comenzar gratis ahora</Link>
        <a href={HOTMART_URL} target="_blank" style={{ display:"block", color:"#1B2A4A", fontSize:"0.88rem", padding:"0.7rem 2rem", borderRadius:"50px", textDecoration:"none", maxWidth:"280px", margin:"0 auto", border:"1.5px solid #1B2A4A", fontWeight:600 }}>Ver Plan Pro — $4.97/mes</a>
        <p style={{ fontSize:"0.72rem", color:"#B09888", marginTop:"0.75rem" }}>Cancela cuando quieras · Sin compromisos</p>
      </div>
      <div style={{ padding:"1.5rem", textAlign:"center", background:"#1B2A4A", borderTop:"1px solid #2A3F6F" }}>
        <p style={{ fontSize:"0.75rem", color:"#9A7080", margin:0 }}>Sana y Florece — Check-in Emocional Diario · Para las mujeres que sufren en silencio</p>
      </div>
    </div>
  )
}