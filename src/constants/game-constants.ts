
import { EmojiSet } from "../types/game-types";

export const BOARD_SIZE = 3;
export const MAX_ACTIVE_EMOJIS = 3;

export const EMOJI_SETS: EmojiSet = {
  animals: ['🐱', '🐶', '🦊', '🐼', '🐨', '🦁', '🐯', '🐮', '🐷', '🐸', '🐙', '🐠'],
  food: ['🍕', '🍔', '🍟', '🌮', '🍣', '🍩', '🍦', '🍓', '🥑', '🍗', '🍰', '🥕'],
  sports: ['⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🏉', '🎱', '🏏', '🥊', '🏂', '🏄']
};

export const WINNING_COMBINATIONS = [
  // Horizontal rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6]
];

export const PLAYER_COLORS = {
  1: 'neon-pink',
  2: 'neon-blue'
};
