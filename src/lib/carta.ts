import Groq from "groq-sdk"

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
    .replace(/\bquerida\b/gi, "con cariño")
    .replace(/\bsola\b/gi, "sin compañía")
    .replace(/\bcómoda\b/gi, "a gusto")
    .replace(/\btranquila\b/gi, "en calma")
    .replace(/\bauto-cuidado\b/gi, "autocuidado")
    .replace(/\bapagada\b/gi, "sin energía")
    .replace(/\bcansada\b/gi, "con cansancio")
    .replace(/\bagotada\b/gi, "sin fuerzas")
    .replace(/\babrumada\b/gi, "con mucha carga")
}

export async function generarCarta(nombre: string, checkins: CheckinSemana[]): Promise<string> {
  const lineas = checkins.map((c) => {
    const resp = Object.entries(c.respuestas ?? {})
      .map(([k, v]) => `${k}: ${v}`)
      .join("; ")
      .slice(0, 400)
    const nota = c.journal ? ` Nota personal: ${c.journal.slice(0, 300)}` : ""
    return `- ${diaDe(c.created_at)}: ${c.emocion}, intensidad ${c.intensidad}/10. ${resp}${nota}`
  })

  const diasIntensos = checkins.filter((c) => c.intensidad >= 9).length
  const avisoCuidado =
    diasIntensos >= 1 || checkins.filter((c) => c.intensidad >= 7).length >= 3
      ? `IMPORTANTE: esta semana hubo ${diasIntensos} check-ins de intensidad muy alta (9 o 10). Dentro de la carta, con mucha ternura y sin alarmar, sugiere que hablar con una profesional de la salud mental puede acompañarle, y menciona que en Colombia existe la Línea 192 opción 4. No ofrezcas audios ni productos como solución.`
      : ""

  const prompt = `Eres la voz cálida de Sana y Florece. Escribe una carta semanal personal para ${nombre}, a partir de sus check-ins emocionales de los últimos 7 días:

${lineas.join("\n")}

${avisoCuidado}

Reglas:
- Empieza con "Hola, ${nombre}" y termina con "Con cariño, Sana y Florece".
- Entre 180 y 230 palabras, en 3 o 4 párrafos cortos y fluidos, sin listas ni subtítulos. Abre con una frase humana y cálida sobre cómo se vio la semana en conjunto, nunca con datos.
- Menciona como máximo 3 o 4 momentos de la semana con palabras, usando los días reales. No escribas cifras de intensidad ni listas de emociones. Nada de lenguaje clínico como "percibo patrones".
- Si los datos muestran lo que sintió en el cuerpo, menciónalo con delicadeza.
- Señala un patrón SOLO si aparece en al menos dos check-ins. Si no hay patrón claro, dilo con honestidad y no lo inventes.
- Reconoce algo bueno que sí hizo, por ejemplo haber vuelto a escucharse.
- Termina con un pequeño ritual concreto para la semana siguiente, de 5 minutos o menos.
- No inventes datos, no diagnostiques y no uses lenguaje clínico. No uses guiones dentro de las palabras.
- Usa lenguaje neutro en cuanto a género: escribe "contigo" o "hacia ti", nunca "ti mismo" ni "ti misma", y evita adjetivos que marquen masculino o femenino.
- Habla en segunda persona, en español, con tono cálido y esperanzador. PROHIBIDO marcar género: no escribas "sola", "cómoda", "tranquila", "lista", "sentida" ni ningún adjetivo con terminación en a u o referido a la persona. Usa "no estás en esto sin compañía", "ponte en una postura que te acomode", y frases parecidas.
- Estructura obligatoria: (1) una frase cálida sobre la semana en conjunto; (2) un párrafo con 2 o 3 momentos, en orden cronológico real; (3) un párrafo breve que reconozca algo bueno que la persona hizo; (4) si hay aviso de cuidado, un párrafo propio y corto, ANTES del ritual; (5) el ritual en una sola frase.
- No uses términos técnicos como "ventana de tolerancia", "sistema nervioso regulado" ni "dentro de tu ventana". Di lo que sintió el cuerpo con palabras simples.
- No afirmes que sintió calma ni alivio a menos que lo haya escrito ella.
- Prohibido: "querida", "sola", "cómoda", "tranquila", "auto-cuidado" con guion. Escribe "autocuidado" junto.
- El ritual final va en imperativo, todo en la misma persona: "siéntate", "inhala", "exhala".`

  const params: any = {
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-oss-120b",
    max_completion_tokens: 4000,
    reasoning_effort: "low",
  }
  const response: any = await groq.chat.completions.create(params)

  const texto = response.choices[0]?.message?.content?.trim() ?? ""
  if (!texto) throw new Error("Carta vacía")
  return limpiar(texto)
}






