import { motion } from "framer-motion";
import { TILE_VARIANTS } from "../imageManifest";

export default function TilingOverlay({ image, onPick, onRequest, onBack }) {
  const selected = TILE_VARIANTS.find((t) => t.image === image) ?? TILE_VARIANTS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="pointer-events-auto absolute bottom-6 left-1/2 w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl border border-line bg-surface/95 p-5 shadow-lg backdrop-blur"
    >
      <p className="font-display text-lg font-semibold text-ink">Tiling</p>
      <p className="mt-1 text-sm text-ink-muted">Choose a tile finish for this floor.</p>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {TILE_VARIANTS.map((tile) => (
          <button
            key={tile.image}
            type="button"
            onClick={() => onPick(tile.image)}
            className={`overflow-hidden rounded-lg border-2 transition ${
              tile.image === image ? "border-brand" : "border-line"
            }`}
          >
            <img src={tile.image} alt={tile.name} className="block h-12 w-full object-cover" />
            <span className="block px-1 py-1 text-[11px] text-ink-muted">{tile.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-sm text-ink-muted hover:text-ink">
          ← Back to house
        </button>
        <button
          type="button"
          onClick={() => onRequest(selected)}
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-hover"
        >
          Request this tiling
        </button>
      </div>
    </motion.div>
  );
}
