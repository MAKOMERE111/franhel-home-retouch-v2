import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Single source of truth for the camera. Tweens position + lookAt together
// whenever `frame` changes, rather than snapping — this is what makes zone
// transitions read as moving through one continuous space instead of a
// scene swap.
export default function CameraRig({ frame, duration = 500 }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(...frame.lookAt));
  const start = useRef({
    position: camera.position.clone(),
    lookAt: target.current.clone(),
  });
  const goal = useRef({
    position: new THREE.Vector3(...frame.position),
    lookAt: new THREE.Vector3(...frame.lookAt),
  });
  const elapsed = useRef(duration); // start "finished" so the very first frame doesn't animate from origin

  useEffect(() => {
    start.current = { position: camera.position.clone(), lookAt: target.current.clone() };
    goal.current = {
      position: new THREE.Vector3(...frame.position),
      lookAt: new THREE.Vector3(...frame.lookAt),
    };
    elapsed.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame.position[0], frame.position[1], frame.position[2], frame.lookAt[0], frame.lookAt[1], frame.lookAt[2]]);

  useFrame((_, delta) => {
    if (elapsed.current >= duration) return;
    elapsed.current = Math.min(duration, elapsed.current + delta * 1000);
    const t = easeInOutCubic(elapsed.current / duration);

    camera.position.lerpVectors(start.current.position, goal.current.position, t);
    target.current.lerpVectors(start.current.lookAt, goal.current.lookAt, t);
    camera.lookAt(target.current);
  });

  return null;
}
