# CHANGELOG · Mind the Gap

## v20 — Textos de examen y método basado en la evidencia
- **Readings estilo examen (C1 Advanced)**: 3 textos con el formato real: Part 5 (artículo de opinión sobre el PIB y el bienestar, 6 preguntas), Part 6 (cuatro opiniones sobre la semana de cuatro días, 4 preguntas) y Part 8 (cuatro profesionales y la IA, 10 preguntas). Cada pregunta explica el porqué tras responder. Fuentes: ONS, Comisión Europea, Autonomy y el handbook de Cambridge.
- **Rotación**: la lectura del día alterna dos textos de tus temas y uno de examen. Filtro "All / My interests / Exam style" en Reading.
- **Second chance**: las preguntas falladas se repiten al final de la misma ronda (además de volver en Review).
- **From Spanish** (Quick play): ves el significado en castellano y escribes la expresión en inglés, con pista opcional y aviso si fallas solo por ortografía. Las tarjetas de idioms y Work English en Review se repasan así (producir, no reconocer).
- Arreglo: "New for you" ya no muestra preguntas de puntos del temario aún no presentados.
- Sin cambios en el formato del progreso guardado (mtg-v1).

## v19 — Semana del 17 nov 2026: grandes obras y reuniones
- **Lectura nueva**: "London's Second Super Sewer" (Bazalgette y el Thames Tideway Tunnel), con glosario, 4 preguntas y fuentes oficiales (Thames Water, ficha técnica de Tideway, Costain, London Museum).
- **Real British**: 5 vídeos nuevos (English at Work 10 "Disagreeing", 6 Minute English "Are you unhappy at work?", Tideway/ICE, Mercedes "My Job in F1", Beyond The Grid con Tom Stallard).
- **Quick play**: 15 preguntas nuevas con explicación en castellano (6 phrasal verbs, 5 de gramática C1 con inversión y pasivas de opinión, 4 colocaciones) y nueva ronda **New for you**: 5 preguntas que nunca has visto.
- **Work English**: 10 términos de obra británicos (RAMS, hot works permit, variation, critical path…). 5 frases de shadowing para reuniones, 2 preguntas de speaking y 8 palabras de spelling.

## v18 — Diagnóstico y sincronización más fiable
- Ajustes muestra el estado real de la sincronización (✓ sincronizado + hora, ✗ error con el motivo, o sesión no activa) y un botón **Sync now**.
- La rueda de ajustes se pone ámbar si este dispositivo no tiene sesión iniciada (antes se veía igual que "solo local").
- Con la app abierta, mira cada 20 s si el otro dispositivo ha guardado algo; también al recuperar conexión.

## v17 · Sincronización sin pérdidas (16 nov 2026)

Problema: la sincronización era "gana entero el último que guarda". Si la app quedaba abierta en otro dispositivo (o en segundo plano) con datos antiguos, al tocar cualquier cosa subía ese estado viejo y borraba lo hecho ese día en el otro aparato. Además, lo pendiente de subir se perdía si se cerraba la app antes de 1,5 s.

- **Fusión por elementos** (`mergeState`): XP y días por máximo, paradas hechas por unión, tarjetas de repaso por marca de tiempo de cada tarjeta, puntos del temario, simulacros, redacciones, frases propias y preguntas vistas por unión. Los borrados se recuerdan para que no reaparezcan.
- Antes de **subir**, la app lee la nube y fusiona si otro dispositivo ha guardado.
- Al **volver a la app** se trae lo hecho en otros dispositivos; al **salir** se sube lo pendiente al instante.
- Marca de "cambios sin subir" que sobrevive a cerrar la app, y copia de seguridad local diaria (dos días).

## v16 · Phrasebook (16 nov 2026)

Nueva sección **Phrasebook** (icono de lupa arriba, o enlace en Hoy y en Review): un buscador sobre todas las expresiones de la app y las tuyas.

- Reúne en un solo sitio: frases propias, expresiones minadas de lecturas y audios, un banco nuevo de 86 expresiones de C1 por temas (`phrases.js`), idioms, vocabulario de trabajo, phrasal verbs, colocaciones, frases de Writing y Speaking y los ejemplos del temario de gramática.
- Búsqueda instantánea en inglés o en español (ignora tildes y mayúsculas), filtros por categoría y por "In review".
- **Learn** envía la expresión a la cola de repaso espaciado, donde se pide escribirla de memoria.
- **Añadir la tuya** con significado y ejemplo; con clave de Gemini, un botón rellena la ficha.
- Si no encuentra algo, **Gemini lo busca** (una petición): acepta inglés o español y devuelve hasta tres expresiones con significado, ejemplo y aviso de registro, para guardar con un toque.
- Funciona offline salvo las consultas a Gemini. Las frases propias se sincronizan entre móvil y PC (máximo 400).

## v15 · Entrenador del C1 Advanced (14 nov 2026)

La app pasa de ser un entrenador general de inglés a preparar el **C1 Advanced de Cambridge en papel** (fecha por defecto: 8 de mayo de 2027, editable en Ajustes). Se conserva todo el historial: progreso, tarjetas, redacciones y XP.

### Auditoría: qué se conserva, adapta o elimina
| Parte | Decisión | Por qué |
|---|---|---|
| Bancos de preguntas (wf, kwt, oc, mc, gram, pv, err, spell, work) | Se conservan | Son contenido original útil para el examen. |
| Repaso por cajas (0-6 días: 0,1,2,4,7,15,30) | Se adapta a 1, 3, 7, 16 y 35 días; al fallar vuelve a 1 | Intervalos más largos retienen mejor a largo plazo (Kim y Webb, 2022). Las tarjetas antiguas en cajas 6 pasan a la 5. |
| Tarjetas de autoevaluación ("Show answer") | Se sustituyen por respuesta escrita | Recuperar en vez de reconocer (Dunlosky et al., 2013). |
| Ruta diaria fija | Se sustituye por sesión de 45 min y plan semanal | Lo pedido en el documento. |
| "Use of English Mock" con nota estimada | Se convierte en bloque de práctica sin nota | Solo los exámenes oficiales miden; los ítems propios entrenan. |
| Nota estimada por destreza a partir de aciertos | Se reetiqueta como "precisión de práctica" | Mismo motivo. |
| Idiom Quickfire | Se mantiene solo con expresiones ya acertadas; las nuevas se aprenden sin reloj | Los juegos son para fluidez, no para contenido nuevo. |
| Corrección de writing | Se adapta: rango de nota, foto de la letra, reescritura obligatoria | El examen es en papel; la corrección no termina hasta reescribir. |
| Nivel C2 en prompts de IA | Se baja a C1 | El objetivo es el C1 Advanced. |

### Nuevo
- **Hoy**: cuenta atrás, fase del plan, avisos (diagnóstico, reescritura pendiente, simulacro debido, cola de corrección) y sesión con cronómetro por etapa.
- **Sesión de 45 min**: mix 5 · foco de lengua 12 · bloque de destreza 15 · input de interés 10 · cierre 3.
- **Plan semanal** (editable): L Reading · M Listening · X writing a mano 45 min · J reescritura · V Speaking · S bloque cronometrado Parts 1-4 · D descanso.
- **Fases** calculadas desde la fecha: diagnóstico (semana 1), base, consolidación (desde ~97 días antes), modo examen (~38), últimos 10 días sin contenido nuevo. Pantalla de decisión a ~45 días: si la media de los dos últimos simulacros oficiales no llega a 185, propone junio.
- **Mix de 5 minutos**: solo repasos pendientes, intercalados (nunca dos del mismo tipo seguidos), con respuesta escrita; si no hay, transformaciones y word formation ya vistas. Sin contenido nuevo.
- **Foco de lengua**: temario de 24 puntos de C1 (inversión, condicionales mixtos e invertidos, wish, modales perfectos, pasivas de reporte, causativa, cleft, gerundio/infinitivo, preposiciones, linkers, participios, subjuntivo, comparativos, word formation, colocaciones, phrasal verbs de tres partes, false friends, artículos e incontables, so/such, relativos, futuros). Cada punto: explicación en español, trampa del hispanohablante, ejemplos completos ANTES de practicar, bloque corto y luego mezclado con puntos anteriores, con aviso de que es normal fallar más.
- **Opción múltiple: primero escribe la respuesta**, luego ve las opciones (desactivable en Ajustes). En el bloque cronometrado no se aplica, para respetar el formato.
- **Writing**: guía de los 5 tipos (estructura, registro, banco de expresiones que se añade al repaso); flujo planificar 5 min → escribir a mano → foto o texto → corrección con IA en **una sola petición** (la foto se transcribe y corrige a la vez) con rango de nota → errores clasificados al repaso → **reescritura obligatoria al día siguiente** con los errores marcados pero sin la corrección; el modelo C1 se desbloquea al reescribir. Autoevaluación con los 4 criterios si no hay clave o cuota. Cola de corrección si falla la red.
- **Microejercicios de writing** (10 min): parafrasear, subir registro, unir con conectores, escribir solo la introducción.
- **Minar expresiones** tras cada lectura y audio: 3-5 chunks que pasan al repaso como hueco en su propia frase.
- **Cierre**: recuperar de memoria el punto del día y ver qué toca mañana.
- **Speaking**: 4/3/2 (mismo tema en 4, 3 y 2 min), Part 2 (comparar dos imágenes 1 min), banco de expresiones para discutir y acordar, recordatorio mensual de practicar con una persona.
- **Consejos**: una de cada tres veces pide recordar el método antes de enseñarlo.
- **Simulacros oficiales**: registro de notas por parte, conversión oficial a la Cambridge English Scale, histórico, enlace a sample papers. Es la única fuente de la nota estimada.
- **Mission control**: días, fase, nota por las 5 áreas frente a 180/190, hitos, riesgos, estado, errores más repetidos.
- **IA**: contador de peticiones diarias, aviso de privacidad del nivel gratuito, validación automática de ítems generados (un único hueco, respuestas cerradas, opciones distintas, ortografía británica), botón "Wrong question?" que retira un ítem para siempre, y botón para rellenar el colchón offline.
- **Repaso**: ninguna tarjeta queda programada más allá de 3 días antes del examen.

### Archivos
- `c1data.js` (nuevo): modelo del examen, temario, guías de writing, microejercicios y speaking.
- `app.js`: plan, vistas nuevas y cambios descritos arriba.
- `backend.js`: `imagesJSON` para enviar fotos a Gemini.
- `style.css`, `index.html`, `sw.js` (caché mtg-v15).

### Fuentes
- Formato y conversión de notas: cambridgeenglish.org (C1 Advanced exam format; Converting practice test scores to Cambridge English Scale scores).
- Fechas en papel 2027: cambridgeenglish.org/exams-and-tests/qualifications/exam-dates/
- Métodos: Dunlosky et al. (2013); Kim y Webb (2022); Nakata y Suzuki (2019); Nation (2007); Boers y Lindstromberg (2012); Kang y Han (2015); De Jong y Perfetti (2011).
