import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";
import Game from "./components/Game";
import GameUI from "./components/GameUI";
import { useAudio } from "./lib/stores/useAudio";

// Define control keys for both players
enum Controls {
  // Player 1 (WASD)
  player1Left = 'player1Left',
  player1Right = 'player1Right',
  player1Jump = 'player1Jump',
  
  // Player 2 (Arrow keys)
  player2Left = 'player2Left',
  player2Right = 'player2Right',
  player2Jump = 'player2Jump',
  
  // Game controls
  restart = 'restart',
}

const controls = [
  { name: Controls.player1Left, keys: ["KeyA"] },
  { name: Controls.player1Right, keys: ["KeyD"] },
  { name: Controls.player1Jump, keys: ["KeyW"] },
  { name: Controls.player2Left, keys: ["ArrowLeft"] },
  { name: Controls.player2Right, keys: ["ArrowRight"] },
  { name: Controls.player2Jump, keys: ["ArrowUp"] },
  { name: Controls.restart, keys: ["KeyR"] },
];

// Main App component
function App() {
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Load audio files asynchronously - don't block the UI
  useEffect(() => {
    const loadAudio = async () => {
      try {
        // Load audio in background without blocking
        const bgMusic = new Audio("/sounds/background.mp3");
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
        bgMusic.preload = "none"; // Don't preload to speed up initial load
        setBackgroundMusic(bgMusic);

        const hitAudio = new Audio("/sounds/hit.mp3");
        hitAudio.volume = 0.5;
        hitAudio.preload = "none";
        setHitSound(hitAudio);

        const successAudio = new Audio("/sounds/success.mp3");
        successAudio.volume = 0.7;
        successAudio.preload = "none";
        setSuccessSound(successAudio);
      } catch (error) {
        console.log("Audio loading error:", error);
      }
    };

    // Load audio without waiting
    loadAudio();
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <KeyboardControls map={controls}>
          <Canvas
            camera={{
              position: [0, 0, 10],
              left: -15,
              right: 15,
              top: 10,
              bottom: -10,
            }}
            orthographic
            gl={{
              antialias: false,
              powerPreference: "high-performance"
            }}
          >
            <color attach="background" args={["#87CEEB"]} />

            {/* Lighting */}
            <ambientLight intensity={0.8} />

            <Suspense fallback={null}>
              <Game />
            </Suspense>
          </Canvas>
          <GameUI />
        </KeyboardControls>
    </div>
  );
}

export default App;
