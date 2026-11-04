import { ImageOff, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function ZoomableImage({ src, alt, label, className = "" }: { src?: string; alt: string; label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [broken, setBroken] = useState(false);
  if (!src || broken)
    return (
      <div className="glass grid aspect-[3507/2480] place-items-center rounded-2xl text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><ImageOff className="h-4 w-4" /> Image unavailable</span>
      </div>
    );
  return (
    <>
      <button onClick={() => setOpen(true)} className={`group relative block w-full overflow-hidden rounded-2xl border border-border bg-muted ${className}`} aria-label={`Enlarge ${alt}`}>
        <img src={src} alt={alt} loading="lazy" onError={() => setBroken(true)} className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
        <span className="glass absolute bottom-3 right-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
          <Maximize2 className="h-3 w-3" /> Enlarge
        </span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[96vw] w-auto border-0 bg-transparent p-0 shadow-none sm:rounded-2xl">
          <DialogTitle className="sr-only">{label ?? alt}</DialogTitle>
          <img src={src} alt={alt} className="max-h-[90vh] w-auto rounded-2xl object-contain" />
          {label && <p className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold">{label}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
}
