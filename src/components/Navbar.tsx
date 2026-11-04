import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";
import { PROJECT_NAME, SECTIONS } from "@/data/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <header className="sticky top-0 z-[1100] px-3 pt-3">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-3 py-2">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo.url} alt="Smart Monsoon Ahmedabad logo" className="h-10 w-10 rounded-full glow" />
          <span className="hidden font-display text-sm font-semibold leading-tight sm:block">{PROJECT_NAME}</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={cn("rounded-full px-3 py-1.5 text-sm transition-colors", active === s.id ? "bg-water-gradient text-primary-foreground glow" : "text-muted-foreground hover:text-foreground")}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <ul className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-2 lg:hidden">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a onClick={() => setOpen(false)} href={`#${s.id}`} className={cn("block rounded-xl px-4 py-2.5 text-sm", active === s.id ? "bg-secondary font-semibold text-primary" : "")}>{s.label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
