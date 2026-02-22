import {useState, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useRecipeStore} from "@/features/recipes/store";
import type {Ingredient} from "@/features/recipes/types.ts";
import Heart from "@/components/ui/HeartButton.tsx";
import {FiRefreshCw} from "react-icons/fi";

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
                    <div className="absolute top-0 right-6">
                        <Heart favorite size={48}/>
                    </div>
                )}
            </div>

            <div className="p-6 md:p-8 bg-surface rounded-xl">
                <div className="flex flex-row items-center md:items-center justify-between mb-4 gap-4">
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
                                className="ml-2 text-gray-500 hover:text-accent transition-colors"
                                title="Reset servings"
                            >
                                <FiRefreshCw className="w-4 h-4"/>
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

                <SectionTitle title="Ingredients"/>
                <IngredientList
                    ingredients={adjustedIngredients}
                    checkedIngredients={checkedIngredients}
                    toggleIngredient={toggleIngredient}
                    cookingMode={cookingMode}
                />

                <SectionTitle title="Instructions"/>
                <StepList
                    steps={recipe.instructions}
                    checkedSteps={checkedSteps}
                    toggleStep={toggleStep}
                    cookingMode={cookingMode}
                />

                {recipe.notes && (
                    <>
                        <SectionTitle title="Notes"/>
                        <div className="mt-2 p-4 bg-surface rounded-lg text-primary">
                            {recipe.notes}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function SectionTitle({title}: { title: string }) {
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
                        {cookingMode ? (
                            <div
                                onClick={() => toggleIngredient(i)}
                                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                                    checked
                                        ? "bg-accent border-accent"
                                        : "border-accent bg-transparent"
                                }`}
                            >
                                {checked && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="white"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            </div>
                        ) : null}

                        <span className={`flex-1 ${checked && cookingMode ? "line-through text-accent" : ""}`}>
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
        <ol className="space-y-4 mb-10">
            {steps.map((step, i) => {
                const done = checkedSteps.includes(i);

                return (
                    <li
                        key={i}
                        onClick={cookingMode ? () => toggleStep(i) : undefined}
                        className={`
              relative flex items-start gap-4 py-4 px-5 -mx-5 rounded-xl transition-all duration-200
              cursor-${cookingMode ? 'pointer' : 'default'} ${cookingMode ? 'opacity-100' : 'opacity-80'}
              ${done
                            ? 'bg-surface-50'
                            : cookingMode
                                ? 'hover:bg-surface-100 active:bg-surface-200'
                                : 'hover:bg-surface-50'}
            `}
                    >
                        {cookingMode ? (
                            <div
                                className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full transition-transform hover:scale-105">
                                {done ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-8 h-8 text-accent"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-9 h-9 text-accent"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.8}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4 4 0 1 1 2.092-7.723A4 4 0 0 1 12 3z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.161 17.009l11.839-.009"
                                        />
                                    </svg>
                                )}
                            </div>
                        ) : (
                            <div className="
                            flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full
                            bg-accent/10 text-accent font-semibold text-base
                          ">
                                {i + 1}
                            </div>
                        )}

                        <div className="flex-1 pt-1">
                          <span
                              className={`font-medium text-base leading-relaxed ${done && cookingMode ? 'line-through text-gray-400' : ''}`}>
                            {step}
                          </span>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}