import { v4 as uuid } from "uuid";
import type {Recipe} from "@/features/recipes/types";

export const seedRecipes: Recipe[] = [
    {
        id: uuid(),
        name: "Spaghetti alla Carbonara",
        description: "Iconic Roman dish - creamy and flavorful, no cream!",
        cuisine: "Italian",
        difficulty: "Medium",
        prepTime: 10,
        cookTime: 15,
        servings: 4,
        image:
            "https://images.unsplash.com/photo-1612874742237-6526221588e3",
        tags: ["Pasta", "Roman", "Comfort Food", "Quick"],
        ingredients: [
            { id: uuid(), item: "Spaghetti", quantity: 400, unit: "g" },
            { id: uuid(), item: "Guanciale", quantity: 150, unit: "g" },
            { id: uuid(), item: "Eggs", quantity: 4, unit: "whole" },
            {
                id: uuid(),
                item: "Pecorino Romano DOP",
                quantity: 100,
                unit: "g",
            },
            { id: uuid(), item: "Black pepper", quantity: 1, unit: "to taste" },
        ],
        instructions: [
            "Bring water to boil for pasta (salt when boiling)",
            "Cut guanciale into strips and cook in pan until golden (no oil needed!)",
            "In a bowl, beat eggs with grated pecorino and abundant black pepper",
            "Cook spaghetti al dente, reserve 1 cup pasta water",
            "Drain pasta and add to pan with guanciale (heat off!)",
            "Add egg-pecorino mixture and mix quickly, adding pasta water for creaminess",
            "Serve immediately with freshly ground black pepper and extra pecorino",
        ],
        notes:
            "Secret - creaminess comes from egg-pecorino-pasta water emulsion, NOT cream! Heat must be off when adding eggs to avoid scrambling.",
        isFavorite: false,
        createdAt: new Date().toISOString(),
    },

    {
        id: uuid(),
        name: "Classic Mac and Cheese",
        description:
            "The ultimate American comfort food - creamy, cheesy, perfect!",
        cuisine: "American",
        difficulty: "Easy",
        prepTime: 10,
        cookTime: 20,
        servings: 6,
        image:
            "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686",
        tags: ["Comfort Food", "Pasta", "Cheese", "Family Favorite"],
        ingredients: [
            { id: uuid(), item: "Elbow macaroni", quantity: 450, unit: "g" },
            { id: uuid(), item: "Butter", quantity: 60, unit: "g" },
            { id: uuid(), item: "All-purpose flour", quantity: 60, unit: "g" },
            { id: uuid(), item: "Whole milk", quantity: 700, unit: "ml" },
            {
                id: uuid(),
                item: "Sharp Cheddar cheese",
                quantity: 300,
                unit: "g",
            },
            { id: uuid(), item: "Mozzarella", quantity: 150, unit: "g" },
            { id: uuid(), item: "Dijon mustard", quantity: 1, unit: "tsp" },
            { id: uuid(), item: "Paprika", quantity: 0.5, unit: "tsp" },
            { id: uuid(), item: "Salt and pepper", quantity: 1, unit: "to taste" },
            { id: uuid(), item: "Breadcrumbs", quantity: 50, unit: "g" },
        ],
        instructions: [
            "Cook macaroni according to package (1-2 min less for al dente). Drain and set aside",
            "In same pot, melt butter over medium heat",
            "Add flour and whisk for 1-2 minutes (roux) until slightly golden",
            "Gradually pour in milk while whisking constantly to prevent lumps",
            "Cook while stirring until thickened (5-7 min)",
            "Reduce heat, add cheeses, mustard, paprika, salt and pepper. Stir until fully melted",
            "Add macaroni to sauce and mix well",
            "Optional: transfer to baking dish, top with breadcrumbs and broil at 180°C for 15 min",
            "Serve hot with a sprinkle of paprika",
        ],
        notes:
            "Use freshly grated cheese, not pre-shredded. For extra creaminess add a tablespoon of cream cheese.",
        isFavorite: false,
        createdAt: new Date().toISOString(),
    },

    {
        id: uuid(),
        name: "Chicken Parmigiana",
        description:
            "Italian-American fusion - breaded chicken with marinara and melted mozzarella",
        cuisine: "Italian-American",
        difficulty: "Medium",
        prepTime: 20,
        cookTime: 30,
        servings: 4,
        image:
            "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8",
        tags: [
            "Chicken",
            "Cheese",
            "Italian-American",
            "Comfort Food",
            "Weeknight Dinner",
        ],
        ingredients: [
            { id: uuid(), item: "Chicken breasts", quantity: 4, unit: "pieces" },
            { id: uuid(), item: "All-purpose flour", quantity: 100, unit: "g" },
            { id: uuid(), item: "Eggs", quantity: 2, unit: "whole" },
            { id: uuid(), item: "Breadcrumbs", quantity: 150, unit: "g" },
            { id: uuid(), item: "Parmesan cheese", quantity: 50, unit: "g" },
            { id: uuid(), item: "Fresh mozzarella", quantity: 250, unit: "g" },
            { id: uuid(), item: "Marinara sauce", quantity: 500, unit: "ml" },
            { id: uuid(), item: "Fresh basil", quantity: 1, unit: "to taste" },
            { id: uuid(), item: "Olive oil", quantity: 1, unit: "as needed" },
            { id: uuid(), item: "Salt and pepper", quantity: 1, unit: "to taste" },
        ],
        instructions: [
            "Preheat oven to 200°C (400°F)",
            "Prepare three dishes: flour, beaten eggs, breadcrumbs mixed with parmesan",
            "Salt and pepper the pounded chicken breasts",
            "Dredge each breast in flour → eggs → breadcrumbs, pressing well",
            "Heat oil in pan and fry breasts 3-4 min per side until golden",
            "Transfer breasts to baking dish, pour marinara sauce over them",
            "Top each breast with mozzarella slices and sprinkle of parmesan",
            "Bake for 15-20 min until cheese is melted and lightly golden",
            "Garnish with fresh basil and serve",
        ],
        notes:
            "Light version: bake instead of frying. Add garlic powder and oregano to breadcrumbs for extra flavor.",
        isFavorite: false,
        createdAt: new Date().toISOString(),
    },
];
