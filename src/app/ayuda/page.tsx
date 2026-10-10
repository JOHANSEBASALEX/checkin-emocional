import Link from "next/link"

const caja = { background: "white", border: "1px solid #E8D4C4", borderRadius: "16px", padding: "1.1rem 1.25rem", marginBottom: "0.9rem" } as const

export default function AyudaPage() {
  return (
    <div style={{ fontFamily: "Nunito, sans-serif", background: "#EDE0D4", color: "#3D3030", minHeight: "100vh", padding: "2rem 1.25rem" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Si necesitas ayuda ahora</h1>
        <p style={{ lineHeight: "1.7", marginBottom: "1.25rem" }}>No estás sola. Pedir ayuda es un acto de valentía, y hay personas preparadas para escucharte.</p>

        <div style={{ ...caja, borderColor: "#B07060" }}>
          <p style={{ fontWeight: 700, margin: "0 0 0.25rem" }}>Si estás en peligro inmediato</p>
          <p style={{ margin: 0, lineHeight: "1.6" }}>Llama a la línea de emergencias de tu país. En Colombia es el <strong>123</strong>.</p>
        </div>

        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", margin: "1.5rem 0 0.75rem" }}>Líneas de ayuda en Colombia</h2>
        <div style={caja}>
          <p style={{ fontWeight: 700, margin: "0 0 0.25rem" }}>Línea 106</p>
          <p style={{ margin: 0, lineHeight: "1.6" }}>Orientación en salud mental. Es gratuita, confidencial y funciona las 24 horas. Marca 106 desde cualquier teléfono.</p>
        </div>
        <div style={caja}>
          <p style={{ fontWeight: 700, margin: "0 0 0.25rem" }}>Línea 192, opción 4</p>
          <p style={{ margin: 0, lineHeight: "1.6" }}>Orientación nacional en salud mental del Ministerio de Salud. Marca 192 y elige la opción 4.</p>
        </div>

        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", margin: "1.5rem 0 0.75rem" }}>Si estás en otro país</h2>
        <div style={caja}>
          <p style={{ margin: 0, lineHeight: "1.6" }}>Busca la línea de tu país en <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" style={{ color: "#B07060", fontWeight: 700 }}>findahelpline.com</a>, un directorio gratuito de líneas de ayuda emocional.</p>
        </div>

        <p style={{ fontSize: "0.85rem", color: "#7A5060", lineHeight: "1.6", marginTop: "1.5rem" }}>Sana y Florece es un espacio de autocuidado. No reemplaza la atención de un profesional de la salud mental ni un servicio de emergencias.</p>
        <p style={{ fontSize: "0.85rem", color: "#7A5060", lineHeight: "1.6" }}>Para consultas sobre la app (no urgentes), escribe a alexvsalexvs30@gmail.com.</p>
        <Link href="/" style={{ display: "inline-block", marginTop: "1rem", color: "#B07060", fontWeight: 700 }}>Volver al inicio</Link>
      </div>
    </div>
  )
}