import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/features/recipes/store";
import ConfirmModal from "@/components/ui/ConfirmModal";
import type { Recipe } from "@/features/recipes/types";
import { useToast } from "@/context/useToast.ts";

interface RecipeCardProps {
    recipe: Recipe;
    selected?: boolean;
    onSelect?: () => void;
}

export default function RecipeCard({ recipe, selected = false, onSelect }: RecipeCardProps) {
    const navigate = useNavigate();
    const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
    const { showToast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        deleteRecipe(recipe.id);
        showToast("Recipe deleted successfully");
        setIsModalOpen(false);
    };

    const handleToggleSelection = () => {
        if (onSelect) {
            onSelect();
            showToast(
                selected
                    ? `"${recipe.name}" removed from shopping selection`
                    : `"${recipe.name}" added to shopping selection`
            );
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition relative">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="h-40 w-full object-cover rounded-lg mb-3"
                />

                <h3 className="text-lg font-semibold mb-1">{recipe.name}</h3>
                <p className="text-sm text-gray-600 mb-3">
                    {recipe.cuisine} • {recipe.difficulty}
                </p>

                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                        className="text-olive font-medium"
                    >
                        View
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate(`/edit/${recipe.id}`)}
                            className="text-blue-600 font-medium"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-red-600 font-medium"
                        >
                            Delete
                        </button>

                        {/* Shopping List Selection */}
                        <button
                            onClick={handleToggleSelection}
                            className={`font-medium ${selected ? "text-gray-500" : "text-green-600"}`}
                        >
                            {selected ? "Selected" : "Add to Shopping"}
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                title="Delete Recipe"
                description={`Are you sure you want to delete "${recipe.name}"?`}
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
}