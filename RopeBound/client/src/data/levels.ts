import * as THREE from "three";

export interface Platform {
  position: THREE.Vector3;
  size: THREE.Vector3;
}

export interface ExitZone {
  position: THREE.Vector3;
  size: THREE.Vector3;
}

export interface Level {
  id: number;
  name: string;
  platforms: Platform[];
  exitZones: ExitZone[];
  player1Start: THREE.Vector3;
  player2Start: THREE.Vector3;
  ropeLength: number;
  description: string;
}

export const levels: Level[] = [
  {
    id: 1,
    name: "Getting Started",
    description: "Learn the basics - work together to reach the exits",
    platforms: [
      { position: new THREE.Vector3(0, -4, 0), size: new THREE.Vector3(20, 1, 1) }, // Ground
      { position: new THREE.Vector3(-8, -1, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Left platform
      { position: new THREE.Vector3(8, -1, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Right platform
      { position: new THREE.Vector3(0, 2, 0), size: new THREE.Vector3(2, 0.5, 1) }, // Center platform
      { position: new THREE.Vector3(-12, 4, 0), size: new THREE.Vector3(2, 0.5, 1) }, // Exit platform left
      { position: new THREE.Vector3(12, 4, 0), size: new THREE.Vector3(2, 0.5, 1) }, // Exit platform right
    ],
    exitZones: [
      { position: new THREE.Vector3(-12, 5, 0), size: new THREE.Vector3(2, 2, 1) },
      { position: new THREE.Vector3(12, 5, 0), size: new THREE.Vector3(2, 2, 1) },
    ],
    player1Start: new THREE.Vector3(-3, 2, 0),
    player2Start: new THREE.Vector3(3, 2, 0),
    ropeLength: 6,
  },
  {
    id: 2,
    name: "The Gap",
    description: "Use teamwork to swing across the large gap",
    platforms: [
      { position: new THREE.Vector3(-15, -4, 0), size: new THREE.Vector3(8, 1, 1) }, // Left ground
      { position: new THREE.Vector3(15, -4, 0), size: new THREE.Vector3(8, 1, 1) }, // Right ground
      { position: new THREE.Vector3(-10, -1, 0), size: new THREE.Vector3(4, 0.5, 1) }, // Left platform
      { position: new THREE.Vector3(10, -1, 0), size: new THREE.Vector3(4, 0.5, 1) }, // Right platform
      { position: new THREE.Vector3(-15, 2, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Left exit platform
      { position: new THREE.Vector3(15, 2, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Right exit platform
    ],
    exitZones: [
      { position: new THREE.Vector3(-15, 3, 0), size: new THREE.Vector3(2, 2, 1) },
      { position: new THREE.Vector3(15, 3, 0), size: new THREE.Vector3(2, 2, 1) },
    ],
    player1Start: new THREE.Vector3(-12, 0, 0),
    player2Start: new THREE.Vector3(-8, 0, 0),
    ropeLength: 8,
  },
  {
    id: 3,
    name: "Tower Climb",
    description: "One must pull the other up the tower",
    platforms: [
      { position: new THREE.Vector3(0, -4, 0), size: new THREE.Vector3(15, 1, 1) }, // Ground
      { position: new THREE.Vector3(-5, -1, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Bottom left
      { position: new THREE.Vector3(5, 1, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Bottom right
      { position: new THREE.Vector3(-5, 3, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Mid left
      { position: new THREE.Vector3(5, 5, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Mid right
      { position: new THREE.Vector3(-5, 7, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Top left
      { position: new THREE.Vector3(5, 9, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Top right
    ],
    exitZones: [
      { position: new THREE.Vector3(-5, 8, 0), size: new THREE.Vector3(2, 2, 1) },
      { position: new THREE.Vector3(5, 10, 0), size: new THREE.Vector3(2, 2, 1) },
    ],
    player1Start: new THREE.Vector3(-2, 0, 0),
    player2Start: new THREE.Vector3(2, 0, 0),
    ropeLength: 7,
  },
  {
    id: 4,
    name: "Pendulum Puzzle",
    description: "Swing like a pendulum to reach distant platforms",
    platforms: [
      { position: new THREE.Vector3(0, -4, 0), size: new THREE.Vector3(6, 1, 1) }, // Center ground
      { position: new THREE.Vector3(-20, -2, 0), size: new THREE.Vector3(4, 0.5, 1) }, // Far left
      { position: new THREE.Vector3(20, -2, 0), size: new THREE.Vector3(4, 0.5, 1) }, // Far right
      { position: new THREE.Vector3(-12, 6, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Left high
      { position: new THREE.Vector3(12, 6, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Right high
      { position: new THREE.Vector3(-20, 8, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Left exit
      { position: new THREE.Vector3(20, 8, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Right exit
    ],
    exitZones: [
      { position: new THREE.Vector3(-20, 9, 0), size: new THREE.Vector3(2, 2, 1) },
      { position: new THREE.Vector3(20, 9, 0), size: new THREE.Vector3(2, 2, 1) },
    ],
    player1Start: new THREE.Vector3(-2, 0, 0),
    player2Start: new THREE.Vector3(2, 0, 0),
    ropeLength: 10,
  },
  {
    id: 5,
    name: "Maze of Cooperation",
    description: "Navigate through tight spaces where coordination is key",
    platforms: [
      { position: new THREE.Vector3(0, -4, 0), size: new THREE.Vector3(25, 1, 1) }, // Ground
      // Maze walls
      { position: new THREE.Vector3(-8, -2, 0), size: new THREE.Vector3(1, 3, 1) }, // Wall 1
      { position: new THREE.Vector3(-4, 0, 0), size: new THREE.Vector3(1, 3, 1) }, // Wall 2
      { position: new THREE.Vector3(0, -2, 0), size: new THREE.Vector3(1, 3, 1) }, // Wall 3
      { position: new THREE.Vector3(4, 0, 0), size: new THREE.Vector3(1, 3, 1) }, // Wall 4
      { position: new THREE.Vector3(8, -2, 0), size: new THREE.Vector3(1, 3, 1) }, // Wall 5
      // Upper platforms
      { position: new THREE.Vector3(-10, 2, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Left upper
      { position: new THREE.Vector3(10, 2, 0), size: new THREE.Vector3(3, 0.5, 1) }, // Right upper
      { position: new THREE.Vector3(-6, 4, 0), size: new THREE.Vector3(2, 0.5, 1) }, // Left exit platform
      { position: new THREE.Vector3(6, 4, 0), size: new THREE.Vector3(2, 0.5, 1) }, // Right exit platform
    ],
    exitZones: [
      { position: new THREE.Vector3(-6, 5, 0), size: new THREE.Vector3(1.5, 2, 1) },
      { position: new THREE.Vector3(6, 5, 0), size: new THREE.Vector3(1.5, 2, 1) },
    ],
    player1Start: new THREE.Vector3(-10, 0, 0),
    player2Start: new THREE.Vector3(-6, 0, 0),
    ropeLength: 6,
  },
];