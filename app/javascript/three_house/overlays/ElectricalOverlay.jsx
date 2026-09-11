import { motion } from "framer-motion";

const VARIANTS = [
  { key: "classic", label: "Classic (cone shade)" },
  { key: "modern", label: "Modern (drum shade)" },
];

export default function ElectricalOverlay({ variant, on, onPickVariant, onToggle, onRequest, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="pointer-events-auto absolute bottom-6 left-1/2 w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl border border-line bg-surface/95 p-5 shadow-lg backdrop-blur"
    >
      <p className="font-display text-lg font-semibold text-ink">Electrical</p>
      <p className="mt-1 text-sm text-ink-muted">Fixture style, and a quick on/off check.</p>

      <div className="mt-4 flex gap-2">
        {VARIANTS.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => onPickVariant(v.key)}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              variant === v.key ? "border-brand bg-brand-soft text-brand" : "border-line text-ink-muted hover:text-ink"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="mt-3 flex items-center gap-2 text-sm text-ink-muted hover:text-ink"
      >
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${on ? "bg-good" : "bg-line"}`} />
        {on ? "Fixture on — tap to turn off" : "Fixture off — tap to turn on"}
      </button>

      <div className="mt-4 flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-sm text-ink-muted hover:text-ink">
          ← Back to house
        </button>
        <button
          type="button"
          onClick={onRequest}
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-hover"
        >
          Request electrical work
        </button>
      </div>
    </motion.div>
  );
}
