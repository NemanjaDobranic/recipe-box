import { useNavigate } from "react-router-dom";
import type { Recipe } from "@/features/recipes/types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
            <img
                src={recipe.image}
                alt={recipe.name}
                className="h-40 w-full object-cover rounded-lg mb-3"
            />

            <h3 className="text-lg font-semibold mb-1">{recipe.name}</h3>
            <p className="text-sm text-gray-600 mb-3">
                {recipe.cuisine} • {recipe.difficulty}
            </p>

            <div className="flex justify-between">
                <button
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="text-olive font-medium"
                >
                    View
                </button>

                <button
                    onClick={() => navigate(`/edit/${recipe.id}`)}
                    className="text-tomato font-medium"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}