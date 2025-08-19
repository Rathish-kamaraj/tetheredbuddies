import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Platform {
  position: THREE.Vector3;
  size: THREE.Vector3;
}

interface ExitZone {
  position: THREE.Vector3;
  size: THREE.Vector3;
}

interface LevelProps {
  platforms: Platform[];
  exitZones: ExitZone[];
}

export default function Level({ platforms, exitZones }: LevelProps) {
  // Load textures lazily to speed up initial render
  let grassTexture, woodTexture;
  try {
    grassTexture = useTexture("/textures/grass.png");
    woodTexture = useTexture("/textures/wood.jpg");
    
    // Configure texture repeat
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  } catch (error) {
    console.log("Texture loading delayed, using colors instead");
    grassTexture = null;
    woodTexture = null;
  }

  return (
    <>
      {/* Platforms */}
      {platforms.map((platform, index) => {
        const isGround = platform.size.x > 10; // Ground platform is wider
        const texture = isGround ? grassTexture : woodTexture;
        
        // Set texture repeat if texture loaded
        if (texture) {
          texture.repeat.set(platform.size.x / 2, platform.size.y / 2);
        }
        
        return (
          <mesh
            key={index}
            position={[platform.position.x, platform.position.y, platform.position.z]}
          >
            <boxGeometry args={[platform.size.x, platform.size.y, platform.size.z]} />
            {texture ? (
              <meshLambertMaterial map={texture} />
            ) : (
              <meshLambertMaterial color={isGround ? "#90EE90" : "#8B4513"} />
            )}
          </mesh>
        );
      })}

      {/* Exit zones */}
      {exitZones.map((zone, index) => (
        <group key={`exit-${index}`}>
          {/* Exit platform highlight */}
          <mesh
            position={[zone.position.x, zone.position.y - 1, zone.position.z]}
          >
            <boxGeometry args={[zone.size.x, 0.2, zone.size.z]} />
            <meshLambertMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} />
          </mesh>
          
          {/* Exit indicator */}
          <mesh position={[zone.position.x, zone.position.y, zone.position.z + 0.1]}>
            <boxGeometry args={[1, 1, 0.1]} />
            <meshLambertMaterial color="#00FF00" transparent opacity={0.6} />
          </mesh>
          
          {/* Exit text plane */}
          <mesh position={[zone.position.x, zone.position.y + 0.5, zone.position.z + 0.1]}>
            <planeGeometry args={[1.5, 0.5]} />
            <meshLambertMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}

      {/* Background elements */}
      <mesh position={[0, 8, -5]}>
        <planeGeometry args={[50, 20]} />
        <meshLambertMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>
    </>
  );
}
