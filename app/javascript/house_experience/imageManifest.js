// The single seam between "code" and "actual photos." Every real photo you
// source replaces one path here — nothing else in the component tree needs
// to change.
//
// Hotspot rectangles are percentages of the interior hub photo's own frame.
// These were estimated by eye against the sourced photo (a vaulted-ceiling
// living room) — I can't visually verify pixel alignment myself, so treat
// them as a starting point and nudge the numbers after looking at the live
// page; the wall hotspot in particular is a smaller, less obvious region in
// this photo than the wireframe placeholder implied (the room is mostly
// glass on the right, wood-panelled stairs on the left).
const BASE = "/images/house";

export const IMAGES = {
  exteriorBase: `${BASE}/exterior-closed.jpg`,
  doorCutout: `${BASE}/door-cutout.svg`, // still a placeholder — cut the real door out of exterior-closed.jpg as its own transparent layer
  interiorHub: `${BASE}/interior-hub.jpg`,
};

// Door cutout's position/size as a % of the exterior image's frame — must
// match where the doorway actually sits once door-cutout.svg is replaced
// with a real cutout of exterior-closed.jpg's door. transformOrigin is the
// hinge edge for the rotateY swing in DoorLayer.jsx.
export const DOOR_FRAME = {
  top: "48%",
  left: "42%",
  width: "13%",
  height: "30%",
  transformOrigin: "left center",
};

export const ZONES = {
  paint: {
    label: "Paint Job",
    closeUp: `${BASE}/zone-paint.jpg`,
    hotspot: { top: "8%", left: "1%", width: "16%", height: "28%" },
  },
  tiling: {
    label: "Tiling",
    // No separate base close-up needed — HouseStage always shows the
    // currently-selected TILE_VARIANTS image for this zone.
    hotspot: { top: "68%", left: "12%", width: "45%", height: "26%" },
  },
  electrical: {
    label: "Electrical",
    // Same as tiling — FIXTURE_VARIANTS supplies the image.
    hotspot: { top: "8%", left: "38%", width: "16%", height: "22%" },
  },
};

export const TILE_VARIANTS = [
  { name: "Warm Terracotta", image: `${BASE}/tile-terracotta.jpg` },
  { name: "Cloud Grey", image: `${BASE}/tile-grey.jpg` },
  { name: "Charcoal Slate", image: `${BASE}/tile-charcoal.jpg` },
  { name: "Sandstone", image: `${BASE}/tile-sandstone.jpg` },
];

export const FIXTURE_VARIANTS = [
  { key: "classic", label: "Classic (cone shade)", image: `${BASE}/fixture-classic.jpg` },
  { key: "modern", label: "Modern (drum shade)", image: `${BASE}/fixture-modern.jpg` },
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
