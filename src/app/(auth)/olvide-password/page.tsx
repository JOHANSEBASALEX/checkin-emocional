"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function OlvidePasswordPage() {
  const [email, setEmail] = useState("")
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const supabase = createClient()
    const redirectUrl = window.location.origin + "/actualizar-password"
    const result = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl })
    if (result.error) {
      setError("No pudimos enviar el correo. Intenta de nuevo.")
      return
    }
    setEnviado(true)
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fdf8f3", padding: "1.5rem" }}>
      <div style={{ maxWidth: "420px", width: "100%", backgroundColor: "white", padding: "2.5rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#1e2a4a" }}>Recuperar contrasena</h1>
        {enviado ? (
          <p style={{ color: "#374151", lineHeight: "1.6" }}>Revisa tu correo, te enviamos un link para restablecer tu contrasena.</p>
        ) : (
          <div>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Ingresa tu correo y te enviamos un link para crear una nueva contrasena.</p>
            <form onSubmit={handleSubmit}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "#1e2a4a" }}>Correo electronico</label>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "10px", border: "2px solid #e5c9b8", marginBottom: "1rem", fontSize: "1rem", boxSizing: "border-box" }}
              />
              {error ? <p style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</p> : null}
              <button
                type="submit"
                style={{ width: "100%", padding: "0.875rem", borderRadius: "10px", border: "none", backgroundColor: "#1e2a4a", color: "white", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
              >
                Enviar link de recuperacion
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
