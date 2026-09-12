import { AnimatePresence, motion } from "framer-motion";
import DoorLayer from "./DoorLayer";
import Hotspot from "./Hotspot";
import { IMAGES, ZONES, PAINT_BLEND_MODE } from "../imageManifest";

const TRANSITION = { duration: 0.45, ease: [0.45, 0, 0.2, 1] };

function pct(value) {
  return parseFloat(value);
}

function zoneCenterOrigin(zoneKey) {
  const { hotspot } = ZONES[zoneKey];
  const cx = pct(hotspot.left) + pct(hotspot.width) / 2;
  const cy = pct(hotspot.top) + pct(hotspot.height) / 2;
  return `${cx}% ${cy}%`;
}

export default function HouseStage({ stage, tileImage, fixtureImage, fixtureOn, paintColor, onSelectZone }) {
  const showingExterior = stage === "exterior" || stage === "opening";
  const activeZoneKey = stage.startsWith("zone:") ? stage.split(":")[1] : null;

  const zoneImageFor = (key) => {
    if (key === "tiling") return tileImage;
    if (key === "electrical") return fixtureImage;
    return ZONES[key].closeUp;
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#dfe7ea]" style={{ perspective: 1400 }}>
      <AnimatePresence>
        {showingExterior && (
          <motion.div
            key="exterior"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION}
          >
            <img src={IMAGES.exteriorBase} alt="" className="h-full w-full object-cover" />
            <DoorLayer image={IMAGES.doorCutout} open={stage === "opening"} />
          </motion.div>
        )}

        {!showingExterior && (
          <motion.div
            key="interior"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={TRANSITION}
          >
            <motion.img
              src={IMAGES.interiorHub}
              alt=""
              className="h-full w-full object-cover"
              animate={{
                scale: activeZoneKey ? 1.6 : 1,
                transformOrigin: activeZoneKey ? zoneCenterOrigin(activeZoneKey) : "50% 50%",
              }}
              transition={TRANSITION}
            />

            {stage === "interior" &&
              Object.entries(ZONES).map(([key, zone]) => (
                <Hotspot key={key} rect={zone.hotspot} label={zone.label} onSelect={() => onSelectZone(key)} />
              ))}

            <AnimatePresence>
              {activeZoneKey && (
                <motion.img
                  key={activeZoneKey}
                  src={zoneImageFor(activeZoneKey)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ...TRANSITION, delay: 0.1 }}
                />
              )}
            </AnimatePresence>

            {/* The close-up photo (zone-paint) is assumed to already be
                framed as a full-bleed wall shot, so the color overlay
                covers the whole frame rather than trying to re-derive the
                hub's small hotspot rectangle post-zoom (those two coordinate
                spaces don't line up once the hub image has been scaled). */}
            {activeZoneKey === "paint" && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: paintColor,
                  mixBlendMode: PAINT_BLEND_MODE,
                  opacity: 0.85,
                }}
              />
            )}

            {activeZoneKey === "electrical" && !fixtureOn && (
              <div className="absolute inset-0 bg-black/60 transition-opacity duration-300" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
