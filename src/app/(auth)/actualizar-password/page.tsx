'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ActualizarPasswordPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError('No pudimos actualizar tu contraseña. Pide un nuevo link.')
      return
    }
    router.push('/login?password_actualizada=true')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Actualizar contraseña</button>
    </form>
  )
}
