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

export default function TerminosPage() {
  const lista = { paddingLeft: "1.2rem", margin: "0.3rem 0" } as const
  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "#EDE0D4", color: "#3D3030", minHeight: "100vh", padding: "2rem 1.25rem" }}>
      <div style={{ maxWidth: "620px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", marginBottom: "0.25rem" }}>Términos de uso</h1>
        <p style={{ fontSize: "0.8rem", color: "#7A5060", marginBottom: "1.5rem" }}>Última actualización: 10 de octubre de 2026</p>

        <Seccion t="Qué es Sana y Florece">
          <p style={{ margin: 0 }}>Sana y Florece es una aplicación de autocuidado emocional: un espacio para registrar cómo te sientes y recibir reflexiones y prácticas de regulación. Al crear tu cuenta y usar la aplicación aceptas estos términos.</p>
        </Seccion>

        <Seccion t="Lo que no es">
          <p style={{ margin: 0 }}>La aplicación no ofrece diagnóstico, tratamiento ni atención psicológica o médica, y no reemplaza a un profesional de la salud mental. No es un servicio de emergencias. Si estás en crisis o en peligro, visita <Link href="/ayuda" style={{ color: "#B07060", fontWeight: 700 }}>nuestra página de ayuda</Link> o llama a la línea de emergencias de tu país.</p>
        </Seccion>

        <Seccion t="Reflexiones con inteligencia artificial">
          <p style={{ margin: 0 }}>Las reflexiones del Plan Pro las genera un sistema de inteligencia artificial a partir de lo que registras. Son una guía de autocuidado y pueden contener errores. No son consejo médico ni psicológico.</p>
        </Seccion>

        <Seccion t="Tu cuenta">
          <ul style={lista}>
            <li>La aplicación está pensada para personas mayores de 18 años.</li>
            <li>Eres responsable de mantener segura tu contraseña.</li>
            <li>La información que registres debe ser tuya y veraz. No uses la aplicación para dañar a otras personas ni para fines ilegales.</li>
          </ul>
        </Seccion>

        <Seccion t="Plan gratuito y Plan Pro">
          <p style={{ margin: 0 }}>El check-in diario, el historial y las prácticas gratuitas no tienen costo. El Plan Pro es una suscripción mensual que se cobra a través de Hotmart. El precio vigente se muestra al momento de suscribirte. Quienes se suscriben con el precio de fundadora conservan ese valor mientras mantengan su suscripción activa.</p>
        </Seccion>

        <Seccion t="Cancelación y reembolsos">
          <p style={{ margin: 0 }}>Puedes cancelar tu suscripción cuando quieras desde tu cuenta de Hotmart. Al cancelar, conservas el Plan Pro hasta el final del periodo que ya pagaste. Los reembolsos se gestionan según las condiciones de Hotmart. Si tienes un problema con un cobro, escríbenos a alexvsalexvs30@gmail.com.</p>
        </Seccion>

        <Seccion t="Disponibilidad">
          <p style={{ margin: 0 }}>Hacemos lo posible por mantener la aplicación disponible, pero puede haber interrupciones o cambios. Podemos mejorar, modificar o retirar funciones.</p>
        </Seccion>

        <Seccion t="Tus datos">
          <p style={{ margin: 0 }}>Cómo cuidamos tu información está explicado en nuestra <Link href="/privacidad" style={{ color: "#B07060", fontWeight: 700 }}>política de privacidad</Link>.</p>
        </Seccion>

        <Seccion t="Cambios y contacto">
          <p style={{ margin: 0 }}>Podemos actualizar estos términos y cambiaremos la fecha de arriba. Para cualquier consulta escríbenos a alexvsalexvs30@gmail.com.</p>
        </Seccion>

        <Link href="/" style={{ display: "inline-block", marginTop: "1rem", color: "#B07060", fontWeight: 700 }}>Volver al inicio</Link>
      </div>
    </div>
  )
}