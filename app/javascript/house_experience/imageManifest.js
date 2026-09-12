// The single seam between "code" and "actual photos." Every real photo you
// source replaces one path here — nothing else in the component tree needs
// to change. Hotspot rectangles are percentages of the interior hub image's
// own frame (top/left/width/height), matching the wireframe regions drawn
// into interior-hub.svg so the placeholder is self-documenting.

const BASE = "/images/house";

export const IMAGES = {
  exteriorBase: `${BASE}/exterior-closed.svg`,
  doorCutout: `${BASE}/door-cutout.svg`,
  interiorHub: `${BASE}/interior-hub.svg`,
};

// Door cutout's position/size as a % of the exterior image's frame — must
// match where the doorway is drawn in exterior-closed.svg (or wherever the
// real doorway sits once that's a photo). transformOrigin is the hinge
// edge for the rotateY swing in DoorLayer.jsx — "left center" for a door
// that opens away from the camera, hinged on its left.
export const DOOR_FRAME = {
  top: "52.2%",
  left: "46.75%",
  width: "11.25%",
  height: "23.3%",
  transformOrigin: "left center",
};

export const ZONES = {
  paint: {
    label: "Paint Job",
    closeUp: `${BASE}/zone-paint.svg`,
    hotspot: { top: "18%", left: "8%", width: "24%", height: "44%" },
  },
  tiling: {
    label: "Tiling",
    closeUp: `${BASE}/zone-tiling.svg`,
    hotspot: { top: "62%", left: "42%", width: "38%", height: "32%" },
  },
  electrical: {
    label: "Electrical",
    closeUp: `${BASE}/zone-electrical.svg`,
    hotspot: { top: "6%", left: "44%", width: "12%", height: "14%" },
  },
};

export const TILE_VARIANTS = [
  { name: "Warm Terracotta", image: `${BASE}/tile-terracotta.svg` },
  { name: "Cloud Grey", image: `${BASE}/tile-grey.svg` },
  { name: "Charcoal Slate", image: `${BASE}/tile-charcoal.svg` },
  { name: "Sandstone", image: `${BASE}/tile-sandstone.svg` },
];

export const FIXTURE_VARIANTS = [
  { key: "classic", label: "Classic (cone shade)", image: `${BASE}/fixture-classic.svg` },
  { key: "modern", label: "Modern (drum shade)", image: `${BASE}/fixture-modern.svg` },
];

export const PAINT_SWATCHES = [
  { name: "Terracotta Clay", value: "#c1501f" },
  { name: "Warm Plaster", value: "#ede6da" },
  { name: "Deep Forest", value: "#2f5d43" },
  { name: "Charcoal", value: "#3a342c" },
  { name: "Soft Sand", value: "#d9c9a8" },
  { name: "Slate Blue", value: "#3d5a73" },
];

// Try "multiply" first (works well on evenly-lit, matte, light/mid walls);
// switch to "soft-light" if multiply looks muddy on the real photo's
// shadows — see the recommendation notes alongside this file.
export const PAINT_BLEND_MODE = "multiply";
