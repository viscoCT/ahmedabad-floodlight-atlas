import type { FeatureCollection } from "geojson";

export const HOTSPOTS_URL = "/data/Ahmedabad_All_Waterlogging_Hotspots.geojson";
export const DANGER_URL = "/data/Ahmedabad_Danger_Zones.geojson";

const cache = new Map<string, Promise<FeatureCollection>>();

/** Fetch and cache a GeoJSON file for the session. */
export function loadGeoJSON(url: string): Promise<FeatureCollection> {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url).then(async (r) => {
      if (!r.ok) throw new Error(`Failed to load map data (${r.status})`);
      const d = (await r.json()) as FeatureCollection;
      if (d?.type !== "FeatureCollection" || !Array.isArray(d.features)) throw new Error("Invalid map data");
      d.features = d.features.filter((f) => f?.geometry && /Polygon/.test(f.geometry.type));
      return d;
    });
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p;
}
