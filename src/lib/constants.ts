export const EMOCIONES = [
  {
    categoria: "Alegría",
    color: "#F59E0B",
    emoji: "😊",
    emociones: ["Feliz", "Agradecido", "Entusiasmado", "Esperanzado", "Orgulloso", "Tranquilo"],
  },
  {
    categoria: "Tristeza",
    color: "#3B82F6",
    emoji: "😢",
    emociones: ["Triste", "Melancólico", "Decepcionado", "Solo", "Añorante", "Abatido"],
  },
  {
    categoria: "Ansiedad",
    color: "#8B5CF6",
    emoji: "😰",
    emociones: ["Ansioso", "Preocupado", "Nervioso", "Abrumado", "Tenso", "Inseguro"],
  },
  {
    categoria: "Enojo",
    color: "#EF4444",
    emoji: "😠",
    emociones: ["Enojado", "Frustrado", "Irritado", "Resentido", "Indignado", "Impaciente"],
  },
  {
    categoria: "Miedo",
    color: "#6B7280",
    emoji: "😨",
    emociones: ["Asustado", "Inseguro", "Vulnerable", "Intimidado", "Aprensivo", "Paralizado"],
  },
  {
    categoria: "Calma",
    color: "#10B981",
    emoji: "😌",
    emociones: ["Calmado", "Sereno", "Equilibrado", "Centrado", "Presente", "Aceptado"],
  },
  {
    categoria: "Amor",
    color: "#EC4899",
    emoji: "🥰",
    emociones: ["Amado", "Conectado", "Compasivo", "Cariñoso", "Apreciado", "Íntimo"],
  },
  {
    categoria: "Confusión",
    color: "#F97316",
    emoji: "😵",
    emociones: ["Confundido", "Perdido", "Indeciso", "Dubitativo", "Desorientado", "Bloqueado"],
  },
] as const

export type CategoriaEmocion = (typeof EMOCIONES)[number]["categoria"]

export const PREGUNTAS_POR_EMOCION: Record<string, string[]> = {
  // Alegría
  Feliz: ["¿Qué está contribuyendo a tu felicidad hoy?", "¿Cómo puedes nutrir este estado?", "¿Con quién quieres compartir esta alegría?"],
  Agradecido: ["¿Por qué te sientes agradecido hoy?", "¿Quién o qué contribuyó a este sentimiento?", "¿Cómo puedes expresar tu gratitud?"],
  Entusiasmado: ["¿Qué te genera este entusiasmo?", "¿Qué posibilidades ves adelante?", "¿Cuál es el primer paso que quieres dar?"],
  Esperanzado: ["¿Qué esperas que suceda?", "¿Qué te da esta esperanza?", "¿Qué puedes hacer hoy para apoyar esa esperanza?"],
  Orgulloso: ["¿De qué logro te sientes orgulloso?", "¿Qué dice esto sobre ti?", "¿Cómo quieres celebrarlo?"],
  Tranquilo: ["¿Qué está generando esta tranquilidad?", "¿Cómo puedes mantener esta calma?", "¿Hay algo que quieras resolver desde este estado?"],
  // Tristeza
  Triste: ["¿Qué está detrás de tu tristeza hoy?", "¿Qué necesitas en este momento?", "¿Hay alguien con quien puedas hablar?"],
  Melancólico: ["¿Qué recuerdos o pensamientos aparecen?", "¿Qué extrañas o añoras?", "¿Cómo puedes honrar ese sentimiento?"],
  Decepcionado: ["¿Qué esperabas que fuera diferente?", "¿Qué aprendiste de esto?", "¿Cómo puedes cuidarte hoy?"],
  Solo: ["¿Cuándo empezaste a sentirte solo?", "¿Qué tipo de conexión necesitas ahora?", "¿Hay alguien a quien puedas contactar?"],
  Añorante: ["¿Qué o a quién añoras?", "¿Qué significaba eso para ti?", "¿Cómo puedes honrar ese recuerdo?"],
  Abatido: ["¿Qué te tiene tan agotado?", "¿Cuándo fue la última vez que te cuidaste?", "¿Qué es lo más pequeño que puedes hacer por ti ahora?"],
  // Ansiedad
  Ansioso: ["¿Qué situación te genera ansiedad?", "¿Cuál es el peor escenario que imaginas?", "¿Qué está en tu control ahora mismo?"],
  Preocupado: ["¿Qué está en tu mente?", "¿Esta preocupación es sobre algo que puedes cambiar?", "¿Qué necesitas para sentirte más seguro?"],
  Nervioso: ["¿Qué evento o situación te pone nervioso?", "¿Qué has manejado bien antes en situaciones similares?", "¿Qué te ayudaría a calmarte?"],
  Abrumado: ["¿Qué responsabilidades o pensamientos te pesan?", "¿Cuál es la prioridad más importante ahora?", "¿A qué puedes decir 'no' o delegar?"],
  Tenso: ["¿Dónde sientes la tensión en tu cuerpo?", "¿Qué situación la está generando?", "¿Cuándo fue la última vez que descansaste de verdad?"],
  Inseguro: ["¿Sobre qué te sientes inseguro?", "¿Qué evidencia tienes de tus capacidades?", "¿Quién te recuerda tu valor?"],
  // Enojo
  Enojado: ["¿Qué sucedió para que te sintieras así?", "¿Qué límite sientes que fue cruzado?", "¿Cómo puedes expresar esto de forma constructiva?"],
  Frustrado: ["¿Qué no está saliendo como esperabas?", "¿Qué está en tu control cambiar?", "¿Qué necesitas para avanzar?"],
  Irritado: ["¿Qué situación o persona te irritó?", "¿Hay algo más profundo detrás de esta irritación?", "¿Cómo puedes crear espacio para calmarte?"],
  Resentido: ["¿Hay algo que no has podido expresar?", "¿Este resentimiento te está afectando a ti?", "¿Qué necesitarías para empezar a soltar esto?"],
  Indignado: ["¿Qué injusticia o situación te generó esto?", "¿Cómo puedes canalizar esta energía positivamente?", "¿Hay algo concreto que puedas hacer?"],
  Impaciente: ["¿Con qué o quién te sientes impaciente?", "¿Qué expectativas tienes?", "¿Qué puedes controlar mientras esperas?"],
  // Miedo
  Asustado: ["¿Qué te genera miedo en este momento?", "¿Qué tan probable es que ese escenario ocurra?", "¿Qué te haría sentir más seguro?"],
  Vulnerable: ["¿En qué área te sientes vulnerable?", "¿Hay alguien de confianza con quien compartir esto?", "¿Cómo puedes cuidarte ahora?"],
  Intimidado: ["¿Qué o quién te intimida?", "¿Qué recursos tienes para enfrentar esto?", "¿Cuál sería un pequeño paso valiente?"],
  Aprensivo: ["¿Qué cambio o situación te preocupa?", "¿Qué has superado antes que parecía difícil?", "¿Qué información te daría más claridad?"],
  Paralizado: ["¿Qué decisión o situación te tiene paralizado?", "¿Cuál es el paso más pequeño posible?", "¿Qué le dirías a un amigo en tu lugar?"],
  // Calma
  Calmado: ["¿Qué contribuye a tu calma hoy?", "¿Hay algo que quieras reflexionar desde este estado?", "¿Cómo puedes llevar esta calma a otras áreas?"],
  Sereno: ["¿Qué prácticas te llevaron a esta serenidad?", "¿Qué quieres crear o decidir desde aquí?", "¿Cómo puedes compartir esto?"],
  Equilibrado: ["¿Qué áreas de tu vida se sienten en equilibrio?", "¿Hay algo que quieras ajustar?", "¿Qué quieres mantener?"],
  Centrado: ["¿Qué te ancla a tu centro hoy?", "¿Cuál es tu intención para las próximas horas?", "¿Qué quieres dejar ir?"],
  Presente: ["¿Qué estás apreciando en este momento?", "¿Qué sensaciones observas en tu cuerpo?", "¿Qué quieres hacer con esta presencia?"],
  Aceptado: ["¿Qué estás aceptando hoy?", "¿Cómo se siente soltar esa lucha?", "¿Qué viene después de la aceptación?"],
  // Amor
  Amado: ["¿Quién te hace sentir amado?", "¿Cómo recibes el amor?", "¿Cómo quieres honrar esa conexión?"],
  Conectado: ["¿Con quién o qué te sientes conectado?", "¿Qué nutre esa conexión?", "¿Cómo puedes profundizarla?"],
  Compasivo: ["¿Hacia quién diriges tu compasión hoy?", "¿Incluyes tu propia compasión hacia ti?", "¿Cómo puedes expresar esto?"],
  Cariñoso: ["¿Qué o quién despierta tu cariño?", "¿Cómo expresas ese cariño?", "¿Hay alguien que necesite recibirlo hoy?"],
  Apreciado: ["¿Quién o qué te hace sentir apreciado?", "¿Cómo recibes ese aprecio?", "¿A quién quieres apreciar tú hoy?"],
  Íntimo: ["¿Qué tipo de intimidad buscas?", "¿Qué barreras sientes para conectar profundamente?", "¿Qué paso pequeño puedes dar?"],
  // Confusión
  Confundido: ["¿Qué situación te genera confusión?", "¿Qué información necesitas para aclarar?", "¿Con quién podrías hablar sobre esto?"],
  Perdido: ["¿En qué área de tu vida te sientes perdido?", "¿Qué valores te guían cuando no hay claridad?", "¿Cuál es el próximo paso aunque sea pequeño?"],
  Indeciso: ["¿Qué decisión te está costando tomar?", "¿Qué necesitas para decidir?", "¿Cuál opción se alinea más con quien quieres ser?"],
  Dubitativo: ["¿De qué dudas en este momento?", "¿Qué evidencia tienes a favor y en contra?", "¿Qué diría tu yo más sabio?"],
  Desorientado: ["¿Qué cambio o situación te desorientó?", "¿Qué sí está claro para ti?", "¿Qué rutina o práctica te ancla?"],
  Bloqueado: ["¿En qué área sientes el bloqueo?", "¿Qué crees que lo está causando?", "¿Qué harías si no tuvieras miedo a equivocarte?"],
}

export const PREGUNTAS_DEFAULT = [
  "¿Qué está generando este sentimiento?",
  "¿Qué necesitas en este momento?",
  "¿Qué acción pequeña puedes tomar hoy?",
]
