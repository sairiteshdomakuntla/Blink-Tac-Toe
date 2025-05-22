
import { useGameContext } from "../context/GameContext";
import GameCell from "./GameCell";
import { BOARD_SIZE } from "../constants/game-constants";

const GameBoard = () => {
  const { gameState, makeMove, players } = useGameContext();
  const { board, currentPlayer, winner, winningLine } = gameState;

  // Determine if a cell is part of the winning line
  const isWinningCell = (index: number) => {
    return winningLine ? winningLine.includes(index) : false;
  };

  // Get player color based on player ID
  const getPlayerColor = (playerId: 1 | 2 | null) => {
    if (!playerId) return "";
    return `text-neon-${players[playerId - 1].color}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className="grid grid-cols-3 gap-3 aspect-square w-full"
        style={{ 
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` 
        }}
      >
        {board.map((cell, index) => (
          <GameCell
            key={index}
            index={index}
            cell={cell}
            onClick={() => makeMove(index)}
            isWinner={isWinningCell(index)}
            playerColor={getPlayerColor(cell.player)}
            disabled={winner !== null || cell.player !== null}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
