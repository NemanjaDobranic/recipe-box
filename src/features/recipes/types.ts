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