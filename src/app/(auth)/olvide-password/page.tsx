'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function OlvidePasswordPage() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: \`\${window.location.origin}/actualizar-password\`,
    })
    if (error) {
      setError('No pudimos enviar el correo. Intenta de nuevo.')
      return
    }
    setEnviado(true)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fdf8f3', padding: '1.5rem' }}>
      <div style={{ maxWidth: '420px', width: '100%', backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e2a4a' }}>Recuperar contraseña</h1>
        {enviado ? (
          <p style={{ color: '#374151', lineHeight: '1.6' }}>Revisa tu correo, te enviamos un link para restablecer tu contraseña.</p>
        ) : (
          <>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Ingresa tu correo y te enviamos un link para crear una nueva contraseña.</p>
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#1e2a4a' }}>Correo electrónico</label>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '2px solid #e5c9b8', marginBottom: '1rem', fontSize: '1rem', boxSizing: 'border-box' }}
              />
              {error && <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>}
              <button
                type="submit"
                style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: 'none', backgroundColor: '#1e2a4a', color: 'white', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
              >
                Enviar link de recuperación
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
