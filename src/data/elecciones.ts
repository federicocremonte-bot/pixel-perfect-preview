// Datos históricos. Para agregar una elección, sumá un objeto a `elecciones`.
// `verificado: false` muestra la etiqueta «Pendiente de verificación» en la web.

export type Dato<T> = { valor: T; verificado: boolean };
export type Eje = "participacion" | "estado" | "social";

export type Candidato = {
  id: string;
  nombre: string;
  formula: string; // vicepresidente
  partido: string;
  sigla: string;
  trayectoria: string;
  propuestas: Dato<string>[];
  ideasPartido: string[];
  gobierno?: Dato<string>[];
  votos: Dato<number>;
  electores: Dato<number>;
  ejes: Record<Eje, number>; // -2 a 2, interpretación orientativa
  justificacionEjes: string;
};

export type Fuente = { titulo: string; url?: string };

export type Eleccion = {
  id: string;
  anio: number;
  titulo: string;
  tipo: "competitiva";
  contexto: string[];
  sistema: string[];
  candidatos: Candidato[];
  participacion: Dato<string>;
  explicacion: string;
  fuentes: Fuente[];
};

export type Periodo = {
  anio: number;
  etiqueta: string;
  estado: "disponible" | "proximamente" | "interrupcion" | "restringida";
  nota?: string;
};

export const elecciones: Eleccion[] = [
  {
    id: "1916",
    anio: 1916,
    titulo: "La primera elección con voto secreto",
    tipo: "competitiva",
    contexto: [
      "Argentina llegaba a 1916 tras décadas de gobiernos del Partido Autonomista Nacional, sostenidos por un sistema de fraude y voto cantado.",
      "La Unión Cívica Radical, que había protagonizado revoluciones en 1890, 1893 y 1905 y se abstenía de votar, decidió participar tras la reforma electoral.",
      "El país vivía una fuerte inmigración europea, crecimiento agroexportador y nuevas demandas de los sectores medios y obreros urbanos.",
    ],
    sistema: [
      "Primera elección presidencial bajo la Ley Sáenz Peña (Ley 8871, 1912): voto secreto y obligatorio, con padrón militar y lista incompleta.",
      "Votaban los varones argentinos nativos y naturalizados mayores de 18 años. Las mujeres no votaban.",
      "La elección era indirecta: la ciudadanía elegía electores, y el Colegio Electoral designaba al presidente.",
    ],
    candidatos: [
      {
        id: "yrigoyen",
        nombre: "Hipólito Yrigoyen",
        formula: "Pelagio B. Luna",
        partido: "Unión Cívica Radical",
        sigla: "UCR",
        trayectoria:
          "Líder del radicalismo desde fines del siglo XIX. Impulsó la abstención electoral y las revoluciones contra el régimen conservador hasta lograr la reforma del sufragio.",
        propuestas: [
          { valor: "Defensa de la «reparación institucional»: respeto de la Constitución y del sufragio libre.", verificado: true },
          { valor: "El radicalismo no presentó un programa de gobierno detallado; se definía como «la causa» contra «el régimen».", verificado: true },
        ],
        ideasPartido: [
          "Moralidad administrativa y pureza del sufragio.",
          "Ampliación de la participación política de los sectores medios.",
        ],
        gobierno: [
          { valor: "Mantuvo la neutralidad argentina en la Primera Guerra Mundial.", verificado: true },
          { valor: "Respaldó la Reforma Universitaria de 1918.", verificado: true },
          { valor: "Realizó numerosas intervenciones federales a provincias.", verificado: true },
          { valor: "Su gobierno reprimió conflictos obreros como la Semana Trágica (1919) y las huelgas de la Patagonia (1920-1922).", verificado: true },
        ],
        votos: { valor: 340802, verificado: false },
        electores: { valor: 152, verificado: false },
        ejes: { participacion: 2, estado: 1, social: 1 },
        justificacionEjes:
          "Fuerte énfasis en la ampliación del voto; mayor intervención estatal que el régimen anterior; apertura moderada a demandas sociales.",
      },
      {
        id: "rojas",
        nombre: "Ángel D. Rojas",
        formula: "Juan E. Serú",
        partido: "Partido Conservador",
        sigla: "PC",
        trayectoria:
          "Dirigente conservador, exgobernador de San Juan. Representó a sectores del antiguo orden autonomista, con fuerte base en la provincia de Buenos Aires.",
        propuestas: [
          { valor: "Continuidad del modelo agroexportador y del orden institucional previo.", verificado: false },
        ],
        ideasPartido: [
          "Liberalismo económico y gobierno de las élites tradicionales.",
          "Prioridad del orden y la estabilidad.",
        ],
        votos: { valor: 153406, verificado: false },
        electores: { valor: 104, verificado: false },
        ejes: { participacion: -1, estado: -1, social: -1 },
        justificacionEjes:
          "Expresaba la continuidad del régimen previo a la reforma, con un Estado de menor intervención y poca apertura a reformas sociales.",
      },
      {
        id: "delatorre",
        nombre: "Lisandro de la Torre",
        formula: "Alejandro Carbó",
        partido: "Partido Demócrata Progresista",
        sigla: "PDP",
        trayectoria:
          "Abogado santafesino, fundador de la Liga del Sur. Había roto con el radicalismo y buscó construir una fuerza liberal reformista de alcance nacional.",
        propuestas: [
          { valor: "Partido moderno de ideas y programa, alternativo al radicalismo y al conservadurismo tradicional.", verificado: true },
          { valor: "Autonomía municipal y federalismo.", verificado: false },
        ],
        ideasPartido: [
          "Liberalismo reformista y democrático.",
          "Modernización institucional y transparencia.",
        ],
        votos: { valor: 123637, verificado: false },
        electores: { valor: 20, verificado: false },
        ejes: { participacion: 1, estado: 0, social: 1 },
        justificacionEjes:
          "Apoyaba la democratización y reformas institucionales, sin una propuesta fuerte de intervención estatal.",
      },
      {
        id: "justo",
        nombre: "Juan B. Justo",
        formula: "Nicolás Repetto",
        partido: "Partido Socialista",
        sigla: "PS",
        trayectoria:
          "Médico y fundador del Partido Socialista en 1896. Traductor de El Capital al castellano y diputado nacional por la Capital.",
        propuestas: [
          { valor: "Legislación laboral: jornada de ocho horas y protección del trabajo.", verificado: true },
          { valor: "Sufragio universal, incluyendo el voto femenino.", verificado: false },
        ],
        ideasPartido: [
          "Socialismo reformista y parlamentario.",
          "Libre cambio y cooperativismo.",
        ],
        votos: { valor: 52895, verificado: false },
        electores: { valor: 14, verificado: false },
        ejes: { participacion: 2, estado: 1, social: 2 },
        justificacionEjes:
          "Defendía la ampliación de derechos políticos y una agenda fuerte de reformas laborales y sociales.",
      },
    ],
    participacion: { valor: "Cerca del 62 % del padrón", verificado: false },
    explicacion:
      "Yrigoyen ganó el voto popular, pero no obtuvo por sí solo la mayoría del Colegio Electoral. Su elección se definió cuando electores disidentes de Santa Fe se sumaron a su candidatura. Fue la primera vez que un partido opositor llegó al gobierno por elecciones.",
    fuentes: [
      { title: "", titulo: "Cámara Nacional Electoral — Estadísticas históricas", url: "https://www.electoral.gob.ar/" } as unknown as Fuente,
      { titulo: "Ley 8871 (Ley Sáenz Peña), 1912" },
      { titulo: "Botana, N. «El orden conservador». Sudamericana, 1977." },
      { titulo: "Rock, D. «El radicalismo argentino, 1890-1930». Amorrortu, 1977." },
    ],
  },
];

export const periodos: Periodo[] = [
  { anio: 1916, etiqueta: "Yrigoyen, primera elección con voto secreto", estado: "disponible" },
  { anio: 1922, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 1928, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 1930, etiqueta: "Golpe de Estado", estado: "interrupcion", nota: "Derrocamiento de Yrigoyen. Primera interrupción institucional." },
  { anio: 1931, etiqueta: "«Década Infame»", estado: "restringida", nota: "Elecciones con proscripción radical y fraude." },
  { anio: 1937, etiqueta: "Elección con fraude", estado: "restringida", nota: "El fraude «patriótico» impide considerarla una elección libre." },
  { anio: 1943, etiqueta: "Golpe de Estado", estado: "interrupcion" },
  { anio: 1946, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 1951, etiqueta: "Primera con voto femenino", estado: "proximamente" },
  { anio: 1955, etiqueta: "Golpe de Estado", estado: "interrupcion" },
  { anio: 1958, etiqueta: "Elección con peronismo proscripto", estado: "restringida" },
  { anio: 1963, etiqueta: "Elección con peronismo proscripto", estado: "restringida" },
  { anio: 1966, etiqueta: "Golpe de Estado", estado: "interrupcion" },
  { anio: 1973, etiqueta: "Elecciones de marzo y septiembre", estado: "proximamente" },
  { anio: 1976, etiqueta: "Golpe de Estado y dictadura", estado: "interrupcion" },
  { anio: 1983, etiqueta: "Recuperación democrática", estado: "proximamente" },
  { anio: 1989, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 1995, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 1999, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 2003, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 2007, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 2011, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 2015, etiqueta: "Primer balotaje", estado: "proximamente" },
  { anio: 2019, etiqueta: "Elección presidencial", estado: "proximamente" },
  { anio: 2023, etiqueta: "Elección presidencial", estado: "proximamente" },
];

export const getEleccion = (id: string) => elecciones.find((e) => e.id === id);
export const totalDisponibles = elecciones.length;
