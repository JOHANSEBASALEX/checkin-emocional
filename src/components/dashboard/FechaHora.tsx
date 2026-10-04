"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function FechaHora({ fecha }: { fecha: string }) {
  const [texto, setTexto] = useState("")
  useEffect(() => {
    setTexto(format(new Date(fecha), "EEEE d 'de' MMMM, h:mm a", { locale: es }))
  }, [fecha])
  return <span>{texto}</span>
}
