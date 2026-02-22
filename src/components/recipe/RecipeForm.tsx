import {useState} from "react";
import type {Recipe, Difficulty, Ingredient} from "@/features/recipes/types";
import {ThemedSelect} from "@/components/ui/ThemedSelect.tsx";

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

    const difficultyOptions = [
        {value: "Easy", label: "Easy"},
        {value: "Medium", label: "Medium"},
        {value: "Hard", label: "Hard"},
    ];

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
        setIngredients((prev) => prev.map((ing, i) => (i === index ? {...ing, ...updated} : ing)));

    const addIngredient = () =>
        setIngredients((prev) => [...prev, {id: crypto.randomUUID(), item: "", quantity: 0, unit: "", note: ""}]);

    const removeIngredient = (index: number) =>
        setIngredients((prev) => prev.filter((_, i) => i !== index));

    const updateInstruction = (index: number, value: string) =>
        setInstructions((prev) => prev.map((step, i) => (i === index ? value : step)));

    const addInstruction = () => setInstructions((prev) => [...prev, ""]);

    const removeInstruction = (index: number) =>
        setInstructions((prev) => prev.filter((_, i) => i !== index));

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-surface rounded-xl mx-8 md:mx-40 my-8 p-8 space-y-10 animate-fade-in-up"
        >
            <div className="text-center">
                <h1 className="font-heading text-3xl mb-2">
                    {existingRecipe ? "Edit Recipe" : "Create Recipe"}
                </h1>
                <p className="text-sm opacity-70 mt-1">
                    Fill in the details below to craft your recipe.
                </p>
            </div>

            <section className="space-y-6">
                <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <input
                        className="themed-input w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Description</label>
                    <textarea
                        rows={3}
                        className="themed-input w-full resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2 font-medium">Cuisine</label>
                        <input
                            className="themed-input w-full"
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Difficulty</label>
                        <ThemedSelect
                            options={difficultyOptions}
                            value={difficultyOptions.find((opt) => opt.value === difficulty)}
                            onChange={(selected) => setDifficulty(selected?.value as Difficulty)}
                            placeholder="Select difficulty..."
                        />
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label className="block mb-2 font-medium">Prep Time</label>
                        <input
                            type="number"
                            className="themed-input w-full"
                            value={prepTime}
                            onChange={(e) => setPrepTime(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Cook Time</label>
                        <input
                            type="number"
                            className="themed-input w-full"
                            value={cookTime}
                            onChange={(e) => setCookTime(Number(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Servings</label>
                        <input
                            type="number"
                            className="themed-input w-full"
                            value={servings}
                            onChange={(e) => setServings(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium">Tags</label>
                    <input
                        className="themed-input w-full"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g. vegetarian, pasta"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Image URL</label>
                    <input
                        className="themed-input w-full"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Notes</label>
                    <textarea
                        rows={3}
                        className="themed-input w-full resize-none"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="font-heading text-xl">Ingredients</h2>

                {ingredients.map((ing, i) => (
                    <div
                        key={ing.id}
                        className="grid md:grid-cols-5 gap-3 items-start"
                    >
                        <input
                            className="themed-input"
                            placeholder="Item"
                            value={ing.item}
                            onChange={(e) => updateIngredient(i, {item: e.target.value})}
                            required
                        />
                        <input
                            type="number"
                            className="themed-input"
                            placeholder="Qty"
                            value={ing.quantity}
                            onChange={(e) =>
                                updateIngredient(i, {quantity: Number(e.target.value)})
                            }
                            required
                        />
                        <input
                            className="themed-input"
                            placeholder="Unit"
                            value={ing.unit}
                            onChange={(e) => updateIngredient(i, {unit: e.target.value})}
                        />
                        <input
                            className="themed-input"
                            placeholder="Note"
                            value={ing.note ?? ""}
                            onChange={(e) => updateIngredient(i, {note: e.target.value})}
                        />
                        <button
                            type="button"
                            onClick={() => removeIngredient(i)}
                            className="btn-solid font-normal"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addIngredient}
                    className="btn-solid font-normal"
                >
                    + Add Ingredient
                </button>
            </section>

            <section className="space-y-4">
                <h2 className="font-heading text-xl">Instructions</h2>

                {instructions.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
        <textarea
            className="themed-input flex-1 resize-none"
            rows={2}
            value={step}
            onChange={(e) => updateInstruction(i, e.target.value)}
            required
        />
                        <button
                            type="button"
                            onClick={() => removeInstruction(i)}
                            className="btn-solid font-normal"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addInstruction}
                    className="btn-solid font-normal"
                >
                    + Add Step
                </button>
            </section>

            <div className="flex justify-end pt-6">
                <button
                    type="submit"
                    className="btn-solid"
                >
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}