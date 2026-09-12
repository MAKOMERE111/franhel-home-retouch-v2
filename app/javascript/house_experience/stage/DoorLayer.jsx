import { motion } from "framer-motion";
import { DOOR_FRAME } from "../imageManifest";

// A real CSS 3D transform (rotateY around the hinge edge, inside a
// perspective container), not a flat crossfade — this is what makes the
// door read as swinging open rather than just fading away. The parent
// (HouseStage) is responsible for `perspective` on its own container.
export default function DoorLayer({ image, open }) {
  return (
    <motion.img
      src={image}
      alt=""
      initial={false}
      animate={{ rotateY: open ? -105 : 0, opacity: open ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.45, 0, 0.2, 1] }}
      style={{
        position: "absolute",
        top: DOOR_FRAME.top,
        left: DOOR_FRAME.left,
        width: DOOR_FRAME.width,
        height: DOOR_FRAME.height,
        transformOrigin: DOOR_FRAME.transformOrigin,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    />
  );
}
