import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/features/recipes/store";
import type { Recipe, Ingredient, Difficulty } from "@/features/recipes/types";
import { v4 as uuid } from "uuid";

export default function CreateRecipePage() {
    const navigate = useNavigate();
    const addRecipe = useRecipeStore((s) => s.addRecipe);

    const [form, setForm] = useState({
        name: "",
        description: "",
        cuisine: "",
        difficulty: "Easy" as Difficulty,
        prepTime: 0,
        cookTime: 0,
        servings: 1,
        image: "",
        tags: "",
    });

    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { id: uuid(), item: "", quantity: 0, unit: "" },
    ]);

    const [instructions, setInstructions] = useState<string[]>([""]);

    // -----------------------
    // Handlers
    // -----------------------

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                name === "prepTime" ||
                name === "cookTime" ||
                name === "servings"
                    ? Number(value)
                    : value,
        }));
    };

    const addIngredient = () =>
        setIngredients((prev) => [
            ...prev,
            { id: uuid(), item: "", quantity: 0, unit: "" },
        ]);

    const updateIngredient = (
        index: number,
        field: keyof Ingredient,
        value: string | number
    ) => {
        setIngredients((prev) =>
            prev.map((ing, i) =>
                i === index ? { ...ing, [field]: field === "quantity" ? Number(value) : value } : ing
            )
        );
    };

    const removeIngredient = (index: number) =>
        setIngredients((prev) => prev.filter((_, i) => i !== index));

    const addInstruction = () =>
        setInstructions((prev) => [...prev, ""]);

    const updateInstruction = (index: number, value: string) =>
        setInstructions((prev) =>
            prev.map((step, i) => (i === index ? value : step))
        );

    const removeInstruction = (index: number) =>
        setInstructions((prev) => prev.filter((_, i) => i !== index));

    // -----------------------
    // Submit
    // -----------------------

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newRecipe: Recipe = {
            id: uuid(),
            name: form.name,
            description: form.description,
            cuisine: form.cuisine,
            difficulty: form.difficulty,
            prepTime: form.prepTime,
            cookTime: form.cookTime,
            servings: form.servings,
            image: form.image,
            tags: form.tags.split(",").map((t) => t.trim()),
            ingredients,
            instructions,
            notes: "",
            isFavorite: false,
            createdAt: new Date().toISOString(),
        };

        addRecipe(newRecipe);
        navigate("/");
    };

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6">
            <h1 className="text-3xl font-heading mb-6">
                Create New Recipe
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Basic Info */}
                <div className="space-y-4">
                    <input
                        name="name"
                        placeholder="Recipe Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg"
                    />

                    <textarea
                        name="description"
                        placeholder="Short description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />

                    <input
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="prepTime"
                        type="number"
                        placeholder="Prep Time (min)"
                        value={form.prepTime}
                        onChange={handleChange}
                        className="p-3 border rounded-lg"
                    />

                    <input
                        name="cookTime"
                        type="number"
                        placeholder="Cook Time (min)"
                        value={form.cookTime}
                        onChange={handleChange}
                        className="p-3 border rounded-lg"
                    />

                    <input
                        name="servings"
                        type="number"
                        placeholder="Servings"
                        value={form.servings}
                        onChange={handleChange}
                        className="p-3 border rounded-lg"
                    />

                    <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                        className="p-3 border rounded-lg"
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>

                <input
                    name="cuisine"
                    placeholder="Cuisine (e.g. Italian)"
                    value={form.cuisine}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                />

                <input
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={form.tags}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                />

                {/* Ingredients */}
                <div>
                    <h2 className="text-xl font-heading mb-3">Ingredients</h2>
                    {ingredients.map((ing, i) => (
                        <div key={ing.id} className="flex gap-2 mb-2">
                            <input
                                placeholder="Item"
                                value={ing.item}
                                onChange={(e) =>
                                    updateIngredient(i, "item", e.target.value)
                                }
                                className="flex-1 p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Qty"
                                value={ing.quantity}
                                onChange={(e) =>
                                    updateIngredient(i, "quantity", e.target.value)
                                }
                                className="w-20 p-2 border rounded"
                            />
                            <input
                                placeholder="Unit"
                                value={ing.unit}
                                onChange={(e) =>
                                    updateIngredient(i, "unit", e.target.value)
                                }
                                className="w-24 p-2 border rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeIngredient(i)}
                                className="text-red-500"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addIngredient}
                        className="text-olive font-medium mt-2"
                    >
                        + Add Ingredient
                    </button>
                </div>

                {/* Instructions */}
                <div>
                    <h2 className="text-xl font-heading mb-3">Instructions</h2>
                    {instructions.map((step, i) => (
                        <div key={i} className="flex gap-2 mb-2">
              <textarea
                  value={step}
                  onChange={(e) =>
                      updateInstruction(i, e.target.value)
                  }
                  className="flex-1 p-2 border rounded"
              />
                            <button
                                type="button"
                                onClick={() => removeInstruction(i)}
                                className="text-red-500"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addInstruction}
                        className="text-olive font-medium mt-2"
                    >
                        + Add Step
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-tomato text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition"
                >
                    Save Recipe
                </button>
            </form>
        </div>
    );
}