import Zone from "./Zone";
import DoorRig from "./DoorRig";
import { MESH_NAMES } from "../meshRegistry";

/**
 * Stand-in geometry for the real Sketchfab house model. Every mesh that
 * needs to survive the swap to a real .glb is named via MESH_NAMES and
 * wrapped the same way it will be once HouseModel.jsx loads real geometry
 * (see that file's comment for the swap plan) — so this file is disposable,
 * but the *shape* of how meshes are found/wired is not.
 *
 * Layout: dollhouse-style cutaway — no roof, no front-facing wall on the
 * camera side, so the interior reads as visible rooms rather than a box.
 */
export default function PlaceholderHouse({
  stage,
  paintColor,
  tileColor,
  fixtureVariant,
  onSelectZone,
}) {
  const doorOpen = stage !== "exterior";

  return (
    <group>
      {/* yard */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#8a9a6b" roughness={1} />
      </mesh>

      {/* exterior facade with a door-shaped gap (no CSG — three simple panels) */}
      <mesh position={[-1.2, 1.5, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 3, 0.2]} />
        <meshStandardMaterial color="#d9c9a8" roughness={0.8} />
      </mesh>
      <mesh position={[2.4, 1.5, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 3, 0.2]} />
        <meshStandardMaterial color="#d9c9a8" roughness={0.8} />
      </mesh>
      <mesh position={[1.2, 2.6, 1.5]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#d9c9a8" roughness={0.8} />
      </mesh>

      <DoorRig open={doorOpen} />

      {/* base interior floor (non-interactive, everywhere except the tiled patch) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.5]} receiveShadow>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial color="#b9ac93" roughness={0.9} />
      </mesh>

      {/* back + side walls (static, sell the "multiple rooms" cutaway) */}
      <mesh position={[0, 1.5, -3]} receiveShadow castShadow>
        <boxGeometry args={[7, 3, 0.15]} />
        <meshStandardMaterial color="#efe6d6" roughness={0.9} />
      </mesh>
      <mesh position={[-3.5, 1.5, -0.5]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 3, 5]} />
        <meshStandardMaterial color="#efe6d6" roughness={0.9} />
      </mesh>
      <mesh position={[0.9, 1.5, -0.5]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 3, 5]} />
        <meshStandardMaterial color="#efe6d6" roughness={0.9} />
      </mesh>

      {/* paintable wall — the wall/paint zone */}
      <Zone name={MESH_NAMES.wallPaintTarget} position={[-2.7, 1.5, -2.92]} onSelect={() => onSelectZone("paint")}>
        {({ hovered, highlightColor }) => (
          <>
            <boxGeometry args={[2.6, 3, 0.15]} />
            <meshStandardMaterial
              color={paintColor}
              emissive={hovered ? highlightColor : "#000000"}
              emissiveIntensity={hovered ? 0.25 : 0}
              roughness={0.85}
            />
          </>
        )}
      </Zone>

      {/* tiled floor patch — the tiling zone */}
      <group position={[1.8, 0.01, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <Zone name={MESH_NAMES.floorTileTarget} onSelect={() => onSelectZone("tiling")}>
          {({ hovered, highlightColor }) => (
            <>
              <planeGeometry args={[2.2, 2.2]} />
              <meshStandardMaterial
                color={tileColor}
                emissive={hovered ? highlightColor : "#000000"}
                emissiveIntensity={hovered ? 0.3 : 0}
                roughness={0.35}
                metalness={0.05}
              />
            </>
          )}
        </Zone>
      </group>

      {/* chandelier — the electrical zone */}
      <group position={[0, 2.9, -0.5]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>
        <Zone name={MESH_NAMES.fixture} onSelect={() => onSelectZone("electrical")}>
          {({ hovered, highlightColor }) => (
            <>
              {fixtureVariant === "modern" ? (
                <cylinderGeometry args={[0.35, 0.35, 0.12, 24]} />
              ) : (
                <coneGeometry args={[0.4, 0.35, 12]} />
              )}
              <meshStandardMaterial
                color="#e8d9b0"
                emissive={hovered ? highlightColor : "#000000"}
                emissiveIntensity={hovered ? 0.35 : 0}
                metalness={0.6}
                roughness={0.3}
              />
            </>
          )}
        </Zone>
      </group>
    </group>
  );
}
