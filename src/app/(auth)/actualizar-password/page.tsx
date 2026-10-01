"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function ActualizarPasswordPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const supabase = createClient()
    const result = await supabase.auth.updateUser({ password: password })
    if (result.error) {
      setError("No pudimos actualizar tu contrasena. Pide un nuevo link.")
      return
    }
    router.push("/login?password_actualizada=true")
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fdf8f3", padding: "1.5rem" }}>
      <div style={{ maxWidth: "420px", width: "100%", backgroundColor: "white", padding: "2.5rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#1e2a4a" }}>Actualizar contrasena</h1>
        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Escribe tu nueva contrasena.</p>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "#1e2a4a" }}>Nueva contrasena</label>
          <input
            type="password"
            placeholder="Minimo 6 caracteres"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            minLength={6}
            required
            style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "10px", border: "2px solid #e5c9b8", marginBottom: "1rem", fontSize: "1rem", boxSizing: "border-box" }}
          />
          {error ? <p style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</p> : null}
          <button
            type="submit"
            style={{ width: "100%", padding: "0.875rem", borderRadius: "10px", border: "none", backgroundColor: "#1e2a4a", color: "white", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
          >
            Actualizar contrasena
          </button>
        </form>
      </div>
    </div>
  )
}
