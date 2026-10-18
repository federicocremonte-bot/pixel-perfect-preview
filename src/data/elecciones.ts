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
  boleta?: EstiloBoleta;
};

// Apariencia de la boleta. Solo cargar colores con respaldo histórico; si no hay, queda en tinta negra.
export type EstiloBoleta = {
  color?: string; // color de identidad partidaria (CSS)
  colorSecundario?: string;
  notaColor: string; // de dónde sale el color, o por qué no se usa
  verificado: boolean;
};

export type Fuente = { titulo: string; url?: string };

export type Jurisdiccion = {
  id: string; // código del mapa (ISO 3166-2 sin "AR-")
  estado: "voto" | "territorio";
  ganador?: Dato<string>; // id de candidato; solo con fuente verificable
};

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
  jurisdicciones: Jurisdiccion[];
  notaMapa: string;
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
        boleta: { color: "oklch(0.5 0.19 27)", colorSecundario: "oklch(0.97 0.01 85)", notaColor: "Rojo y blanco: colores de la bandera radical usada desde la Revolución del Parque (1890) y la boina blanca. La impresión original de 1916 era tipográfica; el detalle exacto de esta boleta no está documentado.", verificado: false },
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
        boleta: { notaColor: "No encontramos documentación sobre colores propios en 1916: se muestra impresión sencilla en tinta negra.", verificado: false },
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
        boleta: { notaColor: "No encontramos documentación sobre colores propios en 1916: se muestra impresión sencilla en tinta negra.", verificado: false },
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
        boleta: { color: "oklch(0.45 0.17 25)", notaColor: "Rojo: color de la bandera del Partido Socialista. El diseño exacto de la boleta de 1916 no está documentado.", verificado: false },
      },
    ],
    participacion: { valor: "Cerca del 62 % del padrón", verificado: false },
    explicacion:
      "Yrigoyen ganó el voto popular, pero no obtuvo por sí solo la mayoría del Colegio Electoral. Su elección se definió cuando electores disidentes de Santa Fe se sumaron a su candidatura. Fue la primera vez que un partido opositor llegó al gobierno por elecciones.",
    fuentes: [
      { titulo: "Cámara Nacional Electoral — Estadísticas históricas", url: "https://www.electoral.gob.ar/" },
      { titulo: "Ley 8871 (Ley Sáenz Peña), 1912" },
      { titulo: "Botana, N. «El orden conservador». Sudamericana, 1977." },
      { titulo: "Rock, D. «El radicalismo argentino, 1890-1930». Amorrortu, 1977." },
    ],
    // 14 provincias + Capital Federal votaban; los territorios nacionales no elegían presidente.
    // Ganadores por distrito: sin cargar hasta verificarlos contra fuentes oficiales.
    jurisdicciones: [
      ..."B C K X W E Y F M A J D S G T".split(" ").map((id) => ({ id, estado: "voto" as const })),
      ..."H P N L Q R U Z V".split(" ").map((id) => ({ id, estado: "territorio" as const })),
    ],
    notaMapa:
      "En 1916 votaban la Capital Federal y 14 provincias. Chaco, Formosa, Misiones, La Pampa, Neuquén, Río Negro, Chubut, Santa Cruz y Tierra del Fuego eran territorios nacionales: sus habitantes no elegían presidente. El mapa usa los límites actuales; el antiguo Territorio de Los Andes (hoy repartido entre Jujuy, Salta y Catamarca) no puede dibujarse por separado.",
  },
  {
    id: "1922",
    anio: 1922,
    titulo: "La sucesión de Yrigoyen",
    tipo: "competitiva",
    contexto: [
      "Yrigoyen terminaba su primera presidencia (1916-1922) con fuerte arrastre popular, pero con un Congreso y varias provincias en disputa y tras conflictos obreros reprimidos, como la Semana Trágica y las huelgas patagónicas.",
      "La posguerra trajo caída de precios agropecuarios y tensiones sociales. Yrigoyen eligió como sucesor a Marcelo T. de Alvear, entonces embajador en Francia.",
      "Dentro del radicalismo crecían las críticas al liderazgo personal de Yrigoyen; en algunas provincias se presentaron listas radicales disidentes (UCR Principista).",
    ],
    sistema: [
      "Segunda elección presidencial bajo la Ley Sáenz Peña: voto secreto y obligatorio para varones argentinos mayores de 18 años. Las mujeres no votaban.",
      "Elección indirecta: 376 electores; hacían falta 189 para consagrar presidente.",
      "Comicios generales el 2 de abril de 1922, con complementarias el 16 de abril; Mendoza votó el 14 y el 28 de mayo.",
      "Los habitantes de los territorios nacionales no elegían presidente.",
    ],
    candidatos: [
      {
        id: "alvear",
        nombre: "Marcelo T. de Alvear",
        formula: "Elpidio González",
        partido: "Unión Cívica Radical",
        sigla: "UCR",
        trayectoria: "Abogado porteño de familia patricia, participó de la Revolución del Parque (1890). Diputado nacional y luego embajador en Francia durante el gobierno de Yrigoyen, quien impulsó su candidatura.",
        propuestas: [
          { valor: "Continuidad del gobierno radical surgido en 1916.", verificado: true },
          { valor: "No localizamos una plataforma electoral escrita propia de la fórmula: pendiente de búsqueda en prensa de la época.", verificado: false },
        ],
        ideasPartido: ["Defensa del sufragio libre y de la Constitución.", "Liderazgo de la «causa» radical frente al antiguo régimen."],
        gobierno: [
          { valor: "Gobernó entre 1922 y 1928, en un período de recuperación económica y crecimiento de las exportaciones.", verificado: true },
          { valor: "Su gestión profundizó la división del radicalismo entre «personalistas» (fieles a Yrigoyen) y «antipersonalistas», que formalizaron su propio partido en 1924.", verificado: true },
          { valor: "Creó la Dirección General de Yacimientos Petrolíferos Fiscales (YPF) como empresa estatal autónoma y nombró al general Enrique Mosconi al frente (1922).", verificado: true },
          { valor: "Detalle de políticas laborales, educativas y sociales de su gobierno: pendiente de documentar con fuentes académicas.", verificado: false },
        ],
        votos: { valor: 419170, verificado: false },
        electores: { valor: 216, verificado: false },
        ejes: { participacion: 1, estado: 1, social: 0 },
        justificacionEjes: "Continuidad del radicalismo en el gobierno, con iniciativas estatales como YPF, pero con un perfil más moderado que Yrigoyen en lo social.",
        boleta: { notaColor: "No encontramos documentación sobre el diseño o los colores de la boleta de 1922: se muestra impresión sencilla en tinta negra.", verificado: false },
      },
      {
        id: "pinero",
        nombre: "Norberto Piñero",
        formula: "Rafael Núñez",
        partido: "Concentración Nacional",
        sigla: "CN",
        trayectoria: "Jurista y político conservador, exministro de Hacienda. Encabezó la candidatura de la coalición de partidos conservadores y provinciales opuestos al radicalismo.",
        propuestas: [
          { valor: "Oposición al gobierno radical y defensa del orden liberal-conservador.", verificado: false },
        ],
        ideasPartido: ["Coalición de fuerzas conservadoras provinciales.", "Liberalismo económico."],
        votos: { valor: 231102, verificado: false },
        electores: { valor: 91, verificado: false },
        ejes: { participacion: -1, estado: -1, social: -1 },
        justificacionEjes: "Heredera del orden conservador previo a 1916, con un Estado de menor intervención.",
        boleta: { notaColor: "Sin documentación sobre colores propios: tinta negra.", verificado: false },
      },
      {
        id: "repetto",
        nombre: "Nicolás Repetto",
        formula: "Antonio de Tomaso",
        partido: "Partido Socialista",
        sigla: "PS",
        trayectoria: "Médico, uno de los dirigentes fundadores del socialismo argentino junto a Juan B. Justo. Había sido candidato a vicepresidente en 1916.",
        propuestas: [
          { valor: "Legislación laboral y social, en línea con el programa socialista.", verificado: false },
        ],
        ideasPartido: ["Socialismo reformista y parlamentario.", "Libre cambio y cooperativismo."],
        votos: { valor: 78472, verificado: false },
        electores: { valor: 22, verificado: false },
        ejes: { participacion: 2, estado: 1, social: 2 },
        justificacionEjes: "Agenda de ampliación de derechos y reformas laborales y sociales.",
        boleta: { color: "oklch(0.45 0.17 25)", notaColor: "Rojo: color de la bandera del Partido Socialista. El diseño exacto de la boleta de 1922 no está documentado.", verificado: false },
      },
      {
        id: "laurencena",
        nombre: "Miguel Laurencena",
        formula: "Pendiente de verificación",
        partido: "UCR Principista (radicales disidentes)",
        sigla: "UCR-P",
        trayectoria: "Dirigente radical entrerriano, exgobernador de Entre Ríos, crítico del liderazgo de Yrigoyen.",
        propuestas: [
          { valor: "Radicalismo opuesto al «personalismo» de Yrigoyen.", verificado: false },
        ],
        ideasPartido: ["Principios radicales sin conducción personal."],
        votos: { valor: 58749, verificado: false },
        electores: { valor: 33, verificado: false },
        ejes: { participacion: 1, estado: 0, social: 0 },
        justificacionEjes: "Radicalismo disidente, sin propuesta económica o social diferenciada documentada.",
        boleta: { notaColor: "Sin documentación sobre colores propios: tinta negra.", verificado: false },
      },
      {
        id: "ibarguren",
        nombre: "Carlos Ibarguren",
        formula: "Francisco Correa",
        partido: "Partido Demócrata Progresista",
        sigla: "PDP",
        trayectoria: "Abogado e historiador salteño, exministro de Justicia e Instrucción Pública. Años después se volcó al nacionalismo.",
        propuestas: [
          { valor: "Propuesta liberal reformista del PDP.", verificado: false },
        ],
        ideasPartido: ["Liberalismo reformista y democrático.", "Federalismo y autonomía municipal."],
        votos: { valor: 41841, verificado: false },
        electores: { valor: 14, verificado: false },
        ejes: { participacion: 1, estado: 0, social: 0 },
        justificacionEjes: "Reformismo institucional sin fuerte intervención estatal.",
        boleta: { notaColor: "Sin documentación sobre colores propios: tinta negra.", verificado: false },
      },
    ],
    participacion: { valor: "55,3 % del padrón (877.652 votantes sobre 1.586.366 inscriptos)", verificado: false },
    explicacion: "Alvear obtuvo la mayoría absoluta del Colegio Electoral (216 de 376 electores, se necesitaban 189) y asumió el 12 de octubre de 1922. Fue la elección presidencial con menor participación desde la Ley Sáenz Peña. Las cifras provienen de recopilaciones secundarias y no las contrastamos todavía con un documento oficial.",
    fuentes: [
      { titulo: "Dirección Nacional Electoral — Resultados electorales", url: "https://www.argentina.gob.ar/dine/resultados-electorales" },
      { titulo: "Wikipedia — Elecciones presidenciales de Argentina de 1922 (punto de partida, no fuente definitiva)", url: "https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Argentina_de_1922" },
      { titulo: "Ferrari, M. «Los que eligen. Colegios electorales y electores en tiempos de la República Verdadera. 1916, 1922, 1928». Estudios Sociales (UNL), 2005.", url: "https://bibliotecavirtual.unl.edu.ar/publicaciones/index.php/EstudiosSociales/en/article/download/2503/3564/6142" },
      { titulo: "Persello, A. V. «Historia del radicalismo». Edhasa, 2007." },
    ],
    jurisdicciones: [
      ..."B C K X W E Y F M A J D S G T".split(" ").map((id) => ({ id, estado: "voto" as const })),
      ..."H P N L Q R U Z V".split(" ").map((id) => ({ id, estado: "territorio" as const })),
    ],
    notaMapa: "En 1922 votaban la Capital Federal y 14 provincias; los territorios nacionales no elegían presidente. Ganadores por provincia: pendientes de verificar contra fuentes oficiales.",
  },
  {
    id: "1928",
    anio: 1928,
    titulo: "El regreso de Yrigoyen",
    tipo: "competitiva",
    contexto: [
      "Al final del gobierno de Alvear el radicalismo estaba partido: los «personalistas» seguían a Yrigoyen y los «antipersonalistas», con apoyo de sectores conservadores, formaron un frente opositor.",
      "La economía atravesaba una etapa de prosperidad exportadora. La cuestión del petróleo y su posible nacionalización fue un tema central de la campaña.",
      "Yrigoyen, con 75 años y salud declinante, volvió a ser candidato.",
    ],
    sistema: [
      "Ley Sáenz Peña: voto secreto y obligatorio para varones argentinos mayores de 18 años; las mujeres no votaban.",
      "Elección indirecta: 376 electores; 189 necesarios para ganar.",
      "Comicios generales el 1 de abril de 1928 y complementarias el 15 de abril.",
    ],
    candidatos: [
      {
        id: "yrigoyen1928",
        nombre: "Hipólito Yrigoyen",
        formula: "Francisco Beiró",
        partido: "Unión Cívica Radical",
        sigla: "UCR",
        trayectoria: "Expresidente (1916-1922) y líder del radicalismo personalista. Su compañero de fórmula, Francisco Beiró, era un dirigente radical entrerriano que murió tras la elección y antes de asumir.",
        propuestas: [
          { valor: "Nacionalización del petróleo bajo control estatal (proyecto impulsado por el radicalismo yrigoyenista en el Congreso).", verificado: false },
        ],
        ideasPartido: ["Reparación institucional y defensa del sufragio.", "Mayor presencia del Estado en los recursos estratégicos."],
        gobierno: [
          { valor: "Asumió el 12 de octubre de 1928. Francisco Beiró había muerto antes de asumir; la vicepresidencia la ocupó Enrique Martínez. La secuencia exacta de fechas y del procedimiento del Colegio Electoral está pendiente de verificar con fuente primaria.", verificado: false },
          { valor: "La crisis económica mundial de 1929 golpeó las exportaciones y las finanzas públicas.", verificado: true },
          { valor: "Fue derrocado por el golpe de Estado del 6 de septiembre de 1930, encabezado por el general José Félix Uriburu: la primera interrupción institucional del siglo XX.", verificado: true },
          { valor: "Las causas del golpe (crisis económica, parálisis del gobierno, conspiración conservadora y militar) siguen siendo objeto de debate historiográfico.", verificado: true },
        ],
        votos: { valor: 839140, verificado: false },
        electores: { valor: 249, verificado: false },
        ejes: { participacion: 2, estado: 2, social: 1 },
        justificacionEjes: "Liderazgo de base popular y propuesta de control estatal del petróleo.",
        boleta: { notaColor: "No encontramos documentación sobre el diseño o los colores de la boleta de 1928: tinta negra.", verificado: false },
      },
      {
        id: "melo",
        nombre: "Leopoldo Melo",
        formula: "Vicente C. Gallo",
        partido: "UCR Antipersonalista (Frente Único)",
        sigla: "UCR-A",
        trayectoria: "Abogado entrerriano, senador nacional y referente del radicalismo antipersonalista. Su candidatura recibió el apoyo de fuerzas conservadoras agrupadas en el Frente Único.",
        propuestas: [
          { valor: "Oposición al liderazgo personal de Yrigoyen.", verificado: true },
          { valor: "Postura sobre el petróleo y otras propuestas concretas: pendiente de documentar.", verificado: false },
        ],
        ideasPartido: ["Radicalismo sin conducción personalista.", "Alianza con sectores conservadores."],
        votos: { valor: 470740, verificado: false },
        electores: { valor: 124, verificado: false },
        ejes: { participacion: 0, estado: -1, social: -1 },
        justificacionEjes: "Coalición con sectores conservadores, más cercana al orden económico liberal.",
        boleta: { notaColor: "Sin documentación sobre colores propios: tinta negra.", verificado: false },
      },
      {
        id: "bravo",
        nombre: "Mario Bravo",
        formula: "Pendiente de verificación",
        partido: "Partido Socialista",
        sigla: "PS",
        trayectoria: "Abogado y poeta tucumano, legislador socialista por la Capital.",
        propuestas: [{ valor: "Programa socialista de legislación laboral y social.", verificado: false }],
        ideasPartido: ["Socialismo reformista y parlamentario."],
        votos: { valor: 56521, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: { participacion: 2, estado: 1, social: 2 },
        justificacionEjes: "Agenda de reformas laborales y sociales.",
        boleta: { color: "oklch(0.45 0.17 25)", notaColor: "Rojo: color de la bandera del Partido Socialista. El diseño exacto de la boleta de 1928 no está documentado.", verificado: false },
      },
    ],
    participacion: { valor: "80,9 % del padrón (1.461.605 votantes sobre 1.807.566 inscriptos)", verificado: false },
    explicacion: "Yrigoyen ganó con amplia ventaja en votos y en el Colegio Electoral (249 de 376 electores). El Partido Socialista Independiente, escindido del PS, también participó; su candidatura presidencial está pendiente de verificar. Las cifras provienen de recopilaciones secundarias y no las contrastamos todavía con un documento oficial.",
    fuentes: [
      { titulo: "Dirección Nacional Electoral — Resultados electorales", url: "https://www.argentina.gob.ar/dine/resultados-electorales" },
      { titulo: "Wikipedia — Elecciones presidenciales de Argentina de 1928 (punto de partida, no fuente definitiva)", url: "https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Argentina_de_1928" },
      { titulo: "Ferrari, M. «Los que eligen…». Estudios Sociales (UNL), 2005.", url: "https://bibliotecavirtual.unl.edu.ar/publicaciones/index.php/EstudiosSociales/en/article/download/2503/3564/6142" },
      { titulo: "Rock, D. «El radicalismo argentino, 1890-1930». Amorrortu, 1977." },
    ],
    jurisdicciones: [
      ..."B C K X W E Y F M A J D S G T".split(" ").map((id) => ({ id, estado: "voto" as const })),
      ..."H P N L Q R U Z V".split(" ").map((id) => ({ id, estado: "territorio" as const })),
    ],
    notaMapa: "En 1928 votaban la Capital Federal y 14 provincias; los territorios nacionales no elegían presidente. Ganadores por provincia: pendientes de verificar contra fuentes oficiales.",
  },
];

export const periodos: Periodo[] = [
  { anio: 1916, etiqueta: "Yrigoyen, primera elección con voto secreto", estado: "disponible" },
  { anio: 1922, etiqueta: "Alvear, sucesor de Yrigoyen", estado: "disponible" },
  { anio: 1928, etiqueta: "Regreso de Yrigoyen", estado: "disponible" },
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
