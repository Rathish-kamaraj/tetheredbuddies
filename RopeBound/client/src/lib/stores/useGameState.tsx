import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { useAudio } from "./useAudio";

export type GameState = "menu" | "playing" | "won" | "levelSelect";

interface GameStateStore {
  gameState: GameState;
  currentLevel: number;
  
  // Actions
  startGame: () => void;
  resetGame: () => void;
  winGame: () => void;
  goToLevelSelect: () => void;
  selectLevel: (levelId: number) => void;
  nextLevel: () => void;
}

export const useGameState = create<GameStateStore>()(
  subscribeWithSelector((set, get) => ({
    gameState: "menu",
    currentLevel: 1,
    
    startGame: () => {
      console.log("Starting game");
      set({ gameState: "playing" });
      
      // Start background music
      const { backgroundMusic, isMuted } = useAudio.getState();
      if (backgroundMusic && !isMuted) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(console.log);
      }
    },
    
    resetGame: () => {
      console.log("Resetting game");
      set({ gameState: "menu" });
      
      // Stop background music
      const { backgroundMusic } = useAudio.getState();
      if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
      }
    },
    
    goToLevelSelect: () => {
      console.log("Going to level select");
      set({ gameState: "levelSelect" });
    },
    
    selectLevel: (levelId: number) => {
      console.log("Selected level", levelId);
      set({ currentLevel: levelId, gameState: "playing" });
      
      // Start background music
      const { backgroundMusic, isMuted } = useAudio.getState();
      if (backgroundMusic && !isMuted) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(console.log);
      }
    },
    
    nextLevel: () => {
      const { currentLevel } = get();
      const nextLevelId = currentLevel + 1;
      if (nextLevelId <= 5) { // We have 5 levels
        console.log("Going to next level", nextLevelId);
        set({ currentLevel: nextLevelId, gameState: "playing" });
      } else {
        console.log("All levels completed!");
        set({ gameState: "won" });
      }
    },
    
    winGame: () => {
      const currentState = get().gameState;
      if (currentState === "playing") {
        console.log("Level completed!");
        set({ gameState: "won" });
        
        // Play success sound and stop background music
        const { successSound, backgroundMusic, playSuccess } = useAudio.getState();
        if (backgroundMusic) {
          backgroundMusic.pause();
        }
        playSuccess();
      }
    }
  }))
);

// Subscribe to game state changes for audio management
useGameState.subscribe(
  (state) => state.gameState,
  (gameState) => {
    console.log("Game state changed to:", gameState);
  }
);
