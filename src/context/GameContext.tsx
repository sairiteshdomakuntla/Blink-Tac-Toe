
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Category, 
  GameState, 
  Player,
  GameContextType,
  CellState
} from '../types/game-types';
import { 
  BOARD_SIZE, 
  EMOJI_SETS, 
  MAX_ACTIVE_EMOJIS, 
  WINNING_COMBINATIONS,
  PLAYER_COLORS
} from '../constants/game-constants';

const initialGameState: GameState = {
  board: Array(BOARD_SIZE * BOARD_SIZE).fill(null).map(() => ({
    emoji: null,
    player: null,
    timestamp: null
  })),
  currentPlayer: 1,
  winner: null,
  winningLine: null,
  gamePhase: 'category-selection',
  movesHistory: []
};

const initialPlayers: [Player, Player] = [
  {
    id: 1,
    category: null,
    emojis: [],
    name: "Player 1",
    color: PLAYER_COLORS[1]
  },
  {
    id: 2,
    category: null,
    emojis: [],
    name: "Player 2",
    color: PLAYER_COLORS[2]
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [players, setPlayers] = useState<[Player, Player]>(initialPlayers);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Effect to check if both players have selected categories
  useEffect(() => {
    if (players[0].category && players[1].category && gameState.gamePhase === 'category-selection') {
      setGameState(prev => ({ ...prev, gamePhase: 'play' }));
      setIsReady(true);
    }
  }, [players, gameState.gamePhase]);

  // Set player category and initialize their emoji set
  const setPlayerCategory = (playerId: 1 | 2, category: Category) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers] as [Player, Player];
      const playerIndex = playerId - 1;
      
      // Assign all emojis from the selected category to the player
      const categoryEmojis = [...EMOJI_SETS[category]];
      // Shuffle the emojis for randomness
      const shuffledEmojis = categoryEmojis.sort(() => Math.random() - 0.5);
      
      updatedPlayers[playerIndex] = {
        ...updatedPlayers[playerIndex],
        category,
        emojis: shuffledEmojis
      };
      
      return updatedPlayers;
    });
  };

  // Get the oldest emoji placement by a player
  const getOldestEmojiCell = (playerId: 1 | 2): number | null => {
    const playerCells = gameState.board
      .map((cell, index) => ({ ...cell, index }))
      .filter(cell => cell.player === playerId)
      .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    
    return playerCells.length > 0 ? playerCells[0].index : null;
  };

  // Get a random emoji from player's set that hasn't been used yet
  const getRandomEmoji = (playerId: 1 | 2): string => {
    const playerIndex = playerId - 1;
    const player = players[playerIndex];
    
    // Get emojis already on the board for this player
    const usedEmojis = gameState.board
      .filter(cell => cell.player === playerId)
      .map(cell => cell.emoji);
    
    // Filter available emojis (those not currently on the board)
    const availableEmojis = player.emojis.filter(emoji => !usedEmojis.includes(emoji));
    
    // If all emojis are used (shouldn't happen with our rules), return a random one from all emojis
    if (availableEmojis.length === 0) {
      return player.emojis[Math.floor(Math.random() * player.emojis.length)];
    }
    
    // Return a random emoji from available ones
    return availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
  };

  // Check if there's a winner
  const checkWinner = (board: CellState[]): { winner: 1 | 2 | null; winningLine: number[] | null } => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        board[a].player &&
        board[a].player === board[b].player &&
        board[a].player === board[c].player
      ) {
        return {
          winner: board[a].player,
          winningLine: combination
        };
      }
    }
    return { winner: null, winningLine: null };
  };

  // Make a move on the board
  const makeMove = (cellIndex: number) => {
    if (
      gameState.gamePhase !== 'play' ||
      gameState.board[cellIndex].player !== null || 
      gameState.winner
    ) {
      return;
    }

    const currentPlayer = gameState.currentPlayer;
    const playerEmojisOnBoard = gameState.board.filter(cell => cell.player === currentPlayer).length;

    setGameState(prevState => {
      // Create a new board with the updated cell
      let newBoard = [...prevState.board];
      const emoji = getRandomEmoji(currentPlayer);
      
      // If player already has MAX_ACTIVE_EMOJIS emojis on the board, remove the oldest one
      if (playerEmojisOnBoard >= MAX_ACTIVE_EMOJIS) {
        const oldestCellIndex = getOldestEmojiCell(currentPlayer);
        
        if (oldestCellIndex !== null) {
          // Record the vanished move in history
          const vanishedEmoji = newBoard[oldestCellIndex].emoji;
          
          // Add to history that this emoji has vanished
          if (vanishedEmoji) {
            prevState.movesHistory.push({
              player: currentPlayer,
              cell: oldestCellIndex,
              emoji: vanishedEmoji as string,
              isVanished: true
            });
          }
          
          // Clear the oldest cell
          newBoard[oldestCellIndex] = {
            emoji: null,
            player: null,
            timestamp: null
          };
        }
      }
      
      // Place the new emoji
      newBoard[cellIndex] = {
        emoji,
        player: currentPlayer,
        timestamp: Date.now()
      };
      
      // Add move to history
      const newHistory = [
        ...prevState.movesHistory,
        {
          player: currentPlayer,
          cell: cellIndex,
          emoji
        }
      ];
      
      // Check for winner
      const { winner, winningLine } = checkWinner(newBoard);
      
      // Determine next player and game phase
      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      const nextGamePhase = winner ? 'game-over' : 'play';
      
      return {
        ...prevState,
        board: newBoard,
        currentPlayer: nextPlayer,
        winner,
        winningLine,
        gamePhase: nextGamePhase,
        movesHistory: newHistory
      };
    });
  };

  // Reset the game to initial state
  const resetGame = () => {
    setGameState(initialGameState);
    setPlayers(initialPlayers);
    setIsReady(false);
  };

  return (
    <GameContext.Provider 
      value={{ 
        gameState, 
        players, 
        setPlayerCategory, 
        makeMove, 
        resetGame,
        isReady
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
