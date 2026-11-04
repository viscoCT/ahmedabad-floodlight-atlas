import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle, ArrowRight, Building2, HandHeart, Landmark, MapPin, Search, ShieldCheck, Users,
} from "lucide-react";
import { lazy, Suspense, useRef, useState, type ReactNode } from "react";
import logo from "@/assets/logo.png.asset.json";
import density from "@/assets/density.webp.asset.json";
import { AreaShare, DensityHeatmap, SizeClass, SizeDistribution } from "@/components/Charts";
import { ZoomableImage } from "@/components/ImageViewer";
import { Navbar } from "@/components/Navbar";
import type { HotspotMapHandle } from "@/components/map/HotspotMap";
import { D } from "@/data/chartsData";
import { DISCLAIMER, PROJECT_NAME, SATELLITE, SECTIONS, TOP_HOTSPOTS, type Year } from "@/data/content";
import {
  AFFECTED_POPULATION, CITIZEN_ACTIONS, GOVERNMENT_ACTIONS, POPULATION_STATS, REFERENCES, SAFETY_MEASURES, type Group,
} from "@/data/effects";
import { cn } from "@/lib/utils";

const SafetyMap = lazy(() => import("@/components/map/SafetyMap"));
const HotspotMap = lazy(() => import("@/components/map/HotspotMap"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${PROJECT_NAME} | Smart Monsoon Ahmedabad` },
      { name: "description", content: "Satellite comparisons, a waterlogging safety portal, hotspot maps, statistics and solutions for Ahmedabad." },
      { property: "og:title", content: PROJECT_NAME },
      { property: "og:description", content: "Check if your Ahmedabad location is in a mapped waterlogging hotspot and explore satellite analysis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MapFallback = ({ h = "h-[560px]" }: { h?: string }) => (
  <div className={cn("glass grid w-full place-items-center rounded-3xl text-sm text-muted-foreground", h)}>Loading map…</div>
);

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return <section id={id} className={cn("relative mx-auto max-w-7xl px-4 py-20 sm:px-6", className)}>{children}</section>;
}

function Index() {
  const hotRef = useRef<HotspotMapHandle>(null);
  return (
    <div id="top" className="relative">
      <div className="blob left-[-10%] top-[5%] h-96 w-96 bg-primary-glow" />
      <div className="blob right-[-5%] top-[30%] h-[28rem] w-[28rem] bg-accent" style={{ animationDelay: "-5s" }} />
      <Navbar />
      <Hero />
      <BeforeAfter />
      <Section id="safety-portal">
        <SectionHead eyebrow="Section 2" title="Waterlogging Safety Portal" sub="Search any place in Ahmedabad, tap the map, or use your location to check if it falls in a mapped waterlogging hotspot." />
        <ClientOnly fallback={<MapFallback h="h-[78vh]" />}>
          <Suspense fallback={<MapFallback h="h-[78vh]" />}><SafetyMap /></Suspense>
        </ClientOnly>
        <p className="mt-4 flex gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-4 w-4 shrink-0" />{DISCLAIMER}</p>
      </Section>
      <Section id="top-hotspots">
        <SectionHead eyebrow="Section 3" title="Top 10 Waterlogging Hotspot Areas in Ahmedabad" sub="Key localities identified in this study, listed in no particular order." />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {TOP_HOTSPOTS.map((n) => (
            <div key={n} className="glass group flex flex-col justify-between gap-4 rounded-2xl p-4 transition-all hover:-translate-y-1 hover:glow">
              <div className="flex items-start gap-2">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-water-gradient text-primary-foreground"><MapPin className="h-4 w-4" /></span>
                <h3 className="font-display text-sm font-semibold leading-tight">{n}</h3>
              </div>
              <button
                onClick={() => { hotRef.current?.focus(n); document.getElementById("hotspot-map")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                className="flex items-center gap-1 text-xs font-semibold text-primary"
              >
                View on Map <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
        <div id="hotspot-map" className="mt-8">
          <ClientOnly fallback={<MapFallback />}>
            <Suspense fallback={<MapFallback />}><HotspotMap ref={hotRef} /></Suspense>
          </ClientOnly>
        </div>
      </Section>
      <Statistics />
      <EffectsSolutions />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:pt-20">
      <div>
        <p className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-primary">
          <span className="h-2 w-2 rounded-full bg-primary-glow" /> Smart Monsoon Ahmedabad
        </p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-6xl">
          Ahmedabad Urban <span className="text-water-gradient">Waterlogging</span> Analysis
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Satellite comparisons, mapped hotspots, statistics and practical solutions — plus a portal to check whether your location lies in a waterlogging-prone area.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#before-after" className="bg-water-gradient glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]">
            Explore Analysis <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#safety-portal" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary">
            <Search className="h-4 w-4" /> Check Waterlogging Status
          </a>
        </div>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-md">
        <div className="absolute inset-0 rounded-full bg-water-gradient opacity-50 blur-3xl" />
        <div className="absolute inset-6 overflow-hidden rounded-full border border-border opacity-70">
          <img src={SATELLITE["2026"].after.src} alt="" className="h-full w-full object-cover blur-[2px]" />
        </div>
        <img src={logo.url} alt="Smart Monsoon Ahmedabad" className="relative z-10 mx-auto mt-[12%] w-[76%] rounded-full glow" />
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [year, setYear] = useState<Year>("2024");
  const s = SATELLITE[year];
  return (
    <Section id="before-after">
      <SectionHead eyebrow="Section 1" title="Before & After Satellite Image Analysis" />
      <div role="tablist" className="glass mb-6 inline-flex rounded-full p-1">
        {(Object.keys(SATELLITE) as Year[]).map((y) => (
          <button key={y} role="tab" aria-selected={y === year} onClick={() => setYear(y)}
            className={cn("rounded-full px-6 py-2 text-sm font-semibold transition-all", y === year ? "bg-water-gradient text-primary-foreground glow" : "text-muted-foreground")}>
            {y}
          </button>
        ))}
      </div>
      <div key={year} className="grid gap-5 md:grid-cols-2 animate-in fade-in duration-500">
        {(["before", "after"] as const).map((k) => (
          <div key={k} className="glass rounded-3xl p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <span className={cn("rounded-full px-3 py-1 text-xs font-bold tracking-widest", k === "before" ? "bg-secondary text-secondary-foreground" : "bg-water-gradient text-primary-foreground")}>
                {k.toUpperCase()}
              </span>
              <span className="text-sm text-muted-foreground">{s[k].label}</span>
            </div>
            <ZoomableImage src={s[k].src} alt={`${k} satellite image, ${s[k].label}`} label={`${k.toUpperCase()} — ${s[k].label}`} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function ChartCard({ title, note, children, box = true }: { title: string; note: string; children: ReactNode; box?: boolean }) {
  return (
    <div className="glass rounded-3xl p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mb-3 text-xs text-muted-foreground">{note}</p>
      {box ? <div className="relative h-[300px]">{children}</div> : children}
    </div>
  );
}

function Statistics() {
  const f = (n: number) => n.toLocaleString("en-IN");
  const kpi = [[f(D.n), "hotspots"], [`${D.tot} ha`, "total area"], [`${f(D.med)} m²`, "median size"], [`${f(D.mean)} m²`, "mean size"], [`${f(D.mx)} m²`, "largest"]];
  return (
    <Section id="statistics">
      <SectionHead eyebrow="Section 4" title="Statistics & Data Analysis" sub={`Analysis of all ${f(D.n)} mapped hotspots, ${D.box[0]}–${D.box[1]}°E and ${D.box[2]}–${D.box[3]}°N.`} />
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {kpi.map(([v, l]) => (
          <div key={l} className="glass rounded-2xl p-4">
            <p className="font-display text-2xl font-semibold text-water-gradient">{v}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
      <div className="mb-5 glass rounded-3xl p-4">
        <h3 className="mb-3 px-1 text-base font-semibold">Waterlogging Density Map</h3>
        <ZoomableImage src={density.url} alt="Ahmedabad waterlogging density map" label="Waterlogging Density Map" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Hotspot size distribution" note="Number of hotspots per area band (m², log-spaced bins)"><SizeDistribution /></ChartCard>
        <ChartCard title="Hotspots by size class" note="Count of hotspots in each class"><SizeClass /></ChartCard>
        <ChartCard title="Where hotspots cluster" note="Density heatmap: hotspot count per grid cell (west–east, south–north)" box={false}><DensityHeatmap /></ChartCard>
        <ChartCard title="Share of total waterlogged area" note="Hectares contributed by each size class"><AreaShare /></ChartCard>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        Most hotspots are small: the median is {f(D.med)} m² and 90% are under {f(D.p90)} m². The largest 5% of hotspots hold {D.top}% of all waterlogged area. The densest cell sits near {D.hot[0]}°E, {D.hot[1]}°N.
      </p>
    </Section>
  );
}

function GroupList({ groups, numbered }: { groups: Group[]; numbered?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map((g, i) => (
        <div key={g.title} className="rounded-2xl border border-border bg-popover/60 p-4">
          <h4 className="mb-2 flex gap-2 text-sm font-semibold">
            {numbered && <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-water-gradient text-xs text-primary-foreground">{i + 1}</span>}
            {g.title}
          </h4>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {g.items.map((t) => <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{t}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function EffectsSolutions() {
  const blocks = [
    { icon: Users, title: "Affected Population", body: (
      <>
        <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {POPULATION_STATS.map((s) => (
            <div key={s.label} className="rounded-2xl bg-deep-gradient p-4 text-deep-foreground">
              <p className="font-display text-2xl font-semibold">{s.value}</p><p className="text-xs opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
        <GroupList groups={AFFECTED_POPULATION} />
      </>
    ) },
    { icon: ShieldCheck, title: "Safety Measures", body: <GroupList groups={SAFETY_MEASURES} numbered /> },
    { icon: HandHeart, title: "What Can Normal People Do?", body: <GroupList groups={CITIZEN_ACTIONS} numbered /> },
    { icon: Landmark, title: "What Can Government Do?", body: <GroupList groups={GOVERNMENT_ACTIONS} numbered /> },
  ];
  return (
    <Section id="effects-solutions">
      <SectionHead eyebrow="Section 5" title="Effects & Solutions" sub="Who is affected, how to stay safe, and what citizens and government can do." />
      <div className="space-y-6">
        {blocks.map(({ icon: Icon, title, body }) => (
          <div key={title} className="glass rounded-3xl p-5 sm:p-7">
            <h3 className="mb-5 flex items-center gap-3 text-xl font-semibold">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-water-gradient text-primary-foreground glow"><Icon className="h-5 w-5" /></span>
              {title}
            </h3>
            {body}
          </div>
        ))}
      </div>
      <div className="mt-6 text-xs text-muted-foreground">
        <p className="mb-1 font-semibold">References</p>
        {REFERENCES.map((r) => <p key={r.url}>{r.text} <a className="text-primary underline" href={r.url} target="_blank" rel="noreferrer">Source</a></p>)}
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-deep-gradient mt-10 text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div className="flex gap-3">
          <img src={logo.url} alt="" className="h-14 w-14 rounded-full" />
          <div>
            <p className="font-display font-semibold">{PROJECT_NAME}</p>
            <p className="mt-1 text-sm opacity-75">Smart Monsoon Ahmedabad — a GIS and remote-sensing study of urban waterlogging in Ahmedabad, Gujarat.</p>
          </div>
        </div>
        <ul className="space-y-1.5 text-sm">
          {SECTIONS.map((s) => <li key={s.id}><a className="opacity-80 hover:opacity-100" href={`#${s.id}`}>{s.label}</a></li>)}
        </ul>
        <div className="space-y-2 text-xs opacity-75">
          <p className="flex gap-2"><Building2 className="h-4 w-4 shrink-0" />Basemap © Esri. Search by Photon (komoot) and Nominatim, data © OpenStreetMap contributors. Hotspot data from project analysis.</p>
          <p>{DISCLAIMER}</p>
        </div>
      </div>
    </footer>
  );
}
