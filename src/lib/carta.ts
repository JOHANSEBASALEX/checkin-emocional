import Groq from "groq-sdk"
   import { emocionFemenina } from "@/lib/constants"

   const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

   export type CheckinSemana = {
     emocion: string
     intensidad: number
     respuestas: Record<string, string> | null
     journal: string | null
     created_at: string
   }

   const OFFSET_MS = 5 * 3600 * 1000
   const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]

   export function inicioSemana(): string {
     const ahora = new Date(Date.now() - OFFSET_MS)
     const diff = (ahora.getUTCDay() + 6) % 7
     const lunes = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate() - diff))
     return lunes.toISOString().slice(0, 10)
   }

   function diaDe(iso: string) {
     return DIAS[new Date(new Date(iso).getTime() - OFFSET_MS).getUTCDay()]
   }

   function limpiar(texto: string): string {
     return texto
       .replace(/\u2011|\u2010/g, "")
       .replace(/\bsola\b/gi, "sin compañía")
       .replace(/\bcómoda\b/gi, "a gusto")
       .replace(/\bauto-cuidado\b/gi, "autocuidado")
       .replace(/\bapagada\b/gi, "sin energía")
       .replace(/\bcansada\b/gi, "con cansancio")
       .replace(/\bagotada\b/gi, "sin fuerzas")
       .replace(/\babrumada\b/gi, "con mucha carga")
       .replace(/ti mism[oa]/gi, "ti")
   }

   async function llamar(contenido: string, esfuerzo: string, temperatura: number): Promise<string> {
     const params: any = {
       messages: [{ role: "user", content: contenido }],
       model: "openai/gpt-oss-120b",
       max_completion_tokens: 4000,
       reasoning_effort: esfuerzo,
       temperature: temperatura,
     }
     const r: any = await groq.chat.completions.create(params)
     return r.choices[0]?.message?.content?.trim() ?? ""
   }

   export async function generarCarta(nombre: string, checkins: CheckinSemana[]): Promise<string> {
     const lineas = checkins.map((c) => {
       const resp = Object.entries(c.respuestas ?? {})
         .map(([k, v]) => `${k}: ${v}`)
         .join("; ")
         .slice(0, 600)
       const nota = c.journal ? ` Nota personal: ${c.journal.slice(0, 500)}` : ""
       return `- ${diaDe(c.created_at)}: ${emocionFemenina(c.emocion)}, intensidad ${c.intensidad}/10.${resp}${nota}`
     })

     const dias = new Set(checkins.map((c) => new Date(new Date(c.created_at).getTime() - OFFSET_MS).toISOString().slice(0, 10))).size
     const conteo: Record<string, number> = {}
     for (const c of checkins) {
       const e = emocionFemenina(c.emocion)
       conteo[e] = (conteo[e] ?? 0) + 1
     }
     const repetidas = Object.entries(conteo).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([e, n]) => e + " (" + n + (n === 1 ? " vez)" : " veces)")).join(", ")
     let practicas = 0
     let suaves = 0
     for (const c of checkins) {
       const r = (c.respuestas ?? {}) as Record<string, unknown>
       if (typeof r.practica === "string" && typeof r.cambio === "number") {
         practicas++
         if (r.cambio < 0) suaves++
       }
     }
     const hechos = "- Registró check-ins en " + dias + (dias === 1 ? " día" : " días") + " distintos, " + checkins.length + " en total.\n- Emociones que más se repitieron: " + repetidas + ".\n- " + (practicas > 0 ? "Hizo " + practicas + " práctica(s) de calma y en " + suaves + " la emoción quedó más suave." : "No registró prácticas de calma esta semana.")

     const diasIntensos = checkins.filter((c) => c.intensidad >= 9).length
     const semanaPesada = diasIntensos >= 1 || checkins.filter((c) => c.intensidad >= 7).length >= 3

     const prompt = `Eres quien escribe la carta semanal de Sana y Florece, una app de acompañamiento emocional. Escribes como lo haría un psicólogo o una psicóloga humanista de enorme calidez y sabiduría: alguien que escucha sin apuro, sin juzgar y sin recetar, y que logra que la persona se sienta vista, comprendida y valiosa. Has leído con atención y cariño lo que ${nombre} compartió esta semana. Esta carta no es un informe ni un plan: es un mensaje humano, íntimo y hondo, que ${nombre} querrá guardar y releer, y que le deja ánimo y compañía. No diagnosticas ni reemplazas a un profesional.

   Hechos verificados de la semana (puedes apoyarte en ellos, son verdad):
   ${hechos}

   Lo que ${nombre} registró, en orden. "practica" es el audio que hizo y "cambio" cómo quedó su emoción después (-2 mucho más suave, -1 algo más suave, 0 igual, 1 algo más fuerte, 2 mucho más fuerte):

   ${lineas.join("\n")}

   Qué quiero de esta carta:
   - No cuentes la semana día por día ni hagas inventario ("el lunes..., el martes...", "el domingo..."). Cuenta el hilo de fondo: qué fue lo que atravesó la semana, qué estuvo cargando y por quién o por qué, cómo se movió por dentro. Usa sus propias palabras y lo que contó en sus notas, con detalle y respeto.
   - Refleja lo que hay debajo de lo que vive (miedo a fallar, cansancio de aguantar, necesidad de ser vista, de estabilidad, de respeto...), siempre como una intuición humilde ("me da la impresión de que", "quizá", "tal vez"), nunca como una afirmación.
   - Valida y normaliza: lo que siente tiene sentido dado lo que carga, y sentirlo no es debilidad ni fracaso.
   - Que se sienta importante: nombra fortalezas y valores que SÍ se ven, con hechos verdaderos (que siguió escribiendo, que se detuvo a escucharse, que nombró lo que dolía, que probó una práctica, que se preocupa por los suyos). Nada de elogios vacíos.
   - Ofrece una mirada que dé aire: el dolor como señal de lo que le importa, esta etapa como un capítulo y no como toda su historia, su valor como algo que no está en juego aunque hoy lo parezca, la ternura hacia sí con la que trataría a alguien que quiere. Elige lo que encaje.
   - Incluye una frase breve y memorable que pueda llevarse en la semana ("Una frase para llevar: ...").
   - Como mucho una invitación suave para los próximos días, dicha como posibilidad ("si te nace..."), nunca como plan numerado ni lista de pasos. Si habló de deudas, empleo, pareja, familia o salud, puedes decir con delicadeza que buscar orientación (financiera, laboral, de un profesional) también es una forma de cuidarse, sin dar datos legales, médicos ni financieros.
   - Cierra con ánimo sincero y presencia. No firmes: la firma se agrega aparte.

   Honestidad: no inventes hechos ni días. No prometas que todo saldrá bien ni afirmes que sintió calma o alivio si no lo registró. La esperanza debe apoyarse en cosas verdaderas.

   Cómo escribir:
   - De 450 a 600 palabras, en 6 a 8 párrafos cortos separados por una línea en blanco. Sin viñetas, numeraciones, subtítulos ni emojis.
   - Empieza con "Hola, ${nombre}." en su propia línea y sigue con una apertura íntima.
   - Habla de tú, con voz cálida, de persona a persona, con ritmo y alguna frase corta que respire. Evita el tono de informe, de manual o de receta.
   - Evita frases hechas ("clima interior", "destellos de luz", "carga pesada", "es comprensible que", "permítete", "camino", "viaje", "sanar heridas", "abrazar tus emociones", "paso a paso").
   - No incluyas ejercicios de respiración ni del cuerpo; los audios existen para eso y puedes mencionarlos sin decir su nombre.
   - Lenguaje neutro en cuanto a género, siempre y sin excepción: la persona puede ser hombre, mujer u otra y no lo sabes. Nunca uses adjetivos ni participios que cambien según el género al referirte a ella (sola, solo, cansada, cansado, atrapada, agotada, listo, lista, sentida, acompañado, etc.). Usa formas neutras ("sin compañía", "con cansancio", "sin salida a la vista", "con compañía"). Tampoco "amigo", "amiga", "hombre" ni "mujer". "Ti mismo" y "ti misma" no existen: di "ti". Revisa el texto antes de responder.
   - Escribe con ortografía y tildes correctas.

   Ejemplo de la profundidad, la calidez y la voz buscadas (otra persona y otra situación; no copies sus frases ni su estructura):

   Hola, ${nombre}.

   Esta semana tuvo algo de despedida. Se nota en cómo escribiste: detrás de cada registro hay alguien que intenta acostumbrarse a una casa, a unas rutinas y a un silencio que antes eran distintos.

   Lo que más volvió fue una mezcla de tristeza y soledad, y de vez en cuando la culpa, como si tuvieras que justificar tu propio dolor. Me da la impresión de que debajo de todo eso hay algo profundamente humano: la necesidad de saber que lo que viviste y lo que perdiste tuvo valor, y que sigues siendo alguien a quien vale la pena querer aunque esa historia haya cambiado.

   Quiero decirte que lo que sientes tiene sentido. Cuando una etapa se cierra, el corazón necesita tiempo para entender que algo terminó, y ese tiempo no se puede apurar. Sentir tanto no es ir hacia atrás ni estar haciéndolo mal: es lo que pasa cuando algo importó de verdad.

   Y hay cosas que quiero que veas, porque son ciertas. Esta semana volviste a escribir casi todos los días, incluso cuando habría sido más fácil callarlo todo. Pusiste nombre a lo que dolía, y una vez que probaste una práctica de calma, lo que sentías quedó un poco más suave. Son gestos pequeños, pero hablan de una persona que no se está abandonando: se está acompañando en medio de un cambio grande.

   También quiero reconocer lo que no se ve desde dentro. Sostener la rutina, cumplir con lo cotidiano y seguir adelante mientras algo por dentro se reacomoda exige una fuerza silenciosa. Quizá no la sientas como fuerza, pero lo es.

   Tal vez esa culpa sea la parte de ti que se pregunta si hizo lo suficiente. Merece una respuesta amable: hiciste lo que pudiste con lo que sabías y tenías en ese momento. Hablarte con la ternura con la que le hablarías a alguien que quieres no es debilidad; es la forma de empezar a respirar distinto.

   Si te nace, estos días regálate algo pequeño que le diga a tu vida nueva que también hay lugar para ti: acomodar un rincón a tu gusto, ir a un sitio que disfrutes, llamar a alguien con quien puedas ser tal cual eres. Y si el peso se hace demasiado, hablar con un profesional también es una manera de cuidarte, no una señal de que no puedas.

   Una frase para llevar esta semana: lo que duele es lo que importó, y lo que importó no se pierde del todo.

   No tienes que atravesar esto sin compañía. Lo que sientes cuenta, tienes derecho a tomarte el tiempo que necesites, y aquí hay alguien que lo ve y lo valora.`

     let texto = await llamar(prompt, "medium", 0.8)
     if (!texto) throw new Error("Carta vacía")

     try {
       const editado = await llamar(`Eres editor de cartas de una app de acompañamiento emocional. Recibes el borrador de una carta semanal para ${nombre}. Mejórala para que suene a un psicólogo o una psicóloga humanista de enorme calidez que le escribe con el corazón, sin cambiar los hechos. Aplica esta lista:
   1. Debe empezar con "Hola, ${nombre}." en su propia línea y seguir con una apertura íntima.
   2. Quita cualquier relato día por día ("el lunes...", "el domingo...") o inventario de lo que hizo, y cualquier tono de informe, receta o lista de pasos. Cuenta el hilo de fondo de la semana.
   3. Conserva y profundiza: lo que hay debajo de lo que vive (como intuición humilde), la validación, las fortalezas reales que se ven, una mirada que dé aire, una frase breve para llevar y, como mucho, una invitación suave y pequeña dicha como posibilidad.
   4. Quita frases hechas ("clima interior", "destellos de luz", "carga pesada", "es comprensible que", "permítete", "camino", "paso a paso") y cierres de manual. Cierra con ánimo sincero y presencia, sin prometer resultados.
   5. Lenguaje 100% neutro en cuanto a género: ninguna palabra que marque género al referirse a la persona ("atrapada", "sola", "cansada", "acompañado", "ti mismo", etc.). Usa formas neutras.
   6. De 450 a 600 palabras, de seis a ocho párrafos cortos separados por una línea en blanco, sin viñetas, numeraciones, subtítulos ni emojis. No agregues firma, teléfonos ni líneas de ayuda.
   Devuelve solo el texto final.

   Borrador:
   ${texto}`, "low", 0.4)
       if (editado.length > 600) texto = editado
     } catch {}

     texto = limpiar(texto).replace(/\s*con cari[ñn]o,?\s*sana y florece\.?\s*$/i, "")
     const aviso = semanaPesada
       ? "Si en algún momento sientes que es demasiado, no tienes que sostenerlo en soledad. En Colombia puedes llamar a la línea 106 (gratuita, las 24 horas) y, si estás en otro país, encontrar una línea de ayuda en findahelpline.com. Hablar con un profesional de la salud mental también puede acompañarte."
       : ""
     return texto + (aviso ? "\n\n" + aviso : "") + "\n\nCon cariño,\nSana y Florece"
   }
   