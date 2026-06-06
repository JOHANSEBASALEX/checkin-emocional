import Anthropic from "@anthropic-ai/sdk"

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export function buildCheckinPrompt(
  emocion: string,
  intensidad: number,
  respuestas: Record<string, string>,
  journal: string
): string {
  const respuestasFormateadas = Object.entries(respuestas)
    .map(([pregunta, respuesta]) => `• ${pregunta}: ${respuesta}`)
    .join("\n")

  return `Eres una guía de bienestar emocional empática y cálida de Sana y Florece.
El usuario ha compartido su check-in emocional de hoy:

- Emoción: ${emocion} (intensidad ${intensidad}/10)
- Respuestas a preguntas guiadas:
${respuestasFormateadas}
${journal ? `- Nota personal: ${journal}` : ""}

Ofrece una reflexión de 3-4 oraciones: valida la emoción sin juzgar, identifica un patrón o insight significativo, y termina con una invitación amable a una acción pequeña y concreta. Habla en segunda persona, en español, con tono cálido y esperanzador. No uses listas ni subtítulos, solo párrafo fluido.`
}
