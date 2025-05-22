
import { useGameContext } from "../context/GameContext";

const GameStatus = () => {
  const { gameState, players } = useGameContext();
  const { currentPlayer, winner, gamePhase } = gameState;
  
  if (gamePhase === 'category-selection') {
    return null;
  }
  
  return (
    <div className="my-6 text-center">
      {winner ? (
        <div className="animate-bounce text-xl md:text-2xl py-3 px-6 rounded-lg bg-opacity-20"
             style={{ backgroundColor: winner === 1 ? '#FF10F0' : '#00D8FF' }}>
          <p className="font-bold">
            {players[winner - 1].name} Wins! 🎉
          </p>
          <p className="text-lg mt-1 opacity-80">
            Victory with {gameState.winningLine?.map(i => gameState.board[i].emoji).join(' ')}
          </p>
        </div>
      ) : (
        <div className="animate-pulse-neon rounded-lg py-2 px-4 inline-block"
             style={{ backgroundColor: currentPlayer === 1 ? 'rgba(255, 16, 240, 0.2)' : 'rgba(0, 216, 255, 0.2)' }}>
          <p className="text-lg font-medium">
            <span className="font-bold">{players[currentPlayer - 1].name}'s Turn</span>
            <span className="ml-2 text-xl">
              {currentPlayer === 1 ? '🎮' : '🎯'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default GameStatus;
