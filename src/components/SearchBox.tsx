import { Loader2, MapPin, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { searchPlaces, type Place } from "@/services/geocoding";

export function SearchBox({ onSelect }: { onSelect: (p: Place) => void }) {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Place[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [corrected, setCorrected] = useState<string | undefined>();
  const [active, setActive] = useState(0);
  const skip = useRef(false);

  useEffect(() => {
    if (skip.current) { skip.current = false; return; }
    const term = q.trim();
    if (term.length < 2) { setItems([]); setMsg(null); return; }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const r = await searchPlaces(term, ctrl.signal);
        setItems(r.places);
        setCorrected(r.corrected);
        setActive(0);
        setMsg(r.failed ? "We couldn't find that place. Try another spelling, or tap directly on the map." : null);
        setOpen(true);
      } catch {
        if (!ctrl.signal.aborted) { setMsg("Search is unavailable right now. You can tap directly on the map."); setOpen(true); }
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 350);
    return () => { clearTimeout(t); ctrl.abort(); };
  }, [q]);

  const pick = (p: Place) => {
    skip.current = true;
    setQ(p.name);
    setOpen(false);
    onSelect(p);
  };

  return (
    <div className="relative w-full">
      <div className="glass-solid flex items-center gap-2 rounded-full px-4 py-2.5">
        <Search className="h-5 w-5 text-primary" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => items.length && setOpen(true)}
          onKeyDown={(e) => {
            if (!open || !items.length) return;
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === "Enter") { e.preventDefault(); pick(items[active]!); }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search a place, road or society…"
          aria-label="Search location in Ahmedabad"
          maxLength={120}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {loading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : q && (
          <button aria-label="Clear" onClick={() => { setQ(""); setItems([]); setOpen(false); }}>
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
      {open && (items.length > 0 || msg) && (
        <div className="glass-solid absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl">
          {corrected && <p className="px-4 pt-2 text-xs text-muted-foreground">Showing results for <b>{corrected}</b></p>}
          {items.map((p, i) => (
            <button
              key={p.id + i}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(p)}
              className={`flex w-full items-start gap-3 px-4 py-2.5 text-left ${i === active ? "bg-secondary" : ""}`}
            >
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{p.name}</span>
                {p.context && <span className="block truncate text-xs text-muted-foreground">{p.context}</span>}
              </span>
            </button>
          ))}
          {msg && <p className="px-4 py-3 text-sm text-muted-foreground">{msg}</p>}
        </div>
      )}
    </div>
  );
}
