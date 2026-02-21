import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {Recipe} from "./types";
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
