// The ONLY file that should hardcode mesh/material names from the real
// house model. Every component reads zone/mesh identity from here, so
// swapping in the real Sketchfab .glb only means editing this file.
//
// When you import the real model, replace these strings with the actual
// mesh names from Blender (see the mesh-naming notes given alongside this
// build). Keep the ZONES keys ("paint", "tiling", "electrical", ...) stable
// since HouseExperience's state machine and the overlays key off of them.

export const MESH_NAMES = {
  door: "Door_Front",
  doorHinge: "Door_Hinge_Pivot",
  wallPaintTarget: "Wall_Living_A",
  floorTileTarget: "Floor_Living",
  fixture: "Chandelier_Main",
};

export const ZONES = {
  paint: { meshName: MESH_NAMES.wallPaintTarget, label: "Paint Job" },
  tiling: { meshName: MESH_NAMES.floorTileTarget, label: "Tiling" },
  electrical: { meshName: MESH_NAMES.fixture, label: "Electrical" },
};

// Add new zones here later (e.g. plumbing, flooring) — HouseExperience and
// the overlay-rendering switch already read this table generically.
