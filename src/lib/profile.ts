import { elecciones, type Eje } from "@/data/elecciones";

export const MIN_ELECCIONES_PERFIL = 3;

export const ejesInfo: Record<Eje, { nombre: string; neg: string; pos: string }> = {
  participacion: { nombre: "Participación política", neg: "Orden restringido", pos: "Ampliación del voto y derechos" },
  estado: { nombre: "Rol del Estado en la economía", neg: "Mercado y menor intervención", pos: "Mayor intervención estatal" },
  social: { nombre: "Reformas sociales", neg: "Continuidad social", pos: "Reformas laborales y sociales" },
};

export type Votos = Record<string, string>; // electionId -> candidateId

export type Perfil =
  | { estado: "inconcluso"; votadas: number; faltan: number }
  | { estado: "listo"; votadas: number; promedios: Record<Eje, number>; descripcion: string };

export function computeProfile(votos: Votos): Perfil {
  const elegidos = Object.entries(votos)
    .map(([eid, cid]) => elecciones.find((e) => e.id === eid)?.candidatos.find((c) => c.id === cid))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const votadas = elegidos.length;
  if (votadas < MIN_ELECCIONES_PERFIL) {
    return { estado: "inconcluso", votadas, faltan: MIN_ELECCIONES_PERFIL - votadas };
  }
  const promedios = { participacion: 0, estado: 0, social: 0 } as Record<Eje, number>;
  (Object.keys(promedios) as Eje[]).forEach((k) => {
    promedios[k] = elegidos.reduce((s, c) => s + c.ejes[k], 0) / votadas;
  });
  return { estado: "listo", votadas, promedios, descripcion: describir(promedios) };
}

export function describir(p: Record<Eje, number>): string {
  const partes = (Object.keys(p) as Eje[]).map((k) => {
    const v = p[k];
    const info = ejesInfo[k];
    if (Math.abs(v) < 0.5) return `una posición equilibrada en ${info.nombre.toLowerCase()}`;
    return `${Math.abs(v) >= 1.25 ? "una clara" : "cierta"} preferencia por «${(v > 0 ? info.pos : info.neg).toLowerCase()}»`;
  });
  return `Tus elecciones sugieren ${partes[0]}, ${partes[1]} y ${partes[2]}.`;
}
