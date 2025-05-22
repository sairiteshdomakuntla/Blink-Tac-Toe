# Blink Tac Toe

A twisted, fun version of Tic Tac Toe with vanishing emojis! 🎭✨

## Tech Stack

- **React** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** component library
- React Context API for state management
- Vite for the development environment

## Game Overview

Blink Tac Toe is a creative spin on the classic Tic Tac Toe game. Instead of traditional X's and O's, players use themed emojis that vanish over time, adding a strategic twist to the gameplay.

## Emoji Categories

Players can choose from three unique emoji categories:

- **Animals**: 🐱 🐶 🦊 🐼 🐨 🦁 🐯 🐮 🐷 🐸 🐙 🐠
- **Food**: 🍕 🍔 🍟 🌮 🍣 🍩 🍦 🍓 🥑 🍗 🍰 🥕
- **Sports**: ⚽️ 🏀 🏈 ⚾️ 🎾 🏐 🏉 🎱 🏏 🥊 🏂 🏄

## The Vanishing Feature

What makes this game unique is the emoji vanishing mechanism:

- Each player can only have a maximum of 3 emojis on the board at any time
- When a player places a 4th emoji, their oldest emoji on the board vanishes
- The game tracks each emoji placement with a timestamp
- When the maximum is reached, the system identifies the oldest emoji using these timestamps and removes it
- This creates a dynamic, constantly changing board that requires adaptive strategy

## How To Play

1. Each player selects an emoji category
2. Players take turns placing emojis on the board
3. Remember that your oldest emoji will vanish when you place a 4th one
4. Form a line of 3 matching emojis (by player, not by specific emoji) to win
5. Plan your moves carefully, considering both current and future board states!

## Future Improvements

With more time, I'd like to add:

- **Online Multiplayer**: Allow players to compete remotely
- **Advanced Animations**: More visual feedback for the vanishing emojis
- **Customizable Rules**: Let players adjust the vanishing timer or maximum emojis
- **AI Opponent**: Implement a computer player with varying difficulty levels
- **Game Replays**: Save and review past games
- **Additional Emoji Categories**: More variety for players to choose from
- **Mobile Optimization**: Enhanced touch controls and responsive design

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sairiteshdomakuntla/Blink-Tac-Toe.git

# Install dependencies
cd Blink-Tac-Toe
npm install

# Start the development server
npm run dev
```

Enjoy playing Blink Tac Toe! 🎮