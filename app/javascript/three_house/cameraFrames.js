// Camera position + lookAt target for every stage of the experience.
// Tuned for the placeholder geometry in scene/PlaceholderHouse.jsx — once
// the real model is in, re-derive these from each zone mesh's bounding box
// rather than eyeballing numbers again (see CameraRig.jsx's frameForBounds
// helper).

export const CAMERA_FRAMES = {
  exterior: { position: [0, 1.6, 7], lookAt: [0, 1.3, 0] },
  opening: { position: [0, 1.6, 3], lookAt: [0, 1.3, -1] },
  interior: { position: [0, 3.4, 7.5], lookAt: [0, 1.2, 0] },
  "zone:paint": { position: [-2.7, 1.5, 1.4], lookAt: [-2.7, 1.5, -1] },
  "zone:tiling": { position: [1.8, 1.8, 1.6], lookAt: [1.8, 0, -0.8] },
  "zone:electrical": { position: [0, 2.7, 1.8], lookAt: [0, 2.5, -1] },
};

export function frameFor(stage) {
  return CAMERA_FRAMES[stage] || CAMERA_FRAMES.interior;
}
