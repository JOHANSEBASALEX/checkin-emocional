"use client"

   import { useEffect, useState } from "react"
   import Link from "next/link"
   import { createClient } from "@/lib/supabase/client"
   import { Mail, Wind, Sprout } from "lucide-react"

   function saludoSegunHora() {
     const h = new Date().getHours()
     if (h < 12) return "Buenos días"
     if (h < 19) return "Buenas tardes"
     return "Buenas noches"
   }

   const PASOS = [
     { t: "Elige cómo te sientes", d: "Toca una categoría y luego la emoción que mejor lo describe." },
     { t: "Mide la intensidad y escucha a tu cuerpo", d: "Desliza del 1 al 10 y cuéntanos dónde lo sientes y qué lo detonó. Puedes saltar lo que no quieras responder." },
     { t: "Responde tres preguntas guiadas", d: "Sirven para desahogarte con calma. No hay respuestas correctas, y puedes dejar una nota libre." },
     { t: "Haz una práctica de un minuto", d: "Un audio corto para calmar el cuerpo. Después marca cómo quedó tu emoción." },
     { t: "Recibe tu reflexión", d: "Una guía escrita para ti a partir de lo que contaste." },
   ]

   const EXPERIENCIAS = [
     {
       icon: Mail,
       color: "#a05a48",
       bg: "#fdf1ed",
       titulo: "Mi carta semanal",
       texto: "Cada semana, desde el lunes, puedes pedir una carta escrita para ti con lo que registraste (con al menos 2 check-ins). Es parte del Plan Pro; en el plan gratis recibes una de muestra.",
     },
     {
       icon: Sprout,
       color: "#b8932a",
       bg: "#fffbeb",
       titulo: "Mi historial",
       texto: "Cada check-in queda guardado y ordenado por día, para que veas cómo cambia lo que sientes. En el plan gratis ves tus últimos 7 días; con el Plan Pro, todo.",
     },
     {
       icon: Wind,
       color: "#3aA876",
       bg: "#f0faf4",
       titulo: "Audios de calma",
       texto: "Audios cortos y guiados para respirar, sentirte a salvo y abrazarte con calma.",
     },
   ]

   export default function BienvenidaPage() {
     const [nombre, setNombre] = useState("")
     const [saludo, setSaludo] = useState("Hola")

     useEffect(() => {
       setSaludo(saludoSegunHora())
       async function load() {
         const supabase = createClient()
         const { data: { user } } = await supabase.auth.getUser()
         if (!user) return
         const { data } = await supabase.from("profiles").select("full_name").eq("id", user.id).single()
         const primero = data?.full_name?.split(" ")[0] ?? ""
         setNombre(primero.charAt(0).toUpperCase() + primero.slice(1))
       }
       load()
     }, [])

     return (
       <div className="max-w-2xl mx-auto">
         <div
           className="bg-white rounded-3xl p-8 sm:p-10 border shadow-sm text-center"
           style={{ borderColor: "#d6f5e3" }}
         >
           <img src="/logo.png" alt="Sana y Florece" className="w-24 h-24 rounded-full object-cover mx-auto mb-6 shadow-md" style={{ border: "3px solid #D4AF37" }} />

           <h1 className="text-3xl font-bold text-gray-900 mb-3">
             {saludo}{nombre ? `, ${nombre}` : ""} 🌿
           </h1>

           <p className="text-gray-600 leading-relaxed mb-2">
             Qué bueno que estés aquí. Detenerte un momento para mirar cómo te sientes
             es un acto de amor hacia ti.
           </p>
           <p className="text-gray-500 text-sm leading-relaxed mb-7">
             Este es un espacio seguro y tuyo. No hay respuestas correctas ni incorrectas,
             solo tú, tal como llegas hoy.
           </p>

           <Link href="/checkin" className="inline-block text-white font-bold px-8 py-3.5 rounded-2xl shadow-md" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
             Hacer mi primer check-in
           </Link>
           <p className="text-xs text-gray-400 mt-2 mb-8">Te toma unos 3 minutos.</p>

           <div className="h-px w-16 mx-auto mb-8" style={{ background: "#D4AF37", opacity: 0.6 }} />

           <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#3aA876" }}>
             Tu primer check-in en 5 pasos
           </p>

           <div className="space-y-3 text-left mb-9">
             {PASOS.map((p, i) => (
               <div key={p.t} className="flex items-start gap-4 rounded-2xl p-4" style={{ background: "#faf8f5" }}>
                 <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
                   {i + 1}
                 </div>
                 <div>
                   <p className="font-semibold text-gray-800 text-sm mb-0.5">{p.t}</p>
                   <p className="text-sm text-gray-500 leading-relaxed">{p.d}</p>
                 </div>
               </div>
             ))}
           </div>

           <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#3aA876" }}>
             Qué encontrarás en la app
           </p>

           <div className="space-y-4 text-left mb-9">
             {EXPERIENCIAS.map(e => {
               const Icono = e.icon
               return (
                 <div key={e.titulo} className="flex items-start gap-4 rounded-2xl p-4" style={{ background: e.bg }}>
                   <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                     <Icono className="w-5 h-5" style={{ color: e.color }} />
                   </div>
                   <div>
                     <p className="font-semibold text-gray-800 text-sm mb-0.5">{e.titulo}</p>
                     <p className="text-sm text-gray-500 leading-relaxed">{e.texto}</p>
                   </div>
                 </div>
               )
             })}
           </div>

           <Link href="/checkin" className="inline-block text-white font-bold px-8 py-3.5 rounded-2xl shadow-md" style={{ background: "linear-gradient(135deg,#B07060,#9A5848)" }}>
             Empezar mi check-in
           </Link>

           <p className="text-xs text-gray-400 leading-relaxed mt-7">
             Tus check-ins son solo tuyos. Las reflexiones y las cartas las escribe una inteligencia artificial y no reemplazan a un profesional de la salud mental. Si lo que sientes es muy intenso, <Link href="/ayuda" className="underline">aquí tienes líneas de ayuda</Link>.
           </p>
         </div>
       </div>
     )
   }
   