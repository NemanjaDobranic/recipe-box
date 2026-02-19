import {useState, useMemo} from "react";
import {useRecipeStore} from "@/features/recipes/store";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeFilters from "@/components/recipe/RecipeFilters";

export default function HomePage() {
    const recipes = useRecipeStore((s) => s.recipes);

    const [search, setSearch] = useState("");
    const [cuisine, setCuisine] = useState("all");
    const [difficulty, setDifficulty] = useState("all");
    const [favoritesOnly, setFavoritesOnly] = useState(false);

    const filteredRecipes = useMemo(() => {
        let result = [...recipes];

        if (search.trim()) {
            const lower = search.toLowerCase();
            result = result.filter(
                (r) =>
                    r.name.toLowerCase().includes(lower) ||
                    r.cuisine.toLowerCase().includes(lower) ||
                    r.tags.some((t) => t.toLowerCase().includes(lower))
            );
        }

        if (cuisine !== "all") result = result.filter((r) => r.cuisine === cuisine);
        if (difficulty !== "all")
            result = result.filter((r) => r.difficulty.toLowerCase() === difficulty.toLowerCase());
        if (favoritesOnly) result = result.filter((r) => r.isFavorite);

        return result;
    }, [recipes, search, cuisine, difficulty, favoritesOnly]);

    const cuisines = ["all", ...Array.from(new Set(recipes.map((r) => r.cuisine)))];

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-heading mb-6">
                Your Mediterranean Recipe Box
            </h1>

            <RecipeFilters
                search={search}
                setSearch={setSearch}
                cuisine={cuisine}
                setCuisine={setCuisine}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                favoritesOnly={favoritesOnly}
                setFavoritesOnly={setFavoritesOnly}
                availableCuisines={cuisines}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                ))}
            </div>

            {filteredRecipes.length === 0 && (
                <p className="text-gray-500 mt-6 text-center">
                    No recipes found. Try another search or adjust filters.
                </p>
            )}
        </div>
    );
}
