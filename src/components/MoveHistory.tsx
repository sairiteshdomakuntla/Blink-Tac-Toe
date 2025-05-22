
import { useGameContext } from "../context/GameContext";

const MoveHistory = () => {
  const { gameState, players } = useGameContext();
  const { movesHistory } = gameState;
  
  const getPlayerColorClass = (playerId: 1 | 2) => {
    return playerId === 1 ? "text-neon-pink" : "text-neon-blue";
  };
  
  if (movesHistory.length === 0) return null;
  
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h3 className="text-lg font-medium mb-2">Move History</h3>
      <div className="bg-game-cell bg-opacity-50 rounded-lg p-3 max-h-32 overflow-y-auto">
        {movesHistory.slice().reverse().map((move, index) => (
          <div 
            key={movesHistory.length - index - 1} 
            className={`py-1 ${index !== 0 ? "border-t border-game-bg border-opacity-30" : ""}`}
          >
            <span className={`font-medium ${getPlayerColorClass(move.player)}`}>
              {players[move.player - 1].name}
            </span>
            {" "}
            {move.isVanished 
              ? <span>removed {move.emoji} from cell {move.cell + 1}</span>
              : <span>placed {move.emoji} in cell {move.cell + 1}</span>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoveHistory;
