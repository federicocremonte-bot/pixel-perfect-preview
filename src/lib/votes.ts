import { supabase } from "@/integrations/supabase/client";
import type { Votos } from "./profile";

const VOTOS_KEY = "hea:votos";
const CONSENT_KEY = "hea:consentimiento";
const ENVIADOS_KEY = "hea:enviados";

const read = <T,>(k: string, d: T): T => {
  try { return JSON.parse(localStorage.getItem(k) ?? "") as T; } catch { return d; }
};

export const getVotos = (): Votos => read<Votos>(VOTOS_KEY, {});
export const saveVoto = (eid: string, cid: string) =>
  localStorage.setItem(VOTOS_KEY, JSON.stringify({ ...getVotos(), [eid]: cid }));
export const resetVotos = () => localStorage.removeItem(VOTOS_KEY);

export type Consent = "si" | "no" | null;
export const getConsent = (): Consent => read<Consent>(CONSENT_KEY, null);
export const setConsent = (c: "si" | "no") => localStorage.setItem(CONSENT_KEY, JSON.stringify(c));

/** Suma un voto anónimo al contador, una vez por elección y navegador. */
export async function registrarVotoAnonimo(eid: string, cid: string) {
  const enviados = read<string[]>(ENVIADOS_KEY, []);
  if (enviados.includes(eid)) return false;
  const { data, error } = await supabase.rpc("cast_vote", { _election: eid, _candidate: cid });
  if (error || !data) return false;
  localStorage.setItem(ENVIADOS_KEY, JSON.stringify([...enviados, eid]));
  return true;
}

export async function getConteos(eid: string): Promise<Record<string, number>> {
  const { data, error } = await supabase.from("vote_counts").select("candidate_id, count").eq("election_id", eid);
  if (error || !data) return {};
  return Object.fromEntries(data.map((r) => [r.candidate_id, r.count]));
}
