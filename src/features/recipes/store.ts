import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {Recipe, ShoppingItem, ShoppingStore} from "./types";
import {seedRecipes} from "@/data/seedRecipes";

interface RecipeState {
    recipes: Recipe[];
    addRecipe: (recipe: Omit<Recipe, "id" | "createdAt">) => void;
    updateRecipe: (recipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
    toggleFavorite: (id: string) => void;
}

export const useRecipeStore = create<RecipeState>()(
    persist(
        (set, get) => ({
            recipes: seedRecipes,

            addRecipe: (recipe) =>
                set((state) => ({
                    recipes: [...state.recipes, {
                        ...recipe,
                        id: crypto.randomUUID(),
                        createdAt: new Date().toUTCString(),
                    }],
                })),

            updateRecipe: (updated) =>
                set((state) => ({
                    recipes: state.recipes.map((r) =>
                        r.id === updated.id ? updated : r
                    ),
                })),

            deleteRecipe: (id) =>
                set((state) => ({
                    recipes: state.recipes.filter((r) => r.id !== id),
                })),

            toggleFavorite: (id) =>
                set((state) => ({
                    recipes: state.recipes.map((r) =>
                        r.id === id ? {...r, isFavorite: !r.isFavorite} : r
                    ),
                })),
        }),
        {
            name: "recipe-storage",
        }
    )
);

export const useShoppingStore = create<ShoppingStore>((set) => ({
    selectedRecipes: [],
    shoppingList: [],

    toggleRecipeSelection: (recipeId) =>
        set((state) => ({
            selectedRecipes: state.selectedRecipes.includes(recipeId)
                ? state.selectedRecipes.filter((id) => id !== recipeId)
                : [...state.selectedRecipes, recipeId],
        })),

    generateShoppingList: (recipes) =>
        set(() => {
            const allIngredients: ShoppingItem[] = [];

            recipes.forEach((r) => {
                r.ingredients.forEach((ing) => {
                    const existing = allIngredients.find((i) => i.item === ing.item && i.unit === ing.unit);
                    if (existing) {
                        existing.quantity += ing.quantity;
                    } else {
                        allIngredients.push({
                            id: ing.id,
                            item: ing.item,
                            quantity: ing.quantity,
                            unit: ing.unit,
                            note: ing.note,
                            category: ing.category ?? "Other",
                            checked: false,
                        });
                    }
                });
            });

            allIngredients.sort((a, b) => (a.category || "").localeCompare(b.category || ""));

            return {shoppingList: allIngredients};
        }),

    toggleItemChecked: (itemId) =>
        set((state) => ({
            shoppingList: state.shoppingList.map((i) =>
                i.id === itemId ? {...i, checked: !i.checked} : i
            ),
        })),
}));
