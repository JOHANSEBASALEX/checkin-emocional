export const EMOCIONES = [
     {
       categoria: "Alegría",
       color: "#F59E0B",
       emoji: "😊",
       emociones: ["Alegría", "Gratitud", "Entusiasmo", "Esperanza", "Orgullo", "Ilusión", "Alivio", "Satisfacción"],
     },
     {
       categoria: "Tristeza",
       color: "#3B82F6",
       emoji: "😢",
       emociones: ["Tristeza", "Melancolía", "Decepción", "Soledad", "Añoranza", "Abatimiento", "Desánimo", "Vacío", "Culpa", "Duelo"],
     },
     {
       categoria: "Ansiedad",
       color: "#8B5CF6",
       emoji: "😰",
       emociones: ["Ansiedad", "Preocupación", "Nervios", "Agobio", "Tensión", "Inseguridad", "Estrés", "Agotamiento"],
     },
     {
       categoria: "Enojo",
       color: "#EF4444",
       emoji: "😠",
       emociones: ["Enojo", "Frustración", "Irritación", "Resentimiento", "Indignación", "Impaciencia", "Rabia", "Celos"],
     },
     {
       categoria: "Miedo",
       color: "#6B7280",
       emoji: "😨",
       emociones: ["Miedo", "Vulnerabilidad", "Intimidación", "Aprensión", "Parálisis", "Pánico", "Desconfianza", "Vergüenza"],
     },
     {
       categoria: "Calma",
       color: "#10B981",
       emoji: "😌",
       emociones: ["Calma", "Serenidad", "Equilibrio", "Estabilidad", "Presencia", "Aceptación", "Tranquilidad", "Paz"],
     },
     {
       categoria: "Amor",
       color: "#EC4899",
       emoji: "🥰",
       emociones: ["Amor", "Conexión", "Compasión", "Cariño", "Aprecio", "Intimidad", "Ternura", "Pertenencia"],
     },
     {
       categoria: "Confusión",
       color: "#F97316",
       emoji: "😵",
       emociones: ["Confusión", "Falta de rumbo", "Indecisión", "Duda", "Desorientación", "Bloqueo", "Saturación mental", "Incertidumbre"],
     },
   ] as const

   export type CategoriaEmocion = (typeof EMOCIONES)[number]["categoria"]

   // Traduce los nombres antiguos (masculinos y femeninos) guardados en check-ins viejos al nombre neutro actual
   const NOMBRES_ANTIGUOS: Record<string, string> = {
     Feliz: "Alegría", Agradecido: "Gratitud", Agradecida: "Gratitud", Entusiasmado: "Entusiasmo", Entusiasmada: "Entusiasmo", Esperanzado: "Esperanza", Esperanzada: "Esperanza", Orgulloso: "Orgullo", Orgullosa: "Orgullo", Tranquilo: "Tranquilidad", Tranquila: "Tranquilidad",
     Triste: "Tristeza", Melancólico: "Melancolía", Melancólica: "Melancolía", Decepcionado: "Decepción", Decepcionada: "Decepción", Solo: "Soledad", Sola: "Soledad", Añorante: "Añoranza", Abatido: "Abatimiento", Abatida: "Abatimiento",
     Ansioso: "Ansiedad", Ansiosa: "Ansiedad", Preocupado: "Preocupación", Preocupada: "Preocupación", Nervioso: "Nervios", Nerviosa: "Nervios", Abrumado: "Agobio", Abrumada: "Agobio", Tenso: "Tensión", Tensa: "Tensión", Inseguro: "Inseguridad", Insegura: "Inseguridad",
     Enojado: "Enojo", Enojada: "Enojo", Frustrado: "Frustración", Frustrada: "Frustración", Irritado: "Irritación", Irritada: "Irritación", Resentido: "Resentimiento", Resentida: "Resentimiento", Indignado: "Indignación", Indignada: "Indignación", Impaciente: "Impaciencia",
     Asustado: "Miedo", Asustada: "Miedo", Vulnerable: "Vulnerabilidad", Intimidado: "Intimidación", Intimidada: "Intimidación", Aprensivo: "Aprensión", Aprensiva: "Aprensión", Paralizado: "Parálisis", Paralizada: "Parálisis",
     Calmado: "Calma", Calmada: "Calma", Sereno: "Serenidad", Serena: "Serenidad", Equilibrado: "Equilibrio", Equilibrada: "Equilibrio", Centrado: "Estabilidad", Centrada: "Estabilidad", Presente: "Presencia", Aceptado: "Aceptación", Aceptada: "Aceptación",
     Amado: "Amor", Amada: "Amor", Conectado: "Conexión", Conectada: "Conexión", Compasivo: "Compasión", Compasiva: "Compasión", Cariñoso: "Cariño", Cariñosa: "Cariño", Apreciado: "Aprecio", Apreciada: "Aprecio", Íntimo: "Intimidad", Íntima: "Intimidad",
     Confundido: "Confusión", Confundida: "Confusión", Perdido: "Falta de rumbo", Perdida: "Falta de rumbo", Indeciso: "Indecisión", Indecisa: "Indecisión", Dubitativo: "Duda", Dubitativa: "Duda", Desorientado: "Desorientación", Desorientada: "Desorientación", Bloqueado: "Bloqueo", Bloqueada: "Bloqueo",
   }

   export function emocionFemenina(e: string): string {
     return NOMBRES_ANTIGUOS[e] ?? e
   }

   const PREGUNTAS_POR_CATEGORIA: Record<string, string[]> = {
     Alegría: [
       "¿Qué pasó hoy que te dejó esta sensación? Cuéntalo con detalle, como si se lo contaras a alguien cercano.",
       "¿Qué parte de ti, o de lo que hiciste, hizo posible este momento?",
       "¿Cómo podrías guardar este momento para recordarlo en un día más difícil?",
     ],
     Tristeza: [
       "Cuenta con tus palabras qué pasó o qué te tiene así. Puedes desahogarte: aquí no hay que ordenar nada.",
       "¿Qué necesitas en este momento, aunque no sepas bien cómo conseguirlo?",
       "¿Qué te daría un poco de alivio hoy, aunque sea pequeño?",
     ],
     Ansiedad: [
       "¿Qué es lo que tu mente no deja de repasar ahora mismo? Puedes escribirlo tal como viene, sin ordenarlo.",
       "De todo eso, ¿qué parte depende de ti hoy y qué parte no?",
       "¿Qué pequeño gesto podría darle a tu cuerpo un poco de seguridad en este momento?",
     ],
     Enojo: [
       "¿Qué pasó hoy, y qué sentiste que se estaba pasando por alto o cruzando un límite?",
       "Debajo del enojo muchas veces hay algo más: dolor, cansancio, ganas de que te escuchen. ¿Qué crees que hay en tu caso?",
       "¿Cómo podrías expresar esto, o darte un respiro mientras baja la intensidad, de una forma que no te cueste después?",
     ],
     Miedo: [
       "¿A qué le tienes miedo en este momento? Ponerle nombre ayuda a que pese menos.",
       "¿Qué te daría un poco más de seguridad ahora mismo?",
       "¿Con qué recursos o apoyos cuentas, aunque hoy cueste verlos?",
     ],
     Calma: [
       "¿Qué está ayudando a que hoy te sientas así?",
       "¿Dónde la sientes en el cuerpo? Quédate un momento ahí.",
       "¿Qué podrías hacer para volver a este lugar cuando el día se ponga difícil?",
     ],
     Amor: [
       "¿Quién o qué despierta esto en ti hoy?",
       "¿Cómo te llega ese afecto: lo recibes con facilidad o te cuesta un poco?",
       "¿Cómo podrías expresarlo o recibirlo hoy, aunque sea de una forma pequeña?",
     ],
     Confusión: [
       "¿Qué es lo que hoy no logras entender o decidir? Escríbelo aunque suene desordenado.",
       "Entre todo eso, ¿hay algo que sí tengas claro, por pequeño que sea?",
       "¿Qué paso pequeño, sin presión, podría darte un poco de claridad?",
     ],
   }

   const PREGUNTAS_ESPECIFICAS: Record<string, string[]> = {
     Tristeza: [
       "Cuenta con tus palabras qué pasó o qué te tiene así. Puedes desahogarte: aquí no hay que ordenar nada.",
       "¿Qué necesitas en este momento, aunque no sepas bien cómo conseguirlo?",
       "¿Qué te daría un poco de alivio hoy, aunque sea pequeño?",
     ],
     Soledad: [
       "¿Cuándo empezaste a notar esta soledad? ¿Es de hoy o viene de más atrás?",
       "¿Qué tipo de compañía te haría falta ahora: alguien que escuche, que acompañe en silencio, que te haga reír?",
       "¿Hay alguien a quien podrías escribirle hoy, aunque sea un mensaje corto?",
     ],
     Culpa: [
       "Cuenta con calma qué pasó y qué es lo que más te pesa de eso.",
       "¿Qué quisieras poder hacer o decir para sentirte en paz con esto?",
       "¿Hay algo que sí puedas reparar o cambiar, y algo que ya no depende de ti?",
     ],
     Vergüenza: [
       "¿Qué situación despertó esta vergüenza? Puedes contarla con las palabras que quieras.",
       "¿Qué temes que piensen de ti, y qué tan seguro es que sea así?",
       "¿Qué te gustaría que pasara de ahora en adelante con esta situación?",
     ],
     Duelo: [
       "¿A quién o a qué estás despidiendo? Si quieres, cuenta algo de eso que valoras.",
       "¿Cómo se siente este duelo en tu cuerpo y en tus días?",
       "No hay una forma correcta de atravesar esto. ¿Qué te acompañaría hoy: un recuerdo, un pequeño ritual, compañía?",
     ],
     Vacío: [
       "¿Cómo describirías este vacío? ¿Se parece más al cansancio, a la desconexión o a la falta de sentido?",
       "¿Hay algo que antes disfrutabas y hoy no te mueve?",
       "¿Qué cosa pequeña podría darle un poco de color a hoy? Y si este vacío se repite, vale la pena conversarlo con un profesional.",
     ],
     Desánimo: [
       "¿Qué fue lo que más te quitó las ganas hoy?",
       "¿Qué esperabas de este día y qué distancia hay con lo que pasó?",
       "¿Qué cosa pequeña, de menos de cinco minutos, podrías hacer para sentir que avanzaste algo?",
     ],
     Agotamiento: [
       "¿Qué te ha ido gastando la energía últimamente?",
       "¿Cuándo fue la última vez que descansaste de verdad, sin pendientes en la cabeza?",
       "¿Qué es lo más pequeño que podrías soltar hoy, o para lo que podrías pedir ayuda?",
     ],
     Estrés: [
       "¿Qué pendientes o presiones llevas encima ahora mismo?",
       "Si los ordenaras del más urgente al menos urgente, ¿cuál es el único que merece tu atención hoy?",
       "¿Qué pausa breve podrías darte antes de seguir?",
     ],
     Pánico: [
       "Ahora mismo, ¿qué notas en tu cuerpo? Los latidos, la respiración, las manos...",
       "Esta sensación es intensa, pero pasa. ¿Qué te ha ayudado antes en momentos así?",
       "¿Hay alguien cerca a quien puedas avisar que estás pasando por esto?",
     ],
   }

   export const PREGUNTAS_POR_EMOCION: Record<string, string[]> = Object.fromEntries(
     EMOCIONES.flatMap((c) => c.emociones.map((e) => [e, PREGUNTAS_ESPECIFICAS[e] ?? PREGUNTAS_POR_CATEGORIA[c.categoria]] as [string, string[]]))
   )

   export const PREGUNTAS_DEFAULT = [
     "¿Qué está pasando dentro de ti en este momento?",
     "¿Qué necesitas ahora, aunque no sepas cómo conseguirlo?",
     "¿Qué pequeño gesto de cuidado podrías tener contigo hoy?",
   ]
   