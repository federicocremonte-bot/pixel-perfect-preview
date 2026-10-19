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
  /** Advertencia visible: fraude, proscripción u otra restricción documentada. */
  restriccion?: string;
  /** true cuando no hubo Colegio Electoral (elección directa). */
  directa?: boolean;
  fecha?: string;
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
  {
    id: "1931", anio: 1931, fecha: "8 de noviembre de 1931",
    titulo: "Elecciones bajo el gobierno de facto", tipo: "competitiva",
    restriccion: "Elección no comparable con una elección libre: se realizó bajo el gobierno surgido del golpe de 1930, el gobierno vetó la fórmula radical Alvear–Güemes y la UCR se abstuvo. Hubo denuncias de fraude.",
    contexto: [
      "El 6 de septiembre de 1930 el general José Félix Uriburu derrocó a Yrigoyen e instaló un gobierno de facto.",
      "En abril de 1931 el radicalismo ganó la elección de gobernador de Buenos Aires; el gobierno la anuló.",
      "Para la elección presidencial, el gobierno vetó la fórmula radical encabezada por Marcelo T. de Alvear y la UCR decidió abstenerse.",
      "Así comenzó el período que el periodista José Luis Torres llamó «Década Infame», marcado por el fraude electoral.",
    ],
    sistema: [
      "Formalmente seguía vigente la Ley Sáenz Peña: voto secreto y obligatorio de varones mayores de 18 años, con Colegio Electoral.",
      "En la práctica, la proscripción de la fórmula radical y las denuncias de fraude limitaron la competencia.",
    ],
    candidatos: [
      {
        id: "justo1931", nombre: "Agustín P. Justo", formula: "Julio A. Roca (h.)", partido: "Concordancia (UCR Antipersonalista, Partido Demócrata Nacional y Partido Socialista Independiente)", sigla: "Concordancia",
        trayectoria: "General y exministro de Guerra de Alvear. Encabezó la alianza conservadora que gobernaría durante la década de 1930.",
        propuestas: [{ valor: "Orden institucional y normalización tras el gobierno de facto, con el respaldo de la coalición conservadora.", verificado: false }],
        ideasPartido: ["Liberalismo conservador.", "Gobierno de coalición entre conservadores y radicales antipersonalistas."],
        gobierno: [{ valor: "Firmó el Pacto Roca-Runciman con Gran Bretaña (1933).", verificado: true }, { valor: "Se crearon el Banco Central (1935) y juntas reguladoras de la producción.", verificado: true }],
        votos: { valor: 870840, verificado: false },
        electores: { valor: 237, verificado: false },
        ejes: { participacion: -2, estado: 0, social: -1 },
        justificacionEjes: "Llegó al poder en una elección con proscripción; durante su gobierno creció la regulación estatal (juntas reguladoras, Banco Central).",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "delatorre1931", nombre: "Lisandro de la Torre", formula: "Nicolás Repetto", partido: "Alianza Civil (Partido Demócrata Progresista y Partido Socialista)", sigla: "Alianza Civil",
        trayectoria: "Fundador del Partido Demócrata Progresista, rosarino. Su compañero Nicolás Repetto era dirigente del Partido Socialista.",
        propuestas: [{ valor: "Oposición al gobierno de facto y defensa de las libertades civiles.", verificado: false }],
        ideasPartido: ["Democracia progresista y reformismo socialista."],
        votos: { valor: 487584, verificado: false },
        electores: { valor: 122, verificado: false },
        ejes: { participacion: 2, estado: 1, social: 1 },
        justificacionEjes: "Coalición opositora que reclamaba elecciones libres y reformas sociales.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
    ],
    participacion: { valor: "73,8 % del padrón (1.562.033 votantes sobre 2.116.552 inscriptos)", verificado: false },
    explicacion: "Justo ganó en votos y en el Colegio Electoral. Con la UCR fuera de la elección, el resultado no refleja una competencia libre. Cifras de recopilaciones secundarias, todavía no contrastadas con documento oficial.",
    fuentes: [{ titulo: "Dirección Nacional Electoral — Resultados electorales", url: "https://www.argentina.gob.ar/dine/resultados-electorales" }, { titulo: "Wikipedia — Elecciones presidenciales de Argentina de 1931 (punto de partida, no fuente definitiva)", url: "https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Argentina_de_1931" }, { titulo: "Béjar, M. D. «El régimen fraudulento». Siglo XXI, 2005." }],
    jurisdicciones: [
      ..."B C K X W E Y F M A J D S G T".split(" ").map((id) => ({ id, estado: "voto" as const })),
      ..."H P N L Q R U Z V".split(" ").map((id) => ({ id, estado: "territorio" as const })),
    ],
    notaMapa: "En 1931 votaban la Capital Federal y 14 provincias; los territorios nacionales no elegían presidente. Ganadores por provincia: pendientes de verificar.",
  },
  {
    id: "1937", anio: 1937, fecha: "5 de septiembre de 1937",
    titulo: "El «fraude patriótico»", tipo: "competitiva",
    restriccion: "Elección con fraude documentado: historiadores y contemporáneos describen intimidación, voto controlado y manipulación del escrutinio, sobre todo en la provincia de Buenos Aires. El resultado no expresa una competencia libre.",
    contexto: [
      "La Concordancia gobernaba desde 1932. El radicalismo, encabezado por Alvear, había vuelto a presentarse a elecciones en 1935.",
      "Sectores oficialistas justificaban abiertamente el fraude como «patriótico», para impedir el regreso radical.",
      "La economía se recuperaba de la crisis de 1930 con mayor intervención del Estado.",
    ],
    sistema: [
      "Ley Sáenz Peña formalmente vigente, con Colegio Electoral; las mujeres no votaban.",
      "El fraude en varias provincias vació de contenido el voto secreto.",
    ],
    candidatos: [
      {
        id: "ortiz", nombre: "Roberto M. Ortiz", formula: "Ramón S. Castillo", partido: "Concordancia", sigla: "Concordancia",
        trayectoria: "Abogado, radical antipersonalista y exministro de Hacienda de Justo. Castillo era un dirigente conservador catamarqueño.",
        propuestas: [{ valor: "Continuidad del gobierno de la Concordancia.", verificado: false }],
        ideasPartido: ["Liberalismo conservador en coalición."],
        gobierno: [{ valor: "Intervino la provincia de Buenos Aires en 1940 para frenar el fraude.", verificado: true }, { valor: "Enfermo, delegó el mando en Castillo en 1940 y renunció en 1942.", verificado: true }],
        votos: { valor: 1097660, verificado: false },
        electores: { valor: 248, verificado: false },
        ejes: { participacion: -2, estado: 0, social: -1 },
        justificacionEjes: "Ganó mediante fraude; ya en el gobierno intentó limitarlo.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "alvear1937", nombre: "Marcelo T. de Alvear", formula: "Enrique Mosca", partido: "Unión Cívica Radical", sigla: "UCR",
        trayectoria: "Expresidente (1922-1928) y líder del radicalismo tras la muerte de Yrigoyen en 1933.",
        propuestas: [{ valor: "Restablecimiento del sufragio libre.", verificado: false }],
        ideasPartido: ["Reparación institucional y defensa del sufragio."],
        votos: { valor: 814750, verificado: false },
        electores: { valor: 127, verificado: false },
        ejes: { participacion: 2, estado: 0, social: 0 },
        justificacionEjes: "La bandera central era el voto libre frente al fraude.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "repetto1937", nombre: "Nicolás Repetto", formula: "Pendiente de verificación", partido: "Partido Socialista", sigla: "PS",
        trayectoria: "Médico y dirigente histórico del Partido Socialista.",
        propuestas: [{ valor: "Programa socialista de legislación laboral y social.", verificado: false }],
        ideasPartido: ["Socialismo reformista y parlamentario."],
        votos: { valor: 50952, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: { participacion: 2, estado: 1, social: 2 },
        justificacionEjes: "Agenda de reformas laborales y sociales.",
        boleta: { color: "oklch(0.45 0.17 25)", notaColor: "Rojo: color de la bandera del Partido Socialista. El diseño exacto de la boleta no está documentado.", verificado: false },
      },
    ],
    participacion: { valor: "76,2 % del padrón (2.035.839 votantes sobre 2.672.750 inscriptos)", verificado: false },
    explicacion: "La Concordancia se impuso en votos y en el Colegio Electoral. Como las cifras están afectadas por el fraude, no deben leerse como preferencia real del electorado. Cifras de recopilaciones secundarias.",
    fuentes: [{ titulo: "Dirección Nacional Electoral — Resultados electorales", url: "https://www.argentina.gob.ar/dine/resultados-electorales" }, { titulo: "Wikipedia — Elecciones presidenciales de Argentina de 1937 (punto de partida, no fuente definitiva)", url: "https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Argentina_de_1937" }, { titulo: "Béjar, M. D. «El régimen fraudulento». Siglo XXI, 2005." }],
    jurisdicciones: [
      ..."B C K X W E Y F M A J D S G T".split(" ").map((id) => ({ id, estado: "voto" as const })),
      ..."H P N L Q R U Z V".split(" ").map((id) => ({ id, estado: "territorio" as const })),
    ],
    notaMapa: "En 1937 votaban la Capital Federal y 14 provincias. Ganadores por provincia: pendientes de verificar.",
  },
  {
    id: "1946", anio: 1946, fecha: "24 de febrero de 1946",
    titulo: "Perón frente a la Unión Democrática", tipo: "competitiva",
    contexto: [
      "El golpe del 4 de junio de 1943 terminó con la Concordancia. Desde la Secretaría de Trabajo y Previsión, el coronel Juan D. Perón ganó apoyo sindical.",
      "El 17 de octubre de 1945 una gran movilización obrera reclamó su liberación tras ser detenido.",
      "La oposición se unió en la Unión Democrática. El embajador estadounidense Spruille Braden la apoyó públicamente; el peronismo respondió con la consigna «Braden o Perón».",
    ],
    sistema: [
      "Ley Sáenz Peña: voto secreto y obligatorio de varones mayores de 18 años; las mujeres todavía no votaban.",
      "Elección indirecta con Colegio Electoral.",
      "Es considerada en general una elección limpia en el escrutinio.",
    ],
    candidatos: [
      {
        id: "peron1946", nombre: "Juan Domingo Perón", formula: "Hortensio Quijano", partido: "Partido Laborista, UCR Junta Renovadora y Partido Independiente", sigla: "Laborista",
        trayectoria: "Coronel, exsecretario de Trabajo y vicepresidente del gobierno de facto. Quijano era un radical correntino que apoyó a Perón.",
        propuestas: [{ valor: "Justicia social y continuidad de los derechos laborales impulsados desde la Secretaría de Trabajo.", verificado: true }, { valor: "Soberanía económica e industrialización.", verificado: false }],
        ideasPartido: ["Laborismo y nacionalismo económico."],
        gobierno: [{ valor: "Nacionalizó los ferrocarriles y otros servicios (1946-1948).", verificado: true }, { valor: "Se sancionó el voto femenino (Ley 13.010, 1947).", verificado: true }, { valor: "Hubo persecución a opositores y control sobre la prensa.", verificado: true }, { valor: "Reforma constitucional de 1949.", verificado: true }],
        votos: { valor: 1485468, verificado: false },
        electores: { valor: 304, verificado: false },
        ejes: { participacion: 1, estado: 2, social: 2 },
        justificacionEjes: "Fuerte expansión de derechos laborales e intervención estatal.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "tamborini", nombre: "José P. Tamborini", formula: "Enrique Mosca", partido: "Unión Democrática (UCR, Partido Socialista, Partido Demócrata Progresista y Partido Comunista)", sigla: "UD",
        trayectoria: "Médico y dirigente radical porteño, exministro de Alvear.",
        propuestas: [{ valor: "Restablecimiento pleno de las instituciones y oposición al régimen surgido en 1943.", verificado: false }],
        ideasPartido: ["Liberalismo democrático y antifascismo."],
        votos: { valor: 1262630, verificado: false },
        electores: { valor: 72, verificado: false },
        ejes: { participacion: 1, estado: 0, social: 0 },
        justificacionEjes: "Coalición amplia centrada en la defensa institucional; heterogénea en lo económico.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
    ],
    participacion: { valor: "81,2 % del padrón (2.823.759 votantes sobre 3.477.169 inscriptos)", verificado: false },
    explicacion: "Perón ganó en votos y obtuvo amplia mayoría en el Colegio Electoral. Cifras de recopilaciones secundarias, no contrastadas todavía con documento oficial.",
    fuentes: [{ titulo: "Dirección Nacional Electoral — Resultados electorales", url: "https://www.argentina.gob.ar/dine/resultados-electorales" }, { titulo: "Wikipedia — Elecciones presidenciales de Argentina de 1946 (punto de partida, no fuente definitiva)", url: "https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Argentina_de_1946" }, { titulo: "Luna, F. «El 45». Sudamericana, 1969." }, { titulo: "Torre, J. C. «La vieja guardia sindical y Perón». Sudamericana, 1990." }],
    jurisdicciones: [
      ..."B C K X W E Y F M A J D S G T".split(" ").map((id) => ({ id, estado: "voto" as const })),
      ..."H P N L Q R U Z V".split(" ").map((id) => ({ id, estado: "territorio" as const })),
    ],
    notaMapa: "En 1946 votaban la Capital Federal y 14 provincias; los territorios nacionales no elegían presidente. Ganadores por provincia: pendientes de verificar.",
  },
  {
    id: "1951", anio: 1951, fecha: "11 de noviembre de 1951", directa: true,
    titulo: "Primera elección con voto femenino", tipo: "competitiva",
    restriccion: "Elección con fuertes limitaciones para la oposición: restricciones a la prensa, dirigentes opositores detenidos y desigual acceso a la radio. Balbín hizo campaña tras haber estado preso.",
    contexto: [
      "La Constitución de 1949 permitió la reelección presidencial y estableció la elección directa.",
      "Las mujeres votaron por primera vez en una elección presidencial, gracias a la Ley 13.010 de 1947.",
      "Eva Perón renunció a su candidatura a vicepresidenta en agosto de 1951; murió en julio de 1952.",
      "En septiembre de 1951 fracasó un intento de golpe encabezado por el general Benjamín Menéndez.",
    ],
    sistema: [
      "Elección directa del presidente, sin Colegio Electoral (Constitución de 1949).",
      "Voto secreto y obligatorio para varones y mujeres mayores de 18 años.",
    ],
    candidatos: [
      {
        id: "peron1951", nombre: "Juan Domingo Perón", formula: "Hortensio Quijano", partido: "Partido Peronista", sigla: "PP",
        trayectoria: "Presidente en ejercicio, candidato a la reelección. Quijano murió en 1952, antes de asumir el segundo mandato.",
        propuestas: [{ valor: "Continuidad de la «Nueva Argentina» y del Segundo Plan Quinquenal.", verificado: false }],
        ideasPartido: ["Justicialismo: justicia social, independencia económica y soberanía política."],
        gobierno: [{ valor: "Fue derrocado por el golpe de Estado de septiembre de 1955 (autodenominado «Revolución Libertadora»).", verificado: true }],
        votos: { valor: 4745168, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: { participacion: 1, estado: 2, social: 2 },
        justificacionEjes: "Continuidad de la intervención estatal y los derechos sociales, con restricciones a la oposición.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "balbin", nombre: "Ricardo Balbín", formula: "Arturo Frondizi", partido: "Unión Cívica Radical", sigla: "UCR",
        trayectoria: "Abogado y dirigente radical bonaerense; Frondizi era diputado porteño.",
        propuestas: [{ valor: "Defensa de las libertades públicas frente al gobierno.", verificado: false }],
        ideasPartido: ["Radicalismo intransigente."],
        votos: { valor: 2415750, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: { participacion: 2, estado: 1, social: 1 },
        justificacionEjes: "Centrada en libertades civiles; programa económico con intervención estatal moderada.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "pastor", nombre: "Reynaldo Pastor", formula: "Pendiente de verificación", partido: "Partido Demócrata Nacional", sigla: "PDN",
        trayectoria: "Dirigente conservador puntano.",
        propuestas: [{ valor: "Programa conservador: pendiente de documentar.", verificado: false }],
        ideasPartido: ["Conservadurismo liberal."],
        votos: { valor: 174399, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: { participacion: 0, estado: -2, social: -1 },
        justificacionEjes: "Defensa de la economía de mercado.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "ghioldi", nombre: "Rodolfo Ghioldi", formula: "Alcira de la Peña", partido: "Partido Comunista", sigla: "PC",
        trayectoria: "Dirigente histórico del comunismo argentino.",
        propuestas: [{ valor: "Programa comunista: pendiente de documentar.", verificado: false }],
        ideasPartido: ["Marxismo-leninismo."],
        votos: { valor: 71318, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: { participacion: 1, estado: 2, social: 2 },
        justificacionEjes: "Estatización de la economía y reformas sociales radicales.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "palacios", nombre: "Alfredo L. Palacios", formula: "Américo Ghioldi", partido: "Partido Socialista", sigla: "PS",
        trayectoria: "Abogado, primer diputado socialista de América (1904).",
        propuestas: [{ valor: "Programa socialista democrático y oposición al gobierno.", verificado: false }],
        ideasPartido: ["Socialismo reformista y parlamentario."],
        votos: { valor: 54920, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: { participacion: 2, estado: 1, social: 2 },
        justificacionEjes: "Agenda de reformas laborales con defensa institucional.",
        boleta: { color: "oklch(0.45 0.17 25)", notaColor: "Rojo: color de la bandera del Partido Socialista. El diseño exacto de la boleta no está documentado.", verificado: false },
      },
    ],
    participacion: { valor: "88,2 % del padrón (7.594.148 votantes sobre 8.613.998 inscriptos)", verificado: false },
    explicacion: "Perón fue reelecto en elección directa. Votaron por primera vez las mujeres, lo que casi triplicó el padrón. Cifras de recopilaciones secundarias.",
    fuentes: [{ titulo: "Dirección Nacional Electoral — Resultados electorales", url: "https://www.argentina.gob.ar/dine/resultados-electorales" }, { titulo: "Wikipedia — Elecciones presidenciales de Argentina de 1951 (punto de partida, no fuente definitiva)", url: "https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Argentina_de_1951" }, { titulo: "Ley 13.010 de sufragio femenino (1947) — InfoLEG", url: "https://www.argentina.gob.ar/normativa/nacional/ley-13010-205904" }],
    jurisdicciones: [
      ..."B C K X W E Y F M A J D S G T H L".split(" ").map((id) => ({ id, estado: "voto" as const })),
      ..."P N Q R U Z V".split(" ").map((id) => ({ id, estado: "territorio" as const })),
    ],
    notaMapa: "Chaco y La Pampa se convirtieron en provincias en 1951. La participación de los habitantes de los demás territorios nacionales está pendiente de verificar. Ganadores por provincia: pendientes de verificar.",
  },
  {
    id: "1958", anio: 1958, fecha: "23 de febrero de 1958",
    titulo: "Frondizi y el pacto con Perón", tipo: "competitiva",
    restriccion: "Elección con el peronismo proscripto: el partido mayoritario no pudo presentarse. Perón, exiliado, ordenó votar a Frondizi según un acuerdo cuya existencia y alcance siguen discutiéndose.",
    contexto: [
      "En septiembre de 1955 un golpe militar, autodenominado «Revolución Libertadora», derrocó a Perón. El peronismo fue proscripto y en 1956 hubo fusilamientos tras un levantamiento.",
      "En 1956 se derogó la Constitución de 1949 y en 1957 se volvió a aplicar el texto de 1853 con reformas.",
      "La UCR se dividió en 1957: la UCR Intransigente de Frondizi y la UCR del Pueblo de Balbín.",
    ],
    sistema: [
      "Volvió la elección indirecta con Colegio Electoral (Constitución de 1853).",
      "Voto secreto y obligatorio para varones y mujeres mayores de 18 años.",
      "El voto en blanco fue utilizado como forma de protesta por parte del peronismo.",
    ],
    candidatos: [
      {
        id: "frondizi", nombre: "Arturo Frondizi", formula: "Alejandro Gómez", partido: "Unión Cívica Radical Intransigente", sigla: "UCRI",
        trayectoria: "Abogado, diputado y candidato a vicepresidente en 1951. Lideró el sector intransigente del radicalismo.",
        propuestas: [{ valor: "Desarrollismo: industria pesada, petróleo y siderurgia con inversión extranjera.", verificado: true }, { valor: "Integración del peronismo a la vida política.", verificado: false }],
        ideasPartido: ["Desarrollismo e integracionismo."],
        gobierno: [{ valor: "Firmó contratos petroleros con empresas extranjeras (1958).", verificado: true }, { valor: "Fue derrocado por las Fuerzas Armadas en marzo de 1962, tras el triunfo peronista en elecciones provinciales.", verificado: true }],
        votos: { valor: 4070398, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: {{ participacion: 1, estado: 1, social: 1 }},
        justificacionEjes: "Promovía levantar la proscripción e impulsar la industria con un Estado planificador.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "balbin1958", nombre: "Ricardo Balbín", formula: "Santiago del Castillo", partido: "Unión Cívica Radical del Pueblo", sigla: "UCRP",
        trayectoria: "Dirigente radical bonaerense, candidato presidencial en 1951.",
        propuestas: [{ valor: "Continuidad institucional y respeto de las libertades públicas.", verificado: false }],
        ideasPartido: ["Radicalismo tradicional."],
        votos: { valor: 2617693, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: {{ participacion: 0, estado: 1, social: 0 }},
        justificacionEjes: "Cercano al gobierno de la Revolución Libertadora; sin propuesta de levantar la proscripción.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "ayarragaray", nombre: "Lucas Ayarragaray", formula: "Pendiente de verificación", partido: "Partido Demócrata Cristiano", sigla: "PDC",
        trayectoria: "Dirigente demócrata cristiano.",
        propuestas: [{ valor: "Programa demócrata cristiano: pendiente de documentar.", verificado: false }],
        ideasPartido: ["Humanismo cristiano."],
        votos: { valor: 285650, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: {{ participacion: 0, estado: 0, social: 1 }},
        justificacionEjes: "Doctrina social de la Iglesia.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "palacios1958", nombre: "Alfredo L. Palacios", formula: "Pendiente de verificación", partido: "Partido Socialista", sigla: "PS",
        trayectoria: "Abogado, primer diputado socialista de América (1904). Embajador en Uruguay durante la Revolución Libertadora.",
        propuestas: [{ valor: "Programa socialista democrático.", verificado: false }],
        ideasPartido: ["Socialismo reformista."],
        votos: { valor: 264721, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: {{ participacion: 0, estado: 1, social: 2 }},
        justificacionEjes: "Reformas laborales; apoyó el gobierno que proscribió al peronismo.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
    ],
    participacion: { valor: "90,9 % del padrón (9.088.497 votantes sobre 10.002.327 inscriptos); 841.400 votos en blanco (9,3 %)", verificado: false },
    explicacion: "Frondizi ganó con casi la mitad de los votos, con apoyo del electorado peronista. Cifras de recopilaciones secundarias; electores pendientes de verificar.",
    fuentes: [{ titulo: "Dirección Nacional Electoral — Resultados electorales", url: "https://www.argentina.gob.ar/dine/resultados-electorales" }, { titulo: "Wikipedia — Elecciones presidenciales de Argentina de 1958 (punto de partida, no fuente definitiva)", url: "https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Argentina_de_1958" }, { titulo: "Rouquié, A. «Poder militar y sociedad política en la Argentina». Emecé, 1982." }],
    jurisdicciones: [
      ..."B C K X W E Y F M A J D S G T H L N P Q U".split(" ").map((id) => ({ id, estado: "voto" as const })),
      ..."V".split(" ").map((id) => ({ id, estado: "territorio" as const })),
    ],
    notaMapa: "Para 1958 la mayoría de los antiguos territorios nacionales ya eran provincias; Tierra del Fuego seguía siendo territorio. Ganadores por provincia: pendientes de verificar.",
  },
  {
    id: "1963", anio: 1963, fecha: "7 de julio de 1963",
    titulo: "Illia, con un cuarto de los votos", tipo: "competitiva",
    restriccion: "Elección con el peronismo proscripto y también Frondizi excluido. El voto en blanco, impulsado por el peronismo, superó el 20 %.",
    contexto: [
      "Tras el derrocamiento de Frondizi en 1962 asumió José María Guido, bajo tutela militar.",
      "Las Fuerzas Armadas se enfrentaron entre sí (azules y colorados) en 1962 y 1963.",
      "El Frente Nacional y Popular, que incluía al peronismo, fue impedido de presentar candidatos.",
    ],
    sistema: [
      "Elección indirecta con Colegio Electoral.",
      "Se aplicó por primera vez para presidente un sistema de representación proporcional en la asignación de electores.",
    ],
    candidatos: [
      {
        id: "illia", nombre: "Arturo U. Illia", formula: "Carlos H. Perette", partido: "Unión Cívica Radical del Pueblo", sigla: "UCRP",
        trayectoria: "Médico rural en Cruz del Eje, Córdoba; ex vicegobernador cordobés.",
        propuestas: [{ valor: "Anulación de los contratos petroleros de Frondizi.", verificado: true }, { valor: "Respeto de las libertades públicas.", verificado: false }],
        ideasPartido: ["Radicalismo tradicional."],
        gobierno: [{ valor: "Anuló los contratos petroleros (1963) y sancionó la Ley de Medicamentos (1964).", verificado: true }, { valor: "Fue derrocado por el golpe del 28 de junio de 1966, encabezado por Juan Carlos Onganía.", verificado: true }],
        votos: { valor: 2441064, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: {{ participacion: 1, estado: 1, social: 1 }},
        justificacionEjes: "Estado más activo en petróleo y medicamentos.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "alende", nombre: "Oscar Alende", formula: "Celestino Gelsi", partido: "Unión Cívica Radical Intransigente", sigla: "UCRI",
        trayectoria: "Médico y exgobernador de Buenos Aires (1958-1962).",
        propuestas: [{ valor: "Desarrollismo: pendiente de documentar sus propuestas concretas.", verificado: false }],
        ideasPartido: ["Desarrollismo."],
        votos: { valor: 1593002, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: {{ participacion: 1, estado: 1, social: 1 }},
        justificacionEjes: "Continuidad desarrollista con intervención estatal.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "aramburu", nombre: "Pedro E. Aramburu", formula: "Arturo Etchevehere", partido: "Unión del Pueblo Argentino", sigla: "UDELPA",
        trayectoria: "General, presidente de facto (1955-1958) tras el derrocamiento de Perón.",
        propuestas: [{ valor: "Orden y antiperonismo.", verificado: false }],
        ideasPartido: ["Antiperonismo liberal."],
        votos: { valor: 1362596, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: {{ participacion: -2, estado: -1, social: -1 }},
        justificacionEjes: "Encabezó el gobierno que proscribió al peronismo.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "olmos", nombre: "Emilio Olmos", formula: "Pendiente de verificación", partido: "Partido Demócrata (Federación de partidos de centro)", sigla: "PD",
        trayectoria: "Dirigente conservador cordobés.",
        propuestas: [{ valor: "Programa conservador: pendiente de documentar.", verificado: false }],
        ideasPartido: ["Conservadurismo liberal."],
        votos: { valor: 511779, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: {{ participacion: 0, estado: -2, social: -1 }},
        justificacionEjes: "Defensa de la economía de mercado.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
      {
        id: "sueldo", nombre: "Horacio Sueldo", formula: "Pendiente de verificación", partido: "Partido Demócrata Cristiano", sigla: "PDC",
        trayectoria: "Dirigente demócrata cristiano.",
        propuestas: [{ valor: "Programa demócrata cristiano: pendiente de documentar.", verificado: false }],
        ideasPartido: ["Humanismo cristiano."],
        votos: { valor: 434823, verificado: false },
        electores: { valor: 0, verificado: false },
        ejes: {{ participacion: 1, estado: 0, social: 1 }},
        justificacionEjes: "Doctrina social de la Iglesia.",
        boleta: { notaColor: "Sin documentación verificada sobre el diseño o los colores de esta boleta: tinta negra.", verificado: false },
      },
    ],
    participacion: { valor: "85,5 % del padrón (9.710.116 votantes sobre 11.356.240 inscriptos); 1.884.435 votos en blanco (21,6 %)", verificado: false },
    explicacion: "Illia obtuvo cerca de un cuarto de los votos y fue consagrado por el Colegio Electoral con el apoyo de otros partidos. También compitieron, con menos votos, Alfredo Palacios (Partido Socialista Argentino) y Alfredo Orgaz (Partido Socialista Democrático), entre otros. Cifras de recopilaciones secundarias.",
    fuentes: [{ titulo: "Dirección Nacional Electoral — Resultados electorales", url: "https://www.argentina.gob.ar/dine/resultados-electorales" }, { titulo: "Wikipedia — Elecciones presidenciales de Argentina de 1963 (punto de partida, no fuente definitiva)", url: "https://es.wikipedia.org/wiki/Elecciones_presidenciales_de_Argentina_de_1963" }, { titulo: "Rouquié, A. «Poder militar y sociedad política en la Argentina». Emecé, 1982." }],
    jurisdicciones: [
      ..."B C K X W E Y F M A J D S G T H L N P Q U".split(" ").map((id) => ({ id, estado: "voto" as const })),
      ..."V".split(" ").map((id) => ({ id, estado: "territorio" as const })),
    ],
    notaMapa: "En 1963 Tierra del Fuego seguía siendo territorio nacional. Ganadores por provincia: pendientes de verificar.",
  },
];

export const periodos: Periodo[] = [
  { anio: 1916, etiqueta: "Yrigoyen, primera elección con voto secreto", estado: "disponible" },
  { anio: 1922, etiqueta: "Alvear, sucesor de Yrigoyen", estado: "disponible" },
  { anio: 1928, etiqueta: "Regreso de Yrigoyen", estado: "disponible" },
  { anio: 1930, etiqueta: "Golpe de Estado", estado: "interrupcion", nota: "Derrocamiento de Yrigoyen. Primera interrupción institucional." },
  { anio: 1931, etiqueta: "«Década Infame»", estado: "restringida", nota: "Elecciones con proscripción radical y fraude." },
  { anio: 1937, etiqueta: "Elección con fraude", estado: "restringida", nota: "El fraude «patriótico» impide considerarla una elección libre." },
  { anio: 1943, etiqueta: "Golpe de Estado", estado: "interrupcion", nota: "El 4 de junio, un golpe militar derrocó a Castillo." },
  { anio: 1946, etiqueta: "Perón frente a la Unión Democrática", estado: "disponible" },
  { anio: 1951, etiqueta: "Primera con voto femenino", estado: "restringida", nota: "Reelección de Perón con fuertes limitaciones para la oposición." },
  { anio: 1955, etiqueta: "Golpe de Estado", estado: "interrupcion", nota: "Derrocamiento de Perón; el peronismo quedó proscripto." },
  { anio: 1958, etiqueta: "Frondizi, con el peronismo proscripto", estado: "restringida", nota: "El peronismo no pudo presentarse." },
  { anio: 1962, etiqueta: "Derrocamiento de Frondizi", estado: "interrupcion", nota: "Las Fuerzas Armadas destituyeron a Frondizi; asumió José María Guido." },
  { anio: 1963, etiqueta: "Illia, con el peronismo proscripto", estado: "restringida", nota: "Voto en blanco superior al 20 %." },
  { anio: 1966, etiqueta: "Golpe de Estado", estado: "interrupcion", nota: "Derrocamiento de Illia; dictadura de la «Revolución Argentina» hasta 1973." },
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
