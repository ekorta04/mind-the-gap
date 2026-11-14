# Mind the Gap

Entrenador para aprobar con margen el **C1 Advanced de Cambridge (en papel)**. PWA instalable en iPhone y Windows. Cambios y motivos en `CHANGELOG.md`.

- **Sin conexión:** juegos, lecturas, listening (voz británica del sistema), dictados, simulacro, repaso y progreso.
- **Sincronización:** Supabase (mismo proyecto y usuario que *Finanzas*), tabla `mtg_state` (`supabase/mtg_state.sql`).
- **IA:** API de Gemini con tu clave gratuita de Google AI Studio (Ajustes ⚙ › AI). La clave se guarda solo en cada dispositivo.

## Archivos
- `index.html`: página principal.
- `data.js`: contenido base (preguntas, artículos, audios, writing).
- `es.js`: explicación en castellano de cada respuesta (qué significa y cuándo usarla). Las preguntas nuevas llevan su propio campo `es`.
- `extra.js`: contenido ampliado (inglés de trabajo, speaking, más lecturas y audios). Aquí van las mejoras de cada iteración.
- `c1data.js`: modelo del examen C1, temario, guías de writing y speaking.
- `app.js`: lógica.
- `backend.js`: sincronización (Supabase) e IA (Gemini).
- `style.css`: diseño.
- `sw.js`: caché sin conexión. **Al cambiar cualquier archivo, sube `CACHE` (mtg-v1 → mtg-v2…).**
