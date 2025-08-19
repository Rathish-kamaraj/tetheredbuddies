import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import Player from "./Player";
import Rope from "./Rope";
import Level from "./Level";
import { useGameState } from "../lib/stores/useGameState";
import { usePhysics } from "../hooks/usePhysics";
import { levels } from "../data/levels";
import * as THREE from "three";

enum Controls {
  player1Left = 'player1Left',
  player1Right = 'player1Right',
  player1Jump = 'player1Jump',
  player2Left = 'player2Left',
  player2Right = 'player2Right',
  player2Jump = 'player2Jump',
  restart = 'restart',
}

export default function Game() {
  const [subscribe, getState] = useKeyboardControls<Controls>();
  const { gameState, resetGame, winGame, currentLevel } = useGameState();
  const { updatePhysics } = usePhysics();
  
  const player1Ref = useRef<THREE.Group>(null);
  const player2Ref = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.Camera>(null);

  // Get current level data
  const currentLevelData = levels.find(level => level.id === currentLevel) || levels[0];

  // Player physics state
  const player1State = useRef({
    position: currentLevelData.player1Start.clone(),
    velocity: new THREE.Vector3(0, 0, 0),
    grounded: false,
  });

  const player2State = useRef({
    position: currentLevelData.player2Start.clone(),
    velocity: new THREE.Vector3(0, 0, 0),
    grounded: false,
  });

  // Rope constraint from level data
  const ropeLength = currentLevelData.ropeLength;

  // Level platforms and exit zones from level data
  const platforms = currentLevelData.platforms;
  const exitZones = currentLevelData.exitZones;

  // Check collision with platforms
  const checkPlatformCollision = (playerPos: THREE.Vector3, playerSize = 0.5) => {
    for (const platform of platforms) {
      const dx = Math.abs(playerPos.x - platform.position.x);
      const dy = Math.abs(playerPos.y - platform.position.y);
      
      if (dx < platform.size.x + playerSize && dy < platform.size.y + playerSize) {
        // Check if player is above platform
        if (playerPos.y > platform.position.y + platform.size.y - 0.1) {
          return platform.position.y + platform.size.y + playerSize;
        }
      }
    }
    return null;
  };

  // Check if both players are in exit zones - more precise collision
  const checkWinCondition = () => {
    const playerSize = 0.4; // Half the player width
    
    const p1InExit = exitZones.some(zone => {
      const dx = Math.abs(player1State.current.position.x - zone.position.x);
      const dy = Math.abs(player1State.current.position.y - zone.position.y);
      return dx < (zone.size.x - playerSize) && dy < (zone.size.y - playerSize);
    });

    const p2InExit = exitZones.some(zone => {
      const dx = Math.abs(player2State.current.position.x - zone.position.x);
      const dy = Math.abs(player2State.current.position.y - zone.position.y);
      return dx < (zone.size.x - playerSize) && dy < (zone.size.y - playerSize);
    });

    return p1InExit && p2InExit;
  };

  // Reset player positions to current level start
  const resetPlayers = () => {
    player1State.current.position.copy(currentLevelData.player1Start);
    player1State.current.velocity.set(0, 0, 0);
    player1State.current.grounded = false;
    player2State.current.position.copy(currentLevelData.player2Start);
    player2State.current.velocity.set(0, 0, 0);
    player2State.current.grounded = false;
  };

  // Reset players when level changes
  useEffect(() => {
    resetPlayers();
  }, [currentLevel]);

  // Handle restart
  useEffect(() => {
    return subscribe(
      state => state.restart,
      pressed => {
        if (pressed) {
          console.log("Restarting game");
          resetGame();
          resetPlayers();
        }
      }
    );
  }, [subscribe, resetGame]);

  // Game loop
  useFrame((state, delta) => {
    if (gameState !== 'playing') return;

    const controls = getState();
    const gravity = -15;
    const moveSpeed = 8;
    const jumpForce = 12;

    // Player 1 controls
    if (controls.player1Left) {
      player1State.current.velocity.x = -moveSpeed;
    } else if (controls.player1Right) {
      player1State.current.velocity.x = moveSpeed;
    } else {
      player1State.current.velocity.x *= 0.8; // Friction
    }

    if (controls.player1Jump && player1State.current.grounded) {
      player1State.current.velocity.y = jumpForce;
      player1State.current.grounded = false;
    }

    // Player 2 controls
    if (controls.player2Left) {
      player2State.current.velocity.x = -moveSpeed;
    } else if (controls.player2Right) {
      player2State.current.velocity.x = moveSpeed;
    } else {
      player2State.current.velocity.x *= 0.8; // Friction
    }

    if (controls.player2Jump && player2State.current.grounded) {
      player2State.current.velocity.y = jumpForce;
      player2State.current.grounded = false;
    }

    // Apply gravity
    player1State.current.velocity.y += gravity * delta;
    player2State.current.velocity.y += gravity * delta;

    // Update positions
    player1State.current.position.x += player1State.current.velocity.x * delta;
    player1State.current.position.y += player1State.current.velocity.y * delta;
    player2State.current.position.x += player2State.current.velocity.x * delta;
    player2State.current.position.y += player2State.current.velocity.y * delta;

    // Rope constraint
    const distance = player1State.current.position.distanceTo(player2State.current.position);
    if (distance > ropeLength) {
      const direction = new THREE.Vector3()
        .subVectors(player2State.current.position, player1State.current.position)
        .normalize();
      
      const midpoint = new THREE.Vector3()
        .addVectors(player1State.current.position, player2State.current.position)
        .multiplyScalar(0.5);
      
      player1State.current.position.copy(midpoint).sub(direction.clone().multiplyScalar(ropeLength / 2));
      player2State.current.position.copy(midpoint).add(direction.clone().multiplyScalar(ropeLength / 2));
      
      // Apply rope physics - transfer momentum
      const relativeVelocity = new THREE.Vector3()
        .subVectors(player2State.current.velocity, player1State.current.velocity);
      const normalComponent = relativeVelocity.dot(direction);
      
      if (normalComponent > 0) {
        const correction = direction.clone().multiplyScalar(normalComponent * 0.5);
        player1State.current.velocity.add(correction);
        player2State.current.velocity.sub(correction);
      }
    }

    // Platform collision
    const p1Ground = checkPlatformCollision(player1State.current.position);
    if (p1Ground !== null) {
      player1State.current.position.y = p1Ground;
      if (player1State.current.velocity.y < 0) {
        player1State.current.velocity.y = 0;
        player1State.current.grounded = true;
      }
    } else {
      player1State.current.grounded = false;
    }

    const p2Ground = checkPlatformCollision(player2State.current.position);
    if (p2Ground !== null) {
      player2State.current.position.y = p2Ground;
      if (player2State.current.velocity.y < 0) {
        player2State.current.velocity.y = 0;
        player2State.current.grounded = true;
      }
    } else {
      player2State.current.grounded = false;
    }

    // Reset if players fall too far
    if (player1State.current.position.y < -10 || player2State.current.position.y < -10) {
      resetPlayers();
    }

    // Update player meshes
    if (player1Ref.current) {
      player1Ref.current.position.copy(player1State.current.position);
    }
    if (player2Ref.current) {
      player2Ref.current.position.copy(player2State.current.position);
    }

    // Update camera to follow both players
    const centerX = (player1State.current.position.x + player2State.current.position.x) / 2;
    const centerY = (player1State.current.position.y + player2State.current.position.y) / 2;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, centerX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, centerY + 2, 0.05);

    // Check win condition
    if (checkWinCondition()) {
      winGame();
    }
  });

  return (
    <>
      <Level platforms={platforms} exitZones={exitZones} />
      <Player 
        ref={player1Ref} 
        color="#ff6b6b" 
        position={[currentLevelData.player1Start.x, currentLevelData.player1Start.y, currentLevelData.player1Start.z]} 
      />
      <Player 
        ref={player2Ref} 
        color="#4ecdc4" 
        position={[currentLevelData.player2Start.x, currentLevelData.player2Start.y, currentLevelData.player2Start.z]} 
      />
      <Rope 
        player1Ref={player1Ref} 
        player2Ref={player2Ref} 
        segments={20}
      />
    </>
  );
}
