import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/features/recipes/store";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeFilters, {type SortOptions } from "@/components/recipe/RecipeFilters";
import { matchSorter } from "match-sorter";

export default function HomePage() {
    const navigate = useNavigate();
    const recipes = useRecipeStore((s) => s.recipes);
    
    const [search, setSearch] = useState("");
    const [cuisine, setCuisine] = useState("all");
    const [difficulty, setDifficulty] = useState("all");
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [maxTime, setMaxTime] = useState<number | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOptions>("recent");

    const cuisines = ["all", ...Array.from(new Set(recipes.map((r) => r.cuisine)))];

    const filteredRecipes = useMemo(() => {
        let result = [...recipes];
        
        if (search.trim() || tags.length > 0) {
            result = matchSorter(result, search, {
                keys: ["name", "cuisine", "tags"],
                threshold: search ? matchSorter.rankings.CONTAINS : undefined,
            });

            if (tags.length > 0) {
                result = result.filter((r) => tags.every((t) => r.tags.includes(t)));
            }
        }
        
        if (cuisine !== "all") result = result.filter((r) => r.cuisine === cuisine);

        if (difficulty !== "all") result = result.filter((r) => r.difficulty === difficulty);

        if (maxTime != null) result = result.filter((r) => r.prepTime + r.cookTime <= maxTime);

        if (favoritesOnly) result = result.filter((r) => r.isFavorite);

        switch (sortBy) {
            case "time":
                result.sort((a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime));
                break;
            case "difficulty":
                { const levels = { Easy: 1, Medium: 2, Hard: 3 };
                result.sort((a, b) => levels[a.difficulty] - levels[b.difficulty]);
                break; }
            case "favorites":
                result.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
                break;
            case "recent":
            default:
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        return result;
    }, [recipes, search, cuisine, difficulty, favoritesOnly, maxTime, tags, sortBy]);

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-3xl font-heading">Your Mediterranean Recipe Box</h1>
                <button
                    onClick={() => navigate("/create")}
                    className="bg-tomato text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                    + Create Recipe
                </button>
            </div>

            <RecipeFilters
                search={search}
                setSearch={setSearch}
                cuisine={cuisine}
                setCuisine={setCuisine}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                favoritesOnly={favoritesOnly}
                setFavoritesOnly={setFavoritesOnly}
                maxTime={maxTime}
                setMaxTime={setMaxTime}
                tags={tags}
                setTags={setTags}
                sortBy={sortBy}
                setSortBy={setSortBy}
                availableCuisines={cuisines}
                availableTags={Array.from(new Set(recipes.flatMap((r) => r.tags)))}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
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