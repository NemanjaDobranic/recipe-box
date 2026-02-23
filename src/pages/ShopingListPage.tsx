import { useState, useEffect } from "react";
import { useShoppingStore, useRecipeStore } from "@/features/recipes/store";
import type { Ingredient } from "@/features/recipes/types";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function ShoppingListPage() {
    const recipes = useRecipeStore((s) => s.recipes);
    const selectedRecipes = useShoppingStore((s) => s.selectedRecipes);
    const shoppingList = useShoppingStore((s) => s.shoppingList);
    const generateShoppingList = useShoppingStore((s) => s.generateShoppingList);
    const toggleItemChecked = useShoppingStore((s) => s.toggleItemChecked);
    const clearShoppingList = useShoppingStore((s) => s.clearShoppingList);

    const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const selectedRecipeObjects = recipes.filter((r) =>
            selectedRecipes.includes(r.id)
        );
        if (selectedRecipeObjects.length > 0) {
            generateShoppingList(selectedRecipeObjects);
        }
    }, [recipes, selectedRecipes, generateShoppingList]);

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
        <div className="p-4 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-heading">Shopping List</h1>
                <button
                    onClick={clearShoppingList}
                    disabled={shoppingList.length === 0}
                    className={`
                        px-4 py-2 rounded-xl font-medium font-body
                        transition-all duration-200
                        ${shoppingList.length === 0
                        ? "bg-surface text-gray-400 cursor-not-allowed shadow-sm"
                        : "bg-accent text-white hover:opacity-90 shadow-md"}
                    `}
                >
                    Clear List
                </button>
            </div>

            {shoppingList.length === 0 ? (
                <p className="text-gray-500 text-center">No items yet. Select recipes to generate your list.</p>
            ) : (
                Object.entries(groupedIngredients).map(([category, items]) => (
                    <div key={category} className="mb-6">
                        <button
                            onClick={() => toggleCategoryCollapse(category)}
                            className="
                                flex justify-between items-center w-full
                                font-heading text-xl mb-2 px-3 py-2
                                rounded-lg bg-surface shadow-sm
                                hover:shadow-md transition-all duration-200
                                focus:outline-none
                            "
                        >
                            {category} ({items.length})
                            {collapsedCategories[category] ? <FiChevronDown /> : <FiChevronUp />}
                        </button>
                        {!collapsedCategories[category] && (
                            <ul className="space-y-2 pl-4">
                                {items.map((item) => (
                                    <li
                                        key={item.id}
                                        className={`
                                            flex items-center gap-3 px-3 py-2 rounded-lg
                                            bg-surface/80 backdrop-blur-sm shadow-sm
                                            transition-all duration-200
                                            hover:shadow-md
                                            ${item.checked ? "opacity-60 line-through" : ""}
                                        `}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={item.checked ?? false}
                                            onChange={() => toggleItemChecked(item.id)}
                                            className="accent-accent w-5 h-5"
                                        />
                                        <span className="font-body text-primary">
                                            {item.quantity} {item.unit} {item.item}{" "}
                                            {item.note ? `(${item.note})` : ""}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}