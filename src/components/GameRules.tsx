
const GameRules = () => {
  return (
    <div className="mb-6 bg-game-cell bg-opacity-70 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-2">Game Rules</h3>
      <ul className="list-disc list-inside space-y-1 text-sm opacity-90">
        <li>Each player can have max 3 emojis at once</li>
        <li>When placing a 4th emoji, your oldest one vanishes</li>
        <li>Emojis are randomly selected from your category</li>
        <li>Get 3 in a row to win</li>
      </ul>
    </div>
  );
};

export default GameRules;
