import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { TileLayer, useMap } from "react-leaflet";
import { AHMEDABAD_CENTER } from "@/services/geocoding";

// Basemap config kept separate from detection logic.
export const BASEMAP = {
  url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  attribution: "Tiles &copy; Esri &mdash; Sources: Esri, HERE, Garmin, USGS, NGA, EPA, USDA, NPS",
};
export const DEFAULT_VIEW = { center: AHMEDABAD_CENTER, zoom: 12 };

export const STYLES = {
  hotspot: { color: "#2b7fd4", weight: 1, fillColor: "#4fb3e8", fillOpacity: 0.55 },
  danger: { color: "#e0464b", weight: 1, fillColor: "#f07a6e", fillOpacity: 0.28, dashArray: "3 3" },
};

export const locIcon = L.divIcon({
  className: "",
  html: '<div class="loc-marker"><span class="ring"></span><span class="dot"></span></div>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export function Basemap({ onError }: { onError: () => void }) {
  return (
    <TileLayer
      url={BASEMAP.url}
      attribution={BASEMAP.attribution}
      maxZoom={19}
      eventHandlers={{ tileerror: onError }}
    />
  );
}

export function useTileFailure() {
  const [errors, setErrors] = useState(0);
  return { failed: errors > 6, onError: () => setErrors((e) => e + 1) };
}

export function MapRef({ onReady }: { onReady: (m: L.Map) => void }) {
  const map = useMap();
  useEffect(() => onReady(map), [map, onReady]);
  return null;
}

/** Build safe popup DOM from GeoJSON properties (no raw HTML). */
export function propsPopup(props: Record<string, unknown> | null) {
  const el = document.createElement("div");
  const h = document.createElement("strong");
  h.textContent = "Waterlogging hotspot";
  el.appendChild(h);
  Object.entries(props ?? {}).forEach(([k, v]) => {
    const row = document.createElement("div");
    row.style.fontSize = "12px";
    const val = typeof v === "number" ? (Number.isInteger(v) ? v.toString() : v.toFixed(3)) : String(v);
    row.textContent = `${k}: ${val}`;
    el.appendChild(row);
  });
  return el;
}

export function toggleFullscreen(el: HTMLElement | null, map: L.Map | null) {
  if (!el) return;
  if (document.fullscreenElement) document.exitFullscreen();
  else el.requestFullscreen?.();
  setTimeout(() => map?.invalidateSize(), 300);
}
