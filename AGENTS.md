<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Historical election content lives in `src/data/elecciones.ts`; add elections there, never hardcode in routes. Why: user must be able to correct/extend data without rebuilding pages.
- Visitor votes are only aggregate counters (`vote_counts`), incremented via the `cast_vote` DB function which only updates pre-seeded (election, candidate) rows. New candidates need a seeded row. Why: privacy (no individual history) and no arbitrary writes.
- The ideological profile is computed client-side only (`src/lib/profile.ts`) and never persisted server-side. Why: user required no stored political profiles.
