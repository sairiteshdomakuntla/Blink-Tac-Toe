
import { useState } from "react";
import { useGameContext } from "../context/GameContext";
import { Category } from "../types/game-types";
import { EMOJI_SETS } from "../constants/game-constants";
import { cn } from "@/lib/utils";

interface CategorySelectorProps {
  playerId: 1 | 2;
}

const CategorySelector = ({ playerId }: CategorySelectorProps) => {
  const { players, setPlayerCategory } = useGameContext();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const player = players[playerId - 1];
  
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setPlayerCategory(playerId, category);
  };
  
  // Get sample emojis for each category (just a few to show)
  const getSampleEmojis = (category: Category) => {
    return EMOJI_SETS[category].slice(0, 4).join(" ");
  };
  
  const buttonBaseClass = "category-button";
  const playerColorClass = playerId === 1 ? "bg-neon-pink" : "bg-neon-blue";
  
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h2 className="text-xl font-bold">
        {player.name}, choose your emoji category!
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg">
        <button
          className={cn(
            buttonBaseClass,
            "bg-purple-600 hover:bg-purple-500",
            selectedCategory === "animals" && playerColorClass
          )}
          onClick={() => handleSelectCategory("animals")}
          disabled={!!player.category}
        >
          <div className="text-2xl mb-2">{getSampleEmojis("animals")}</div>
          <span>Animals</span>
        </button>
        
        <button
          className={cn(
            buttonBaseClass,
            "bg-green-600 hover:bg-green-500",
            selectedCategory === "food" && playerColorClass
          )}
          onClick={() => handleSelectCategory("food")}
          disabled={!!player.category}
        >
          <div className="text-2xl mb-2">{getSampleEmojis("food")}</div>
          <span>Food</span>
        </button>
        
        <button
          className={cn(
            buttonBaseClass,
            "bg-blue-600 hover:bg-blue-500",
            selectedCategory === "sports" && playerColorClass
          )}
          onClick={() => handleSelectCategory("sports")}
          disabled={!!player.category}
        >
          <div className="text-2xl mb-2">{getSampleEmojis("sports")}</div>
          <span>Sports</span>
        </button>
      </div>
      
      {player.category && (
        <div className="mt-4 p-3 bg-game-cell rounded-lg animate-fade-in">
          <p className="text-lg">
            You've chosen <span className="font-bold">{player.category}</span>!
          </p>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
