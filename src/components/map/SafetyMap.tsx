import type L from "leaflet";
import type { FeatureCollection } from "geojson";
import { Crosshair, Expand, Layers, LocateFixed, Minus, Plus, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GeoJSON, MapContainer, Marker, useMapEvents } from "react-leaflet";
import { ResultCard, type CheckResult } from "@/components/ResultCard";
import { SearchBox } from "@/components/SearchBox";
import { DANGER_URL, HOTSPOTS_URL, loadGeoJSON } from "@/services/geojson";
import { buildZoneIndex, isInZone, type ZoneIndex } from "@/utils/geoAnalysis";
import { Basemap, DEFAULT_VIEW, MapRef, STYLES, locIcon, propsPopup, toggleFullscreen, useTileFailure } from "./mapCommon";

function ClickHandler({ onClick }: { onClick: (lat: number, lng: number) => void }) {
  useMapEvents({ click: (e) => onClick(e.latlng.lat, e.latlng.lng) });
  return null;
}

const ctl = "glass grid h-10 w-10 place-items-center rounded-xl text-foreground hover:text-primary transition-colors";

export default function SafetyMap() {
  const wrap = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [hotspots, setHotspots] = useState<FeatureCollection | null>(null);
  const [danger, setDanger] = useState<FeatureCollection | null>(null);
  const [index, setIndex] = useState<ZoneIndex | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [show, setShow] = useState({ hot: true, danger: true });
  const [layersOpen, setLayersOpen] = useState(false);
  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const tiles = useTileFailure();
  const seq = useRef(0);

  useEffect(() => {
    loadGeoJSON(HOTSPOTS_URL).then(setHotspots).catch(() => setErr("Hotspot layer could not be loaded."));
    loadGeoJSON(DANGER_URL)
      .then((d) => { setDanger(d); setIndex(buildZoneIndex(d)); })
      .catch(() => setErr("Hotspot area data could not be loaded. Location checks are unavailable."));
  }, []);

  const check = useCallback(
    (lat: number, lng: number, name?: string) => {
      setMarker([lat, lng]);
      setNotice(null);
      if (!index) { setNotice("Map data is still loading — please try again in a moment."); return; }
      setResult({ id: ++seq.current, inHotspot: isInZone(index, lng, lat), name });
    },
    [index],
  );

  const locate = () => {
    if (!navigator.geolocation) return setNotice("Your browser doesn't support location access.");
    setNotice("Finding your location…");
    navigator.geolocation.getCurrentPosition(
      (p) => { map?.flyTo([p.coords.latitude, p.coords.longitude], 16); check(p.coords.latitude, p.coords.longitude, "Your current location"); },
      () => setNotice("Location permission was denied. You can search or tap on the map instead."),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const hotLayer = useMemo(
    () => hotspots && (
      <GeoJSON data={hotspots} style={() => STYLES.hotspot} onEachFeature={(f, l) => l.bindPopup(() => propsPopup(f.properties))} />
    ),
    [hotspots],
  );
  const dangerLayer = useMemo(
    () => danger && <GeoJSON data={danger} style={() => STYLES.danger} interactive={false} />,
    [danger],
  );
  const onReady = useCallback((m: L.Map) => setMap(m), []);

  return (
    <div ref={wrap} className="relative h-[78vh] min-h-[520px] w-full overflow-hidden rounded-3xl border border-border glow bg-muted">
      <MapContainer center={DEFAULT_VIEW.center} zoom={DEFAULT_VIEW.zoom} zoomControl={false} preferCanvas className="h-full w-full">
        <MapRef onReady={onReady} />
        <Basemap onError={tiles.onError} />
        {show.danger && dangerLayer}
        {show.hot && hotLayer}
        <ClickHandler onClick={(lat, lng) => check(lat, lng, "Selected point on map")} />
        {marker && <Marker position={marker} icon={locIcon} />}
      </MapContainer>

      <div className="pointer-events-none absolute inset-x-3 top-3 z-[1000] flex flex-col gap-2 sm:left-4 sm:right-auto sm:w-[400px]">
        <div className="pointer-events-auto">
          <SearchBox onSelect={(p) => { map?.flyTo([p.lat, p.lng], 16); check(p.lat, p.lng, [p.name, p.context].filter(Boolean).join(", ")); }} />
        </div>
        <button onClick={locate} className="pointer-events-auto glass flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary">
          <LocateFixed className="h-4 w-4" /> Use My Location
        </button>
        {(notice || err || tiles.failed) && (
          <div className="pointer-events-auto glass rounded-xl px-3 py-2 text-xs text-foreground">
            {notice && <p>{notice}</p>}
            {err && <p className="text-danger">{err}</p>}
            {tiles.failed && <p>Street map tiles failed to load. Hotspot layers and location checks still work.</p>}
          </div>
        )}
        {(!hotspots || !danger) && !err && <p className="pointer-events-auto glass w-fit rounded-full px-3 py-1 text-xs">Loading map data…</p>}
      </div>

      <div className="absolute right-3 top-3 z-[1000] flex flex-col gap-2">
        <button className={ctl} aria-label="Zoom in" onClick={() => map?.zoomIn()}><Plus className="h-4 w-4" /></button>
        <button className={ctl} aria-label="Zoom out" onClick={() => map?.zoomOut()}><Minus className="h-4 w-4" /></button>
        <button className={ctl} aria-label="Reset to Ahmedabad" onClick={() => map?.flyTo(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom)}><RotateCcw className="h-4 w-4" /></button>
        <button className={ctl} aria-label="Full screen" onClick={() => toggleFullscreen(wrap.current, map)}><Expand className="h-4 w-4" /></button>
        <button className={ctl} aria-label="Map layers" onClick={() => setLayersOpen((o) => !o)}><Layers className="h-4 w-4" /></button>
        {layersOpen && (
          <div className="glass absolute right-12 top-[176px] w-56 rounded-2xl p-3 text-sm">
            <label className="flex items-center gap-2 py-1"><input type="checkbox" checked={show.hot} onChange={(e) => setShow((s) => ({ ...s, hot: e.target.checked }))} /> Waterlogging Hotspots</label>
            <label className="flex items-center gap-2 py-1"><input type="checkbox" checked={show.danger} onChange={(e) => setShow((s) => ({ ...s, danger: e.target.checked }))} /> Danger Zones</label>
          </div>
        )}
      </div>

      <div className="absolute bottom-3 left-3 z-[1000] glass hidden rounded-xl px-3 py-2 text-xs sm:block">
        <p className="mb-1 font-semibold">Legend</p>
        <p className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{ background: STYLES.hotspot.fillColor }} /> Waterlogging hotspot</p>
        <p className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-dashed" style={{ background: STYLES.danger.fillColor, borderColor: STYLES.danger.color, opacity: 0.8 }} /> Danger zone</p>
        <p className="flex items-center gap-2"><Crosshair className="h-3 w-3 text-primary" /> Selected location</p>
      </div>

      {result && (
        <div className="absolute inset-x-3 bottom-8 z-[1001] flex justify-center sm:inset-x-auto sm:bottom-6 sm:right-4">
          <ResultCard key={result.id} result={result} onClose={() => setResult(null)} />
        </div>
      )}
    </div>
  );
}
