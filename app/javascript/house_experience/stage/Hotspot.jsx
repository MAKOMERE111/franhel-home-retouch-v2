import { useState } from "react";

// Replaces raycasted meshes: a plain absolutely-positioned button sized by
// percentage coordinates over the base image, with a soft glow on hover so
// it reads as interactive without needing a visible border at rest.
export default function Hotspot({ rect, label, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      className="absolute rounded-lg border-2 transition-all duration-150"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderColor: hovered ? "#c1501f" : "transparent",
        boxShadow: hovered ? "0 0 0 6px rgba(193, 80, 31, 0.18), 0 0 24px rgba(193, 80, 31, 0.35)" : "none",
        background: hovered ? "rgba(193, 80, 31, 0.08)" : "transparent",
        cursor: "pointer",
      }}
    />
  );
}
