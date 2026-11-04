import { ShieldAlert, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckResult = { id: number; inHotspot: boolean; name?: string | undefined };

export function ResultCard({ result, onClose }: { result: CheckResult; onClose: () => void }) {
  const hot = result.inHotspot;
  return (
    <div
      key={result.id}
      role="status"
      aria-live="polite"
      className={cn(
        "animate-result-in glass w-full max-w-sm rounded-2xl p-4 pr-10 relative border-l-4",
        hot ? "border-l-danger" : "border-l-safe",
      )}
    >
      <button onClick={onClose} aria-label="Close result" className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-muted">
        <X className="h-4 w-4" />
      </button>
      <div className="flex gap-3">
        <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl", hot ? "bg-danger-soft text-danger" : "bg-safe-soft text-safe")}>
          {hot ? <ShieldAlert className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
        </div>
        <div className="min-w-0">
          <p className={cn("text-[11px] font-bold tracking-widest", hot ? "text-danger" : "text-safe")}>
            {hot ? "HOTSPOT AREA" : "OUTSIDE MAPPED HOTSPOT"}
          </p>
          <p className="font-display text-base font-semibold leading-snug">
            {hot ? "You are in a waterlogging hotspot." : "You are not in a mapped waterlogging hotspot."}
          </p>
          {result.name && <p className="mt-0.5 truncate text-xs text-muted-foreground">{result.name}</p>}
          <p className="mt-2 text-sm text-muted-foreground">
            {hot
              ? "This location falls within an identified waterlogging-prone area. Please remain cautious, especially during heavy rainfall."
              : "This location is outside the identified waterlogging hotspot areas. Continue to follow local weather and safety advisories."}
          </p>
        </div>
      </div>
    </div>
  );
}
