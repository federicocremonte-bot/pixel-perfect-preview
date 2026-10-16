# Primera versión: Historia Electoral Argentina

Una experiencia interactiva para recorrer elecciones presidenciales, votar con boletas y recibir un perfil orientativo. Esta primera versión usa la elección de **1916** como ejemplo completo.

## Qué se va a ver

1. **Portada** (`/`)
   - Título editorial (ej. «Cada boleta, una época»), introducción breve y botón «Comenzar recorrido».
   - Explicación en 3 pasos: conocer, votar, descubrir tu perfil.
   - Vista previa de boletas de época en abanico.
   - Aviso: es una simulación histórica.

2. **Recorrido cronológico** (`/recorrido`)
   - Línea de tiempo 1916 → hoy. 1916 está activa; el resto aparece como «Próximamente».
   - Los períodos sin elecciones competitivas (golpes de 1930, 1943, 1955, 1966, 1976, proscripciones) se marcan de forma distinta, con una explicación corta.

3. **Ficha de la elección 1916** (`/eleccion/1916`)
   - Indicador de progreso: año, elección 1 de N.
   - Contexto: primera presidencial con la Ley Sáenz Peña (voto secreto y obligatorio para varones nativos y naturalizados), elección indirecta por Colegio Electoral.
   - Fichas de candidatos: Hipólito Yrigoyen (UCR), Ángel D. Rojas (conservadores), Lisandro de la Torre (Partido Demócrata Progresista), Juan B. Justo (Partido Socialista).
   - Cada ficha separa en pestañas: propuestas de campaña / ideas del partido / lo que hizo en el gobierno (solo para quien gobernó).
   - Fuentes al pie. Cualquier dato no confirmado lleva la etiqueta visible «Pendiente de verificación».

4. **Votación**
   - Boletas de papel ilustradas (estilo tipográfico de época, sin fotos inventadas; espacio para foto histórica cuando se consiga una con licencia libre).
   - Clic para seleccionar → la boleta se resalta → botón «Confirmar voto» → se puede volver a leer las fichas antes de confirmar.
   - Animación: el sobre baja a la urna.

5. **Resultados**
   - A. Resultado histórico oficial: votos populares y electores por candidatura, participación, breve explicación (con marca de verificación pendiente donde corresponda).
   - B. Votos de visitantes del sitio: cantidad real de participantes y gráfico de barras. Si no hay votos, se muestra «Todavía no hay datos suficientes».
   - Comparación entre tu voto y el ganador real.

6. **Tu perfil político a través de la historia** (`/perfil`)
   - Resumen de tus votos, patrones y una descripción orientativa.
   - Se calcula sobre ejes contextualizados por época (ej. ampliación de la participación, rol del Estado en la economía, reformas sociales), no por nombres de partidos.
   - Con una sola elección el resultado se declara **inconcluso** y se muestra un ejemplo ilustrativo claramente rotulado como tal.
   - Explicación de los criterios utilizados.

7. **Sobre el proyecto y fuentes** (`/sobre`)
   - Propósito, metodología, fuentes (Cámara Nacional Electoral, Dirección Nacional Electoral, bibliografía académica) y qué datos se guardan.

## Privacidad y votos reales

- Los votos de visitantes se guardan en **Lovable Cloud** (incluido gratis, sin cuentas externas). Solo se suma un contador por candidato y elección; no se guarda quién votó qué ni el historial de cada persona.
- Antes del primer voto se pide consentimiento para sumar el voto a las estadísticas anónimas. Si el usuario no acepta, puede jugar igual sin que se registre nada.
- El perfil se calcula solo en el navegador del visitante y no se guarda en el servidor.
- Se evita el doble voto básico recordando en el navegador que ya votó en esa elección.

## Diseño

- Paleta: marfil, blanco cálido, azul profundo, grises y acentos celestes. Sin degradados llamativos.
- Tipografía: serif editorial para títulos (ej. Fraunces o Playfair) y sans muy legible para textos (ej. Source Sans 3).
- Textura sutil de papel de archivo, filetes finos, numeración tipo expediente.
- Totalmente adaptado a celular y computadora.

## Detalles técnicos

- Rutas: `index`, `recorrido`, `eleccion.$anio`, `perfil`, `sobre`, cada una con su propio título y descripción.
- Datos históricos en un archivo de datos estructurado (`src/data/elecciones.ts`): elecciones, candidatos, propuestas, medidas, resultados, fuentes y un campo `verificado` por dato. Agregar una elección = agregar un objeto.
- Lovable Cloud: tabla `vote_counts (election_id, candidate_id, count)` con lectura pública y una función de servidor que incrementa atómicamente con validación de IDs contra los datos; sin escritura directa desde el navegador.
- Perfil: cada candidatura tiene puntajes por eje con justificación y fuente; el resultado exige un mínimo de elecciones votadas para dejar de ser «inconcluso».
- Estado del recorrido (votos propios) en el navegador; animaciones con CSS/transiciones discretas.
- Tests pequeños para: la regla de «inconcluso» y que el contador rechace candidatos inválidos.

## Después de esta versión

Ampliar elecciones (1922, 1928, 1931…), conseguir fotos de dominio público y verificar cifras contra fuentes oficiales.
