import s2024b from "@/assets/14_june_2024.webp.asset.json";
import s2024a from "@/assets/18_august_2024.webp.asset.json";
import s2025b from "@/assets/8_june_2025.webp.asset.json";
import s2025a from "@/assets/18_september_2025.webp.asset.json";
import s2026b from "@/assets/18_june_2026.webp.asset.json";
import s2026a from "@/assets/23_august_2026.webp.asset.json";

export const PROJECT_NAME = "Ahmedabad Urban Waterlogging Analysis";

export const SATELLITE = {
  "2024": { before: { src: s2024b.url, label: "14 June 2024" }, after: { src: s2024a.url, label: "18 August 2024" } },
  "2025": { before: { src: s2025b.url, label: "8 June 2025" }, after: { src: s2025a.url, label: "18 September 2025" } },
  "2026": { before: { src: s2026b.url, label: "18 June 2026" }, after: { src: s2026a.url, label: "23 August 2026" } },
} as const;
export type Year = keyof typeof SATELLITE;

// Supplied top 10 hotspot localities — unranked, spelling as provided.
export const TOP_HOTSPOTS = [
  "Danilimda",
  "Chipakuva",
  "Khodiyarnagar",
  "Narayan Nagar",
  "Gita Mandir",
  "Prem Darwaza",
  "Sarangpur",
  "Maninagar",
  "Dariyapur",
  "Narayan Park Society",
];

export const SECTIONS = [
  { id: "before-after", label: "Before & After" },
  { id: "safety-portal", label: "Safety Portal" },
  { id: "top-hotspots", label: "Top 10 Hotspots" },
  { id: "statistics", label: "Statistics" },
  { id: "effects-solutions", label: "Effects & Solutions" },
];

export const DISCLAIMER =
  "This portal provides indicative waterlogging hotspot information based on mapped project data. It does not provide real-time flood monitoring or guarantee that locations outside mapped hotspots are safe. Actual conditions may change depending on rainfall, drainage conditions, and local circumstances.";
