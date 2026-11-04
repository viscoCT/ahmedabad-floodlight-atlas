// Geocoding: Photon (primary) -> Nominatim (fallback), restricted to Ahmedabad,
// with local fuzzy correction of common locality spellings.
export type Place = { id: string; name: string; context: string; lat: number; lng: number };

export const AHMEDABAD_CENTER: [number, number] = [23.0225, 72.5714];
const BBOX = { w: 72.4, s: 22.85, e: 72.8, n: 23.2 };
const inBox = (lat: number, lng: number) => lat >= BBOX.s && lat <= BBOX.n && lng >= BBOX.w && lng <= BBOX.e;

export const PROVIDERS = {
  primary: "https://photon.komoot.io/api/",
  fallback: "https://nominatim.openstreetmap.org/search",
};

// Common Ahmedabad locality names used only to correct spelling.
const LOCALITIES = [
  "Danilimda", "Chipakuva", "Khodiyarnagar", "Narayan Nagar", "Gita Mandir", "Prem Darwaza", "Sarangpur",
  "Maninagar", "Dariyapur", "Narayan Park Society", "Sabarmati Ashram", "Sabarmati", "Navrangpura", "Vastrapur",
  "Bopal", "Satellite", "Paldi", "Naroda", "Vatva", "Isanpur", "Odhav", "Nikol", "Bapunagar", "Chandkheda",
  "Ghatlodia", "Thaltej", "Bodakdev", "Prahlad Nagar", "Shahibaug", "Kalupur", "Jamalpur", "Khokhra",
  "Ellisbridge", "Ashram Road", "CG Road", "SG Highway", "Usmanpura", "Vadaj", "Ranip", "Gota", "Memnagar",
  "Ambawadi", "Vejalpur", "Juhapura", "Sarkhej", "Naranpura", "Saraspur", "Asarwa", "Raipur", "Khadia",
  "Gomtipur", "Rakhial", "Amraiwadi", "Hatkeshwar", "Lal Darwaja", "Kankaria", "Shahpur", "Behrampura",
  "Vasna", "Jodhpur", "Science City", "Motera", "Sola", "Ghodasar", "Ramol", "Vastral", "Nava Vadaj",
  "Ahmedabad Railway Station", "Manek Chowk", "Bhadra Fort", "Law Garden", "Gurukul", "Drive In Road",
];

export function normalize(q: string) {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s,.-]/gu, " ")
    .replace(/\b(ahmedabad|amdavad|gujarat|india)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\bnagr\b/g, "nagar")
    .replace(/\bdarwaja\b/g, "darwaza")
    .replace(/\bsoc\b/g, "society")
    .replace(/\brd\b/g, "road");
}

function lev(a: string, b: string) {
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}

/** Closest known locality names for a (possibly misspelt) query. */
export function fuzzyLocalities(q: string, limit = 3): string[] {
  const nq = normalize(q).replace(/\s/g, "");
  if (nq.length < 3) return [];
  return LOCALITIES.map((name) => {
    const n = name.toLowerCase().replace(/\s/g, "");
    const pre = n.startsWith(nq) ? -2 : 0;
    const dist = lev(nq, n.slice(0, Math.max(nq.length, Math.min(n.length, nq.length + 2))));
    return { name, score: dist + pre };
  })
    .filter((x) => x.score <= Math.max(1, Math.floor(nq.length / 4)))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((x) => x.name);
}

async function photon(q: string, signal?: AbortSignal): Promise<Place[]> {
  const u = new URL(PROVIDERS.primary);
  u.search = new URLSearchParams({
    q, limit: "8", lat: String(AHMEDABAD_CENTER[0]), lon: String(AHMEDABAD_CENTER[1]),
    bbox: `${BBOX.w},${BBOX.s},${BBOX.e},${BBOX.n}`,
  }).toString();
  const r = await fetch(u, { signal });
  if (!r.ok) throw new Error("photon");
  const j = await r.json();
  return (j.features ?? []).map((f: any) => {
    const p = f.properties ?? {};
    const [lng, lat] = f.geometry.coordinates;
    const ctx = [p.street, p.district, p.locality, p.city, p.state].filter((x: string) => x && x !== p.name);
    return { id: `p-${p.osm_type}${p.osm_id}`, name: p.name ?? p.street ?? q, context: [...new Set(ctx)].join(", "), lat, lng };
  });
}

async function nominatim(q: string, signal?: AbortSignal): Promise<Place[]> {
  const u = new URL(PROVIDERS.fallback);
  u.search = new URLSearchParams({
    q: `${q}, Ahmedabad`, format: "jsonv2", limit: "8", bounded: "1",
    viewbox: `${BBOX.w},${BBOX.n},${BBOX.e},${BBOX.s}`, countrycodes: "in",
  }).toString();
  const r = await fetch(u, { signal, headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error("nominatim");
  const j = await r.json();
  return j.map((x: any) => {
    const parts = String(x.display_name).split(",").map((s: string) => s.trim());
    return { id: `n-${x.place_id}`, name: x.name || parts[0], context: parts.slice(1, 4).join(", "), lat: +x.lat, lng: +x.lon };
  });
}

async function query(q: string, signal?: AbortSignal): Promise<Place[]> {
  let res: Place[] = [];
  try { res = await photon(q, signal); } catch (e) { if (signal?.aborted) throw e; }
  if (!res.length) { try { res = await nominatim(q, signal); } catch (e) { if (signal?.aborted) throw e; } }
  return res;
}

export type SearchResult = { places: Place[]; corrected?: string; failed: boolean };

/** Search a place in Ahmedabad with typo correction and provider fallback. */
export async function searchPlaces(raw: string, signal?: AbortSignal): Promise<SearchResult> {
  const q = normalize(raw).slice(0, 120);
  if (q.length < 2) return { places: [], failed: false };
  let places = await query(q, signal);
  let corrected: string | undefined;
  const fz = fuzzyLocalities(q, 2);
  if (fz.length && fz[0].toLowerCase() !== q) {
    // Also try corrected spelling when results are weak.
    if (places.filter((p) => inBox(p.lat, p.lng)).length < 2) {
      const more = await query(fz[0], signal);
      if (more.length) { corrected = fz[0]; places = [...more, ...places]; }
    }
  }
  const seen = new Set<string>();
  places = places.filter((p) => {
    const k = `${p.name}|${p.lat.toFixed(3)}|${p.lng.toFixed(3)}`;
    if (!inBox(p.lat, p.lng) || seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 8);
  return { places, corrected, failed: places.length === 0 };
}
