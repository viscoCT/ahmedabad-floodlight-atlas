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

- Map components (Leaflet) are lazy-loaded behind `<ClientOnly>` because Leaflet touches `window` at import; never import them statically from routes.
- Danger-zone detection lives only in `src/utils/geoAnalysis.ts` (grid-indexed turf point-in-polygon); the UI must never show distances, buffers or method details.
- Supplied research content lives in `src/data/*` as verbatim source text; UI components must not invent figures.
