import { forwardRef } from "react";
import * as THREE from "three";

interface PlayerProps {
  color: string;
  position: [number, number, number];
}

const Player = forwardRef<THREE.Group, PlayerProps>(({ color, position }, ref) => {
  return (
    <group ref={ref} position={position}>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshLambertMaterial color={color} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.15, 0.2, 0.41]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshLambertMaterial color="white" />
      </mesh>
      <mesh position={[0.15, 0.2, 0.41]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshLambertMaterial color="white" />
      </mesh>
      
      {/* Pupils */}
      <mesh position={[-0.15, 0.2, 0.45]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshLambertMaterial color="black" />
      </mesh>
      <mesh position={[0.15, 0.2, 0.45]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshLambertMaterial color="black" />
      </mesh>
    </group>
  );
});

Player.displayName = "Player";

export default Player;
