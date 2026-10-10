import Link from "next/link"
import type { ReactNode } from "react"

function Seccion({ t, children }: { t: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: "1.4rem" }}>
      <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.15rem", margin: "0 0 0.4rem" }}>{t}</h2>
      <div style={{ lineHeight: "1.7", fontSize: "0.92rem" }}>{children}</div>
    </section>
  )
}

export default function PrivacidadPage() {
  const lista = { paddingLeft: "1.2rem", margin: "0.3rem 0" } as const
  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "#EDE0D4", color: "#3D3030", minHeight: "100vh", padding: "2rem 1.25rem" }}>
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", marginBottom: "0.25rem" }}>Política de privacidad</h1>
        <p style={{ fontSize: "0.8rem", color: "#7A5060", marginBottom: "1.5rem" }}>Última actualización: 10 de octubre de 2026</p>

        <Seccion t="Quiénes somos">
          <p style={{ margin: 0 }}>Sana y Florece, Check-in Emocional Diario, es una aplicación de autocuidado emocional. Para cualquier consulta sobre tus datos escríbenos a alexvsalexvs30@gmail.com.</p>
        </Seccion>

        <Seccion t="Qué datos guardamos">
          <ul style={lista}>
            <li>Tu cuenta: nombre y correo electrónico.</li>
            <li>Tus check-ins: la emoción, la intensidad, lo que sientes en el cuerpo, el estado de tu sistema nervioso, lo que lo detonó, tus respuestas a las preguntas guiadas y tu nota libre (opcional).</li>
            <li>Cómo te sentiste después de una práctica, si decides responder.</li>
            <li>El estado de tu suscripción. El pago lo procesa Hotmart y nosotros no vemos ni guardamos los datos de tu tarjeta.</li>
          </ul>
        </Seccion>

        <Seccion t="Para qué los usamos">
          <p style={{ margin: 0 }}>Para mostrarte tu historial, generar tus reflexiones, gestionar tu suscripción y mejorar la aplicación. No usamos tus datos para publicidad.</p>
        </Seccion>

        <Seccion t="Información sensible">
          <p style={{ margin: 0 }}>Lo que registras habla de tu estado emocional, que es información sensible. Tú decides qué compartir: las notas libres son opcionales. Solo usamos esta información para darte el servicio.</p>
        </Seccion>

        <Seccion t="Reflexión con inteligencia artificial (Plan Pro)">
          <p style={{ margin: 0 }}>Para crear tu reflexión profunda enviamos tu emoción, intensidad, respuestas y nota a un servicio de inteligencia artificial de Google (Gemini). Esa información se procesa en los servidores de ese proveedor, según sus propias políticas. Esto solo ocurre si tienes el Plan Pro.</p>
        </Seccion>

        <Seccion t="Con quién compartimos datos">
          <p style={{ margin: "0 0 0.3rem" }}>No vendemos tus datos. Usamos proveedores necesarios para que la aplicación funcione:</p>
          <ul style={lista}>
            <li>Supabase: almacenamiento de datos e inicio de sesión.</li>
            <li>Vercel: alojamiento de la aplicación.</li>
            <li>Hotmart: pagos y suscripciones.</li>
            <li>Google (Gemini): reflexión con IA, solo en el Plan Pro.</li>
          </ul>
        </Seccion>

        <Seccion t="Tus derechos">
          <p style={{ margin: 0 }}>Puedes pedirnos acceso, corrección o eliminación de tus datos y de tu cuenta escribiendo a alexvsalexvs30@gmail.com. Si pides eliminar tu cuenta, borramos tus check-ins.</p>
        </Seccion>

        <Seccion t="Seguridad">
          <p style={{ margin: 0 }}>La aplicación usa conexión cifrada (HTTPS) y acceso protegido con inicio de sesión. Ningún sistema es perfecto, pero cuidamos tu información con atención.</p>
        </Seccion>

        <Seccion t="Mayores de edad">
          <p style={{ margin: 0 }}>La aplicación está pensada para personas mayores de 18 años.</p>
        </Seccion>

        <Seccion t="Cambios en esta política">
          <p style={{ margin: 0 }}>Si cambiamos esta política, actualizaremos la fecha de arriba. Si el cambio es importante, te avisaremos dentro de la aplicación.</p>
        </Seccion>

        <p style={{ fontSize: "0.85rem", color: "#7A5060", lineHeight: "1.6" }}>Si necesitas ayuda emocional ahora, visita <Link href="/ayuda" style={{ color: "#B07060", fontWeight: 700 }}>nuestra página de ayuda</Link>.</p>
        <Link href="/" style={{ display: "inline-block", marginTop: "1rem", color: "#B07060", fontWeight: 700 }}>Volver al inicio</Link>
      </div>
    </div>
  )
}