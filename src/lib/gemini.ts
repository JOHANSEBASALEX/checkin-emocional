import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function generarReflexion(
  emocion: string,
  intensidad: number,
  respuestas: Record<string, string>,
  journal: string
): Promise<string> {
  const respuestasFormateadas = Object.entries(respuestas)
    .map(([pregunta, respuesta]) => `• ${pregunta}: ${respuesta}`)
    .join("\n")

  const prompt = `Eres una guía de bienestar emocional empática y cálida de Sana y Florece.
El usuario ha compartido su check-in emocional de hoy:

- Emoción: ${emocion} (intensidad ${intensidad}/10)
- Respuestas a preguntas guiadas:
${respuestasFormateadas}
${journal ? `- Nota personal: ${journal}` : ""}

Ofrece una reflexión de 3-4 oraciones: valida la emoción sin juzgar, menciona con delicadeza lo que la persona sintió en el cuerpo, cómo está su sistema nervioso y qué lo detonó (solo si lo indicó en las respuestas), identifica un patrón o insight significativo, y termina con una invitación amable a una acción pequeña y concreta. Usa lenguaje neutro en cuanto a género, sin palabras que marquen masculino o femenino (por ejemplo, escribe "contigo" o "hacia ti", nunca "ti mismo" ni "ti misma"). Habla en  segunda persona, en español, con tono cálido y esperanzador. Solo párrafo fluido, sin listas ni subtítulos.`

  const response = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-oss-120b",
  })

  return response.choices[0]?.message?.content || ""
}
