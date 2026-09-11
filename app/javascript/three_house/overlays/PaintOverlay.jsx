import { motion } from "framer-motion";

const SWATCHES = [
  { name: "Terracotta Clay", value: "#c1501f" },
  { name: "Warm Plaster", value: "#ede6da" },
  { name: "Deep Forest", value: "#2f5d43" },
  { name: "Charcoal", value: "#3a342c" },
  { name: "Soft Sand", value: "#d9c9a8" },
  { name: "Slate Blue", value: "#3d5a73" },
];

export default function PaintOverlay({ color, onPick, onRequest, onBack }) {
  const selected = SWATCHES.find((s) => s.value === color) ?? SWATCHES[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="pointer-events-auto absolute bottom-6 left-1/2 w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl border border-line bg-surface/95 p-5 shadow-lg backdrop-blur"
    >
      <p className="font-display text-lg font-semibold text-ink">Paint job</p>
      <p className="mt-1 text-sm text-ink-muted">Pick a color for this wall.</p>

      <div className="mt-4 grid grid-cols-6 gap-2">
        {SWATCHES.map((swatch) => (
          <button
            key={swatch.value}
            type="button"
            title={swatch.name}
            onClick={() => onPick(swatch.value)}
            className={`h-9 w-9 rounded-full border-2 transition ${
              swatch.value === color ? "border-brand scale-110" : "border-line"
            }`}
            style={{ backgroundColor: swatch.value }}
          />
        ))}
      </div>

      <p className="mt-3 text-xs text-ink-muted">{selected.name}</p>

      <div className="mt-4 flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-sm text-ink-muted hover:text-ink">
          ← Back to house
        </button>
        <button
          type="button"
          onClick={() => onRequest(selected)}
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-hover"
        >
          Request this paint job
        </button>
      </div>
    </motion.div>
  );
}
