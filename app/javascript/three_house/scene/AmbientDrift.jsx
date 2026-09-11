import { useFrame, useThree } from "@react-three/fiber";

// Gentle idle sway for the exterior "waiting at the door" moment. Must be
// rendered AFTER CameraRig in the tree so it adds on top of the tweened
// position each frame rather than being overwritten by it.
export default function AmbientDrift({ active }) {
  const { camera, clock } = useThree();

  useFrame(() => {
    if (!active) return;
    const t = clock.getElapsedTime();
    camera.position.x += Math.sin(t * 0.15) * 0.03;
    camera.position.y += Math.sin(t * 0.22) * 0.015;
  });

  return null;
}
