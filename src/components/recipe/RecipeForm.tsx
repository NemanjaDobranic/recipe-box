import { useState } from "react";
import type { Recipe, Difficulty, Ingredient } from "@/features/recipes/types";

interface RecipeFormProps {
    existingRecipe?: Recipe;
    onSubmit: (recipeData: Omit<Recipe, "id" | "createdAt">) => void;
    submitLabel?: string;
}

export default function RecipeForm({
                                       existingRecipe,
                                       onSubmit,
                                       submitLabel = "Save Recipe",
                                   }: RecipeFormProps) {
    const [name, setName] = useState(existingRecipe?.name ?? "");
    const [description, setDescription] = useState(existingRecipe?.description ?? "");
    const [cuisine, setCuisine] = useState(existingRecipe?.cuisine ?? "");
    const [difficulty, setDifficulty] = useState<Difficulty>(existingRecipe?.difficulty ?? "Easy");
    const [prepTime, setPrepTime] = useState(existingRecipe?.prepTime ?? 0);
    const [cookTime, setCookTime] = useState(existingRecipe?.cookTime ?? 0);
    const [servings, setServings] = useState(existingRecipe?.servings ?? 1);
    const [tags, setTags] = useState(existingRecipe?.tags.join(", ") ?? "");
    const [ingredients, setIngredients] = useState<Ingredient[]>(existingRecipe?.ingredients ?? []);
    const [instructions, setInstructions] = useState<string[]>(existingRecipe?.instructions ?? []);
    const [notes, setNotes] = useState(existingRecipe?.notes ?? "");
    const [image, setImage] = useState(existingRecipe?.image ?? "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const recipeData: Omit<Recipe, "id" | "createdAt"> = {
            name,
            description,
            cuisine,
            difficulty,
            prepTime,
            cookTime,
            servings,
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            ingredients,
            instructions,
            notes,
            image,
            isFavorite: existingRecipe?.isFavorite ?? false,
        };
        onSubmit(recipeData);
    };

    const updateIngredient = (index: number, updated: Partial<Ingredient>) =>
        setIngredients((prev) => prev.map((ing, i) => (i === index ? { ...ing, ...updated } : ing)));

    const addIngredient = () =>
        setIngredients((prev) => [...prev, { id: crypto.randomUUID(), item: "", quantity: 0, unit: "", note: "" }]);

    const removeIngredient = (index: number) =>
        setIngredients((prev) => prev.filter((_, i) => i !== index));

    const updateInstruction = (index: number, value: string) =>
        setInstructions((prev) => prev.map((step, i) => (i === index ? value : step)));

    const addInstruction = () => setInstructions((prev) => [...prev, ""]);

    const removeInstruction = (index: number) =>
        setInstructions((prev) => prev.filter((_, i) => i !== index));

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-heading mb-6">{existingRecipe ? "Edit Recipe" : "Create Recipe"}</h1>

            {/* Basic Info */}
            <div>
                <label className="block mb-1 font-medium">Name</label>
                <input className="w-full border rounded-lg p-2" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea className="w-full border rounded-lg p-2" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div>
                <label className="block mb-1 font-medium">Cuisine</label>
                <input className="w-full border rounded-lg p-2" value={cuisine} onChange={(e) => setCuisine(e.target.value)} required />
            </div>

            <div>
                <label className="block mb-1 font-medium">Difficulty</label>
                <select className="w-full border rounded-lg p-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Prep Time (min)</label>
                    <input type="number" className="w-full border rounded-lg p-2" value={prepTime} onChange={(e) => setPrepTime(Number(e.target.value))} />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Cook Time (min)</label>
                    <input type="number" className="w-full border rounded-lg p-2" value={cookTime} onChange={(e) => setCookTime(Number(e.target.value))} />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Servings</label>
                    <input type="number" className="w-full border rounded-lg p-2" value={servings} onChange={(e) => setServings(Number(e.target.value))} />
                </div>
            </div>

            <div>
                <label className="block mb-1 font-medium">Tags (comma separated)</label>
                <input className="w-full border rounded-lg p-2" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>

            <div>
                <label className="block mb-1 font-medium">Image URL</label>
                <input className="w-full border rounded-lg p-2" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg" />
            </div>

            <div>
                <label className="block mb-1 font-medium">Notes</label>
                <textarea className="w-full border rounded-lg p-2" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes for this recipe" />
            </div>

            <div>
                <h2 className="font-heading text-xl mt-4 mb-2">Ingredients</h2>
                {ingredients.map((ing, i) => (
                    <div key={ing.id} className="flex gap-2 mb-2">
                        <input className="border rounded p-1 w-1/3" placeholder="Item" value={ing.item} onChange={(e) => updateIngredient(i, { item: e.target.value })} required />
                        <input className="border rounded p-1 w-1/6" type="number" placeholder="Qty" value={ing.quantity} onChange={(e) => updateIngredient(i, { quantity: Number(e.target.value) })} required />
                        <input className="border rounded p-1 w-1/6" placeholder="Unit" value={ing.unit} onChange={(e) => updateIngredient(i, { unit: e.target.value })} />
                        <input className="border rounded p-1 w-1/3" placeholder="Note" value={ing.note ?? ""} onChange={(e) => updateIngredient(i, { note: e.target.value })} />
                        <button type="button" className="px-2 bg-red-500 text-white rounded" onClick={() => removeIngredient(i)}>X</button>
                    </div>
                ))}
                <button type="button" className="px-3 py-1 bg-olive text-white rounded" onClick={addIngredient}>+ Add Ingredient</button>
            </div>

            <div>
                <h2 className="font-heading text-xl mt-4 mb-2">Instructions</h2>
                {instructions.map((step, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <textarea className="border rounded p-1 flex-1" value={step} onChange={(e) => updateInstruction(i, e.target.value)} required />
                        <button type="button" className="px-2 bg-red-500 text-white rounded" onClick={() => removeInstruction(i)}>X</button>
                    </div>
                ))}
                <button type="button" className="px-3 py-1 bg-olive text-white rounded" onClick={addInstruction}>+ Add Step</button>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="submit" className="px-6 py-2 bg-olive text-white rounded-lg hover:opacity-90">{submitLabel}</button>
            </div>
        </form>
    );
}