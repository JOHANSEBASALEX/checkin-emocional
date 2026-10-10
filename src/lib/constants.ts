export const EMOCIONES = [
  {
    categoria: "Alegría",
    color: "#F59E0B",
    emoji: "😊",
    emociones: ["Feliz", "Agradecida", "Entusiasmada", "Esperanzada", "Orgullosa", "Tranquila"],
  },
  {
    categoria: "Tristeza",
    color: "#3B82F6",
    emoji: "😢",
    emociones: ["Triste", "Melancólica", "Decepcionada", "Sola", "Añorante", "Abatida"],
  },
  {
    categoria: "Ansiedad",
    color: "#8B5CF6",
    emoji: "😰",
    emociones: ["Ansiosa", "Preocupada", "Nerviosa", "Abrumada", "Tensa", "Insegura"],
  },
  {
    categoria: "Enojo",
    color: "#EF4444",
    emoji: "😠",
    emociones: ["Enojada", "Frustrada", "Irritada", "Resentida", "Indignada", "Impaciente"],
  },
  {
    categoria: "Miedo",
    color: "#6B7280",
    emoji: "😨",
    emociones: ["Asustada", "Insegura", "Vulnerable", "Intimidada", "Aprensiva", "Paralizada"],
  },
  {
    categoria: "Calma",
    color: "#10B981",
    emoji: "😌",
    emociones: ["Calmada", "Serena", "Equilibrada", "Centrada", "Presente", "Aceptada"],
  },
  {
    categoria: "Amor",
    color: "#EC4899",
    emoji: "🥰",
    emociones: ["Amada", "Conectada", "Compasiva", "Cariñosa", "Apreciada", "Íntima"],
  },
  {
    categoria: "Confusión",
    color: "#F97316",
    emoji: "😵",
    emociones: ["Confundida", "Perdida", "Indecisa", "Dubitativa", "Desorientada", "Bloqueada"],
  },
] as const

export type CategoriaEmocion = (typeof EMOCIONES)[number]["categoria"]

// Traduce los nombres antiguos (masculinos) guardados en check-ins viejos
const A_FEMENINO: Record<string, string> = {
  Agradecido: "Agradecida", Entusiasmado: "Entusiasmada", Esperanzado: "Esperanzada", Orgulloso: "Orgullosa", Tranquilo: "Tranquila",
  Melancólico: "Melancólica", Decepcionado: "Decepcionada", Solo: "Sola", Abatido: "Abatida",
  Ansioso: "Ansiosa", Preocupado: "Preocupada", Nervioso: "Nerviosa", Abrumado: "Abrumada", Tenso: "Tensa", Inseguro: "Insegura",
  Enojado: "Enojada", Frustrado: "Frustrada", Irritado: "Irritada", Resentido: "Resentida", Indignado: "Indignada",
  Asustado: "Asustada", Intimidado: "Intimidada", Aprensivo: "Aprensiva", Paralizado: "Paralizada",
  Calmado: "Calmada", Sereno: "Serena", Equilibrado: "Equilibrada", Centrado: "Centrada", Aceptado: "Aceptada",
  Amado: "Amada", Conectado: "Conectada", Compasivo: "Compasiva", Cariñoso: "Cariñosa", Apreciado: "Apreciada", Íntimo: "Íntima",
  Confundido: "Confundida", Perdido: "Perdida", Indeciso: "Indecisa", Dubitativo: "Dubitativa", Desorientado: "Desorientada", Bloqueado: "Bloqueada",
}

export function emocionFemenina(e: string): string {
  return A_FEMENINO[e] ?? e
}

export const PREGUNTAS_POR_EMOCION: Record<string, string[]> = {
  // Alegría
  Feliz: ["¿Qué está contribuyendo a tu felicidad hoy?", "¿Cómo puedes nutrir este estado?", "¿Con quién quieres compartir esta alegría?"],
  Agradecida: ["¿Por qué te sientes agradecida hoy?", "¿Quién o qué contribuyó a este sentimiento?", "¿Cómo puedes expresar tu gratitud?"],
  Entusiasmada: ["¿Qué te genera este entusiasmo?", "¿Qué posibilidades ves adelante?", "¿Cuál es el primer paso que quieres dar?"],
  Esperanzada: ["¿Qué esperas que suceda?", "¿Qué te da esta esperanza?", "¿Qué puedes hacer hoy para apoyar esa esperanza?"],
  Orgullosa: ["¿De qué logro te sientes orgullosa?", "¿Qué dice esto sobre ti?", "¿Cómo quieres celebrarlo?"],
  Tranquila: ["¿Qué está generando esta tranquilidad?", "¿Cómo puedes mantener esta calma?", "¿Hay algo que quieras resolver desde este estado?"],
  // Tristeza
  Triste: ["¿Qué está detrás de tu tristeza hoy?", "¿Qué necesitas en este momento?", "¿Hay alguien con quien puedas hablar?"],
  Melancólica: ["¿Qué recuerdos o pensamientos aparecen?", "¿Qué extrañas o añoras?", "¿Cómo puedes honrar ese sentimiento?"],
  Decepcionada: ["¿Qué esperabas que fuera diferente?", "¿Qué aprendiste de esto?", "¿Cómo puedes cuidarte hoy?"],
  Sola: ["¿Cuándo empezaste a sentirte sola?", "¿Qué tipo de conexión necesitas ahora?", "¿Hay alguien a quien puedas contactar?"],
  Añorante: ["¿Qué o a quién añoras?", "¿Qué significaba eso para ti?", "¿Cómo puedes honrar ese recuerdo?"],
  Abatida: ["¿Qué te tiene tan agotada?", "¿Cuándo fue la última vez que te cuidaste?", "¿Qué es lo más pequeño que puedes hacer por ti ahora?"],
  // Ansiedad
  Ansiosa: ["¿Qué situación te genera ansiedad?", "¿Cuál es el peor escenario que imaginas?", "¿Qué está en tu control ahora mismo?"],
  Preocupada: ["¿Qué está en tu mente?", "¿Esta preocupación es sobre algo que puedes cambiar?", "¿Qué necesitas para sentirte más segura?"],
  Nerviosa: ["¿Qué evento o situación te pone nerviosa?", "¿Qué has manejado bien antes en situaciones similares?", "¿Qué te ayudaría a calmarte?"],
  Abrumada: ["¿Qué responsabilidades o pensamientos te pesan?", "¿Cuál es la prioridad más importante ahora?", "¿A qué puedes decir 'no' o delegar?"],
  Tensa: ["¿Dónde sientes la tensión en tu cuerpo?", "¿Qué situación la está generando?", "¿Cuándo fue la última vez que descansaste de verdad?"],
  Insegura: ["¿Sobre qué te sientes insegura?", "¿Qué evidencia tienes de tus capacidades?", "¿Quién te recuerda tu valor?"],
  // Enojo
  Enojada: ["¿Qué sucedió para que te sintieras así?", "¿Qué límite sientes que fue cruzado?", "¿Cómo puedes expresar esto de forma constructiva?"],
  Frustrada: ["¿Qué no está saliendo como esperabas?", "¿Qué está en tu control cambiar?", "¿Qué necesitas para avanzar?"],
  Irritada: ["¿Qué situación o persona te irritó?", "¿Hay algo más profundo detrás de esta irritación?", "¿Cómo puedes crear espacio para calmarte?"],
  Resentida: ["¿Hay algo que no has podido expresar?", "¿Este resentimiento te está afectando a ti?", "¿Qué necesitarías para empezar a soltar esto?"],
  Indignada: ["¿Qué injusticia o situación te generó esto?", "¿Cómo puedes canalizar esta energía positivamente?", "¿Hay algo concreto que puedas hacer?"],
  Impaciente: ["¿Con qué o quién te sientes impaciente?", "¿Qué expectativas tienes?", "¿Qué puedes controlar mientras esperas?"],
  // Miedo
  Asustada: ["¿Qué te genera miedo en este momento?", "¿Qué tan probable es que ese escenario ocurra?", "¿Qué te haría sentir más segura?"],
  Vulnerable: ["¿En qué área te sientes vulnerable?", "¿Hay alguien de confianza con quien compartir esto?", "¿Cómo puedes cuidarte ahora?"],
  Intimidada: ["¿Qué o quién te intimida?", "¿Qué recursos tienes para enfrentar esto?", "¿Cuál sería un pequeño paso valiente?"],
  Aprensiva: ["¿Qué cambio o situación te preocupa?", "¿Qué has superado antes que parecía difícil?", "¿Qué información te daría más claridad?"],
  Paralizada: ["¿Qué decisión o situación te tiene paralizada?", "¿Cuál es el paso más pequeño posible?", "¿Qué le dirías a una amiga en tu lugar?"],
  // Calma
  Calmada: ["¿Qué contribuye a tu calma hoy?", "¿Hay algo que quieras reflexionar desde este estado?", "¿Cómo puedes llevar esta calma a otras áreas?"],
  Serena: ["¿Qué prácticas te llevaron a esta serenidad?", "¿Qué quieres crear o decidir desde aquí?", "¿Cómo puedes compartir esto?"],
  Equilibrada: ["¿Qué áreas de tu vida se sienten en equilibrio?", "¿Hay algo que quieras ajustar?", "¿Qué quieres mantener?"],
  Centrada: ["¿Qué te ancla a tu centro hoy?", "¿Cuál es tu intención para las próximas horas?", "¿Qué quieres dejar ir?"],
  Presente: ["¿Qué estás apreciando en este momento?", "¿Qué sensaciones observas en tu cuerpo?", "¿Qué quieres hacer con esta presencia?"],
  Aceptada: ["¿Qué estás aceptando hoy?", "¿Cómo se siente soltar esa lucha?", "¿Qué viene después de la aceptación?"],
  // Amor
  Amada: ["¿Quién te hace sentir amada?", "¿Cómo recibes el amor?", "¿Cómo quieres honrar esa conexión?"],
  Conectada: ["¿Con quién o qué te sientes conectada?", "¿Qué nutre esa conexión?", "¿Cómo puedes profundizarla?"],
  Compasiva: ["¿Hacia quién diriges tu compasión hoy?", "¿Incluyes tu propia compasión hacia ti?", "¿Cómo puedes expresar esto?"],
  Cariñosa: ["¿Qué o quién despierta tu cariño?", "¿Cómo expresas ese cariño?", "¿Hay alguien que necesite recibirlo hoy?"],
  Apreciada: ["¿Quién o qué te hace sentir apreciada?", "¿Cómo recibes ese aprecio?", "¿A quién quieres apreciar tú hoy?"],
  Íntima: ["¿Qué tipo de intimidad buscas?", "¿Qué barreras sientes para conectar profundamente?", "¿Qué paso pequeño puedes dar?"],
  // Confusión
  Confundida: ["¿Qué situación te genera confusión?", "¿Qué información necesitas para aclarar?", "¿Con quién podrías hablar sobre esto?"],
  Perdida: ["¿En qué área de tu vida te sientes perdida?", "¿Qué valores te guían cuando no hay claridad?", "¿Cuál es el próximo paso aunque sea pequeño?"],
  Indecisa: ["¿Qué decisión te está costando tomar?", "¿Qué necesitas para decidir?", "¿Cuál opción se alinea más con quien quieres ser?"],
  Dubitativa: ["¿De qué dudas en este momento?", "¿Qué evidencia tienes a favor y en contra?", "¿Qué diría tu yo más sabio?"],
  Desorientada: ["¿Qué cambio o situación te desorientó?", "¿Qué sí está claro para ti?", "¿Qué rutina o práctica te ancla?"],
  Bloqueada: ["¿En qué área sientes el bloqueo?", "¿Qué crees que lo está causando?", "¿Qué harías si no tuvieras miedo a equivocarte?"],
}

export const PREGUNTAS_DEFAULT = [
  "¿Qué está generando este sentimiento?",
  "¿Qué necesitas en este momento?",
  "¿Qué acción pequeña puedes tomar hoy?",
]