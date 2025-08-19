import { useCallback } from "react";
import * as THREE from "three";

export interface PhysicsObject {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  grounded: boolean;
}

export const usePhysics = () => {
  const updatePhysics = useCallback((
    objects: PhysicsObject[],
    platforms: Array<{ position: THREE.Vector3; size: THREE.Vector3 }>,
    delta: number
  ) => {
    const gravity = -15;

    objects.forEach(obj => {
      // Apply gravity
      obj.velocity.y += gravity * delta;
      
      // Update position
      obj.position.x += obj.velocity.x * delta;
      obj.position.y += obj.velocity.y * delta;

      // Check platform collisions
      obj.grounded = false;
      for (const platform of platforms) {
        const dx = Math.abs(obj.position.x - platform.position.x);
        const dy = Math.abs(obj.position.y - platform.position.y);
        
        if (dx < platform.size.x + obj.size && dy < platform.size.y + obj.size) {
          // Check if object is above platform
          if (obj.position.y > platform.position.y + platform.size.y - 0.1) {
            obj.position.y = platform.position.y + platform.size.y + obj.size;
            if (obj.velocity.y < 0) {
              obj.velocity.y = 0;
              obj.grounded = true;
            }
          }
        }
      }
    });
  }, []);

  const checkCollision = useCallback((
    pos1: THREE.Vector3,
    size1: number,
    pos2: THREE.Vector3,
    size2: number
  ) => {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return dx < size1 + size2 && dy < size1 + size2;
  }, []);

  return {
    updatePhysics,
    checkCollision,
  };
};
