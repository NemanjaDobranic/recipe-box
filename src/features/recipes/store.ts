import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {Ingredient, Recipe} from "./types";
import {seedRecipes} from "@/data/seedRecipes";
import {inferCategory} from "@/features/recipes/utils/category.ts";

interface RecipeState {
    recipes: Recipe[];
    addRecipe: (recipe: Omit<Recipe, "id" | "createdAt">) => void;
    updateRecipe: (recipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
    toggleFavorite: (id: string) => void;
}

interface ShoppingState {
    selectedRecipes: string[];
    shoppingList: Ingredient[];
    setSelectedRecipes: (ids: string[]) => void;
    toggleItemChecked: (id: string) => void;
    toggleRecipeSelection: (id: string) => void;
    generateShoppingList: (recipes: Recipe[]) => void;
    clearShoppingList: () => void;
    removeRecipeFromList: (recipeId: string) => void;
}

export const useRecipeStore = create<RecipeState>()(
    persist(
        (set) => ({
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


export const useShoppingStore = create<ShoppingState>()(
    persist(
        (set, get) => ({
            selectedRecipes: [],
            shoppingList: [],

            setSelectedRecipes: (ids) => set({ selectedRecipes: ids }),

            toggleRecipeSelection: (recipeId: string) =>
                set((state) => ({
                    selectedRecipes: state.selectedRecipes.includes(recipeId)
                        ? state.selectedRecipes.filter((id) => id !== recipeId)
                        : [...state.selectedRecipes, recipeId],
                })),

            generateShoppingList: (recipes) => {
                const aggregated: Record<string, Ingredient> = {};

                recipes.forEach((recipe) => {
                    recipe.ingredients.forEach((ing) => {
                        const category = inferCategory(ing.item);
                        const key = `${ing.item.toLowerCase()}|${ing.unit}|${category}`;

                        if (aggregated[key]) {
                            aggregated[key].quantity += ing.quantity;
                        } else {
                            aggregated[key] = { ...ing, checked: false, category };
                        }
                    });
                });

                const shoppingList = Object.values(aggregated);

                shoppingList.sort((a, b) => {
                    const catA = inferCategory(a.item) ?? "Other";
                    const catB = inferCategory(b.item) ?? "Other";
                    if (catA !== catB) return catA.localeCompare(catB);
                    return a.item.localeCompare(b.item);
                });

                set({ shoppingList });
            },

            toggleItemChecked: (id) =>
                set((state) => ({
                    shoppingList: state.shoppingList.map((item) =>
                        item.id === id ? { ...item, checked: !item.checked } : item
                    ),
                })),

            clearShoppingList: () => set({ shoppingList: [], selectedRecipes: [] }),

            removeRecipeFromList: (recipeId: string) => {
                const selected = get().selectedRecipes;
                const updatedSelected = selected.filter((id) => id !== recipeId);
                set({ selectedRecipes: updatedSelected });

                const allRecipes = useRecipeStore.getState().recipes;
                const remainingRecipes = allRecipes.filter((r) => updatedSelected.includes(r.id));
                get().generateShoppingList(remainingRecipes);
            },
        }),
        {
            name: "shopping-storage",
        }
    )
);