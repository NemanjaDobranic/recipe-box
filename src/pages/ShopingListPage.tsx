import { useEffect } from "react";
import { useShoppingStore } from "@/features/recipes/store";
import { useRecipeStore } from "@/features/recipes/store";
import type { Ingredient } from "@/features/recipes/types";

export default function ShoppingListPage() {
    const selectedRecipes = useShoppingStore((s) => s.selectedRecipes);
    const shoppingList = useShoppingStore((s) => s.shoppingList);
    const generateShoppingList = useShoppingStore((s) => s.generateShoppingList);
    const toggleItemChecked = useShoppingStore((s) => s.toggleItemChecked);
    const recipes = useRecipeStore((s) => s.recipes);

    useEffect(() => {
        const selectedRecipeObjects = recipes.filter((r) => selectedRecipes.includes(r.id));
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

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-heading mb-6">Shopping List</h1>

            {shoppingList.length === 0 ? (
                <p>No items yet. Select recipes and generate the list.</p>
            ) : (
                Object.entries(groupedIngredients).map(([category, items]) => (
                    <div key={category} className="mb-4">
                        <h2 className="font-heading text-xl mb-2">{category}</h2>
                        <ul className="space-y-2">
                            {items.map((item) => (
                                <li key={item.id} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={item.checked ?? false}
                                        onChange={() => toggleItemChecked(item.id)}
                                        className="accent-red-500"
                                    />
                                    <span className={item.checked ? "line-through text-gray-400" : ""}>
                    {item.quantity} {item.unit} {item.item} {item.note ? `(${item.note})` : ""}
                  </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}