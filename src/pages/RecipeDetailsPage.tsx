import {useState, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useRecipeStore} from "@/features/recipes/store";
import type {Ingredient} from "@/features/recipes/types.ts";
import Heart from "@/components/ui/HeartButton.tsx";

export default function RecipeDetailsPage() {
    const {id} = useParams();
    const recipes = useRecipeStore((s) => s.recipes);
    const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);

    const recipe = recipes.find((r) => r.id === id);
    const [servings, setServings] = useState(recipe?.servings ?? 1);
    const [cookingMode, setCookingMode] = useState(false);
    const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
    const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

    if (!recipe) return <p className="p-4 text-center">Recipe not found.</p>;

    const adjustedIngredients = useMemo(() => {
        const factor = servings / recipe.servings;
        return recipe.ingredients.map((ing) => ({
            ...ing,
            quantity: +(ing.quantity * factor).toFixed(2),
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

    const handleFavoriteClick = () => {
        toggleFavorite(recipe.id);
    };

    const totalTime = recipe.prepTime + recipe.cookTime;

    return (
        <div className="min-h-screen transition-all mx-0 px-8 md:px-40 py-8">
            <div className="relative">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-64 md:h-80 object-cover rounded-lg mb-6 shadow-md"
                />
                {recipe.isFavorite && (
                    <div className="absolute top-4 right-4">
                        <Heart favorite size={48} />
                    </div>
                )}
            </div>

            <div className="p-6 md:p-8 bg-surface rounded-xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                    <h1 className="font-heading text-3xl md:text-4xl leading-tight tracking-tight">
                        {recipe.name}
                    </h1>

                    <Heart
                        favorite={recipe.isFavorite}
                        onClick={handleFavoriteClick}
                        size={32}
                        className="md:m-0"
                    />
                </div>

                <p className="text-gray-700 mb-4">{recipe.description}</p>

                <div className="flex flex-wrap gap-4 text-sm mb-6 text-gray-600 items-center">
                    <span>🍽 {recipe.cuisine}</span>
                    <span>⏱ {totalTime} min</span>
                    <span>🔥 {recipe.difficulty}</span>

                    <span className="flex items-center gap-2">
                        Servings:
                        <button
                            onClick={() => setServings((prev) => Math.max(1, prev - 1))}
                            className="px-3 py-1 bg-surface rounded-lg font-medium hover:opacity-90 transition-all"
                        >
                            −
                        </button>
                        <span className="min-w-[40px] text-center font-semibold">{servings}</span>
                        <button
                            onClick={() => setServings((prev) => prev + 1)}
                            className="px-3 py-1 bg-surface rounded-lg font-medium hover:opacity-90 transition-all"
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
                    </span>
                </div>

                <button
                    onClick={() => setCookingMode(!cookingMode)}
                    className="mb-8 px-4 py-2 bg-secondary text-background rounded-lg hover:opacity-90 transition-all"
                >
                    {cookingMode ? "Exit Cooking Mode" : "Start Cooking"}
                </button>

                <SectionTitle title="Ingredients" />
                <IngredientList
                    ingredients={adjustedIngredients}
                    checkedIngredients={checkedIngredients}
                    toggleIngredient={toggleIngredient}
                    cookingMode={cookingMode}
                />

                <SectionTitle title="Instructions" />
                <StepList
                    steps={recipe.instructions}
                    checkedSteps={checkedSteps}
                    toggleStep={toggleStep}
                    cookingMode={cookingMode}
                />

                {recipe.notes && (
                    <>
                        <SectionTitle title="Notes" />
                        <div className="mt-2 p-4 bg-surface rounded-lg text-primary">
                            {recipe.notes}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// SECTION TITLE COMPONENT
function SectionTitle({title}: {title: string}) {
    return <h2 className="text-2xl md:text-3xl font-heading mb-4 mt-8">{title}</h2>;
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
                                className="accent-accent icon-sm"
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

// STEP LIST
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
                        className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-200 ease-in-out ${
                            checked ? "bg-surface opacity-70" : "hover:bg-surface"
                        }`}
                    >
                        {cookingMode && (
                            <input
                                type="checkbox"
                                className="mt-1 accent-accent icon-sm"
                                checked={checked}
                                onChange={() => toggleStep(i)}
                            />
                        )}
                        <span className={`font-bold ${checked ? "text-gray-400" : "text-accent"}`}>
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