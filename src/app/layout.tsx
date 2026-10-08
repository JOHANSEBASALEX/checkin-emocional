import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Check-in Emocional Diario | Sana y Florece",
  description: "Conecta con tus emociones cada día y recibe reflexiones personalizadas para tu bienestar emocional.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.className} antialiased`}>
        {children}
        <footer
          className="text-center text-xs px-6 py-4"
          style={{ color: "#9A7080", background: "#F5EDE4" }}
        >
          Sana y Florece es un espacio de autocuidado y no reemplaza la atención de un profesional de la salud mental.
          Si estás en crisis, busca ayuda profesional de inmediato.
        </footer>
      </body>
    </html>
  )
}