
export type Category = 'animals' | 'food' | 'sports';

export type EmojiSet = {
  [key in Category]: string[];
}

export type Player = {
  id: 1 | 2;
  category: Category | null;
  emojis: string[];
  name: string;
  color: string;
}

export type CellState = {
  emoji: string | null;
  player: 1 | 2 | null;
  timestamp: number | null;
}

export type GameState = {
  board: CellState[];
  currentPlayer: 1 | 2;
  winner: 1 | 2 | null;
  winningLine: number[] | null;
  gamePhase: 'category-selection' | 'play' | 'game-over';
  movesHistory: {
    player: 1 | 2;
    cell: number;
    emoji: string;
    isVanished?: boolean;
  }[];
}

export type GameContextType = {
  gameState: GameState;
  players: [Player, Player];
  setPlayerCategory: (playerId: 1 | 2, category: Category) => void;
  makeMove: (cellIndex: number) => void;
  resetGame: () => void;
  isReady: boolean;
}
