export const CATEGORY_MAP = {
    Vegetables: [
        "tomato",
        "basil",
        "lettuce",
        "spinach",
        "marinara",
    ],
    Fruits: [
        "lemon",
        "orange",
        "apple",
    ],
    Dairy: [
        "milk",
        "cheese",
        "mozzarella",
        "pecorino",
        "parmesan",
        "cheddar",
        "butter",
        "cream",
    ],
    Meat: [
        "chicken",
        "beef",
        "pork",
        "guanciale",
    ],
    Eggs: [
        "egg",
    ],
    "Grains & Pasta": [
        "spaghetti",
        "macaroni",
        "pasta",
        "flour",
        "breadcrumb",
    ],
    "Oils & Fats": [
        "olive oil",
        "oil",
    ],
    Condiments: [
        "mustard",
    ],
    "Herbs & Spices": [
        "salt",
        "pepper",
        "paprika",
        "oregano",
    ],
};

export function inferCategory(item: string): string {
    const low = item.toLowerCase().trim();

    for (const [category, terms] of Object.entries(CATEGORY_MAP)) {
        if (terms.some(term => low.includes(term.toLowerCase()))) {
            return category;
        }
    }

    return "Other";
}