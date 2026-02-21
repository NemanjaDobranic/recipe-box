import {useState, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useRecipeStore} from "@/features/recipes/store";
import type {Ingredient} from "@/features/recipes/types.ts";

export default function RecipeDetailsPage() {
    const {id} = useParams();
    const recipes = useRecipeStore((s) => s.recipes);
    const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);

    const recipe = recipes.find((r) => r.id === id)!;

    const [servings, setServings] = useState(recipe?.servings ?? 1);
    const [cookingMode, setCookingMode] = useState(false);
    const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
    const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

    const adjustedIngredients = useMemo(() => {
        if (!recipe) return [];

        const factor = servings / recipe.servings;

        return recipe.ingredients.map((ing) => ({
            ...ing,
            quantity:
                +(ing.quantity * factor).toFixed(2),
        }));
    }, [recipe, servings]);


    const toggleIngredient = (index: number) => {
        setCheckedIngredients((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const toggleStep = (index: number) => {
        setCheckedSteps((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    if (!recipe) {
        return <p className="p-4 text-center">Recipe not found.</p>;
    }

    const totalTime = recipe.prepTime + recipe.cookTime;
    return (
        <div className="min-h-screen bg-cream sm:px-6 md:px-8 py-6">
            <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-64 md:h-80 object-cover rounded-lg mb-6 shadow-md"
            />

            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl md:text-4xl font-heading leading-tight tracking-tight">
                        {recipe.name}
                    </h1>
                    <button
                        onClick={() => toggleFavorite(recipe.id)}
                        className={`text-3xl md:text-4xl transition-colors ${
                            recipe.isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
                        }`}
                        title={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        ♥
                    </button>
                </div>

                <p className="text-gray-700 mb-4">{recipe.description}</p>

                <div className="flex flex-wrap gap-4 text-sm mb-6 text-gray-600">
                    <span>🍽 {recipe.cuisine}</span>
                    <span>⏱ {totalTime} min</span>
                    <span>🔥 {recipe.difficulty}</span>
                    <span>
            Servings:
            <div className="flex items-center gap-2 ml-2">
              <button
                  onClick={() => setServings((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-lg text-lg"
              >
                −
              </button>

              <span className="min-w-[40px] text-center font-semibold text-lg">
                {servings}
              </span>

              <button
                  onClick={() => setServings((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-lg text-lg"
              >
                +
              </button>

                            {servings !== recipe.servings && (
                                <button
                                    onClick={() => setServings(recipe.servings)}
                                    className="text-sm text-gray-500 underline ml-2"
                                >
                                    Reset
                                </button>
                            )}
            </div>
          </span>
                </div>

                <button
                    onClick={() => setCookingMode(!cookingMode)}
                    className="mb-8 px-4 py-2 bg-tomato text-white rounded-lg hover:bg-red-600 transition"
                >
                    {cookingMode ? "Exit Cooking Mode" : "Start Cooking"}
                </button>

                <SectionTitle title="Ingredients"/>
                <IngredientList
                    ingredients={adjustedIngredients}
                    checkedIngredients={checkedIngredients}
                    toggleIngredient={toggleIngredient}
                    cookingMode={cookingMode}
                />

                {/* INSTRUCTIONS */}
                <SectionTitle title="Instructions"/>
                <StepList
                    steps={recipe.instructions}
                    checkedSteps={checkedSteps}
                    toggleStep={toggleStep}
                    cookingMode={cookingMode}
                />

                {/* NOTES */}
                {recipe.notes && (
                    <>
                        <SectionTitle title="Notes"/>
                        <div className="mt-2 p-4 bg-gray-50 rounded-lg text-gray-700">
                            {recipe.notes}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function SectionTitle({title}: { title: string }) {
    return <h2 className="text-2xl font-heading mb-4 mt-8">{title}</h2>;
}

function IngredientList({
                            ingredients,
                            checkedIngredients,
                            toggleIngredient,
                            cookingMode,
                        }: {
    ingredients: Ingredient[];
    checkedIngredients: number[];
    toggleIngredient: (index: number) => void;
    cookingMode: boolean;
}) {
    return (
        <ul className="space-y-2 mb-8">
            {ingredients.map((ing, i) => {
                const checked = checkedIngredients.includes(i);
                return (
                    <li key={ing.id} className="flex items-center gap-3">
                        {cookingMode && (
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleIngredient(i)}
                                className="accent-red-500"
                            />
                        )}
                        <span className={checked ? "line-through text-gray-400" : ""}>
              {ing.quantity} {ing.unit} {ing.item}
                            {ing.note ? ` (${ing.note})` : ""}
            </span>
                    </li>
                );
            })}
        </ul>
    );
}

function StepList({
                      steps,
                      checkedSteps,
                      toggleStep,
                      cookingMode,
                  }: {
    steps: string[];
    checkedSteps: number[];
    toggleStep: (index: number) => void;
    cookingMode: boolean;
}) {
    return (
        <ol className="space-y-3">
            {steps.map((step, i) => {
                const checked = checkedSteps.includes(i);
                return (
                    <li
                        key={i}
                        className={`flex items-start gap-3 p-2 rounded-lg transition duration-200 ease-in-out ${
                            checked ? "bg-gray-100 opacity-70" : "hover:bg-gray-50"
                        }`}
                    >
                        {cookingMode && (
                            <input
                                type="checkbox"
                                className="mt-1 accent-red-500"
                                checked={checked}
                                onChange={() => toggleStep(i)}
                            />
                        )}
                        <span className={`font-bold ${checked ? "text-gray-400" : "text-red-500"}`}>
              {i + 1}.
            </span>
                        <span className={`flex-1 ${checked ? "line-through text-gray-400" : ""}`}>
              {step}
            </span>
                    </li>
                );
            })}
        </ol>
    );
}
