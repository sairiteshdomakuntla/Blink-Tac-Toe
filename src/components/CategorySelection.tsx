
import { useGameContext } from "../context/GameContext";
import CategorySelector from "./CategorySelector";

const CategorySelection = () => {
  const { players } = useGameContext();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className={`p-6 rounded-lg shadow-lg ${players[0].category ? 'bg-opacity-50' : 'animate-pulse-neon'}`}
           style={{ backgroundColor: 'rgba(255, 16, 240, 0.2)' }}>
        <CategorySelector playerId={1} />
      </div>
      
      <div className={`p-6 rounded-lg shadow-lg ${players[1].category ? 'bg-opacity-50' : 'animate-pulse-neon'}`}
           style={{ backgroundColor: 'rgba(0, 216, 255, 0.2)' }}>
        <CategorySelector playerId={2} />
      </div>
    </div>
  );
};

export default CategorySelection;
