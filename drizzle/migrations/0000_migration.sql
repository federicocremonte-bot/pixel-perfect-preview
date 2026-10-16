CREATE TABLE public.vote_counts (
  election_id text NOT NULL,
  candidate_id text NOT NULL,
  count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (election_id, candidate_id)
);
GRANT SELECT ON public.vote_counts TO anon, authenticated;
GRANT ALL ON public.vote_counts TO service_role;
ALTER TABLE public.vote_counts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read aggregate counts" ON public.vote_counts FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.vote_counts (election_id, candidate_id) VALUES
 ('1916','yrigoyen'),('1916','rojas'),('1916','delatorre'),('1916','justo');

CREATE OR REPLACE FUNCTION public.cast_vote(_election text, _candidate text)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.vote_counts SET count = count + 1
  WHERE election_id = _election AND candidate_id = _candidate;
  RETURN FOUND;
END;
$$;
REVOKE ALL ON FUNCTION public.cast_vote(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cast_vote(text, text) TO anon, authenticated;