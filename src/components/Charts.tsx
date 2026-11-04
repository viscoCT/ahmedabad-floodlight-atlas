import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import { useEffect, useRef } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { D } from "@/data/chartsData";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
ChartJS.defaults.font.family = "Plus Jakarta Sans, system-ui, sans-serif";
ChartJS.defaults.color = "#5d7480";

// Palette from the supplied charts.html
const C = { c1: "#1f6f8b", c2: "#e08a2c", c3: "#7a9e7e", c4: "#b4535a", c5: "#4b4f8c", line: "#d5e0e6" };
const cols = [C.c3, C.c1, C.c2, C.c4, C.c5];
const base = { responsive: true, maintainAspectRatio: false } as const;
const grid = { color: C.line };

export function SizeDistribution() {
  return (
    <Bar
      data={{ labels: [...D.hl], datasets: [{ data: [...D.h], backgroundColor: C.c1, barPercentage: 1, categoryPercentage: 0.95 }] }}
      options={{ ...base, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { maxRotation: 60, font: { size: 10 } }, title: { display: true, text: "Area (m²)" } }, y: { grid, title: { display: true, text: "Hotspots" } } } }}
    />
  );
}

export function SizeClass() {
  return (
    <Bar
      data={{ labels: [...D.cn], datasets: [{ data: [...D.cc], backgroundColor: cols }] }}
      options={{ ...base, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, title: { display: true, text: "Area class (m²)" } }, y: { grid, title: { display: true, text: "Hotspots" } } } }}
    />
  );
}

export function AreaShare() {
  return (
    <Doughnut
      data={{ labels: D.cn.map((n) => `${n} m²`), datasets: [{ data: [...D.ca], backgroundColor: cols, borderColor: "#fff", borderWidth: 2 }] }}
      options={{ ...base, plugins: { legend: { position: "right" }, tooltip: { callbacks: { label: (c) => ` ${c.parsed} ha (${((c.parsed / D.tot) * 100).toFixed(1)}%)` } } } }}
    />
  );
}

export function DensityHeatmap() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const x = cv.getContext("2d")!;
    const N = D.N, s = cv.width / N, L = Math.log1p(D.gmax);
    const st = [[232, 243, 247], [140, 199, 217], [224, 138, 44], [138, 31, 43]];
    const col = (t: number) => { const p = t * 3, i = Math.min(2, Math.floor(p)), u = p - i; return st[i]!.map((a, k) => Math.round(a + (st[i + 1]![k]! - a) * u)); };
    x.fillStyle = "#f3f6f8"; x.fillRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const c = (D.grid as readonly (readonly number[])[])[i]![j];
      if (!c) continue;
      x.fillStyle = `rgb(${col(Math.log1p(c) / L)})`;
      x.fillRect(i * s, cv.height - (j + 1) * s, s + 0.5, s + 0.5);
    }
    x.strokeStyle = C.line; x.strokeRect(0.5, 0.5, cv.width - 1, cv.height - 1);
  }, []);
  return (
    <div className="flex flex-col items-center">
      <canvas ref={ref} width={400} height={400} className="h-auto w-full max-w-[400px] rounded-lg" />
      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        few <i className="h-2.5 w-36 rounded-full" style={{ background: "linear-gradient(90deg,#e8f3f7,#8cc7d9,#e08a2c,#8a1f2b)" }} /> many
      </div>
    </div>
  );
}
