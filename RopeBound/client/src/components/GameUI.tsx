import { useGameState } from "../lib/stores/useGameState";
import { useAudio } from "../lib/stores/useAudio";
import { levels } from "../data/levels";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function GameUI() {
  const { gameState, startGame, resetGame, goToLevelSelect, selectLevel, nextLevel, currentLevel } = useGameState();
  const { toggleMute, isMuted } = useAudio();

  const currentLevelData = levels.find(level => level.id === currentLevel) || levels[0];

  if (gameState === 'menu') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-white">Tethered Buddies</h1>
              <p className="text-gray-300">
                Two characters connected by a rope must work together to reach the exit!
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong>Player 1:</strong> WASD to move, W to jump</p>
                <p><strong>Player 2:</strong> Arrow keys to move, ↑ to jump</p>
                <p><strong>Goal:</strong> Both players must reach the green exit zones</p>
                <p><strong>Restart:</strong> Press R anytime</p>
              </div>
              <div className="space-y-2">
                <Button onClick={() => selectLevel(1)} className="w-full">
                  Start Game
                </Button>
                <Button onClick={goToLevelSelect} variant="outline" className="w-full">
                  Select Level
                </Button>
                <Button onClick={toggleMute} variant="outline" className="w-full">
                  {isMuted ? "🔇 Unmute" : "🔊 Mute"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'levelSelect') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-white">Select Level</h1>
              <div className="grid grid-cols-2 gap-2">
                {levels.map((level) => (
                  <Button
                    key={level.id}
                    onClick={() => selectLevel(level.id)}
                    variant={level.id === currentLevel ? "default" : "outline"}
                    className="p-3 h-auto"
                  >
                    <div className="text-center">
                      <div className="font-bold">Level {level.id}</div>
                      <div className="text-xs">{level.name}</div>
                    </div>
                  </Button>
                ))}
              </div>
              <Button onClick={resetGame} variant="outline" className="w-full">
                Back to Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'won') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-green-400">🎉 Level Complete! 🎉</h1>
              <div className="text-gray-300">
                <p className="font-bold">{currentLevelData.name}</p>
                <p>{currentLevelData.description}</p>
                <p className="mt-2">Excellent teamwork!</p>
              </div>
              <div className="space-y-2">
                {currentLevel < levels.length ? (
                  <Button onClick={nextLevel} className="w-full">
                    Next Level
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-lg font-bold text-yellow-400">All Levels Complete!</p>
                    <p className="text-sm text-gray-300">You mastered all challenges!</p>
                  </div>
                )}
                <Button onClick={goToLevelSelect} variant="outline" className="w-full">
                  Level Select
                </Button>
                <Button onClick={resetGame} variant="outline" className="w-full">
                  Main Menu
                </Button>
                <Button onClick={toggleMute} variant="ghost" size="sm" className="w-full">
                  {isMuted ? "🔇 Unmute" : "🔊 Mute"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // In-game UI
  return (
    <div className="absolute top-4 left-4 z-10">
      <Card className="bg-black bg-opacity-70">
        <CardContent className="p-3">
          <div className="text-white text-sm space-y-1">
            <p><strong>Level {currentLevel}:</strong> {currentLevelData.name}</p>
            <p className="text-xs text-gray-300">{currentLevelData.description}</p>
            <p><strong>Goal:</strong> Both players reach green exits</p>
            <p><strong>Controls:</strong> WASD / Arrow Keys + R to restart</p>
            <Button 
              onClick={toggleMute} 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-gray-300 p-1 h-auto"
            >
              {isMuted ? "🔇" : "🔊"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
