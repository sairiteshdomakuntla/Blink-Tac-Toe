
import { useGameContext } from "../context/GameContext";
import { Button } from "@/components/ui/button";

const GameControl = () => {
  const { gameState, resetGame } = useGameContext();
  const { gamePhase } = gameState;
  
  return (
    <div className="mt-6 flex justify-center">
      {gamePhase === 'game-over' && (
        <Button 
          onClick={resetGame}
          className="bg-neon-purple hover:bg-purple-700 text-white px-8 py-2 rounded-lg 
                     shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          Play Again
        </Button>
      )}
    </div>
  );
};

export default GameControl;
