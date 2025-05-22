
import { CellState } from "../types/game-types";
import { cn } from "@/lib/utils";

interface GameCellProps {
  index: number;
  cell: CellState;
  onClick: () => void;
  isWinner: boolean;
  playerColor: string;
  disabled: boolean;
}

const GameCell = ({ 
  index, 
  cell, 
  onClick, 
  isWinner, 
  playerColor,
  disabled 
}: GameCellProps) => {
  return (
    <div
      className={cn(
        "game-cell",
        disabled && "game-cell-disabled",
        isWinner && "game-cell-winner",
        playerColor,
        cell.emoji && "emoji-enter"
      )}
      onClick={disabled ? undefined : onClick}
      data-testid={`cell-${index}`}
      aria-label={`Cell ${index}`}
    >
      {cell.emoji && (
        <span className="emoji-content">
          {cell.emoji}
        </span>
      )}
    </div>
  );
};

export default GameCell;
