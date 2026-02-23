import {useState, useEffect} from "react";
import {useShoppingStore, useRecipeStore} from "@/features/recipes/store";
import type {Ingredient} from "@/features/recipes/types";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";

export default function ShoppingListPage() {
    const recipes = useRecipeStore((s) => s.recipes);
    const selectedRecipes = useShoppingStore((s) => s.selectedRecipes);
    const shoppingList = useShoppingStore((s) => s.shoppingList);
    const generateShoppingList = useShoppingStore((s) => s.generateShoppingList);
    const toggleItemChecked = useShoppingStore((s) => s.toggleItemChecked);
    const clearShoppingList = useShoppingStore((s) => s.clearShoppingList);

    const [collapsedCategories, setCollapsedCategories] = useState<
        Record<string, boolean>
    >({});

    useEffect(() => {
        const selectedRecipeObjects = recipes.filter((r) =>
            selectedRecipes.includes(r.id)
        );

        if (selectedRecipeObjects.length > 0) {
            generateShoppingList(selectedRecipeObjects);
        }
    }, [recipes, selectedRecipes, generateShoppingList]);

    const completedCount = shoppingList.filter((i) => i.checked).length;
    const totalCount = shoppingList.length;
    const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

    const markAllDone = () => {
        shoppingList.forEach((item) => {
            if (!item.checked) toggleItemChecked(item.id);
        });
    };

    const uncheckAll = () => {
        shoppingList.forEach((item) => {
            if (item.checked) toggleItemChecked(item.id);
        });
    };

    const groupedIngredients: Record<string, Ingredient[]> = shoppingList.reduce(
        (acc, item) => {
            const category = item.category ?? "Other";
            if (!acc[category]) acc[category] = [];
            acc[category].push(item);
            return acc;
        },
        {} as Record<string, Ingredient[]>
    );

    Object.keys(groupedIngredients).forEach((cat) =>
        groupedIngredients[cat].sort((a, b) => a.item.localeCompare(b.item))
    );

    const toggleCategoryCollapse = (category: string) => {
        setCollapsedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <div className="min-h-screen px-6 md:px-20 py-12">
            <div className="max-w-3xl mx-auto bg-surface rounded-2xl shadow-md px-8 py-10">
                <div
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 lg:mb-10 gap-4">
                    <h1 className="font-heading text-3xl md:text-4xl tracking-tight">
                        Shopping List
                    </h1>

                    <button
                        onClick={clearShoppingList}
                        disabled={shoppingList.length === 0}
                        className={`px-4 py-2 rounded-lg font-medium transition
                                   ${
                            shoppingList.length === 0
                                ? "bg-surface-100 text-gray-400 cursor-not-allowed"
                                : "bg-secondary text-background hover:opacity-90"
                        }
                                 `}
                    >
                        Clear List
                    </button>
                </div>

                {shoppingList.length === 0 && (
                    <p className="text-gray-500 text-center text-sm">
                        No items yet. Select recipes to generate your list.
                    </p>
                )}

                {shoppingList.length > 0 && (
                    <div className="mb-6 md:mb-8 lg:mb-10">
                        <div className="flex justify-between items-center mb-2 md:mb-3 text-xs text-gray-500">
              <span>
                {completedCount} / {totalCount} completed
              </span>

                            <div className="flex gap-4">
                                <button
                                    onClick={markAllDone}
                                    className="text-accent hover:opacity-80 transition"
                                >
                                    Mark all
                                </button>
                                <button
                                    onClick={uncheckAll}
                                    className="text-gray-500 hover:text-accent transition"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-accent transition-all duration-300"
                                style={{width: `${progress}%`}}
                            />
                        </div>
                    </div>
                )}

                {Object.entries(groupedIngredients).map(([category, items]) => (
                    <div key={category} className="mb-6 md:mb-8 lg:mb-10">
                        <button
                            onClick={() => toggleCategoryCollapse(category)}
                            className="
                                          flex justify-between items-center w-full
                                          font-heading text-xl md:text-2xl
                                          mb-3 md:mb-4 lg:mb-5 transition
                                          hover:text-accent
                                        "
                        >
              <span>
                {category}{" "}
                  <span className="text-xs text-gray-400">({items.length})</span>
              </span>

                            {collapsedCategories[category] ? (
                                <FiChevronDown className="text-accent"/>
                            ) : (
                                <FiChevronUp className="text-accent"/>
                            )}
                        </button>

                        <div className="h-px bg-accent/20 mb-4 md:mb-5 lg:mb-6"></div>

                        {!collapsedCategories[category] && (
                            <ul className="space-y-3">
                                {items.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => toggleItemChecked(item.id)}
                                        className={`
                                                        flex items-center gap-4 px-5 py-3 rounded-lg
                                                        transition-colors duration-150 cursor-pointer
                        ${item.checked ? "bg-accent/10" : "hover:bg-accent/5"}
                      `}
                                    >
                                        <div
                                            className={`
                                                          w-6 h-6 rounded-full border-2 flex items-center justify-center
                                                          transition-colors
                          ${
                                                item.checked
                                                    ? "bg-accent border-accent"
                                                    : "border-accent bg-transparent"
                                            }
                        `}
                                        >
                                            {item.checked && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="white"
                                                    className="w-4 h-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </div>

                                        <span
                                            className={`font-medium text-sm md:text-base leading-relaxed ${
                                                item.checked
                                                    ? "line-through text-accent"
                                                    : "text-primary"
                                            }`}
                                        >
                      {item.quantity} {item.unit} {item.item}
                                            {item.note ? ` (${item.note})` : ""}
                    </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}