import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "linear-gradient(160deg,#f0faf4 0%,#ffffff 60%,#fffbeb 100%)" }}
    >
      <p className="text-7xl mb-6">🌿</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Página no encontrada</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Esta página no existe, pero tu bienestar emocional sí. Volvamos al camino.
      </p>
      <Link href="/">
        <Button
          className="text-white px-8 h-11 rounded-xl"
          style={{ background: "linear-gradient(135deg,#3aA876,#2d8a60)" }}
        >
          Volver al inicio
        </Button>
      </Link>
    </div>
  )
}
