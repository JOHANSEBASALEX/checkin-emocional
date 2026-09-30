'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function OlvidePasswordPage() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/actualizar-password`,
    })

    if (error) {
      setError('No pudimos enviar el correo. Intenta de nuevo.')
      return
    }
    setEnviado(true)
  }

  if (enviado) {
    return <p>Revisa tu correo, te enviamos un link para restablecer tu contraseña.</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Enviar link de recuperación</button>
    </form>
  )
}
