import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface RopeProps {
  player1Ref: React.RefObject<THREE.Group>;
  player2Ref: React.RefObject<THREE.Group>;
  segments: number;
}

export default function Rope({ player1Ref, player2Ref, segments }: RopeProps) {
  const ropeRef = useRef<THREE.BufferGeometry>(null);
  
  const points = useMemo(() => {
    return new Float32Array(segments * 3);
  }, [segments]);

  useFrame(() => {
    if (!player1Ref.current || !player2Ref.current || !ropeRef.current) return;

    const p1 = player1Ref.current.position;
    const p2 = player2Ref.current.position;
    
    // Create rope segments with realistic sag
    for (let i = 0; i < segments; i++) {
      const t = i / (segments - 1);
      
      // Linear interpolation between players
      const x = THREE.MathUtils.lerp(p1.x, p2.x, t);
      const y = THREE.MathUtils.lerp(p1.y, p2.y, t);
      
      // Add catenary curve (rope sag)
      const sag = Math.sin(t * Math.PI) * -0.5;
      
      points[i * 3] = x;
      points[i * 3 + 1] = y + sag;
      points[i * 3 + 2] = 0;
    }

    ropeRef.current.setAttribute('position', new THREE.BufferAttribute(points, 3));
  });

  return (
    <line>
      <bufferGeometry ref={ropeRef}>
        <bufferAttribute
          attach="attributes-position"
          array={points}
          count={segments}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#8B4513" linewidth={3} />
    </line>
  );
}
