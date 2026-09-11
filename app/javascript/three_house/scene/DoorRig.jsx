import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MESH_NAMES } from "../meshRegistry";

const DOOR_WIDTH = 1.1;
const DOOR_HEIGHT = 2.2;
const OPEN_ANGLE = -Math.PI / 2.1; // ~85°, swings inward

// Real model note: the hinge pivot should be an empty (Plain Axes) placed
// exactly on the real-world hinge edge in Blender, with the door mesh
// parented to it. Here the placeholder achieves the same thing by putting
// the <group> origin at the hinge line and offsetting the door mesh by half
// its own width — do NOT rotate the door mesh directly, rotate this group.
export default function DoorRig({ open }) {
  const hingeRef = useRef();
  const angle = useRef(0);

  useFrame((_, delta) => {
    const target = open ? OPEN_ANGLE : 0;
    angle.current += (target - angle.current) * Math.min(1, delta * 3);
    if (hingeRef.current) hingeRef.current.rotation.y = angle.current;
  });

  return (
    <group ref={hingeRef} name={MESH_NAMES.doorHinge} position={[0.65, 0, 1.5]}>
      <mesh name={MESH_NAMES.door} position={[DOOR_WIDTH / 2, DOOR_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[DOOR_WIDTH, DOOR_HEIGHT, 0.08]} />
        <meshStandardMaterial color="#5a3a24" roughness={0.55} metalness={0.05} />
      </mesh>
    </group>
  );
}
