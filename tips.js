/* ===== CONSEJOS · Mind the Gap =====
   Método y consejos para cada tipo de ejercicio. Salen encima de cada pregunta
   para que se conviertan en costumbre y los apliques también en el examen real.
   - steps: el método, en orden ("primero haz esto").
   - tips: consejos generales (se van rotando, uno por pregunta).
   - ctx: consejos que solo salen si la pregunta concreta los necesita.
     re se prueba contra el texto de la pregunta (o contra la palabra clave en las transformaciones). */
const TIPS = {
  wf: {
    steps: [
      "Lee la frase entera antes de mirar la palabra en MAYÚSCULAS.",
      "Decide qué categoría falta: sustantivo, adjetivo, adverbio o verbo. Mira la palabra de antes y la de después.",
      "Decide si el sentido pide negativo (un-, in-, im-, ir-, dis-, mis-) o plural.",
      "Escribe y revisa la ortografía: dobles consonantes, -y → -i, la 'e' que desaparece."
    ],
    tips: [
      "Tras a/the o un posesivo (his, their) → sustantivo. Delante de un sustantivo → adjetivo. Si modifica un verbo o un adjetivo → adverbio (-ly).",
      "Muchas respuestas llevan DOS cambios (prefijo + sufijo): un-predict-ability. Si solo has hecho uno, sospecha.",
      "‘Despite’, ‘but’, ‘however’ o palabras negativas cerca suelen pedir un prefijo negativo.",
      "¿Cosa o persona? -ness, -ity, -ment, -tion = la cosa; -er, -or, -ist, -ant = la persona.",
      "Sin artículo y con el verbo en plural, el sustantivo va en plural. Es un error muy típico que cuesta el punto.",
      "Ortografía británica: -ise (organise), -our (behaviour), doble L (travelled, cancellation)."
    ],
    ctx: [
      {re:/\b(the|a|an|his|her|their|its|our|my|your|this|that)\s+___/i, tip:"Justo antes del hueco hay un determinante: casi seguro va un sustantivo (o un adjetivo si detrás viene otro sustantivo)."},
      {re:/___\s+(better|worse|more|less|higher|lower|faster|\w+er than)\b/i, tip:"El hueco va delante de un comparativo: necesitas un adverbio (considerably better, significantly higher)."},
      {re:/\b(has|have|had|is|are|was|were|been|be)\s+___\s+\w+(ed|en)\b/i, tip:"Entre el auxiliar y el participio va un adverbio (-ly): has dramatically improved."},
      {re:/\b(highly|very|extremely|so|quite|rather|proved|seemed|became|remain(ed)?|is|was|were|are)\s+___\s*[.,]/i, tip:"Después de un verbo como be/seem/prove o de un intensificador, suele ir un adjetivo."},
      {re:/\b(despite|although|but|however|unfair|not|without|lack)\b/i, tip:"Hay una idea de contraste o negativa en la frase: valora si la palabra necesita prefijo negativo."}
    ]
  },
  kwt: {
    steps: [
      "Lee la frase original y localiza qué idea falta entre el principio y el final de la nueva.",
      "Mira la palabra clave: ¿qué estructura exige? (unless → condicional, despite → -ing…). No la cambies nunca.",
      "Escribe 3–6 palabras (las contracciones cuentan como dos) y comprueba que significa EXACTAMENTE lo mismo y en el mismo tiempo."
    ],
    tips: [
      "Se puntúa en dos mitades (1 + 1): una gramatical y otra de vocabulario. Aunque no lo tengas todo, escribe lo que sepas.",
      "No repitas palabras que ya están antes o después del hueco.",
      "Mantén el tiempo verbal y el sujeto del original: si era pasado, tu respuesta también.",
      "Fíjate en lo que va justo después del hueco: si hay una preposición o un ‘to’, la palabra clave tiene que encajar con ella.",
      "Estructuras que más caen: pasiva, estilo indirecto, wish/if only, inversión, phrasal verbs, it's time, no point in -ing.",
      "Cuenta las palabras al final: con más de 6 la respuesta vale 0 aunque sea correcta."
    ],
    key: [
      {re:/^UNLESS$/, tip:"UNLESS = if… not. No añadas otro ‘not’: unless you hurry, nunca unless you don't hurry."},
      {re:/^(DESPITE|SPITE)$/, tip:"despite / in spite of + -ing o sustantivo, nunca + sujeto + verbo. Si necesitas frase: despite the fact that…"},
      {re:/^(WISH|ONLY)$/, tip:"wish / if only: un tiempo hacia atrás. Presente → pasado (I wish I knew); pasado → past perfect (I wish I had known)."},
      {re:/^RATHER$/, tip:"would rather + infinitivo sin to (I'd rather stay); would rather + otra persona + pasado (I'd rather you didn't)."},
      {re:/^(SOONER|HARDLY|SCARCELY|BARELY)$/, tip:"No sooner… than / Hardly… when + inversión con past perfect: No sooner had we arrived than…"},
      {re:/^(SUCH|SO)$/, tip:"so + adjetivo/adverbio; such (a) + adjetivo + sustantivo. Ambos van seguidos de ‘that’."},
      {re:/^(LIKELY|UNLIKELY|BOUND)$/, tip:"be (un)likely to / be bound to + infinitivo. El sujeto es la persona o cosa, no ‘it’: He is likely to win."},
      {re:/^(WORTH|POINT|USE)$/, tip:"it's worth -ing / there's no point (in) -ing / it's no use -ing."},
      {re:/^(BLAME|ACCUSED|DENIED|ADMITTED|APOLOGISED|INSISTED|SUGGESTED|CONGRATULATED|THREATENED|REFUSED)$/, tip:"Verbo de estilo indirecto: aplica su patrón. blame sb for -ing, accuse sb of -ing, deny -ing, apologise for -ing, insist on -ing, suggest -ing."},
      {re:/^(PREVENTED|STOPPED|PROHIBITED|BANNED)$/, tip:"prevent / stop sb from -ing. prohibit sb from -ing. ban sb from -ing."},
      {re:/^(SUCCEEDED|MANAGED|ABLE|CAPABLE)$/, tip:"succeed in -ing; manage to + infinitivo; be able to + infinitivo; be capable of -ing."},
      {re:/^(BY|BEEN|BEING)$/, tip:"Probablemente es una pasiva: be / been / being + participio (+ by quien lo hace). Mantén el tiempo del original."},
      {re:/^TIME$/, tip:"It's (high) time + sujeto + pasado: It's time we left."},
      {re:/^(MUST|CAN'T|CANNOT|MIGHT|MAY|COULD|SHOULD|NEEDN'T)$/, tip:"Si habla del pasado: modal + have + participio (must have been, should have told, needn't have bought)."},
      {re:/^(LONG|LONGER)$/, tip:"as long as = siempre que; no longer = ya no; it's a long time since + pasado."},
      {re:/^(ACCOUNT|DUE|OWING)$/, tip:"on account of / due to / owing to + sustantivo o -ing: expresan causa."},
      {re:/^(MATTER|HOWEVER|WHATEVER|NO)$/, tip:"no matter how/what/who… = however/whatever/whoever… Ejemplo: No matter how hard he tried…"}
    ]
  },
  oc: {
    steps: [
      "Lee la frase entera antes de escribir: el hueco depende de lo que viene DESPUÉS tanto como de lo de antes.",
      "Pregúntate qué tipo de palabra falta: preposición, artículo, pronombre, auxiliar, conector o parte de una expresión fija.",
      "Escribe UNA sola palabra y relee la frase completa con ella puesta."
    ],
    tips: [
      "Casi nunca es una palabra ‘de contenido’: busca palabras gramaticales (of, which, whose, though, such, had, been…).",
      "Piensa en expresiones fijas: in spite OF, as far AS, by no MEANS, on the WHOLE, AS well as, in CASE.",
      "Comparativos: as… AS, the more… THE more, more… THAN.",
      "Relativos: who / which / whose / where. Tras una coma nunca ‘that’. ‘whose’ = cuyo.",
      "Si dudas entre dos, comprueba la concordancia: singular/plural y tiempo verbal deciden."
    ],
    ctx: [
      {re:/^\s*(Never|Hardly|Scarcely|Rarely|Seldom|Little|Not only|No sooner|Only|Under no|At no|On no|Nowhere|Not until|___ (only|sooner|until))/i, tip:"La frase empieza con una expresión negativa o restrictiva: probablemente hay INVERSIÓN y falta un auxiliar (had, did, does, was)."},
      {re:/\bthe (more|less|\w+er)\b[^.]*___|___ (more|less|\w+er)\b[^.]*,\s*the\b/i, tip:"Estructura ‘the more…, the more…’: cada mitad empieza por ‘the’."},
      {re:/,\s*___\s/, tip:"El hueco va tras una coma: si es un relativo, usa which / who / whose, nunca ‘that’."},
      {re:/\bas ___\b|___ as\b/i, tip:"Hay un ‘as’ cerca: piensa en as… as, as far as, as long as, as though, such as."},
      {re:/___ (though|if)\b/i, tip:"Delante de though/if: even though, even if, as though, as if."},
      {re:/\b(spite|account|regardless|terms|charge|behalf)\b/i, tip:"Hay una expresión fija con preposición: in spite OF, on account OF, regardless OF, in terms OF, in charge OF, on behalf OF."}
    ]
  },
  mc: {
    steps: [
      "Lee la frase entera y fíjate sobre todo en la palabra que va justo DESPUÉS del hueco.",
      "Las 4 opciones significan casi lo mismo: no elijas por significado, sino por cuál ‘va’ con esas palabras.",
      "Prueba cada opción en voz baja con la palabra de al lado: la que suene a bloque fijo gana."
    ],
    tips: [
      "Verbos ‘vacíos’: make a decision/progress/an effort; do research/business/damage; take a risk/action; pay attention.",
      "Aprende en bloques, no palabras sueltas: heavy traffic, high risk, strong coffee, bitterly disappointed.",
      "Cuidado con los falsos amigos: actual = real, eventually = al final, sensible = sensato.",
      "Si dos opciones encajan por gramática, la diferencia suele estar en la colocación o en el registro.",
      "Descarta primero las que no admiten la estructura que sigue (+ -ing, + to, + that, + preposición)."
    ],
    ctx: [
      {re:/___\s+(of|for|to|with|on|in|at|from|about|by)\b/i, tip:m => `Detrás del hueco viene ‘${m[1].toLowerCase()}’: descarta las opciones que no se combinan con esa preposición.`},
      {re:/___\s+(a|an|the)?\s*(decision|progress|effort|mistake|research|damage|business|risk|action|attention|advantage|place|part)\b/i, tip:"Verbo + sustantivo: piensa en la colocación fija (make a decision, do damage, take action, pay attention, take part…)."},
      {re:/___\s+(that|to)\b/i, tip:"Después del hueco viene ‘that’ o ‘to’: comprueba qué opción admite esa estructura."}
    ]
  },
  pv: {
    steps: [
      "Lee toda la frase y piensa en español qué acción falta.",
      "Mira si hay objeto y dónde está: con pronombre va en medio (turn it down).",
      "Elige por la partícula: suele llevar el significado (up, down, out, off…)."
    ],
    tips: [
      "up = completar o aumentar (use up, speed up, back up). down = reducir o rechazar (cut down, turn down).",
      "out = descubrir o hasta el final (figure out, run out, sort out). off = cancelar, empezar, separar (call off, kick off, lay off).",
      "Con pronombre, siempre en medio: turn IT down, nunca turn down it.",
      "Casi todos tienen un equivalente formal: put off = postpone, find out = discover, carry out = perform. En una reunión los británicos dicen el phrasal.",
      "De tres piezas: come up with, get on with, put up with, look forward to (+ -ing)."
    ],
    ctx: [
      {re:/___\s+(it|them|him|her|me|us)\b/i, tip:"Hay un pronombre justo después: en los separables va en medio (verbo + pronombre + partícula)."},
      {re:/\b(meeting|deadline|match|launch|event|project)\b/i, tip:"Contexto de planificación: piensa en put off (aplazar), call off (cancelar), bring forward (adelantar), kick off (empezar)."}
    ]
  },
  gram: {
    steps: [
      "Busca la ‘pista’ estructural: if, wish, not only, hardly, by the time, used to, should have…",
      "Decide el tiempo y si es real o hipotético (pasado de verdad o ‘irreal’).",
      "Comprueba la concordancia con el resto: sujeto, tiempo y auxiliares."
    ],
    tips: [
      "Hipótesis = un tiempo hacia atrás: presente irreal → pasado; pasado irreal → past perfect.",
      "Modal + have + participio para el pasado: must have (seguro que), can't have (es imposible que), should have (debería haber).",
      "Las expresiones negativas al principio (Never, Rarely, Not only) llevan inversión: Never HAVE I seen…",
      "suggest / insist / essential that + sujeto + infinitivo sin to: It's vital that he BE there.",
      "used to + infinitivo = antes solía; be/get used to + -ing = estar/acostumbrarse."
    ],
    ctx: [
      {re:/^\s*(Not only|Never|Hardly|Scarcely|Rarely|Seldom|Little|No sooner|Only (when|after|by|then|if|in|once)|Under no|At no time|On no account|Nowhere|Not until|In no way)/i, tip:"Empieza con expresión negativa o restrictiva → INVERSIÓN: auxiliar + sujeto (Not only DID he…, Hardly HAD we…)."},
      {re:/^\s*the (more|less|\w+er)\b/i, tip:"Empieza por ‘The more…’: la segunda mitad repite la estructura con ‘the’ + comparativo (the harder you work, the better you get)."},
      {re:/\b(wish|if only)\b/i, tip:"wish / if only: presente → pasado simple (I wish I had); pasado → past perfect (I wish I'd known); queja sobre otro → would (I wish he would stop)."},
      {re:/\bif\b[^.]*\b(had|would have|'d have)\b|\b(had|would have)\b[^.]*\bif\b/i, tip:"Condicional con ‘had / would have’: si TODO es pasado, if + had + participio → would have + participio. Si el resultado es presente, es mixto: would + infinitivo."},
      {re:/\b(if|unless|provided|supposing|as long as)\b/i, tip:"Condicional: ¿es real (presente → will) o hipotético (pasado → would)? ¿Habla del pasado (had + participio)?"},
      {re:/\bby the time\b|\bby (next|the end|then|tomorrow|20\d\d)\b/i, tip:"‘By the time’ / ‘by + momento’ → tiempos perfectos: will have done (futuro) o had done (pasado)."},
      {re:/\b(used to|get used|be used|got used|is used|am used)\b/i, tip:"used to + infinitivo = antes solía; be/get used to + -ing = estar/acostumbrarse a."},
      {re:/\b(it's|it is) (high |about )?time\b/i, tip:"It's (high) time + sujeto + PASADO: It's time we went."},
      {re:/\b(would rather|'d rather)\b/i, tip:"would rather + infinitivo sin to; con otra persona + pasado: I'd rather you didn't."},
      {re:/\b(suggest|recommend|insist|demand|propose|essential|vital|crucial|imperative)\w*\b[^.]*\bthat\b/i, tip:"suggest / insist / essential that + sujeto + infinitivo sin to (that she CALL, that he BE) o should + infinitivo."},
      {re:/\b(had better|'d better)\b/i, tip:"had better + infinitivo sin to: You'd better leave."},
      {re:/\b(yesterday|last (week|night|year|month|time)|ago|by then|at the time)\b/i, tip:"Habla del pasado: si es deducción o crítica, modal + have + participio (must have been, should have told)."}
    ]
  },
  err: {
    steps: [
      "Lee la frase completa como si la hubieras escrito tú: ¿qué ‘suena’ traducido del español?",
      "Revisa en este orden: tiempo verbal, preposición, artículo, -ing/to, falso amigo, orden de palabras.",
      "Toca el trozo y luego elige la corrección. No ‘arregles’ lo que ya está bien."
    ],
    tips: [
      "for + duración, since + punto de inicio, y con presente perfecto: I've worked here for two years (no ‘I work here since’).",
      "Sin ‘the’ al generalizar: Life is hard, People think…, Engineers know… (no ‘The life’, ‘The people’).",
      "Tras preposición siempre -ing: look forward to MEETING, before LEAVING, instead of CALLING.",
      "Falsos amigos: actually (en realidad), assist (ayudar; asistir = attend), sensible (sensato), library (biblioteca), embarrassed (avergonzado).",
      "explain / suggest no llevan persona directa: explain TO me, suggest TO him (nunca ‘explain me’).",
      "Incontables: information, advice, equipment, news, feedback, furniture: sin plural y sin ‘an’."
    ],
    ctx: [
      {re:/\b(since|for)\b/i, tip:"Aparece since/for: comprueba que el tiempo sea presente perfecto y que for = duración, since = punto de inicio."},
      {re:/\b(informations?|advices?|equipments?|news|furnitures?|feedbacks?|knowledges?|researches|evidences?|luggages?)\b/i, tip:"Hay un incontable: no lleva plural, ni ‘a/an’, ni ‘many’ (use much / a lot of / a piece of)."},
      {re:/\b(explain|suggest|recommend|describe)\b/i, tip:"explain / suggest / recommend / describe: no van seguidos directamente de la persona (explain TO me)."},
      {re:/\b(actual|actually|assist|sensible|eventual|eventually|library|embarrassed|career|attend|pretend|sympathetic|lecture|carpet|agenda|exit|realise|discuss|constipated)\b/i, tip:"Hay un posible falso amigo: comprueba que la palabra significa lo que crees en inglés."},
      {re:/\barriv\w*\s+to\b|\bdepend\w*\s+(of|from)\b|\bmarried with\b|\binterested on\b|\bdiscuss about\b|\bconsist in\b/i, tip:"Revisa la preposición: arrive AT/IN, depend ON, married TO, interested IN, discuss (sin about)."},
      {re:/^\s*(The )?(life|people|nature|society|money|technology)\b/i, tip:"Generalización al principio: en inglés va sin ‘the’ (Life is…, People are…)."},
      {re:/\b(make|made|do|did|done)\b/i, tip:"make vs do: make = producir/crear (make a mistake/decision); do = actividad o tarea (do research/business/a favour)."},
      {re:/\b(look forward to|used to|object to|committed to|in addition to)\b/i, tip:"Ese ‘to’ es preposición: va seguido de -ing (look forward to hearing)."}
    ]
  },
  spell: {
    steps: [
      "Escucha la palabra y la frase de ejemplo: te dice el significado y si es verbo o sustantivo.",
      "Divídela en piezas (prefijo + raíz + sufijo, o sílabas) y escríbela pieza a pieza.",
      "Antes de comprobar, revisa los 3 puntos de error: dobles consonantes, vocal átona y terminación británica."
    ],
    tips: [
      "Británico: -our (colour), -re (centre), -ise (organise), -ll- (travelled), -ogue (catalogue), programme.",
      "Dobla la consonante final si la sílaba es tónica: begin → beginning, occur → occurred, refer → referred (pero offer → offered).",
      "Sustantivo -ce, verbo -se: practice / practise, licence / license, advice / advise.",
      "Usa ‘Slowly’ para la vocal átona, que es la que más falla: separate, definitely, grammar, independent.",
      "Las trampas clásicas: accommodation (cc + mm), necessary (1 c, 2 s), embarrass (rr + ss), committee (mm + tt + ee), occasion (cc, 1 s).",
      "-able vs -ible: si la raíz es una palabra completa suele ser -able (acceptable); si no, -ible (visible, possible)."
    ],
    ctx: []
  },
  idioms: {
    steps: [
      "Lee la expresión entera y localiza la ‘imagen’ (horse, ball, bush…): el significado es figurado.",
      "Descarta la opción literal: casi nunca es la buena.",
      "Imagina una reunión o un partido en el que lo dirías: si encaja, es esa."
    ],
    tips: [
      "Los idioms no se traducen palabra por palabra: busca el sentido figurado.",
      "Muchos vienen del deporte (move the goalposts, drop the ball, a level playing field) o del mar (on board, learn the ropes).",
      "Si conoces el equivalente español (no andarse por las ramas = not beat about the bush), úsalo para descartar.",
      "Registro: la mayoría son informales. Perfectos en una reunión, evítalos en un informe formal o en un Writing de Cambridge tipo report.",
      "Los que falles, escríbelos en una frase tuya de trabajo: así se quedan."
    ],
    ctx: []
  },
  work: {
    steps: [
      "Imagina la situación real: visita a obra, cliente, proveedor o parada de mantenimiento.",
      "Ojo con las palabras que parecen fáciles: en contexto técnico tienen un significado concreto (snag, sign off, lead time).",
      "Elige lo que diría un jefe de proyecto británico, no la traducción literal."
    ],
    tips: [
      "lead time = plazo de entrega; downtime = tiempo de parada; shutdown = parada programada.",
      "sign off = aprobar formalmente; hand over = entregar; snag list = lista de remates o defectos.",
      "chase (up) a supplier = reclamar, meter prisa; follow up = hacer seguimiento.",
      "En emails británicos se suaviza todo: Could you possibly…, I was wondering if…, Just a gentle reminder…",
      "up to code = cumple la normativa; as-built drawings = planos as-built; a quote = un presupuesto."
    ],
    ctx: []
  },
  mock: {
    steps: [
      "Reparte el tiempo: Partes 1 y 2 rápidas (≈6 min cada una) para dejar ≈10 min a la Parte 4.",
      "Lee siempre la frase entera antes de contestar, también con prisa.",
      "Si llevas más de 40 segundos en una, pon la mejor opción y sigue."
    ],
    tips: [
      "No dejes nada en blanco: las respuestas mal no restan.",
      "En la Parte 4 (transformaciones) puntúa cada mitad: escribe aunque no estés seguro de todo.",
      "Al final, repasa ortografía en la Parte 3: una letra mal = 0 puntos."
    ],
    ctx: []
  }
};

/* Texto de la pregunta sobre el que se buscan los consejos de contexto */
function tipSource(it) {
  if (it._t === "err") return (it.c || []).join(" ");
  if (it._t === "kwt") return [it.s1, it.pre, it.post].join(" ");
  if (it._t === "idioms" || it._t === "work") return it.t || "";
  return it.s || "";
}
/* Respuestas de la pregunta: un consejo que las contenga no se enseña (no queremos chivar la solución) */
function tipAnswers(it) {
  const a = it._t === "spell" ? [it.w] : (it._t === "idioms" || it._t === "work") ? [it.t, it.m] : (it._t === "mc" || it._t === "pv" || it._t === "gram") ? [it.o && it.o[it.a]] : it._t === "err" ? [it.o && it.o[it.a]] : (it.a || []);
  return a.filter(Boolean).map(x => String(x).toLowerCase().replace(/^to /, "").trim()).filter(x => x.length >= 4);
}
function tipSpoils(text, ans) { const t = text.toLowerCase(); return ans.some(a => new RegExp("(^|[^a-z])" + a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "([^a-z]|$)").test(t)); }
/* Consejo más útil para esta pregunta: primero el de la palabra clave / contexto, si no uno general rotando */
function tipFor(it, n = 0) {
  const T = TIPS[it._t]; if (!T) return null;
  const ans = tipAnswers(it), ok = (x) => x && !tipSpoils(x, ans);
  if (it._t === "kwt" && T.key) { const k = String(it.key || "").toUpperCase().trim(); const hit = T.key.find(x => x.re.test(k)); if (hit && ok(hit.tip)) return {ctx:true, text:hit.tip}; }
  const src = tipSource(it);
  for (const c of T.ctx || []) { const m = src.match(c.re); if (m) { const text = typeof c.tip === "function" ? c.tip(m) : c.tip; if (ok(text)) return {ctx:true, text}; } }
  for (let i = 0; i < T.tips.length; i++) { const text = T.tips[(n + i) % T.tips.length]; if (ok(text)) return {ctx:false, text}; }
  return null;
}
