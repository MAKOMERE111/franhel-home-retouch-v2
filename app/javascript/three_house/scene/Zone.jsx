import { useState } from "react";

// Generic interactive-mesh wrapper: hover highlight + click-to-select,
// via R3F's built-in pointer events (backed by its own raycaster — no
// manual THREE.Raycaster setup needed for the common case).
export default function Zone({ name, onSelect, children, geometry, position, rotation, highlightColor = "#c1501f" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      name={name}
      geometry={geometry}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
    >
      {typeof children === "function" ? children({ hovered, highlightColor }) : children}
    </mesh>
  );
}
