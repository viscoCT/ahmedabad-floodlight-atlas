import type L from "leaflet";
import type { FeatureCollection } from "geojson";
import { Expand, Layers, RotateCcw } from "lucide-react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { GeoJSON, MapContainer, Marker, Tooltip } from "react-leaflet";
import { HOTSPOTS_URL, loadGeoJSON } from "@/services/geojson";
import { searchPlaces } from "@/services/geocoding";
import { Basemap, DEFAULT_VIEW, MapRef, STYLES, locIcon, propsPopup, toggleFullscreen, useTileFailure } from "./mapCommon";

export type HotspotMapHandle = { focus: (name: string) => void };
const ctl = "glass-solid grid h-10 w-10 place-items-center rounded-xl hover:text-primary";

const HotspotMap = forwardRef<HotspotMapHandle>(function HotspotMap(_, ref) {
  const wrap = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [sel, setSel] = useState<{ name: string; pos: [number, number] } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const tiles = useTileFailure();

  useEffect(() => { loadGeoJSON(HOTSPOTS_URL).then(setData).catch(() => setErr("Hotspot data could not be loaded.")); }, []);

  useImperativeHandle(ref, () => ({
    focus: async (name) => {
      setMsg(`Locating ${name}…`);
      try {
        const r = await searchPlaces(name);
        const p = r.places[0];
        if (!p) { setMsg(`${name} could not be located precisely on the map.`); return; }
        setSel({ name, pos: [p.lat, p.lng] });
        map?.flyTo([p.lat, p.lng], 16);
        setMsg(null);
      } catch { setMsg("Location service unavailable right now."); }
    },
  }), [map]);

  const layer = useMemo(() => data && (
    <GeoJSON data={data} style={() => STYLES.hotspot} onEachFeature={(f, l) => l.bindPopup(() => propsPopup(f.properties))} />
  ), [data]);
  const onReady = useCallback((m: L.Map) => setMap(m), []);

  return (
    <div ref={wrap} className="relative h-[560px] w-full overflow-hidden rounded-3xl border border-border glow bg-muted">
      <MapContainer center={DEFAULT_VIEW.center} zoom={DEFAULT_VIEW.zoom} zoomControl preferCanvas className="h-full w-full">
        <MapRef onReady={onReady} />
        <Basemap onError={tiles.onError} />
        {visible && layer}
        {sel && (
          <Marker key={sel.name} position={sel.pos} icon={locIcon}>
            <Tooltip permanent direction="top" offset={[0, -12]}>{sel.name}</Tooltip>
          </Marker>
        )}
      </MapContainer>
      <div className="absolute right-3 top-3 z-[1000] flex flex-col gap-2">
        <button className={ctl} aria-label="Reset view" onClick={() => { setSel(null); map?.flyTo(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom); }}><RotateCcw className="h-4 w-4" /></button>
        <button className={ctl} aria-label="Full screen" onClick={() => toggleFullscreen(wrap.current, map)}><Expand className="h-4 w-4" /></button>
        <button className={`${ctl} ${visible ? "text-primary" : "text-muted-foreground"}`} aria-label="Toggle hotspot layer" onClick={() => setVisible((v) => !v)}><Layers className="h-4 w-4" /></button>
      </div>
      {(msg || err || !data || tiles.failed) && (
        <div className="absolute left-14 top-3 z-[1000] glass rounded-xl px-3 py-2 text-xs">
          {msg ?? err ?? (!data ? "Loading hotspots…" : "Street map tiles failed to load; hotspots still shown.")}
        </div>
      )}
      {data && (
        <div className="absolute bottom-3 left-3 z-[1000] glass rounded-xl px-3 py-1.5 text-xs">
          {data.features.length.toLocaleString("en-IN")} mapped hotspot polygons
        </div>
      )}
    </div>
  );
});

export default HotspotMap;
