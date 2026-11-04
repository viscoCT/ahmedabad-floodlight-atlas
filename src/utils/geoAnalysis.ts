import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
import type { Feature, FeatureCollection, MultiPolygon, Polygon, Position } from "geojson";

type Indexed = { bbox: [number, number, number, number]; feature: Feature<Polygon | MultiPolygon> };

export type ZoneIndex = { items: Indexed[]; cell: Map<string, Indexed[]> };

const CELL = 0.01; // ~1 km grid
const key = (x: number, y: number) => `${Math.floor(x / CELL)}:${Math.floor(y / CELL)}`;

function bboxOf(coords: Position[][] | Position[][][]): [number, number, number, number] {
  let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
  const walk = (arr: unknown): void => {
    if (typeof (arr as number[])[0] === "number") {
      const [x, y] = arr as [number, number];
      if (x < a) a = x; if (y < b) b = y; if (x > c) c = x; if (y > d) d = y;
    } else (arr as unknown[]).forEach(walk);
  };
  walk(coords);
  return [a, b, c, d];
}

/** Build a grid spatial index over polygon bounding boxes. */
export function buildZoneIndex(fc: FeatureCollection): ZoneIndex {
  const items: Indexed[] = [];
  const cell = new Map<string, Indexed[]>();
  for (const f of fc.features) {
    const g = f.geometry;
    if (!g || (g.type !== "Polygon" && g.type !== "MultiPolygon")) continue;
    const it: Indexed = { bbox: bboxOf(g.coordinates), feature: f as Feature<Polygon | MultiPolygon> };
    items.push(it);
    for (let x = Math.floor(it.bbox[0] / CELL); x <= Math.floor(it.bbox[2] / CELL); x++)
      for (let y = Math.floor(it.bbox[1] / CELL); y <= Math.floor(it.bbox[3] / CELL); y++) {
        const k = `${x}:${y}`;
        const arr = cell.get(k);
        if (arr) arr.push(it); else cell.set(k, [it]);
      }
  }
  return { items, cell };
}

/** True when the point lies inside or on the boundary of any zone polygon. */
export function isInZone(index: ZoneIndex, lng: number, lat: number): boolean {
  const cands = index.cell.get(key(lng, lat)) ?? [];
  const pt = point([lng, lat]);
  for (const it of cands) {
    const [a, b, c, d] = it.bbox;
    if (lng < a || lng > c || lat < b || lat > d) continue;
    if (booleanPointInPolygon(pt, it.feature, { ignoreBoundary: false })) return true;
  }
  return false;
}
