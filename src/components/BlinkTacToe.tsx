
import { GameProvider } from "../context/GameContext";
import CategorySelection from "./CategorySelection";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";
import GameControl from "./GameControl";
import MoveHistory from "./MoveHistory";
import GameRules from "./GameRules";
import { useGameContext } from "../context/GameContext";

// This component wraps the game content and accesses context
const GameContent = () => {
  const { gameState, isReady } = useGameContext();
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-blue">
          Blink Tac Toe
        </h1>
        <p className="text-xl opacity-80">The Emoji Vanishing Game 🎭✨</p>
      </div>
      
      {!isReady ? <CategorySelection /> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <GameStatus />
            <GameBoard />
            <GameControl />
          </div>
          <div className="md:col-span-1">
            <GameRules />
            <MoveHistory />
          </div>
        </div>
      )}
    </div>
  );
};

// The main component that wraps everything with the GameProvider
const BlinkTacToe = () => {
  return (
    <GameProvider>
      <div className="min-h-screen py-8 flex flex-col">
        <GameContent />
      </div>
    </GameProvider>
  );
};

export default BlinkTacToe;
