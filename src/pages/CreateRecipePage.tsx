import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/features/recipes/store";
import { useState } from "react";
import type { Recipe, Difficulty } from "@/features/recipes/types";

export default function EditRecipePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const recipes = useRecipeStore((s) => s.recipes);
    const updateRecipe = useRecipeStore((s) => s.updateRecipe);

    const recipe = recipes.find((r) => r.id === id);

    const [name, setName] = useState(recipe?.name ?? "");
    const [description, setDescription] = useState(recipe?.description ?? "");
    const [cuisine, setCuisine] = useState(recipe?.cuisine ?? "");
    const [difficulty, setDifficulty] = useState<Difficulty>(
        recipe?.difficulty ?? "Easy"
    );
    const [prepTime, setPrepTime] = useState(recipe?.prepTime ?? 0);
    const [cookTime, setCookTime] = useState(recipe?.cookTime ?? 0);
    const [servings, setServings] = useState(recipe?.servings ?? 1);
    const [tags, setTags] = useState(recipe?.tags.join(", ") ?? "");

    if (!recipe) {
        return (
            <div className="p-6 text-center text-gray-500">
                Recipe not found.
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedRecipe: Recipe = {
            ...recipe,
            name,
            description,
            cuisine,
            difficulty,
            prepTime,
            cookTime,
            servings,
            tags: tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
        };

        updateRecipe(updatedRecipe);
        navigate(`/recipe/${recipe.id}`);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-heading mb-8">Edit Recipe</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        className="w-full border rounded-lg p-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        className="w-full border rounded-lg p-2"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Cuisine</label>
                    <input
                        className="w-full border rounded-lg p-2"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Difficulty</label>
                    <select
                        className="w-full border rounded-lg p-2"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Prep Time</label>
                        <input
                            type="number"
                            className="w-full border rounded-lg p-2"
                            value={prepTime}
                            onChange={(e) => setPrepTime(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Cook Time</label>
                        <input
                            type="number"
                            className="w-full border rounded-lg p-2"
                            value={cookTime}
                            onChange={(e) => setCookTime(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Servings</label>
                        <input
                            type="number"
                            className="w-full border rounded-lg p-2"
                            value={servings}
                            onChange={(e) => setServings(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Tags (comma separated)
                    </label>
                    <input
                        className="w-full border rounded-lg p-2"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-6 py-2 bg-olive text-white rounded-lg hover:opacity-90 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}