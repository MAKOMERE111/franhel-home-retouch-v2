import { SoftShadows, Environment } from "@react-three/drei";

// One shadow-casting key light + soft ambient fill — avoid multiple
// shadow-casting lights, the single biggest perf cost in scenes like this.
export default function Lighting({ fixtureOn = true, fixtureIntensity = 1 }) {
  return (
    <>
      <SoftShadows size={18} samples={12} focus={0.6} />
      <Environment preset="apartment" environmentIntensity={0.35} />

      <directionalLight
        position={[6, 9, 4]}
        intensity={1.4}
        color="#fff3e0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
      <ambientLight intensity={0.35} color="#f5ede0" />

      {/* the chandelier's own light — intensity toggled by ElectricalOverlay */}
      <pointLight
        position={[0, 2.7, 0]}
        intensity={fixtureOn ? fixtureIntensity * 1.2 : 0}
        color="#ffd9a0"
        distance={6}
        decay={2}
      />
    </>
  );
}
