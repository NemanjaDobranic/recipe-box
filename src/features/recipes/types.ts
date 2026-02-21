export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Ingredient {
    id: string;
    item: string;
    quantity: number;
    unit: string;
    note?: string;
    category?: string;
    checked?: boolean;
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    cuisine: string;
    difficulty: Difficulty;
    prepTime: number;
    cookTime: number;
    servings: number;
    image: string;
    tags: string[];
    ingredients: Ingredient[];
    instructions: string[];
    notes?: string;
    isFavorite: boolean;
    createdAt: string;
}

export interface ShoppingItem {
    id: string;
    item: string;
    quantity: number;
    unit: string;
    category?: string;
    note?: string;
    checked: boolean;
}

export interface ShoppingStore {
    selectedRecipes: string[]; // recipe ids
    shoppingList: ShoppingItem[];
    toggleRecipeSelection: (recipeId: string) => void;
    generateShoppingList: (recipes: Recipe[]) => void;
    toggleItemChecked: (itemId: string) => void;
}