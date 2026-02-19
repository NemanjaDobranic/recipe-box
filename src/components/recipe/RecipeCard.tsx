import type {Recipe} from "@/features/recipes/types";
import { useRecipeStore } from "@/features/recipes/store";
import { Link } from "react-router-dom";

interface Props {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
    const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);

    const totalTime = recipe.prepTime + recipe.cookTime;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <Link to={`/recipe/${recipe.id}`}>
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                />
            </Link>

            <div className="p-4">
                <h3 className="font-heading text-xl">{recipe.name}</h3>
                <p className="text-sm text-gray-500">{totalTime} min</p>

                <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className="mt-2 text-tomato"
                >
                    {recipe.isFavorite ? "♥" : "♡"}
                </button>
            </div>
        </div>
    );
}
